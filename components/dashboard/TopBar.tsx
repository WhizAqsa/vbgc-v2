'use client';

import { FiSearch, FiBell } from 'react-icons/fi';

interface TopBarProps {
    alertCount?: number;
}

export default function TopBar({ alertCount = 3 }: TopBarProps) {

    return (
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
            <div className="px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
                <div className="flex-1 max-w-xs sm:max-w-md">
                    <div className="relative hidden sm:block">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                        />
                        <FiSearch className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4 ml-0 sm:ml-4">
                    <button className="relative p-1 sm:p-2 mt-0 sm:mt-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <FiBell className="w-5 h-5 sm:w-7 sm:h-7" />
                        {alertCount > 0 && (
                            <span className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold text-xs sm:text-xs">
                                {alertCount}
                            </span>
                        )}
                    </button>

                    <button className="hidden sm:flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            A
                        </div>
                        <span className="hidden md:inline text-sm font-medium text-gray-700">Super Admin</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
