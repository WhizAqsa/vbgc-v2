'use client';

import React from 'react';

interface UserProfileTabProps {
    userId: string;
}

export default function UserProfileTab({ userId }: UserProfileTabProps) {
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        registeredEmail: 'john.doe@gmail.com',
        currentLoginEmail: 'john@example.com',
        loginMethod: 'Google',
        googleConnected: true,
        passwordSet: true,
        accountCreatedAt: '2023-06-15',
        lastLogin: '2024-04-14 02:30 PM',
        ipAddress: '192.168.1.1',
        country: 'United States',
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <p className="text-gray-900">{user.name}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Registered Email</label>
                        <p className="text-gray-900">{user.registeredEmail}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Login Email</label>
                        <p className="text-gray-900">{user.currentLoginEmail}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Login Method</label>
                        <p className="text-gray-900">{user.loginMethod}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Google Connected</label>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${user.googleConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {user.googleConnected ? 'Yes' : 'No'}
                        </span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password Set</label>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${user.passwordSet ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {user.passwordSet ? 'Yes' : 'No'}
                        </span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
                        <p className="text-gray-900">{user.accountCreatedAt}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                        <p className="text-gray-900">{user.lastLogin}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                        <p className="text-gray-900">{user.ipAddress}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <p className="text-gray-900">{user.country}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
