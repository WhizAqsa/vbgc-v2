'use client';

import React, { useState } from 'react';
import { FiSearch, FiRefreshCcw, FiPlay, FiEye } from 'react-icons/fi';

interface QuickAction {
    id: string;
    title: string;
    icon: React.ReactNode;
    action: () => void;
}

interface QuickActionsProps {
    onAction?: (actionId: string) => void;
}

export default function QuickActions({ onAction }: QuickActionsProps) {
    const [showSearchUser, setShowSearchUser] = useState(false);

    const actions: QuickAction[] = [
        {
            id: 'search-user',
            title: 'Search user',
            icon: <FiSearch className="w-5 h-5" />,
            action: () => setShowSearchUser(true),
        },
        {
            id: 're-sync',
            title: 'Re-sync subscription',
            icon: <FiRefreshCcw className="w-5 h-5" />,
            action: () => onAction?.('re-sync'),
        },
        {
            id: 'retry-job',
            title: 'Retry failed job',
            icon: <FiPlay className="w-5 h-5" />,
            action: () => onAction?.('retry-job'),
        },
        {
            id: 'stuck-jobs',
            title: 'View stuck jobs',
            icon: <FiEye className="w-5 h-5" />,
            action: () => onAction?.('stuck-jobs'),
        },
    ];

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        onClick={action.action}
                        className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
                    >
                        <div className="text-gray-600 group-hover:text-blue-600 mb-2 transition-colors">
                            {action.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-900 text-center">{action.title}</span>
                    </button>
                ))}
            </div>

            {/* Search User Modal */}
            {showSearchUser && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Search User</h4>
                        <input
                            type="text"
                            placeholder="Enter email or user ID..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                        <div className="flex space-x-3 mt-4">
                            <button
                                onClick={() => setShowSearchUser(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
