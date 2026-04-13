'use client';

import React from 'react';
import VideoCard from './VideoCard';
import type { VideoItem } from '@/types/video';

interface VideoGridProps {
    videos: VideoItem[];
    uploadProgress?: Record<string, number>;
}

export default function VideoGrid({ videos, uploadProgress = {} }: VideoGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
                <VideoCard
                    key={video.id}
                    video={video}
                    uploadProgress={uploadProgress[video.id]}
                />
            ))}
        </div>
    );
}