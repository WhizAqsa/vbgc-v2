"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
    FiPlay,
    FiPause,
    FiVolume2,
    FiVolumeX,
    FiHelpCircle,
    FiUpload,
    FiUploadCloud,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { getLatestVideoFromIndexedDB, storeVideoPreview, getVideoPreview, checkVideoInCache } from "@/lib/indexeddb-utils";
import axios from "axios";

const ServerURL = process.env.NEXT_PUBLIC_SERVER_API || "https://vbgcweb.videobackgroundchanger.com/";

interface UploadedVideoInfo {
    name: string;
    size: string;
    duration: string;
    previewUrl: string;
    fileType: string;
    isGuest: boolean;
}

interface VideoPlayerPreviewProps {
    selectedIntensity: string;
    intensityValue: number;
}

export function VideoPlayerPreview({
    selectedIntensity,
    intensityValue,
}: VideoPlayerPreviewProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [videoInfo, setVideoInfo] = useState<UploadedVideoInfo | null>(null);
    const [isApplyingBlur, setIsApplyingBlur] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");
    const [progress, setProgress] = useState(0);
    const [maxProgress, setMaxProgress] = useState(100);
    const [hasPaid, setHasPaid] = useState(true);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [videoError, setVideoError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploadingDirectly, setIsUploadingDirectly] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const processingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const videoNameRef = useRef<string>("");

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

    useEffect(() => {
        const loadVideo = async () => {
            try {
                console.log("[VIDEOPREVIEW] 🎬 Loading video preview...");
                const fromChangeBg = sessionStorage.getItem("fromChangeBg");
                const storedData = sessionStorage.getItem("uploadedVideoInfo");

                console.log("[VIDEOPREVIEW] 🚩 fromChangeBg flag:", fromChangeBg);
                console.log("[VIDEOPREVIEW] 📊 storedData from sessionStorage:", storedData ? "EXISTS" : "NONE");

                // Only load video if coming from /change-bg route
                if (storedData && fromChangeBg === "true") {
                    console.log("[VIDEOPREVIEW] ✅ ROUTE: /change-bg → Loading stored video");
                    const parsed = JSON.parse(storedData);
                    console.log("[VIDEOPREVIEW] 📋 Metadata from sessionStorage:", parsed);

                    // Try to get video from IndexedDB first
                    console.log("[VIDEOPREVIEW] 🔍 Fetching from IndexedDB...");
                    const latestVideo = await getLatestVideoFromIndexedDB();
                    console.log("[VIDEOPREVIEW] Retrieved video from IndexedDB:", latestVideo ? `${latestVideo.videoName} (${latestVideo.blob.size} bytes, type: ${latestVideo.blob.type})` : "null");

                    if (latestVideo && latestVideo.blob) {
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

                        // Test if blob is valid by creating a temporary video element
                        const testVideo = document.createElement('video');
                        testVideo.preload = 'metadata';
                        testVideo.onloadedmetadata = () => {
                            console.log("[VIDEOPREVIEW] ✅ Video validated - Duration:", testVideo.duration, "seconds");
                            setVideoInfo({
                                ...parsed,
                                previewUrl: blobUrl,
                            });
                            videoNameRef.current = latestVideo.videoName;
                            setVideoError(null);
                        };
                        testVideo.onerror = (e) => {
                            console.error("[VIDEOPREVIEW] ❌ Video validation failed:", e);
                            console.error("[VIDEOPREVIEW] Blob details - Size:", latestVideo.blob.size, "Type:", latestVideo.blob.type);
                            URL.revokeObjectURL(blobUrl);
                            setVideoError("Video file is corrupted or invalid");
                            // Fallback to sessionStorage data
                            if (parsed.previewUrl) {
                                console.log("[VIDEOPREVIEW] 🔄 Falling back to sessionStorage video");
                                setVideoInfo(parsed);
                            }
                        };
                        testVideo.src = blobUrl;
                    } else {
                        // Fallback to sessionStorage
                        console.log("[VIDEOPREVIEW] ⚠️ No video in IndexedDB, using sessionStorage:", parsed.name);
                        setVideoInfo(parsed);
                    }
                } else {
                    console.log("[VIDEOPREVIEW] 📤 ROUTE: Direct navigation to /filters-and-effects");
                    console.log("[VIDEOPREVIEW] 🧹 Clearing stale sessionStorage data");
                    // Direct navigation - clear any stale data
                    sessionStorage.removeItem("uploadedVideoInfo");
                    sessionStorage.removeItem("fromChangeBg");
                    setVideoInfo(null);
                    setVideoError(null);
                    console.log("[VIDEOPREVIEW] ✅ Ready for direct upload");
                }
            } catch (error) {
                console.error("[VIDEOPREVIEW] ❌ Failed to load video:", error);
                setVideoError("Failed to load video");
            }
        };

        loadVideo();

        return () => {
            if (processingIntervalRef.current) {
                clearInterval(processingIntervalRef.current);
            }
            if (videoInfo?.previewUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(videoInfo.previewUrl);
            }
        };
    }, []);

    // Handle video element errors
    const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
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
        if (videoNameRef.current && progress === maxProgress && progress > 0) {
            handleVideoDownload();
        }
    }, [progress, maxProgress, handleVideoDownload]);

    const checkVideoStatus = (videoName: string) => {
        if (processingIntervalRef.current) {
            clearInterval(processingIntervalRef.current);
        }

        console.log(`[STATUS_CHECK] ⏱️ Starting polling for video: ${videoName}`);
        let attempts = 0;
        const maxAttempts = 120;
        const maxProcessingTime = 120 * 60 * 1000;
        const startTime = Date.now();

        const checkStatus = async () => {
            if (Date.now() - startTime > maxProcessingTime) {
                if (processingIntervalRef.current) {
                    clearInterval(processingIntervalRef.current);
                }
                if (progress < maxProgress) {
                    console.error("[STATUS_CHECK] ❌ Processing timeout (2 hours)");
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
        if (!videoName) return;

        try {
            setIsApplyingBlur(true);
            setProgress(0);
            setUploadStatus("Starting blur processing...");
            console.log("[BLUR] 🎯 Starting blur application...");

            const intensityLevel = mapIntensityToLevel(intensityValue);
            console.log(`[BLUR] 📊 Intensity: ${intensityLevel} (${intensityValue}%) for video: ${videoName}`);

            // Get the original video blob from IndexedDB
            console.log("[BLUR] 🔍 Retrieving original video from IndexedDB...");
            if (userEmail) {
                const originalBlob = await getVideoPreview(userEmail, videoName, "original");
                if (originalBlob) {
                    console.log(`[BLUR] ✅ Found original video - Size: ${(originalBlob.size / 1024 / 1024).toFixed(2)} MB`);
                } else {
                    console.warn("[BLUR] ⚠️ Original video not found in IndexedDB");
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
            console.log("[DIRECT-UPLOAD] 1️⃣  Created blob URL");

            // Check cache
            console.log("[DIRECT-UPLOAD] 1.5️⃣  Checking cache...");
            const userEmailFromStorage = getEmailFromStorage();
            const cachedVideo = await checkVideoInCache(userEmailFromStorage, file.name);

            if (cachedVideo) {
                console.log("[DIRECT-UPLOAD] ✅ CACHE HIT!");
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
                return;
            }

            // Store in IndexedDB
            console.log("[DIRECT-UPLOAD] 2️⃣  Storing in IndexedDB...");
            setUploadStatus("Storing video...");

            const timestamp = Date.now();
            const videoNameWithTimestamp = `${timestamp}__${file.name}`;
            await storeVideoPreview(userEmailFromStorage, videoNameWithTimestamp, file, "original");

            // Store metadata
            sessionStorage.setItem("uploadedVideoInfo", JSON.stringify({
                name: file.name,
                size: formatFileSize(file.size),
                duration: metadata.duration,
                previewUrl: url,
                fileType: "video/mp4",
                isGuest: !localStorage.getItem("token"),
            }));

            console.log("[DIRECT-UPLOAD] ✅ Upload complete!");
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
        } catch (error) {
            console.error("[DIRECT-UPLOAD] ❌ Error:", error);
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: "Failed to upload video. Please try again.",
            });
            setIsUploadingDirectly(false);
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
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(err => {
                    console.error("Play failed:", err);
                    Swal.fire({
                        icon: "error",
                        title: "Playback Error",
                        text: "Cannot play video. The file may be corrupted.",
                    });
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const minutes = Math.floor(currentTime / 60);
    const seconds = (currentTime % 60).toString().padStart(2, "0");
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = (duration % 60).toString().padStart(2, "0");

    const getIntensityLabel = () => {
        const labels: Record<string, string> = {
            none: "None",
            low: "Low",
            medium: "Medium",
            high: "High",
            custom: `Custom (${intensityValue}%)`,
        };
        return labels[selectedIntensity] || "Unknown";
    };

    return (
        <div className="space-y-4 ml-0 lg:ml-24">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600 to-purple-900 border border-gray-700">
                {videoInfo && videoInfo.previewUrl && !videoError ? (
                    <video
                        ref={videoRef}
                        key={videoInfo.previewUrl}
                        className="w-full h-full object-cover"
                        onLoadedMetadata={(e) => {
                            const video = e.currentTarget;
                            setDuration(Math.floor(video.duration));
                            console.log("Video loaded, duration:", video.duration);
                        }}
                        onTimeUpdate={(e) => setCurrentTime(Math.floor(e.currentTarget.currentTime))}
                        onError={handleVideoError}
                        muted={isMuted}
                        playsInline
                        controls={false}
                    >
                        <source src={videoInfo.previewUrl} type="video/mp4" />
                        <source src={videoInfo.previewUrl} type="video/webm" />
                        <source src={videoInfo.previewUrl} type="video/quicktime" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div
                        className={`absolute inset-0 rounded-2xl flex items-center justify-center cursor-pointer transition-all ${isDragging
                            ? "bg-blue-500/20 border-2 border-blue-400"
                            : "bg-purple-500 opacity-80 border-0"
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
                                    <FiUploadCloud className="w-16 h-16 mx-auto mb-4" />
                                    <p className="text-lg font-semibold">Upload Video</p>
                                    <p className="text-sm mt-2 opacity-90">Drag & drop or click to select</p>
                                    <p className="text-xs mt-1 opacity-75">MP4, WebM, MOV, or GIF</p>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <button className="absolute top-4 left-4 w-8 h-8 rounded-full border border-gray-300 text-white flex items-center justify-center hover:bg-white hover:text-purple-600 transition">
                    <FiHelpCircle className="w-5 h-5" />
                </button>

                <button
                    onClick={handleExport}
                    className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition"
                >
                    <FiUpload className="w-4 h-4" />
                    <span className="text-sm font-medium">Export</span>
                </button>

                {videoInfo && !videoError && (
                    <button
                        onClick={togglePlayPause}
                        className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur hover:bg-black/70 transition flex items-center justify-center"
                    >
                        {isPlaying ? (
                            <FiPause className="w-6 h-6 text-white" />
                        ) : (
                            <FiPlay className="w-6 h-6 text-white ml-1" />
                        )}
                    </button>
                )}

                {videoInfo && !videoError && (
                    <div className="absolute bottom-4 left-4 text-white text-sm">
                        <p className="font-medium truncate">{videoInfo.name}</p>
                        <p className="text-gray-300 text-xs">
                            {videoInfo.size} • {videoInfo.duration}
                        </p>
                    </div>
                )}
            </div>

            {/* Rest of the component remains the same... */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                        {minutes}:{seconds} / {totalMinutes}:{totalSeconds}
                    </span>
                </div>

                <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => {
                        const newTime = Number(e.target.value);
                        setCurrentTime(newTime);
                        if (videoRef.current) videoRef.current.currentTime = newTime;
                    }}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    disabled={!duration}
                />

                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-xs text-gray-400 mb-1">Current Blur Intensity</p>
                            <p className="text-sm font-semibold text-purple-400">{getIntensityLabel()}</p>
                            {uploadStatus && (
                                <div className="mt-2">
                                    <p className="text-xs text-purple-300">{uploadStatus}</p>
                                    {isApplyingBlur && progress > 0 && progress < maxProgress && (
                                        <div className="mt-1 w-full bg-gray-700 rounded-full h-1">
                                            <div
                                                className="bg-purple-600 h-1 rounded-full transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleApplyBlur}
                            disabled={isApplyingBlur || selectedIntensity === "none" || !videoInfo || !!videoError}
                            className={`ml-4 px-6 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${isApplyingBlur || selectedIntensity === "none" || !videoInfo || videoError
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                : "bg-purple-600 text-white hover:bg-purple-700 active:scale-95"
                                }`}
                        >
                            {isApplyingBlur ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                "Apply Blur"
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-2 py-2 bg-gray-900 rounded-lg border border-gray-700">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-gray-400 hover:text-white transition"
                    >
                        {isMuted ? <FiVolumeX className="w-5 h-5" /> : <FiVolume2 className="w-5 h-5" />}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="100"
                        className="w-24 h-1 bg-gray-700 rounded-lg cursor-pointer accent-purple-500"
                        onChange={(e) => {
                            if (videoRef.current) videoRef.current.volume = Number(e.target.value) / 100;
                        }}
                    />
                    {videoInfo && !videoError && (
                        <div className="text-xs text-gray-500 ml-auto">
                            {isApplyingBlur ? "Processing..." : "Ready"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );


}