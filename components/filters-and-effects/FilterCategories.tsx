"use client";

import { useState } from "react";
import {
    FiImage,
    FiMusic,
    FiVideo,
    FiFeather,   // closest for Palette
    FiCpu,       // closest for Wand2 (AI)
    FiGlobe
} from "react-icons/fi";
const categories = [
    { label: "Gallery", icon: FiMusic },
    { label: "Image", icon: FiImage },
    { label: "Video", icon: FiVideo },
    { label: "Color", icon: FiFeather },
    { label: "AI", icon: FiCpu },
    { label: "Web", icon: FiGlobe },
];
export function FilterCategories() {
    const [activeCategory, setActiveCategory] = useState("Gallery");

    return (
        <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.label;
                return (
                    <button
                        key={category.label}
                        onClick={() => setActiveCategory(category.label)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isActive
                            ? "bg-purple-600 border-purple-500 text-white"
                            : "border-gray-600 text-gray-300 hover:border-gray-500"
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{category.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
