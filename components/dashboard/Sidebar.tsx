'use client';

import NavItem from './NavItem';
import { FiVideo, FiHome, FiUpload, FiKey, FiUser } from "react-icons/fi";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    { icon: FiHome, label: 'Home', href: '#' },
    { icon: FiUpload, label: 'Upload', href: '#' },
    { icon: FiKey, label: 'API', href: '#' },
    { icon: FiUser, label: 'Account', href: '#' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {/* Backdrop for mobile */}
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
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                            <FiVideo className="w-8 h-8 text-blue-600" />
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                VideoHub
                            </span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map((item) => (
                            <NavItem key={item.label} {...item} />
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500 text-center">
                            © 2026 Video Background Changer
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}