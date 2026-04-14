'use client';

import NavItem from './NavItem';
import {
    FiVideo, FiHome, FiUpload, FiUsers, FiTrendingUp,
    FiAlertCircle, FiTool, FiActivity, FiSettings, FiClipboard
} from "react-icons/fi";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isAdmin?: boolean;
}

const adminNavItems = [
    { icon: FiHome, label: 'Overview', href: '/overview' },
    { icon: FiUsers, label: 'Users', href: '/users' },
    { icon: FiTrendingUp, label: 'Subscriptions', href: '/subscriptions' },
    { icon: FiUpload, label: 'Video Jobs', href: '/video-jobs' },
    { icon: FiClipboard, label: 'Debug Logs', href: '/debug-logs' },
    { icon: FiTool, label: 'Support Tools', href: '/support-tools' },
    { icon: FiActivity, label: 'System Health', href: '/system-health' },
    { icon: FiAlertCircle, label: 'Admin Notes', href: '/admin-notes' },
    { icon: FiSettings, label: 'Settings', href: '/settings' },
];


const navItems = adminNavItems;

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                            <FiVideo className="w-8 h-8 text-blue-600" />
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                VideoHub
                            </span>
                        </div>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map((item) => (
                            <NavItem key={item.label} {...item} />
                        ))}
                    </nav>

                    <div className="p-4 border-t border-gray-100 space-y-3">
                        <div className="flex items-center space-x-2 text-xs">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                A
                            </div>
                            <div>
                                <div className="text-gray-500 text-xs">Super Admin</div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
                            © 2026 Video Background Changer
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}