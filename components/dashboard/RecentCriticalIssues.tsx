'use client';

import React from 'react';
import { FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';

interface CriticalIssue {
    id: string;
    title: string;
    count: number;
    severity: 'critical' | 'warning';
}

interface RecentCriticalIssuesProps {
    issues?: CriticalIssue[];
}

const defaultIssues: CriticalIssue[] = [
    { id: '1', title: 'Upload failed', count: 12, severity: 'critical' },
    { id: '2', title: 'Processing timeout', count: 5, severity: 'warning' },
    { id: '3', title: 'Subscription mismatch', count: 3, severity: 'warning' },
    { id: '4', title: 'User login mismatch', count: 2, severity: 'critical' },
];

export default function RecentCriticalIssues({ issues = defaultIssues }: RecentCriticalIssuesProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Critical Issues</h3>
            <div className="space-y-3">
                {issues.map((issue) => (
                    <div key={issue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                            {issue.severity === 'critical' ? (
                                <FiAlertTriangle className="w-5 h-5 text-red-600" />
                            ) : (
                                <FiAlertCircle className="w-5 h-5 text-yellow-600" />
                            )}
                            <span className="text-gray-900 font-medium">{issue.title}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${issue.severity === 'critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {issue.count}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
