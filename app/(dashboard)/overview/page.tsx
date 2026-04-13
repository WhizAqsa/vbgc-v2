'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import UploadModal from '@/components/dashboard/UploadModal';
import UploadButton from '@/components/dashboard/UploadButton';
import EmptyState from '@/components/dashboard/EmptyState';
import type { VideoItem } from '@/types/video';
import VideoGrid from '@/components/dashboard/VideoGrid';

export default function DashboardPage() {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleVideoUpload = (newVideos: VideoItem[]) => {
        setVideos((prev) => [...newVideos, ...prev]);
    };

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Videos</h1>
                        <p className="text-gray-600 mt-1">Manage and organize your video content</p>
                    </div>

                    <div className="flex-shrink-0">
                        <UploadButton onClick={() => setShowUploadModal(true)} />
                    </div>
                </div>

                {videos.length === 0 ? (
                    <EmptyState onUpload={() => setShowUploadModal(true)} />
                ) : (
                    <VideoGrid videos={videos} />
                )}
            </div>

            <UploadModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onUpload={handleVideoUpload}
            />
        </DashboardLayout>
    );
}