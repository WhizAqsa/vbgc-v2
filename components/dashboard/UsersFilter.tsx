'use client';

import React, { useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

interface UsersFilterProps {
    onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
    plan: 'all' | 'free' | 'pro' | 'premium';
    billingStatus: 'all' | 'active' | 'cancelled' | 'expired';
    loginMethod: 'all' | 'google' | 'email';
    flags: string[];
}

export default function UsersFilter({ onFilterChange }: UsersFilterProps) {
    const [filters, setFilters] = useState<FilterState>({
        plan: 'all',
        billingStatus: 'all',
        loginMethod: 'all',
        flags: [],
    });

    const handleFilterChange = (key: string, value: string | string[]) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const toggleFlag = (flag: string) => {
        const newFlags = filters.flags.includes(flag)
            ? filters.flags.filter(f => f !== flag)
            : [...filters.flags, flag];
        handleFilterChange('flags', newFlags);
    };

    const resetFilters = () => {
        const defaultFilters: FilterState = {
            plan: 'all',
            billingStatus: 'all',
            loginMethod: 'all',
            flags: [],
        };
        setFilters(defaultFilters);
        onFilterChange?.(defaultFilters);
    };

    const hasActiveFilters = Object.values(filters).some(v => (Array.isArray(v) ? v.length : v !== 'all'));

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <FiFilter className="w-5 h-5" />
                    <span>Filters</span>
                </h3>
                {hasActiveFilters && (
                    <button
                        onClick={resetFilters}
                        className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1"
                    >
                        <FiX className="w-4 h-4" />
                        <span>Reset All</span>
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Plan Filter */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Plan</label>
                    <div className="space-y-2">
                        {['all', 'free', 'pro', 'premium'].map(plan => (
                            <button
                                key={plan}
                                onClick={() => handleFilterChange('plan', plan)}
                                className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${filters.plan === plan
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {plan === 'all' ? 'All Plans' : plan.charAt(0).toUpperCase() + plan.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Billing Status Filter */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Billing Status</label>
                    <div className="space-y-2">
                        {['all', 'active', 'cancelled', 'expired'].map(status => (
                            <button
                                key={status}
                                onClick={() => handleFilterChange('billingStatus', status)}
                                className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${filters.billingStatus === status
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Login Method Filter */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Login Method</label>
                    <div className="space-y-2">
                        {['all', 'google', 'email'].map(method => (
                            <button
                                key={method}
                                onClick={() => handleFilterChange('loginMethod', method)}
                                className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${filters.loginMethod === method
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {method === 'all' ? 'All Methods' : method === 'google' ? '🔵 Google' : '📧 Email'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Account Flags Filter */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Account Flags</label>
                    <div className="space-y-2">
                        {['upload_failed', 'processing_failed', 'subscription_mismatch', 'multiple_account'].map(flag => (
                            <label key={flag} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={filters.flags.includes(flag)}
                                    onChange={() => toggleFlag(flag)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className="text-sm text-gray-700">{flag.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
