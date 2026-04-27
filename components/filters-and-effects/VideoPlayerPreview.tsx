"use client";

import { useState, useEffect, useRef } from "react";
import {
    FiPlay,
    FiPause,
    FiVolume2,
    FiVolumeX,
    FiMaximize,
    FiHelpCircle,
    FiUpload,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { getLatestVideoFromIndexedDB, storeVideoPreview, getVideoPreview, checkVideoInCache, getVideoFromIndexedDB } from "@/lib/indexeddb-utils";
import axios from "axios";

const ServerURL = process.env.NEXT_PUBLIC_SERVER_API || "https://vbgcweb.videobackgroundchanger.com/";

interface UploadedVideoInfo {
    name: string;
    size: string;
    duration: string;
    previewUrl: string;
    fileType: string;
    isGuest: boolean;
    videoName?: string;
}

export function VideoPlayerPreview() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [videoInfo, setVideoInfo] = useState<UploadedVideoInfo | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const processingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const videoNameRef = useRef<string>("");
    const hasDownloadedRef = useRef<boolean>(false);

    const getEmailFromStorage = () => {
        try {
            const possibleKeys = ["userEmail", "email", "user_email", "subscriptionPlan", "loggedInEmail", "currentUserEmail"];
            for (const key of possibleKeys) {
                const storedEmail = localStorage.getItem(key);
                if (storedEmail) return storedEmail;
            }
            const userString = localStorage.getItem("user");
            if (userString) {
                const user = JSON.parse(userString);
                if (user.email) return user.email;
            }
            return null;
        } catch (error) {
            console.error("Error retrieving email:", error);
            return null;
        }
    };

    useEffect(() => {
        setUserEmail(getEmailFromStorage());
    }, []);

    // Clear sessionStorage if this is a fresh page load (no query param from navigation)
    useEffect(() => {
        // Check if we have a query param indicating we came from /change-bg
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const fromChangeBgParam = params.get("from-change-bg");

            // If no query param and we have sessionStorage data, clear it (fresh page load/refresh)
            if (!fromChangeBgParam) {
                sessionStorage.removeItem("uploadedVideoInfo");
                sessionStorage.removeItem("fromChangeBg");
                console.log("[VIDEOPREVIEW] 🗑️ Fresh page load detected - cleared sessionStorage");
            }
        }
    }, []);

    useEffect(() => {
        const loadVideo = async () => {
            const storedData = sessionStorage.getItem("uploadedVideoInfo");
            if (storedData) {
                try {
                    const parsed = JSON.parse(storedData);
                    console.log("[VIDEOPREVIEW] 📋 Metadata from sessionStorage:", parsed);

                    // Try to get video from IndexedDB using the stored videoName
                    console.log("[VIDEOPREVIEW] 🔍 Fetching from IndexedDB...");
                    let latestVideo: Blob | { videoName: string; blob: Blob; } | null = null;

                    // If videoName is stored in sessionStorage, use that specific one
                    if (parsed.videoName) {
                        console.log(`[VIDEOPREVIEW] 📝 Using stored videoName: ${parsed.videoName}`);
                        latestVideo = await getVideoFromIndexedDB(parsed.videoName);
                        if (latestVideo) {
                            console.log(`[VIDEOPREVIEW] ✅ Found specific video from IndexedDB: ${((latestVideo as Blob).size / 1024 / 1024).toFixed(2)} MB`);
                        } else {
                            console.log("[VIDEOPREVIEW] ⚠️ Specific video not found, trying latest");
                            latestVideo = await getLatestVideoFromIndexedDB();
                        }
                    } else {
                        // Fallback to latest if videoName not stored
                        console.log("[VIDEOPREVIEW] 💭 No stored videoName, using latest");
                        latestVideo = await getLatestVideoFromIndexedDB();
                    }

                    // Check what type we got and log appropriately
                    if (latestVideo instanceof Blob) {
                        console.log("[VIDEOPREVIEW] Retrieved video from IndexedDB:", `${(latestVideo.size / 1024 / 1024).toFixed(2)} MB`);
                    } else if (latestVideo && 'blob' in latestVideo) {
                        console.log("[VIDEOPREVIEW] Retrieved video from IndexedDB:", `${(latestVideo.blob.size / 1024 / 1024).toFixed(2)} MB`);
                    } else {
                        console.log("[VIDEOPREVIEW] Retrieved video from IndexedDB:", "null");
                    }

                    if (latestVideo && latestVideo instanceof Blob) {
                        // Validate blob
                        if (latestVideo.size === 0) {
                            console.error("[VIDEOPREVIEW] ❌ Blob is empty");
                            setVideoError("Video file is empty");
                            return;
                        }

                        // Check if it's a valid video type
                        const validTypes = ["video/mp4", "video/webm", "video/quicktime", "video/x-m4v"];
                        if (!validTypes.includes(latestVideo.type) && latestVideo.type !== "") {
                            console.warn("[VIDEOPREVIEW] ⚠️ Unexpected blob type:", latestVideo.type);
                        }

                        console.log("[VIDEOPREVIEW] ✅ Creating blob URL from IndexedDB data");
                        const blobUrl = URL.createObjectURL(latestVideo);
                        console.log("[VIDEOPREVIEW] 🔗 Blob URL created:", blobUrl);

                        // SET VIDEO INFO IMMEDIATELY - don't wait for validation
                        console.log("[VIDEOPREVIEW] ✅ Setting video info immediately");
                        setVideoInfo({
                            ...parsed,
                            previewUrl: blobUrl,
                        });
                        videoNameRef.current = parsed.videoName || "";
                        setVideoError(null);

                        // Validate asynchronously WITHOUT blocking display
                        const testVideo = document.createElement('video');
                        testVideo.preload = 'metadata';
                        testVideo.onloadedmetadata = () => {
                            console.log("[VIDEOPREVIEW] ✅ Video validated - Duration:", testVideo.duration, "seconds");
                        };
                        testVideo.onerror = (e) => {
                            console.error("[VIDEOPREVIEW] ⚠️ Video validation failed (but will try to play):", e);
                            if (latestVideo instanceof Blob) {
                                console.error("[VIDEOPREVIEW] Blob details - Size:", latestVideo.size, "Type:", latestVideo.type);
                            }
                        };
                        testVideo.src = blobUrl;
                    } else if (latestVideo && latestVideo.blob) {
                        // Handle the old object format from getLatestVideoFromIndexedDB
                        // Validate blob
                        if (latestVideo.blob.size === 0) {
                            console.error("[VIDEOPREVIEW] ❌ Blob is empty");
                            setVideoError("Video file is empty");
                            return;
                        }

                        // Check if it's a valid video type
                        const validTypes = ["video/mp4", "video/webm", "video/quicktime", "video/x-m4v"];
                        if (!validTypes.includes(latestVideo.blob.type) && latestVideo.blob.type !== "") {
                            console.warn("[VIDEOPREVIEW] ⚠️ Unexpected blob type:", latestVideo.blob.type);
                        }

                        console.log("[VIDEOPREVIEW] ✅ Creating blob URL from IndexedDB data");
                        const blobUrl = URL.createObjectURL(latestVideo.blob);
                        console.log("[VIDEOPREVIEW] 🔗 Blob URL created:", blobUrl);

                        // SET VIDEO INFO IMMEDIATELY - don't wait for validation
                        console.log("[VIDEOPREVIEW] ✅ Setting video info immediately");
                        setVideoInfo({
                            ...parsed,
                            previewUrl: blobUrl,
                        });
                        videoNameRef.current = latestVideo.videoName;
                        setVideoError(null);

                        // Validate asynchronously WITHOUT blocking display
                        const testVideo = document.createElement('video');
                        testVideo.preload = 'metadata';
                        testVideo.onloadedmetadata = () => {
                            console.log("[VIDEOPREVIEW] ✅ Video validated - Duration:", testVideo.duration, "seconds");
                        };
                        testVideo.onerror = (e) => {
                            console.error("[VIDEOPREVIEW] ⚠️ Video validation failed (but will try to play):", e);
                            if ('blob' in latestVideo) {
                                console.error("[VIDEOPREVIEW] Blob details - Size:", latestVideo.blob.size, "Type:", latestVideo.blob.type);
                            }
                        };
                        testVideo.src = blobUrl;
                    } else {
                        // Fallback to sessionStorage
                        console.log("[VIDEOPREVIEW] ⚠️ No video in IndexedDB, using sessionStorage:", parsed.name);
                        setVideoInfo(parsed);
                    }
                } catch (error) {
                    console.error("Failed to parse video info:", error);
                }
            }
        };

        loadVideo();
    }, []);

    const handleVideoLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        console.error("Video error:", video.error);

        let errorMessage = "Failed to load video";
        if (video.error) {
            switch (video.error.code) {
                case 1:
                    errorMessage = "Video loading was aborted";
                    break;
                case 2:
                    errorMessage = "Network error while loading video";
                    break;
                case 3:
                    errorMessage = "Video decoding failed";
                    break;
                case 4:
                    errorMessage = "Video format not supported";
                    break;
            }
        }

        setVideoError(errorMessage);
        Swal.fire({
            icon: "error",
            title: "Video Error",
            text: errorMessage + ". Please try uploading the video again.",
        });
    };

    const handleVideoDownload = useCallback(async () => {
        const videoName = videoNameRef.current;
        if (!videoName) return;

        try {
            console.log("[DOWNLOAD] 📥 Downloading processed video from server...");
            setUploadStatus("Downloading processed video...");

            const response = await axios.get(`${ServerURL}downloadVideoT`, {
                params: {
                    videoName: videoName,
                    check: "web",
                    has_paid: hasPaid ? "yes" : "no",
                },
                responseType: "blob",
            });

            if (!response.data || response.data.size === 0) {
                throw new Error("Video file is corrupted or empty");
            }

            console.log(`[DOWNLOAD] ✅ Downloaded - Size: ${(response.data.size / 1024 / 1024).toFixed(2)} MB`);

            // Determine correct MIME type
            let mimeType = "video/mp4";
            if (response.data.type) {
                mimeType = response.data.type;
            }
            console.log(`[DOWNLOAD] 🎞️ MIME type: ${mimeType}`);

            const videoBlob = new Blob([response.data], { type: mimeType });
            if (videoBlob.size === 0) {
                throw new Error("Generated video is corrupted");
            }

            // Revoke old URL if exists
            if (videoInfo?.previewUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(videoInfo.previewUrl);
            }

            console.log("[DOWNLOAD] 🔗 Creating blob URL from processed video");
            const mergedVideoUrl = URL.createObjectURL(videoBlob);

            // Update video preview with processed version
            setVideoInfo(prev => prev ? {
                ...prev,
                previewUrl: mergedVideoUrl
            } : null);

            // Store edited video in IndexedDB
            console.log("[DOWNLOAD] 💾 Storing edited video in IndexedDB");
            if (userEmail) {
                await storeVideoPreview(userEmail, videoName, videoBlob, "edited");
            }

            console.log("[DOWNLOAD] ✅ Download complete and stored!");
            setUploadStatus("");
            setIsApplyingBlur(false);
            setVideoError(null);

            // Schedule deletion
            setTimeout(() => {
                console.log("[CLEANUP] 🗑️ Scheduling cleanup in 6 hours");
                axios.get(`${ServerURL}deleteOutputVideo`, { params: { videoName } });
                axios.get(`${ServerURL}deleteSession`, { params: { videoName } });
            }, 6 * 60 * 60 * 1000);

            Swal.fire({
                icon: "success",
                title: "Success!",
                text: `Blur effect applied successfully!`,
                confirmButtonText: "Great!",
            });

        } catch (error) {
            console.error("[DOWNLOAD] ❌ Download error:", error);
            setUploadStatus("");
            setIsApplyingBlur(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to download processed video. Please try again.",
            });
        }
    }, [hasPaid, videoInfo, userEmail]);

    useEffect(() => {
        if (videoNameRef.current && progress === maxProgress && progress > 0 && !hasDownloadedRef.current) {
            hasDownloadedRef.current = true;
            handleVideoDownload();
        }
    }, [progress, maxProgress, handleVideoDownload]);

    const checkVideoStatus = (videoName: string) => {
        if (processingIntervalRef.current) {
            clearInterval(processingIntervalRef.current);
        }

        console.log(`[STATUS_CHECK] ⏱️ Starting polling for video: ${videoName}`);
        let attempts = 0;
        const maxAttempts = 600; // 600 * 3 seconds = 1800 seconds = 30 minutes
        const maxProcessingTime = 30 * 60 * 1000; // 30 minutes
        const startTime = Date.now();

        const checkStatus = async () => {
            if (Date.now() - startTime > maxProcessingTime) {
                if (processingIntervalRef.current) {
                    clearInterval(processingIntervalRef.current);
                }
                if (progress < maxProgress) {
                    console.error("[STATUS_CHECK] ❌ Processing timeout (30 minutes)");
                    setUploadStatus("Processing timeout, please try again.");
                    setIsApplyingBlur(false);
                    Swal.fire({
                        icon: "error",
                        title: "Processing Timeout",
                        text: "Video processing took too long. Please try again or contact support.",
                    });
                }
                return;
            }

            try {
                const result = await axios.get(`${ServerURL}getStatus?videoName=${videoName}`);
                const { status } = result.data;
                console.log(`[STATUS_CHECK] 🔄 Status poll - Result: ${status}`);

                if (status === "1") {
                    console.log("[STATUS_CHECK] ✅ Processing complete!");
                    setUploadStatus("Processing complete!");
                    setProgress(maxProgress);
                    if (processingIntervalRef.current) {
                        clearInterval(processingIntervalRef.current);
                    }
                } else if (status === "-1") {
                    attempts++;
                    console.warn(`[STATUS_CHECK] ⚠️ Error detected, retry attempt ${attempts}/3`);
                    if (attempts < 3) {
                        setUploadStatus(`Retrying... (${attempts}/3)`);
                    } else {
                        if (processingIntervalRef.current) {
                            clearInterval(processingIntervalRef.current);
                        }
                        console.error("[STATUS_CHECK] ❌ Max retries exceeded");
                        setIsApplyingBlur(false);
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "The uploaded video appears to be corrupted. Please try again with a different file.",
                        });
                    }
                } else {
                    attempts = 0;
                    console.log("[STATUS_CHECK] ⏳ Still processing...");
                    setUploadStatus("Processing video...");
                    setProgress((prevProgress) => Math.min(prevProgress + 10, 90));
                }
            } catch (err) {
                console.error("[STATUS_CHECK] ❌ Status check error:", err);
                if (processingIntervalRef.current) {
                    clearInterval(processingIntervalRef.current);
                }
                setIsApplyingBlur(false);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "We couldn't reach the processing server. Please try again later.",
                });
            }
        };

        processingIntervalRef.current = setInterval(checkStatus, 3000);
    };

    const mapIntensityToLevel = (intensity: number): string => {
        if (intensity < 30) return "low";
        if (intensity < 65) return "medium";
        return "high";
    };

    const handleApplyBlur = async () => {
        if (selectedIntensity === "none") {
            Swal.fire({
                icon: "info",
                title: "No Blur Selected",
                text: "Please select a blur intensity level first.",
            });
            return;
        }

        if (!videoInfo?.name && !videoNameRef.current) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Video not found. Please upload a video first.",
            });
            return;
        }

        const videoName = videoNameRef.current || videoInfo?.name;
        if (!videoName) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Video not found. Please upload a video first.",
            });
            return;
        }
        try {
            setIsApplyingBlur(true);
            setProgress(0);
            setUploadStatus("Starting blur processing...");
            hasDownloadedRef.current = false; // Reset the download flag for new blur operation
            console.log("[BLUR] 🎯 Starting blur application...");

            const intensityLevel = mapIntensityToLevel(intensityValue);
            console.log(`[BLUR] 📊 Intensity: ${intensityLevel} (${intensityValue}%) for video: ${videoName}`);

            // Get the original video blob from IndexedDB
            console.log("[BLUR] 🔍 Retrieving original video from IndexedDB...");
            let originalBlob: Blob | null = null;
            if (userEmail) {
                originalBlob = await getVideoPreview(userEmail, videoName, "original");
                if (originalBlob) {
                    console.log(`[BLUR] ✅ Found original video - Size: ${(originalBlob.size / 1024 / 1024).toFixed(2)} MB`);
                } else {
                    console.warn("[BLUR] ⚠️ Original video not found in IndexedDB");
                }
            }

            // IMPORTANT: Upload video to server if it doesn't exist there
            if (originalBlob) {
                console.log("[BLUR] 📤 Uploading video to server...");
                setUploadStatus("Uploading video to server...");
                try {
                    const formData = new FormData();
                    formData.append("file", originalBlob, videoName);
                    formData.append("check", "web");

                    await axios.post(`${ServerURL}uploadVideoV2`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        timeout: 300000, // 5 minutes
                    });
                    console.log("[BLUR] ✅ Video uploaded to server successfully");
                } catch (uploadError) {
                    console.warn("[BLUR] ⚠️ Server upload failed, continuing anyway:", uploadError);
                    // Continue anyway - server might already have it or accept it during processing
                }
            }

            console.log("[BLUR] ⏳ Processing blur effect on server...");
            setUploadStatus("Applying blur effect...");
            const processResponse = await axios.get(`${ServerURL}processVideoForBlur`, {
                params: {
                    value: intensityLevel,
                    videoName: videoName,
                    has_paid: hasPaid ? "yes" : "no",
                },
            });

            console.log("[BLUR] 📢 Blur processing initiated:", processResponse.data);
            setUploadStatus("Processing video, please wait...");
            checkVideoStatus(videoName);

        } catch (error) {
            console.error("Error applying blur:", error);
            setIsApplyingBlur(false);
            setUploadStatus("");

            const errorMessage = error instanceof Error ? error.message : "An error occurred while applying blur";
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage + ". Please try again.",
            });
        }
    };

    const handleExport = () => {
        if (videoInfo?.previewUrl) {
            const link = document.createElement("a");
            link.href = videoInfo.previewUrl;
            // Remove existing extension and add .mp4
            const nameWithoutExt = (videoInfo.name || "video").replace(/\.[^/.]+$/, "");
            link.download = `blurred_${nameWithoutExt}.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            Swal.fire({
                icon: "warning",
                title: "No Video",
                text: "No video available to export.",
            });
        }
    };

    // Enhanced direct upload flow: check cache, store metadata, prompt user, set sessionStorage flags
    const handleDirectVideoUpload = async (file: File) => {
        console.log("[DIRECT-UPLOAD] 📤 Direct upload started from filters page");

        const validTypes = ["video/mp4", "video/webm", "video/quicktime", "image/gif"];
        if (!validTypes.includes(file.type)) {
            Swal.fire({
                icon: "error",
                title: "Invalid File Type",
                text: "Please upload an MP4, WebM, MOV, or GIF file",
            });
            return;
        }

        setIsUploadingDirectly(true);
        setUploadStatus("Preparing video...");

        try {
            // Get video metadata
            const metadata = await new Promise<{ duration: string; isValid: boolean; error?: string }>((resolve) => {
                const video = document.createElement("video");
                video.onloadedmetadata = () => {
                    const minutes = Math.floor(video.duration / 60);
                    const seconds = Math.floor(video.duration % 60);
                    resolve({
                        duration: `${minutes}:${seconds.toString().padStart(2, "0")}`,
                        isValid: true,
                    });
                };
                video.onerror = () => {
                    resolve({ duration: "0:00", isValid: false, error: "Invalid video file" });
                };
                video.src = URL.createObjectURL(file);
            });

            if (!metadata.isValid) {
                Swal.fire({
                    icon: "error",
                    title: "Invalid Video",
                    text: metadata.error,
                });
                setIsUploadingDirectly(false);
                return;
            }

            // Create blob URL
            const url = URL.createObjectURL(file);
            console.log("[DIRECT-UPLOAD] 1️⃣ Created blob URL");

            // Check cache (IndexedDB) for existing video
            setUploadStatus("Checking cache...");
            const userEmailFromStorage = getEmailFromStorage();
            let cachedVideo = null;
            if (userEmailFromStorage) {
                try {
                    cachedVideo = await checkVideoInCache(userEmailFromStorage, file.name);
                } catch (e) {
                    console.warn("[DIRECT-UPLOAD] ⚠️ Cache check failed", e);
                }
            }

            if (cachedVideo) {
                // CACHE HIT: Use existing video
                console.log(`[DIRECT-UPLOAD] 🚀 CACHE HIT! Using stored: ${cachedVideo.videoName}`);

                // ✅ CRITICAL FIX: Set the videoName ref
                videoNameRef.current = cachedVideo.videoName;

                setUploadStatus("Uploading cached video to server...");
                await new Promise((resolve) => setTimeout(resolve, 1000));

                sessionStorage.setItem("uploadedVideoInfo", JSON.stringify({
                    name: file.name,
                    size: formatFileSize(file.size),
                    duration: metadata.duration,
                    previewUrl: url,
                    fileType: "video/mp4",
                    isGuest: !localStorage.getItem("token"),
                    videoName: cachedVideo.videoName,
                }));
                sessionStorage.setItem("fromChangeBg", "true");

                setVideoInfo({
                    name: file.name,
                    size: formatFileSize(file.size),
                    duration: metadata.duration,
                    previewUrl: url,
                    fileType: "video/mp4",
                    isGuest: !localStorage.getItem("token"),

                });

                setIsUploadingDirectly(false);
                setUploadStatus("");

                const result = await Swal.fire({
                    icon: "success",
                    title: "Video Loaded from Cache!",
                    text: "This video was already uploaded. Using cached version.",
                    showConfirmButton: true,
                    confirmButtonText: "Apply Filters & Effects",
                    showDenyButton: true,
                    denyButtonText: "Upload New Video",
                    confirmButtonColor: "#3b82f6",
                    denyButtonColor: "#6b7280",
                });

                if (result.isDenied) {
                    setVideoInfo(null);
                    setUploadStatus("");
                    setIsUploadingDirectly(false);
                    sessionStorage.removeItem("uploadedVideoInfo");
                    sessionStorage.removeItem("fromChangeBg");
                    videoNameRef.current = ""; // Clear the ref
                }
                return;
            }

            // CACHE MISS: Store in IndexedDB
            setUploadStatus("Storing video...");
            const timestamp = Date.now();
            const videoNameWithTimestamp = `${timestamp}__${file.name}`;

            // ✅ CRITICAL FIX: Set the videoName ref immediately
            videoNameRef.current = videoNameWithTimestamp;

            await storeVideoPreview(userEmailFromStorage, videoNameWithTimestamp, file, "original");

            setUploadStatus("Uploading to server...");
            await new Promise((resolve) => setTimeout(resolve, 1000));

            sessionStorage.setItem("uploadedVideoInfo", JSON.stringify({
                name: file.name,
                size: formatFileSize(file.size),
                duration: metadata.duration,
                previewUrl: url,
                fileType: "video/mp4",
                isGuest: !localStorage.getItem("token"),
                videoName: videoNameWithTimestamp,
            }));
            sessionStorage.setItem("fromChangeBg", "true");

            setVideoInfo({
                name: file.name,
                size: formatFileSize(file.size),
                duration: metadata.duration,
                previewUrl: url,
                fileType: "video/mp4",
                isGuest: !localStorage.getItem("token"),
                videoName: videoNameWithTimestamp,
            });

            setIsUploadingDirectly(false);
            setUploadStatus("");

            const result = await Swal.fire({
                icon: "success",
                title: "Upload Complete!",
                text: "Your video has been uploaded successfully.",
                showConfirmButton: true,
                confirmButtonText: "Apply Filters & Effects",
                showDenyButton: true,
                denyButtonText: "Upload New Video",
                confirmButtonColor: "#3b82f6",
                denyButtonColor: "#6b7280",
            });

            if (result.isDenied) {
                setVideoInfo(null);
                setUploadStatus("");
                setIsUploadingDirectly(false);
                sessionStorage.removeItem("uploadedVideoInfo");
                sessionStorage.removeItem("fromChangeBg");
                videoNameRef.current = ""; // Clear the ref
            }

        } catch (error) {
            console.error("[DIRECT-UPLOAD] ❌ Error:", error);
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: "Failed to upload video. Please try again.",
            });
            setIsUploadingDirectly(false);
            videoNameRef.current = ""; // Clear the ref on error
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleDirectVideoUpload(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleDirectVideoUpload(file);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
    };

    const minutes = Math.floor(currentTime / 60);
    const seconds = (currentTime % 60).toString().padStart(2, "0");
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = (duration % 60).toString().padStart(2, "0");

    return (
        <div className="space-y-4 ml-0 lg:ml-24">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600 to-purple-900 border border-gray-700">
                {videoInfo ? (
                    <>
                        <video
                            ref={videoRef}
                            src={videoInfo.previewUrl}
                            className="w-full h-full object-cover"
                            onLoadedMetadata={handleVideoLoadedMetadata}
                            onTimeUpdate={handleTimeUpdate}
                            muted={isMuted}
                            playsInline
                        />
                        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                    </>
                ) : (
                    <div
                        className={`absolute inset-0 rounded-2xl flex items-center justify-center cursor-pointer transition-all ${isDragging
                            ? "bg-blue-500/20 border-2 border-blue-400"
                            : "bg-gradient-to-br from-purple-600/30 to-purple-900/30 border-2 border-dashed border-purple-400/50 hover:border-purple-400 hover:bg-purple-500/20"
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="video/mp4,video/webm,video/quicktime,image/gif"
                            className="hidden"
                            onChange={handleFileInput}
                            disabled={isUploadingDirectly}
                        />

                        <div className="relative z-10 text-center text-white">
                            {videoError ? (
                                <>
                                    <p className="text-lg font-semibold text-red-300">{videoError}</p>
                                    <p className="text-sm mt-2">Try uploading again</p>
                                </>
                            ) : isUploadingDirectly ? (
                                <>
                                    <div className="flex justify-center mb-4">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                                    </div>
                                    <p className="text-lg font-semibold">{uploadStatus || "Uploading..."}</p>
                                </>
                            ) : (
                                <>
                                    <FiUploadCloud className="w-16 h-16 mx-auto mb-4 text-purple-300" />
                                    <p className="text-xl font-bold tracking-tight">Upload Video</p>
                                    <p className="text-sm mt-3 opacity-95">Drag & drop your video here or click to browse</p>
                                    <p className="text-xs mt-2 opacity-75 font-medium">Supported formats: MP4, WebM, MOV, GIF</p>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <button className="absolute top-4 left-4 w-8 h-8 rounded-full border border-gray-300 text-white flex items-center justify-center hover:bg-white hover:text-purple-600 transition">
                    <FiHelpCircle className="w-5 h-5" />
                </button>

                <button className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition">
                    <FiUpload className="w-4 h-4" />
                    <span className="text-sm font-medium">Export</span>
                </button>

                <button
                    onClick={() => {
                        if (videoRef.current) {
                            if (isPlaying) {
                                videoRef.current.pause();
                            } else {
                                videoRef.current.play();
                            }
                            setIsPlaying(!isPlaying);
                        }
                    }}
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-opacity-10 bg-black backdrop-blur hover:bg-opacity-30 transition flex items-center justify-center"
                >
                    {isPlaying ? (
                        <FiPause className="w-6 h-6 text-white" />
                    ) : (
                        <FiPlay className="w-6 h-6 text-white ml-1" />
                    )}
                </button>

                {videoInfo && (
                    <div className="absolute bottom-4 left-4 text-white text-sm">
                        <p className="font-medium truncate">{videoInfo.name}</p>
                        <p className="text-gray-300 text-xs">{videoInfo.size} • {videoInfo.duration}</p>
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm">
                            {minutes}:{seconds} / {totalMinutes}:{totalSeconds}
                        </span>
                        <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-800 rounded-full text-white text-sm hover:bg-gray-700 transition">
                            <span>Custom Position</span>
                        </button>
                        <FiMaximize className="w-5 h-5 text-white" />
                    </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={(e) => handleProgressChange(Number(e.target.value))}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />

                    {/* Frames Timeline */}
                    <div className="flex items-end gap-0.5 h-12 bg-gray-900 rounded-lg p-2 overflow-x-auto">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div
                                key={i}
                                className={`flex-shrink-0 h-full rounded-sm ${duration > 0 && i < (currentTime / duration) * 40
                                    ? "bg-gray-600"
                                    : "bg-gray-700"
                                    } cursor-pointer hover:bg-gray-500 transition`}
                                style={{ width: "24px" }}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Control Bar */}
                <div className="flex items-center justify-between px-2 py-2 bg-gray-900 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="text-gray-400 hover:text-white transition"
                        >
                            {isMuted ? (
                                <FiVolumeX className="w-5 h-5" />
                            ) : (
                                <FiVolume2 className="w-5 h-5" />
                            )}
                        </button>
                        <div className="w-24 h-1 bg-gray-700 rounded-full cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
}
