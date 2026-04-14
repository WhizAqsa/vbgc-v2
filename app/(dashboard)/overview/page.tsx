'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import RecentCriticalIssues from '@/components/dashboard/RecentCriticalIssues';
import SystemStatus from '@/components/dashboard/SystemStatus';
import QuickActions from '@/components/dashboard/QuickActions';
import {
    FiUsers, FiTrendingUp, FiDownload, FiAlertTriangle,
    FiClock, FiAlertCircle, FiHelpCircle, FiCheck
} from 'react-icons/fi';

export default function DashboardOverviewPage() {
    const [alertCount] = useState(8);

    return (
        <DashboardLayout alertCount={alertCount}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-600 mt-1">Monitor system health and manage user activities</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <DashboardCard
                        title="Total Users"
                        value="2,847"
                        icon={<FiUsers className="w-6 h-6" />}
                        color="blue"
                        trend={{ value: 12, direction: 'up' }}
                    />
                    <DashboardCard
                        title="Paid Users"
                        value="1,204"
                        icon={<FiTrendingUp className="w-6 h-6" />}
                        color="green"
                        trend={{ value: 8, direction: 'up' }}
                    />
                    <DashboardCard
                        title="Active Subscriptions"
                        value="1,085"
                        icon={<FiCheck className="w-6 h-6" />}
                        color="purple"
                        trend={{ value: 5, direction: 'down' }}
                    />
                    <DashboardCard
                        title="Failed Uploads Today"
                        value="23"
                        icon={<FiDownload className="w-6 h-6" />}
                        color="red"
                        trend={{ value: 15, direction: 'up' }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <DashboardCard
                        title="Failed Jobs Today"
                        value="18"
                        icon={<FiAlertTriangle className="w-6 h-6" />}
                        color="red"
                    />
                    <DashboardCard
                        title="Pending Jobs"
                        value="7"
                        icon={<FiClock className="w-6 h-6" />}
                        color="yellow"
                    />
                    <DashboardCard
                        title="Cancellation Requests"
                        value="5"
                        icon={<FiHelpCircle className="w-6 h-6" />}
                        color="red"
                    />
                    <DashboardCard
                        title="Google Login Mismatch Cases"
                        value="3"
                        icon={<FiAlertCircle className="w-6 h-6" />}
                        color="yellow"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <RecentCriticalIssues />
                    <SystemStatus />
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <QuickActions />
                </div>
            </div>
        </DashboardLayout>
    );
}