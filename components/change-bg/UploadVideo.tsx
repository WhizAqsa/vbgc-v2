// components/change-bg/UploadVideo.tsx
"use client";

import { useState, useCallback, useRef } from "react";
import {
    CloudUpload,

    Lock,
    Unlock,
} from "lucide-react";
import Image from "next/image";

export function UploadVideo() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback((file: File) => {
        const validTypes = ["video/mp4", "video/webm", "video/quicktime", "image/gif"];
        if (validTypes.includes(file.type)) {
            setUploadedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            alert("Please upload an MP4, WebM, MOV, or GIF file");
        }
    }, []);




    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    }, [handleFile]);



    const handleUnlock = () => {
        alert("Upgrade to unlock more formats! (Demo)");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-800 via-slate-950 to-black py-16 px-4">
            <div className="relative overflow-hidden">
                <div className="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        <div className="flex flex-col justify-start">
                            <div className="text-left mb-8 mt-12">
                                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white">
                                    Video Background <br /> Changer
                                </h1>
                                <p className="text-lg md:text-xl mt-4 text-white tracking-tight max-w-md">
                                    Instantly remove your video backgrounds using AI
                                </p>
                            </div>

                            <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden bg-black">
                                <div className="relative rounded-xl overflow-hidden mb-4 flex-shrink-0">
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

                        <div className="flex flex-col gap-6 mt-24 ml-12">

                            {/* Upload Area */}
                            <div
                                className={`relative border border-gray-500 bg-zinc-800 rounded-3xl p-20 text-center transition-all duration-300 cursor-pointer shadow-2xl hover:border-gray-500 hover:shadow-3xl min-h-44 w-full`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="video/mp4,video/webm,video/quicktime,image/gif"
                                    className="hidden"
                                    onChange={handleFileInput}
                                />

                                {previewUrl ? (
                                    <div className="space-y-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setUploadedFile(null);
                                                setPreviewUrl(null);
                                            }}
                                            className="text-sm text-purple-300 hover:text-white transition"
                                        >
                                            Remove & upload new
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <CloudUpload className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                        <p className="text-xl font-medium text-gray-300">
                                            Click or Drag & Drop to Upload
                                        </p>
                                        <p className="mt-2 text-sm text-gray-300">
                                            Supported formats:   .mp4, .webm, .mov, .gif
                                        </p>
                                    </>
                                )}
                            </div>
                            {/* Unlock Section */}
                            <div className="border border-gray-500 bg-gradient-to-b from-slate-850 to-cyan-700 rounded-3xl p-5 shadow-2xl w-full">
                                <div className="flex items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-white tracking-tight">
                                            Unlock more formats for less!
                                        </h3>
                                        <p className="mt-1 text-gray-300 text-medium tracking-tight">
                                            No need to convert manually, we got you covered.
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleUnlock}
                                        className="flex-shrink-0 px-6 py-2 text-sm font-semibold text-slate-900 bg-white rounded-xl hover:bg-gray-100 transition duration-200 shadow-lg"
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
