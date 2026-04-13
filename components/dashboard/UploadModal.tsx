'use client';

import React, { useRef } from 'react';
import type { VideoItem } from '@/types/video';
import { FiX, FiUpload } from "react-icons/fi";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (videos: VideoItem[]) => void;
}

export default function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newVideos: VideoItem[] = [];

        Array.from(files).forEach((file) => {
            const videoId = Date.now().toString() + Math.random().toString(36);
            newVideos.push({
                id: videoId,
                title: file.name.replace(/\.[^/.]+$/, ''),
                thumbnail: `https://picsum.photos/seed/${videoId}/300/200`,
                duration: '0:00',
                status: 'uploading',
                uploadDate: new Date().toLocaleDateString(),
                size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            });
        });

        onUpload(newVideos);
        onClose();

        // Simulate status updates after upload
        setTimeout(() => {
            newVideos.forEach((video) => {
                // This would typically be handled by a real upload service
                console.log(`Video ${video.id} processing started`);
            });
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">Upload Video</h2>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <FiX className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <label className="block w-full">
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                            <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600 mb-1">Click or drag to upload</p>
                            <p className="text-xs text-gray-400">MP4, MOV, AVI (Max 2GB)</p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="video/*"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                    <p className="text-xs text-gray-500 text-center">
                        By uploading, you agree to our Terms of Service
                    </p>
                </div>
            </div>
        </div>
    );
}