'use client';

import React from 'react';

interface AuthCardProps {
    children: React.ReactNode;
    title: string;
    subtitle?: React.ReactNode;
}

export default function AuthCard({ children, title, subtitle }: AuthCardProps) {
    return (
        <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                    {subtitle && (
                        <p className="text-gray-600">{subtitle}</p>
                    )}
                </div>

                {children}
            </div>

            {/* Footer Note */}
            <p className="text-center text-xs text-gray-500 mt-6">
                By continuing, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
        </div>
    );
}