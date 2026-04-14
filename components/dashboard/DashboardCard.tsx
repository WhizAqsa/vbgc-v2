'use client';

import React from 'react';

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
    subtitle?: string;
    trend?: {
        value: number;
        direction: 'up' | 'down';
    };
}

const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
};

export default function DashboardCard({
    title,
    value,
    icon,
    color = 'blue',
    subtitle,
    trend,
}: DashboardCardProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-gray-600 text-sm font-medium">{title}</p>
                    <div className="mt-2 flex items-baseline space-x-2">
                        <p className="text-3xl font-bold text-gray-900">{value}</p>
                        {trend && (
                            <span className={`text-sm font-semibold ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
                            </span>
                        )}
                    </div>
                    {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
                </div>
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg border ${colorClasses[color]}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
