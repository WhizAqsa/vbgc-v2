'use client';

import { useState } from 'react';
import { FiCheck, FiX, FiMoreVertical } from 'react-icons/fi';
import Link from 'next/link';

interface User {
    id: string;
    name: string;
    email: string;
    loginMethod: 'google' | 'email';
    googleConnected: boolean;
    plan: 'free' | 'pro' | 'premium';
    billingStatus: 'active' | 'cancelled' | 'expired';
    featureAccessStatus: 'full' | 'partial' | 'limited';
    lastLogin: string;
    lastVideoJob?: string;
    accountFlags: string[];
}

interface UsersTableProps {
    users?: User[];
    onViewProfile?: (userId: string) => void;
    onViewLogs?: (userId: string) => void;
    onViewJobs?: (userId: string) => void;
}

const defaultUsers: User[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        loginMethod: 'google',
        googleConnected: true,
        plan: 'pro',
        billingStatus: 'active',
        featureAccessStatus: 'full',
        lastLogin: '2 hours ago',
        lastVideoJob: '5 hours ago',
        accountFlags: [],
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        loginMethod: 'email',
        googleConnected: false,
        plan: 'free',
        billingStatus: 'active',
        featureAccessStatus: 'limited',
        lastLogin: '1 day ago',
        lastVideoJob: undefined,
        accountFlags: ['upload_failed'],
    },
    {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        loginMethod: 'google',
        googleConnected: true,
        plan: 'premium',
        billingStatus: 'active',
        featureAccessStatus: 'full',
        lastLogin: '30 minutes ago',
        lastVideoJob: '2 hours ago',
        accountFlags: [],
    },
];

const planBadgeClass = {
    free: 'bg-gray-100 text-gray-800',
    pro: 'bg-blue-100 text-blue-800',
    premium: 'bg-purple-100 text-purple-800',
};

const statusBadgeClass = {
    active: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    expired: 'bg-yellow-100 text-yellow-800',
};

const flagColors: Record<string, string> = {
    upload_failed: 'bg-red-100 text-red-800',
    processing_failed: 'bg-orange-100 text-orange-800',
    subscription_mismatch: 'bg-purple-100 text-purple-800',
    multiple_account: 'bg-pink-100 text-pink-800',
};

export default function UsersTable({
    users = defaultUsers,
    onViewProfile,
}: UsersTableProps) {
    const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Login Method</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Google Connected</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Plan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Billing Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Feature Access</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Last Login</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Last Video Job</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Account Flags</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="ml-3 text-sm font-medium text-gray-900">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.loginMethod === 'google' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                        {user.loginMethod === 'google' ? '🔵 Google' : '📧 Email'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center justify-center">
                                        {user.googleConnected ? (
                                            <FiCheck className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <FiX className="w-5 h-5 text-red-600" />
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${planBadgeClass[user.plan]}`}>
                                        {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusBadgeClass[user.billingStatus]}`}>
                                        {user.billingStatus.charAt(0).toUpperCase() + user.billingStatus.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.featureAccessStatus === 'full' ? 'bg-green-100 text-green-800' : user.featureAccessStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.featureAccessStatus.charAt(0).toUpperCase() + user.featureAccessStatus.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.lastLogin}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.lastVideoJob || '—'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {user.accountFlags.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                            {user.accountFlags.map((flag) => (
                                                <span key={flag} className={`px-2 py-1 rounded text-xs font-semibold ${flagColors[flag] || 'bg-gray-100 text-gray-800'}`}>
                                                    {flag.replace(/_/g, ' ')}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-gray-500">—</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="relative">
                                        <button
                                            onClick={() => setOpenActionMenu(openActionMenu === user.id ? null : user.id)}
                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <FiMoreVertical className="w-5 h-5" />
                                        </button>
                                        {openActionMenu === user.id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col">
                                                <Link
                                                    href={`/users/${user.id}`}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200 rounded-t-lg"
                                                >
                                                    View Profile
                                                </Link>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200">
                                                    View Logs
                                                </button>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200">
                                                    View Jobs
                                                </button>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200">
                                                    Re-sync Access
                                                </button>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg">
                                                    Add Note
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
