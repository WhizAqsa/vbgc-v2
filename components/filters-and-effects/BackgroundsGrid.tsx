"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Grid3X3, ChevronDown } from "lucide-react";

const backgrounds = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
];

export function BackgroundsGrid() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Relevance");

    return (
        <div className="space-y-4">
            {/* Search and Sort Bar */}
            <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search Backgrounds"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-2 bg-zinc-900 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:border-gray-500 transition">
                            <span className="text-sm">{sortBy}</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                    <button className="p-2 border border-gray-700 rounded-lg text-gray-300 hover:border-gray-500 transition">
                        <Grid3X3 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Backgrounds Grid */}
            <div className="grid grid-cols-3 gap-4">
                {backgrounds.map((bg) => (
                    <div
                        key={bg}
                        className="relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer group"
                    >
                        <Image
                            src={`https://picsum.photos/300/300?random=${bg}`}
                            alt={`Background ${bg}`}
                            fill
                            className="object-cover group-hover:scale-110 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition" />
                    </div>
                ))}
            </div>
        </div>
    );
}
