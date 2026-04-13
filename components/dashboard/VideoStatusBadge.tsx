'use client';

import type { VideoStatus } from '@/types/video';
import {
    FiCheckCircle,
    FiClock,
    FiAlertCircle
} from "react-icons/fi";

interface VideoStatusBadgeProps {
    status: VideoStatus;
}

const statusConfig = {
    ready: {
        icon: FiCheckCircle,
        text: 'Ready',
        className: 'text-green-600',
    },
    processing: {
        icon: FiClock,
        text: 'Processing',
        className: 'text-yellow-600',
    },
    error: {
        icon: FiAlertCircle,
        text: 'Error',
        className: 'text-red-600',
    },
    uploading: {
        icon: FiClock,
        text: 'Uploading...',
        className: 'text-blue-600',
    },
};

export default function VideoStatusBadge({ status }: VideoStatusBadgeProps) {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <div className="flex items-center space-x-1">
            <Icon className={`w-4 h-4 ${config.className}`} />
            <span className={`text-xs ${config.className}`}>
                {config.text}
            </span>
        </div>
    );
}