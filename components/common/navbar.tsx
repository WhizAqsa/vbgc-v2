"use client";

import { FaGlobe } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';
import Sidebar from './sidebar';

export default function Navbar() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogin = () => {
        router.push('/login');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        if (!sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-br from-zinc-800 via-slate-950 to-black text-white">
                <div className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white flex-shrink-0">
                        <span className="text-sm font-bold">V</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-3 sm:py-4 md:justify-end md:gap-3 md:px-6 md:py-4 sm:gap-6 sm:px-8 sm:py-5 lg:pl-[108px] lg:pr-6 lg:py-4">
                    <div className="hidden lg:flex items-center gap-3">
                    </div>

                    <div className="hidden lg:block flex-1" />

                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            onClick={toggleSidebar}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 transition"
                        >
                            <FiMenu size={24} />
                        </button>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
                            <span className="text-sm font-bold">V</span>
                        </div>
                    </div>

                    <div className="flex-1 lg:flex-none" />

                    <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
                        <button
                            type="button"
                            className="hidden sm:inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            <FaGlobe className="inline-block" size={16} />
                            <span className="hidden sm:inline">English</span>
                        </button>
                        <button
                            onClick={handleLogin}
                            type="button"
                            className="hidden sm:block rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            className="hidden sm:block rounded-full border-2 border-white bg-white px-4 sm:px-6 py-1.5 sm:py-2.5 text-xs sm:text-sm font-bold text-black transition hover:bg-white/90"
                        >
                            Sign up
                        </button>
                        <button
                            onClick={handleLogin}
                            type="button"
                            className="sm:hidden rounded-full px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            className="sm:hidden rounded-full border-2 border-white bg-white px-3 py-1.5 text-xs font-bold text-black transition hover:bg-white/90"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </header>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {sidebarOpen && (
                <div className="fixed left-0 top-16 sm:top-20 z-50 h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] w-[100px] lg:hidden overflow-y-auto">
                    <Sidebar />
                </div>
            )}

            <div className="hidden lg:flex fixed left-0 top-0 z-30 h-screen w-[100px]">
                <Sidebar />
            </div>
        </>
    );
}