'use client';

import type { VideoItem } from '@/types/video';
import VideoThumbnail from './VideoThumbnail';
import VideoStatusBadge from './VideoStatusBadge';
import {
    FiExternalLink,

} from "react-icons/fi";

interface VideoCardProps {
    video: VideoItem;
    uploadProgress?: number;
}

export default function VideoCard({ video, uploadProgress }: VideoCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <VideoThumbnail
                thumbnail={video.thumbnail}
                title={video.title}
                status={video.status}
                uploadProgress={uploadProgress}
            />

            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                            {video.title}
                        </h3>
                        <div className="mt-1">
                            <VideoStatusBadge status={video.status} />
                        </div>
                    </div>
                    {video.status === 'ready' && (
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <FiExternalLink className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>{video.uploadDate}</span>
                    <span>{video.size}</span>
                </div>
            </div>
        </div>
    );
}