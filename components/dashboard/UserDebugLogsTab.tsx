'use client';

import React, { useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

interface DebugLog {
    id: string;
    timestamp: string;
    type: 'upload' | 'processing' | 'billing' | 'auth' | 'email' | 'webhook' | 'feature';
    service: string;
    severity: 'info' | 'warning' | 'error';
    message: string;
    rawPayload?: string;
}

interface UserDebugLogsTabProps {
    userId: string;
}

const defaultLogs: DebugLog[] = [
    {
        id: '1',
        timestamp: '2024-04-14 14:30:22',
        type: 'upload',
        service: 'Upload Service',
        severity: 'error',
        message: 'File upload failed - Invalid format',
        rawPayload: '{"file": "test.avi", "error": "unsupported_format"}',
    },
    {
        id: '2',
        timestamp: '2024-04-14 14:25:10',
        type: 'processing',
        service: 'Processing Workers',
        severity: 'warning',
        message: 'Job processing took longer than expected',
        rawPayload: '{"job_id": "job_123", "duration": "45000ms"}',
    },
    {
        id: '3',
        timestamp: '2024-04-14 14:20:05',
        type: 'auth',
        service: 'Auth Service',
        severity: 'info',
        message: 'User logged in successfully',
        rawPayload: '{"user_id": "user_456", "method": "google"}',
    },
    {
        id: '4',
        timestamp: '2024-04-14 14:15:00',
        type: 'billing',
        service: 'Stripe Webhook',
        severity: 'info',
        message: 'Subscription payment succeeded',
        rawPayload: '{"subscription_id": "sub_123", "amount": 2999}',
    },
    {
        id: '5',
        timestamp: '2024-04-14 14:10:15',
        type: 'email',
        service: 'Email Service',
        severity: 'warning',
        message: 'Email delivery delayed',
        rawPayload: '{"recipient": "user@example.com", "type": "subscription_receipt"}',
    },
];

const typeColors = {
    upload: 'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800',
    billing: 'bg-green-100 text-green-800',
    auth: 'bg-yellow-100 text-yellow-800',
    email: 'bg-pink-100 text-pink-800',
    webhook: 'bg-indigo-100 text-indigo-800',
    feature: 'bg-cyan-100 text-cyan-800',
};

const severityColors = {
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
};

const logTypes: Array<DebugLog['type']> = ['upload', 'processing', 'billing', 'auth', 'email', 'webhook', 'feature'];

export default function UserDebugLogsTab({ userId }: UserDebugLogsTabProps) {
    const [expandedLog, setExpandedLog] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<DebugLog['type'][]>([]);

    const toggleFilter = (type: DebugLog['type']) => {
        setSelectedFilters(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const filteredLogs = selectedFilters.length > 0
        ? defaultLogs.filter(log => selectedFilters.includes(log.type))
        : defaultLogs;

    const resetFilters = () => {
        setSelectedFilters([]);
    };

    return (
        <div className="space-y-6">
            {/* Filter Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                        <FiFilter className="w-5 h-5" />
                        <span>Filter Logs</span>
                    </h3>
                    {selectedFilters.length > 0 && (
                        <button
                            onClick={resetFilters}
                            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1"
                        >
                            <FiX className="w-4 h-4" />
                            <span>Clear</span>
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {logTypes.map(type => (
                        <button
                            key={type}
                            onClick={() => toggleFilter(type)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedFilters.includes(type)
                                    ? `${typeColors[type]}`
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Debug Logs Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Debug Logs</h3>
                {filteredLogs.length > 0 ? (
                    <div className="space-y-3">
                        {filteredLogs.map((log) => (
                            <div key={log.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
                                <button
                                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-start justify-between"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="text-xs font-mono text-gray-600">{log.timestamp}</span>
                                            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${typeColors[log.type]}`}>
                                                {log.type.toUpperCase()}
                                            </span>
                                            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${severityColors[log.severity]}`}>
                                                {log.severity.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{log.message}</p>
                                    </div>
                                    <span className="ml-4 text-gray-400">
                                        {expandedLog === log.id ? '▼' : '▶'}
                                    </span>
                                </button>
                                {expandedLog === log.id && (
                                    <div className="p-4 bg-white border-t border-gray-200">
                                        <div className="mb-3">
                                            <p className="text-xs font-medium text-gray-700 mb-1">Service</p>
                                            <p className="text-sm text-gray-900">{log.service}</p>
                                        </div>
                                        {log.rawPayload && (
                                            <div>
                                                <p className="text-xs font-medium text-gray-700 mb-1">Raw Payload</p>
                                                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-auto max-h-48">
                                                    {JSON.stringify(JSON.parse(log.rawPayload), null, 2)}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600">No logs found matching the selected filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
