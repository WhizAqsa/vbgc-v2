'use client';

import { FiRotateCw, FiFileText, FiX, FiAlertCircle } from 'react-icons/fi';
import { useState } from 'react';

interface VideoJob {
    id: string;
    fileName: string;
    size: string;
    duration: string;
    format: string;
    resolution: string;
    featureUsed: string;
    status: 'completed' | 'processing' | 'failed' | 'pending' | 'stuck';
    errorReason?: string;
    startedAt: string;
    finishedAt?: string;
    processingTime?: string;
}

interface UserVideoJobsTabProps {
    userId: string;
}

const defaultJobs: VideoJob[] = [
    {
        id: 'job_001',
        fileName: 'vacation_clip.mp4',
        size: '245 MB',
        duration: '3:45',
        format: 'MP4',
        resolution: '1920x1080',
        featureUsed: 'Background Removal',
        status: 'completed',
        startedAt: '2024-04-14 10:30 AM',
        finishedAt: '2024-04-14 10:45 AM',
        processingTime: '15 min',
    },
    {
        id: 'job_002',
        fileName: 'tutorial.mov',
        size: '512 MB',
        duration: '12:30',
        format: 'MOV',
        resolution: '3840x2160',
        featureUsed: 'Blur',
        status: 'failed',
        errorReason: 'Upload interrupted',
        startedAt: '2024-04-14 09:00 AM',
    },
    {
        id: 'job_003',
        fileName: 'demo_video.mp4',
        size: '128 MB',
        duration: '2:15',
        format: 'MP4',
        resolution: '1280x720',
        featureUsed: 'Green Screen',
        status: 'processing',
        startedAt: '2024-04-14 02:30 PM',
    },
    {
        id: 'job_004',
        fileName: 'presentation.webm',
        size: '356 MB',
        duration: '45:20',
        format: 'WEBM',
        resolution: '1280x720',
        featureUsed: 'Black & White',
        status: 'stuck',
        startedAt: '2024-04-13 10:00 AM',
    },
];

const statusBadgeClass = {
    completed: 'bg-green-100 text-green-800',
    processing: 'bg-blue-100 text-blue-800',
    failed: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    stuck: 'bg-orange-100 text-orange-800',
};

export default function UserVideoJobsTab({ userId }: UserVideoJobsTabProps) {
    const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Job ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">File Name</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Size</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Duration</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Format</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Resolution</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Feature</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Started At</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {defaultJobs.map((job) => (
                                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-900">{job.id}</code>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.fileName}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{job.size}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{job.duration}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{job.format}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{job.resolution}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">{job.featureUsed}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusBadgeClass[job.status]}`}>
                                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                        </span>
                                        {job.errorReason && (
                                            <p className="text-xs text-red-600 mt-1">{job.errorReason}</p>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{job.startedAt}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right">
                                        <button
                                            onClick={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}
                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <FiFileText className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Expanded Job Details with Actions */}
            {expandedJobId && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    {(() => {
                        const job = defaultJobs.find(j => j.id === expandedJobId);
                        if (!job) return null;
                        return (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-semibold text-gray-900">Job Details - {job.id}</h4>
                                    <button
                                        onClick={() => setExpandedJobId(null)}
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <FiX className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                                    <div>
                                        <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Finished At</p>
                                        <p className="text-sm text-gray-900 mt-1">{job.finishedAt || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Processing Time</p>
                                        <p className="text-sm text-gray-900 mt-1">{job.processingTime || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Status</p>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${statusBadgeClass[job.status]}`}>
                                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                        </span>
                                    </div>
                                    {job.errorReason && (
                                        <div className="md:col-span-3">
                                            <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold flex items-center space-x-1">
                                                <FiAlertCircle className="w-4 h-4" />
                                                <span>Error Reason</span>
                                            </p>
                                            <p className="text-sm text-red-700 mt-1">{job.errorReason}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {job.status === 'failed' && (
                                        <button className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                            <FiRotateCw className="w-4 h-4" />
                                            <span>Retry Job</span>
                                        </button>
                                    )}
                                    {job.status === 'stuck' && (
                                        <>
                                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                                                Delete Stuck Job
                                            </button>
                                            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                                                Mark for Review
                                            </button>
                                        </>
                                    )}
                                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
                                        View Raw Logs
                                    </button>
                                </div>
                            </>
                        );
                    })()}
                </div>
            )}
        </div>
    );
}
