'use client';

import { FiVideo, FiUpload } from "react-icons/fi";
interface EmptyStateProps {
    onUpload: () => void;
}

export default function EmptyState({ onUpload }: EmptyStateProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiVideo className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    You haven&apos;t uploaded any videos yet.
                </h3>
                <p className="text-gray-600 mb-6">
                    Upload your first video to get started with VideoHub&apos;s powerful video management tools.
                </p>
                <button
                    onClick={onUpload}
                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                >
                    <FiUpload className="w-5 h-5 mr-2" />
                    Upload Your First Video
                </button>
            </div>
        </div>
    );
}