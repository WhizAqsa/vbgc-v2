// components/change-bg/UploadVideo.tsx
"use client";

import { useState, useCallback, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
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

                            {/* Upload Area */}
                            <div
                                className={`relative border border-gray-500 bg-zinc-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 lg:p-20 text-center transition-all duration-300 cursor-pointer shadow-2xl hover:border-gray-500 hover:shadow-3xl min-h-40 sm:min-h-48 md:min-h-56 w-full`}
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
                                    <div className="space-y-2 sm:space-y-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setUploadedFile(null);
                                                setPreviewUrl(null);
                                            }}
                                            className="text-xs sm:text-sm text-purple-300 hover:text-white transition"
                                        >
                                            Remove & upload new
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <FiUploadCloud className="w-10 h-10 sm:w-14 md:w-16 lg:h-16 mx-auto text-gray-300 mb-2 sm:mb-3 md:mb-4" />
                                        <p className="text-base sm:text-lg md:text-xl font-medium text-gray-300">
                                            Click or Drag & Drop to Upload
                                        </p>
                                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-300">
                                            Supported formats: .mp4, .webm, .mov, .gif
                                        </p>
                                    </>
                                )}
                            </div>
                            {/* Unlock Section */}
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
