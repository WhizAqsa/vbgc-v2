"use client";

import { useState } from "react";
import Image from "next/image";

const categories = [
    { id: "new", label: "New" },
    { id: "trending", label: "Trending" },
    { id: "bokeh", label: "Bokeh" },
    { id: "lens", label: "Lens Flare" },
];

const intensityLevels = [
    { id: "none", label: "None", value: 0 },
    { id: "low", label: "Low", value: 25 },
    { id: "medium", label: "Medium", value: 50 },
    { id: "high", label: "High", value: 75 },
    { id: "custom", label: "Custom", value: 60 },
];

export function BackgroundsGrid() {
    const [activeCategory, setActiveCategory] = useState("new"); // ✅ NEW
    const [selectedIntensity, setSelectedIntensity] = useState("medium");
    const [customIntensity, setCustomIntensity] = useState(60);

    const handleIntensityClick = (level: typeof intensityLevels[0]) => {
        setSelectedIntensity(level.id);
        if (level.id !== "custom") {
            setCustomIntensity(level.value);
        }
    };

    return (
        <div className="space-y-3 sm:space-y-4 md:space-y-5 bg-gray-900/50 border border-gray-700 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl md:rounded-2xl w-full">

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {categories.map((cat) => {
                    const isActive = activeCategory === cat.id;

                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${isActive
                                ? "bg-purple-600 text-white"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-3 gap-3">
                {intensityLevels.map((level) => (
                    <div
                        key={level.id}
                        onClick={() => handleIntensityClick(level)}
                        className="space-y-2 cursor-pointer group"
                    >
                        <div
                            className={`relative w-full aspect-square rounded-lg overflow-hidden transition-all bg-gray-800/60 group-hover:bg-gray-800/90 ${selectedIntensity === level.id
                                ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900"
                                : "ring-1 ring-gray-700"
                                }`}
                        >
                            <Image
                                src={`https://picsum.photos/200/200?random=${level.id}`}
                                alt={level.label}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}