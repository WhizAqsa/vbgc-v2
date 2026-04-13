// components/auth/SocialButton.tsx
'use client';

import React from 'react';

interface SocialButtonProps {
    icon: React.ReactNode;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

export default function SocialButton({ icon, onClick, children, className = '' }: SocialButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
        w-full flex items-center justify-center gap-3 px-6 py-3 
        bg-white border-2 border-gray-200 rounded-xl
        text-gray-700 font-medium
        hover:bg-gray-50 hover:border-gray-300
        transition-all duration-200
        ${className}
      `}
        >
            {icon}
            <span>{children}</span>
        </button>
    );
}