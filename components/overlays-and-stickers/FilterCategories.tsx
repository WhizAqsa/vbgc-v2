"use client";

import { useState } from "react";
import { RiLayoutMasonryLine } from "react-icons/ri";
import { FaRegStickyNote } from "react-icons/fa";

const filters = [
    { id: "overlays", label: "Overlays", icon: RiLayoutMasonryLine },
    { id: "stickers", label: "Stickers", icon: FaRegStickyNote },
];

export function FilterCategories() {
    const [activeFilter, setActiveFilter] = useState("overlays");

    return (
        <div className="flex flex-wrap items-center gap-3">
            {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;

                return (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive
                            ? "bg-purple-600 text-white shadow-md"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {filter.label}
                    </button>
                );
            })}
        </div>
    );
}