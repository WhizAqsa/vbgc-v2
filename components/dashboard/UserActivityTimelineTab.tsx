'use client';

import React from 'react';
import { FiLogIn, FiCreditCard, FiUpload, FiAlertCircle, FiRotateCcw, FiCheck } from 'react-icons/fi';

interface TimelineEvent {
    id: string;
    type: 'signup' | 'login' | 'subscription' | 'upload' | 'upload_failed' | 'relogin' | 'job_retry' | 'subscription_sync';
    title: string;
    description: string;
    timestamp: string;
    icon: React.ReactNode;
}

interface UserActivityTimelineTabProps {
    userId: string;
}

const defaultEvents: TimelineEvent[] = [
    {
        id: '1',
        type: 'subscription_sync',
        title: 'Subscription Synced',
        description: 'User subscription data was synced from Stripe',
        timestamp: '2024-04-14 02:30 PM',
        icon: <FiCheck className="w-5 h-5" />,
    },
    {
        id: '2',
        type: 'job_retry',
        title: 'Job Retried',
        description: 'Failed job job_123 was manually retried by admin',
        timestamp: '2024-04-14 11:15 AM',
        icon: <FiRotateCcw className="w-5 h-5" />,
    },
    {
        id: '3',
        type: 'relogin',
        title: 'User Re-logged In',
        description: 'User logged in with Google after authentication issue',
        timestamp: '2024-04-14 09:45 AM',
        icon: <FiLogIn className="w-5 h-5" />,
    },
    {
        id: '4',
        type: 'upload_failed',
        title: 'Upload Failed',
        description: 'Video upload failed due to unsupported file format (AVI)',
        timestamp: '2024-04-14 08:30 AM',
        icon: <FiAlertCircle className="w-5 h-5" />,
    },
    {
        id: '5',
        type: 'upload',
        title: 'Video Upload Started',
        description: 'User uploaded video file: vacation_clip.mp4 (245 MB)',
        timestamp: '2024-04-14 08:00 AM',
        icon: <FiUpload className="w-5 h-5" />,
    },
    {
        id: '6',
        type: 'subscription',
        title: 'Subscription Created',
        description: 'Premium Pro subscription created and activated',
        timestamp: '2024-06-15 03:20 PM',
        icon: <FiCreditCard className="w-5 h-5" />,
    },
    {
        id: '7',
        type: 'login',
        title: 'User Logged In with Google',
        description: 'First login via Google OAuth',
        timestamp: '2024-06-15 02:45 PM',
        icon: <FiLogIn className="w-5 h-5" />,
    },
    {
        id: '8',
        type: 'signup',
        title: 'User Signed Up',
        description: 'New account created',
        timestamp: '2023-06-15 01:30 PM',
        icon: <FiCheck className="w-5 h-5" />,
    },
];

const typeColors = {
    signup: 'bg-green-100 text-green-700',
    login: 'bg-blue-100 text-blue-700',
    subscription: 'bg-purple-100 text-purple-700',
    upload: 'bg-indigo-100 text-indigo-700',
    upload_failed: 'bg-red-100 text-red-700',
    relogin: 'bg-yellow-100 text-yellow-700',
    job_retry: 'bg-orange-100 text-orange-700',
    subscription_sync: 'bg-cyan-100 text-cyan-700',
};

const textColors = {
    signup: 'text-green-700',
    login: 'text-blue-700',
    subscription: 'text-purple-700',
    upload: 'text-indigo-700',
    upload_failed: 'text-red-700',
    relogin: 'text-yellow-700',
    job_retry: 'text-orange-700',
    subscription_sync: 'text-cyan-700',
};

export default function UserActivityTimelineTab({ userId }: UserActivityTimelineTabProps) {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Timeline</h3>
                <div className="space-y-6">
                    {defaultEvents.map((event, index) => (
                        <div key={event.id} className="flex gap-4 relative">
                            {/* Timeline Line */}
                            {index < defaultEvents.length - 1 && (
                                <div className="absolute left-6 top-14 w-1 h-12 bg-gray-200" />
                            )}

                            {/* Icon Circle */}
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${typeColors[event.type]}`}
                            >
                                {event.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-1">
                                <div className="flex items-baseline gap-2">
                                    <h4 className={`font-semibold ${textColors[event.type]}`}>{event.title}</h4>
                                    <span className="text-xs text-gray-500">{event.timestamp}</span>
                                </div>
                                <p className="text-gray-700 text-sm mt-1">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
