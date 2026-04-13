'use client';

import React from 'react';
import type { VideoStatus } from '@/types/video';
import Image from 'next/image';

interface VideoThumbnailProps {
    thumbnail: string;
    title: string;
    status: VideoStatus;
    uploadProgress?: number;
}

export default function VideoThumbnail({ thumbnail, title, status, uploadProgress }: VideoThumbnailProps) {
    const isProcessing = status === 'processing';
    const isUploading = status === 'uploading';

    return (
        <div className="relative aspect-video bg-gray-100">
            <Image
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
            />

            {(isUploading || isProcessing) && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    {isUploading && uploadProgress !== undefined && (
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                                <div className="text-white font-bold">{uploadProgress}%</div>
                            </div>
                            <div className="text-white text-sm">Uploading...</div>
                        </div>
                    )}

                    {isProcessing && (
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-white animate-spin mb-2"></div>
                            <div className="text-white text-sm">Processing</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}