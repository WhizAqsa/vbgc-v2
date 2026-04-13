'use client';
import { FiPlusCircle } from "react-icons/fi";

interface UploadButtonProps {
    onClick: () => void;
    variant?: 'primary' | 'secondary';
}

export default function UploadButton({ onClick, variant = 'primary' }: UploadButtonProps) {
    const variants = {
        primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl',
        secondary: 'bg-gray-900 text-white hover:bg-gray-800',
    };

    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center px-6 py-3 font-semibold rounded-xl transform hover:scale-[1.02] transition-all duration-200 ${variants[variant]}`}
        >
            <FiPlusCircle className="w-5 h-5 mr-2" />
            {variant === 'primary' ? 'Upload New Video' : 'Upload Your First Video'}
        </button>
    );
}