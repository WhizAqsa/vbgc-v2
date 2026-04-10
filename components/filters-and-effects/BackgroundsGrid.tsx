"use client";

import { useState } from "react";
import Image from "next/image";

const intensityLevels = [
    { id: "none", label: "None", value: 0 },
    { id: "low", label: "Low", value: 25 },
    { id: "medium", label: "Medium", value: 50 },
    { id: "high", label: "High", value: 75 },
    { id: "custom", label: "Custom", value: 60 }, // Default custom value
];

export function BackgroundsGrid() {
    const [selectedIntensity, setSelectedIntensity] = useState("medium");
    const [customIntensity, setCustomIntensity] = useState(60);

    const handleIntensityClick = (level: typeof intensityLevels[0]) => {
        setSelectedIntensity(level.id);
        if (level.id !== "custom") {
            setCustomIntensity(level.value);
        }
    };

    return (
        <div className="space-y-4 bg-gray-900/50 border border-gray-700 p-4 rounded-2xl w-full">
            <h3 className="text-gray-200 text-lg font-semibold text-center">
                Blur Intensity
            </h3>

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

                        <div className="text-center">
                            <p
                                className={`text-sm font-medium transition-colors ${selectedIntensity === level.id
                                    ? "text-purple-400"
                                    : "text-gray-400 group-hover:text-gray-200"
                                    }`}
                            >
                                {level.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-4 pt-4">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={customIntensity}
                    onChange={(e) => {
                        setCustomIntensity(parseInt(e.target.value));
                        setSelectedIntensity("custom");
                    }}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 min-w-[60px] text-center">
                    <span className="text-white font-semibold">{customIntensity}</span>
                </div>
            </div>
        </div>
    );
}