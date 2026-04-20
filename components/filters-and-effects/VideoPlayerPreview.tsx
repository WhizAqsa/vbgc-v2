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
import Image from "next/image";
import { getLatestVideoFromIndexedDB } from "@/lib/indexeddb-utils";

interface UploadedVideoInfo {
    name: string;
    size: string;
    duration: string;
    previewUrl: string;
    fileType: string;
    isGuest: boolean;
}

export function VideoPlayerPreview() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [videoInfo, setVideoInfo] = useState<UploadedVideoInfo | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const loadVideo = async () => {
            const storedData = sessionStorage.getItem("uploadedVideoInfo");
            if (storedData) {
                try {
                    const parsed = JSON.parse(storedData);
                    
                    try {
                        const latestVideo = await getLatestVideoFromIndexedDB();
                        if (latestVideo) {
                            const blobUrl = URL.createObjectURL(latestVideo.blob);
                            setVideoInfo({
                                ...parsed,
                                previewUrl: blobUrl,
                            });
                            console.log("Video loaded from IndexedDB:", latestVideo.videoName);
                        } else {
                            setVideoInfo(parsed);
                            console.log("Video loaded from sessionStorage");
                        }
                    } catch (idbError) {
                        console.error("Failed to load from IndexedDB:", idbError);
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
        setDuration(Math.floor(video.duration));
    };

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        setCurrentTime(Math.floor(e.currentTarget.currentTime));
    };

    const handleProgressChange = (newTime: number) => {
        setCurrentTime(newTime);
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
                    <div className="absolute inset-0 bg-purple-500 opacity-80 flex items-center justify-center">
                        <Image
                            src="https://picsum.photos/1280/720?random=preview"
                            alt="Video Preview"
                            fill
                            className="object-cover"
                        />
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
