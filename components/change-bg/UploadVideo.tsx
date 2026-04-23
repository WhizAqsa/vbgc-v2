"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiUploadCloud } from "react-icons/fi";
import Image from "next/image";
import Swal from "sweetalert2";
import { storeVideoPreview, checkVideoInCache } from "@/lib/indexeddb-utils";

interface VideoInfo {
    name: string;
    size: string;
    duration: string;
}

export function UploadVideo() {
    const router = useRouter();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [videoInfo, setVideoInfo] = useState<VideoInfo>({
        name: "",
        size: "",
        duration: "",
    });
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Get user email from localStorage
    const getEmailFromStorage = useCallback(() => {
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
    }, []);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // Format file size
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    // Get video metadata
    const getVideoMetadata = (file: File): Promise<{ duration: string; isValid: boolean; error?: string }> => {
        return new Promise((resolve) => {
            const allowedTypes = ["video/mp4", "video/x-m4v", "video/webm", "video/quicktime", "image/gif"];

            if (!allowedTypes.includes(file.type)) {
                resolve({
                    duration: "0:00",
                    isValid: false,
                    error: "Please upload a supported file (.mp4, .webm, .mov, or .gif)",
                });
                return;
            }

            if (file.type === "image/gif") {
                resolve({
                    duration: "0:01",
                    isValid: true,
                });
                return;
            }

            const videoElement = document.createElement("video");
            videoElement.preload = "metadata";

            videoElement.onloadedmetadata = () => {
                const durationInSeconds = videoElement.duration;

                // Check duration limit (free users: 20 seconds)
                if (durationInSeconds > 20) {
                    resolve({
                        duration: "0:00",
                        isValid: false,
                        error: "Video duration exceeds 20 seconds. Please upload a shorter video or upgrade to premium.",
                    });
                    return;
                }

                const minutes = Math.floor(durationInSeconds / 60);
                const seconds = Math.floor(durationInSeconds % 60);
                const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

                resolve({
                    duration,
                    isValid: true,
                });
            };

            videoElement.onerror = () => {
                resolve({
                    duration: "0:00",
                    isValid: false,
                    error: "Error reading video file. Please try another file.",
                });
            };

            videoElement.src = URL.createObjectURL(file);
        });
    };

    const prepareVideoForUpload = async (file: File): Promise<File> => {
        console.log("Video prepared for upload:", file.name);
        return file;
    };

    const uploadFileToServer = async (): Promise<boolean> => {
        console.log("[UPLOAD] ⏳ Starting server upload simulation...");
        return new Promise((resolve) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(progress);
                if (progress >= 50) {
                    console.log(`[UPLOAD] 📊 Progress: ${progress}%`);
                }
                if (progress >= 100) {
                    console.log("[UPLOAD] ✅ Server upload complete!");
                    clearInterval(interval);
                    resolve(true);
                }
            }, 200);
        });
    };

    const resetUploadState = useCallback(() => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setVideoInfo({ name: "", size: "", duration: "" });
        setUploadProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [previewUrl]);

    const storeVideoInIndexedDB = useCallback(async (file: File | Blob, videoName: string) => {
        try {
            const userEmail = getEmailFromStorage();
            if (!userEmail) {
                console.warn("[INDEXEDDB] ⚠️  No user email found, skipping storage");
                return;
            }

            console.log(`[INDEXEDDB] 💾 Storing video: ${videoName}`);
            console.log(`[INDEXEDDB] 📦 File size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

            const blob = file instanceof File ? file : file as Blob;
            await storeVideoPreview(userEmail, videoName, blob, "original");

            console.log(`[INDEXEDDB] ✅ Successfully stored: ${videoName}`);
            console.log(`[INDEXEDDB] 🔑 Key: [${userEmail}, ${videoName}, original]`);
        } catch (error) {
            console.error("[INDEXEDDB] ❌ Failed to store video:", error);
        }
    }, [getEmailFromStorage]);

    const handleFile = useCallback(async (file: File) => {

        const validTypes = ["video/mp4", "video/webm", "video/quicktime", "image/gif"];

        if (!validTypes.includes(file.type)) {
            Swal.fire({
                icon: "error",
                title: "Invalid File Type",
                text: "Please upload an MP4, WebM, MOV, or GIF file",
                timer: 1500,
                showConfirmButton: false,
            });
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        const metadata = await getVideoMetadata(file);

        if (!metadata.isValid) {
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: metadata.error,
                timer: 2000,
                showConfirmButton: false,
            });
            setIsUploading(false);
            return;
        }

        // Set video info
        setVideoInfo({
            name: file.name,
            size: formatFileSize(file.size),
            duration: metadata.duration,
        });

        // Prepare video for upload
        let uploadFile = file;
        try {
            uploadFile = await prepareVideoForUpload(file);
        } catch (error) {
            console.warn("Could not prepare video, using original", error);
        }

        // Create preview URL
        const url = URL.createObjectURL(uploadFile);
        setPreviewUrl(url);

        console.log("[FLOW] 1️⃣  Created blob URL for preview display");

        // ⭐ CHECK CACHE FIRST - Is this video already stored?
        console.log("[FLOW] 1.5️⃣  Checking if video already cached...");
        const userEmail = getEmailFromStorage();
        const cachedVideo = await checkVideoInCache(userEmail, file.name);

        if (cachedVideo) {
            // ✅ CACHE HIT - Use existing video, skip upload
            console.log(`[FLOW] 🚀 CACHE HIT! Skipping upload, using stored: ${cachedVideo.videoName}`);
            setIsUploading(false);

            sessionStorage.setItem("uploadedVideoInfo", JSON.stringify({
                name: file.name,
                size: formatFileSize(uploadFile.size),
                duration: metadata.duration,
                previewUrl: url,
                fileType: "video/mp4",
                isGuest: !localStorage.getItem("token"),
            }));
            sessionStorage.setItem("fromChangeBg", "true");

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

            if (result.isConfirmed) {
                router.push("/filters-and-effects");
            } else if (result.isDenied) {
                resetUploadState();
                setIsUploading(false);
            }
            return;
        }

        // ❌ CACHE MISS - Upload as new video
        console.log(`[FLOW] 📤 NEW UPLOAD - Not found in cache, proceeding with upload`);

        // Step 2: Store in IndexedDB FIRST (before server upload)
        const timestamp = Date.now();
        const videoNameWithTimestamp = `${timestamp}__${file.name}`;
        console.log(`[FLOW] 2️⃣  Storing video in IndexedDB with name: ${videoNameWithTimestamp}`);

        try {
            await storeVideoInIndexedDB(uploadFile, videoNameWithTimestamp);
        } catch (error) {
            console.error("[FLOW] ❌ IndexedDB storage failed:", error);
        }

        // Step 3: Upload to server
        console.log("[FLOW] 3️⃣  Uploading to server...");
        const uploadSuccess = await uploadFileToServer();

        if (uploadSuccess) {
            console.log("[FLOW] ✅ Server upload complete!");
            setIsUploading(false);

            // Step 4: Store metadata in sessionStorage for easy access
            console.log("[FLOW] 4️⃣  Storing metadata in sessionStorage");
            sessionStorage.setItem("uploadedVideoInfo", JSON.stringify({
                name: file.name,
                size: formatFileSize(uploadFile.size),
                duration: metadata.duration,
                previewUrl: url,
                fileType: "video/mp4",
                isGuest: !localStorage.getItem("token"),
            }));
            sessionStorage.setItem("fromChangeBg", "true");

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

            if (result.isConfirmed) {
                router.push("/filters-and-effects");
            } else if (result.isDenied) {
                resetUploadState();
                setIsUploading(false);
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: "There was an error uploading your video. Please try again.",
                timer: 2000,
                showConfirmButton: false,
            });
            setIsUploading(false);
        }
    }, [router, resetUploadState, getEmailFromStorage, storeVideoInIndexedDB]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleUnlock = () => {
        router.push("/pricing");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-800 via-slate-950 to-black py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden">
                <div className="relative mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
                        <div className="flex flex-col justify-start">
                            <div className="text-left mb-4 sm:mb-6 md:mb-8 mt-0 sm:mt-6 lg:mt-12">
                                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                                    Video Background <br className="hidden sm:block" /> Changer
                                </h1>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 sm:mt-4 text-white tracking-tight max-w-md">
                                    Instantly remove your video backgrounds using AI
                                </p>
                            </div>

                            <div className="relative w-full h-40 sm:h-56 md:h-72 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden bg-black">
                                <div className="relative rounded-lg sm:rounded-xl overflow-hidden mb-0 flex-shrink-0">
                                    <Image
                                        src="https://picsum.photos/300/400?random=10"
                                        alt="Sample Video"
                                        width={300}
                                        height={400}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 mt-0 lg:mt-24 lg:ml-12">
                            <div
                                className={`relative border-2 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 lg:p-20 text-center transition-all duration-300 cursor-pointer shadow-2xl min-h-40 sm:min-h-48 md:min-h-56 w-full
                  ${isDragging
                                        ? "border-blue-500 bg-blue-900/30"
                                        : "border-gray-500 bg-zinc-800 hover:border-gray-400 hover:shadow-3xl"
                                    }`}
                                onClick={() => !isUploading && fileInputRef.current?.click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="video/mp4,video/webm,video/quicktime,image/gif"
                                    className="hidden"
                                    onChange={handleFileInput}
                                    disabled={isUploading}
                                />

                                {isUploading ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                        </div>
                                        <p className="text-base sm:text-lg font-medium text-gray-300">
                                            Uploading...
                                        </p>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                        <p className="text-sm text-gray-400">{uploadProgress}%</p>
                                    </div>
                                ) : previewUrl ? (
                                    <div className="space-y-3 sm:space-y-4">
                                        <video
                                            src={previewUrl}
                                            className="w-full max-h-48 object-contain rounded-lg"
                                            controls
                                            autoPlay={false}
                                            loop
                                        />
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-300 truncate">{videoInfo.name}</p>
                                            <p className="text-xs text-gray-400">
                                                {videoInfo.size} • {videoInfo.duration}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <FiUploadCloud className="w-10 h-10 sm:w-14 md:w-16 lg:h-16 mx-auto text-gray-300 mb-2 sm:mb-3 md:mb-4" />
                                        <p className="text-base sm:text-lg md:text-xl font-medium text-gray-300">
                                            {isDragging ? "Drop your video here" : "Click or Drag & Drop to Upload"}
                                        </p>
                                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">
                                            Supported formats: .mp4, .webm, .mov, .gif
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Max duration: 20 seconds (Free tier)
                                        </p>
                                    </>
                                )}
                            </div>

                            <div className="border border-gray-500 bg-gradient-to-b from-slate-850 to-cyan-700 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 shadow-2xl w-full">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6">
                                    <div className="flex-1">
                                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white tracking-tight">
                                            Unlock more formats for less!
                                        </h3>
                                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm md:text-base text-gray-300 tracking-tight">
                                            No need to convert manually, we got you covered.
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleUnlock}
                                        className="flex-shrink-0 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-900 bg-white rounded-lg sm:rounded-xl hover:bg-gray-100 transition duration-200 shadow-lg"
                                    >
                                        Unlock now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );

}