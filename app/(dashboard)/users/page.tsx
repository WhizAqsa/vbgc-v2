'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import UsersTable from '@/components/dashboard/UsersTable';
import UsersFilter from '@/components/dashboard/UsersFilter';
import { FiSearch } from 'react-icons/fi';

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <DashboardLayout alertCount={3}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
                    <p className="text-gray-600 mt-1">Manage and monitor user accounts</p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name, email, or user ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <FiSearch className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                    </div>
                </div>

                {/* Filters Section */}
                <div className="mb-8">
                    <UsersFilter />
                </div>

                {/* Users Table */}
                <div>
                    <UsersTable />
                </div>
            </div>
        </DashboardLayout>
    );
}
