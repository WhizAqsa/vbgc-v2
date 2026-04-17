'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import UserProfileTab from '@/components/dashboard/UserProfileTab';
import UserSubscriptionTab from '@/components/dashboard/UserSubscriptionTab';
import UserFeatureAccessTab from '@/components/dashboard/UserFeatureAccessTab';
import UserVideoJobsTab from '@/components/dashboard/UserVideoJobsTab';
import UserDebugLogsTab from '@/components/dashboard/UserDebugLogsTab';
import { FiArrowLeft } from 'react-icons/fi';
import UserNotesTab from '@/components/dashboard/UserNotesTab';
import UserActivityTimelineTab from '@/components/dashboard/UserActivityTimelineTab';
import Link from 'next/link';

interface PageParams {
    params: Promise<{ userId: string }>;

}

export default function UserDetailPage({ params }: PageParams) {
    const { userId } = React.use(params);
    const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'features' | 'jobs' | 'logs' | 'notes' | 'activity'>('profile');

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'subscription', label: 'Subscription' },
        { id: 'features', label: 'Feature Access' },
        { id: 'jobs', label: 'Video Jobs' },
        { id: 'logs', label: 'Debug Logs' },
        { id: 'notes', label: 'Notes' },
        { id: 'activity', label: 'Activity Timeline' },
    ] as const;

    return (
        <DashboardLayout alertCount={3}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <Link
                        href="/users"
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
                    >
                        <FiArrowLeft className="w-4 h-4" />
                        <span>Back to Users</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
                    <p className="text-gray-600 mt-1">User ID: {userId}</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
                    <div className="flex overflow-x-auto border-b border-gray-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-700 hover:text-gray-900'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        {activeTab === 'profile' && <UserProfileTab userId={userId} />}
                        {activeTab === 'subscription' && <UserSubscriptionTab userId={userId} />}
                        {activeTab === 'features' && <UserFeatureAccessTab userId={userId} />}
                        {activeTab === 'jobs' && <UserVideoJobsTab userId={userId} />}
                        {activeTab === 'logs' && <UserDebugLogsTab userId={userId} />}
                        {activeTab === 'notes' && <UserNotesTab userId={userId} />}
                        {activeTab === 'activity' && <UserActivityTimelineTab userId={userId} />}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
