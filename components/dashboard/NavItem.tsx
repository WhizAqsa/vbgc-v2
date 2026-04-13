'use client';

import { IconType } from "react-icons";

interface NavItemProps {
    icon: IconType;
    label: string;
    href: string;
    active?: boolean;
}

export default function NavItem({ icon: Icon, label, href, active = false }: NavItemProps) {
    return (
        <a
            href={href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${active
                ? 'bg-gray-50 text-gray-900 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </a>
    );
}