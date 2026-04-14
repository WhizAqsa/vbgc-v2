'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { FiMenu, FiX } from "react-icons/fi";

interface DashboardLayoutProps {
    children: React.ReactNode;
    alertCount?: number;
}

export default function DashboardLayout({ children, alertCount }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 bg-white rounded-lg shadow-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                </button>
            </div>

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 min-h-screen flex flex-col">
                <TopBar alertCount={alertCount} />
                <div className="flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}