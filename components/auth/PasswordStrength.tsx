// components/auth/PasswordStrength.tsx
'use client';

import React from 'react';

interface PasswordStrengthProps {
    password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
    const getStrength = () => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]+/)) strength++;
        if (password.match(/[A-Z]+/)) strength++;
        if (password.match(/[0-9]+/)) strength++;
        if (password.match(/[$@#&!]+/)) strength++;
        return strength;
    };

    const strength = getStrength();
    const strengthText = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const strengthColors = [
        'bg-red-500',
        'bg-orange-500',
        'bg-yellow-500',
        'bg-green-500',
        'bg-emerald-500',
    ];

    if (!password) return null;

    return (
        <div className="mt-2">
            <div className="flex gap-1 h-1.5">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-300 ${i < strength ? strengthColors[strength - 1] : 'bg-gray-200'
                            }`}
                    />
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
                Password strength: {strengthText[strength - 1]}
            </p>
        </div>
    );
}