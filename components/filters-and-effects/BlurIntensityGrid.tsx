"use client";

import React from "react";
import Image from "next/image";

interface IntensityLevel {
    id: string;
    label: string;
    value: number;
}

interface BlurIntensityGridProps {
    intensityLevels: IntensityLevel[];
    selectedIntensity: string;
    customIntensity: number;
    onIntensitySelect: (levelId: string) => void;
    onCustomIntensityChange: (value: number) => void;
}

export function BlurIntensityGrid({
    intensityLevels,
    selectedIntensity,
    customIntensity,
    onIntensitySelect,
    onCustomIntensityChange,
}: BlurIntensityGridProps) {
    const presetLevels = intensityLevels.filter((level) => level.id !== "custom");

    return (
        <div className="space-y-3 sm:space-y-4 bg-gray-900/50 border border-gray-700 p-3 sm:p-4 rounded-lg sm:rounded-xl md:rounded-2xl w-full">
            <h3 className="text-gray-200 text-sm sm:text-base md:text-lg font-semibold text-center">
                Blur Intensity
            </h3>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {presetLevels.map((level) => (
                    <div
                        key={level.id}
                        onClick={() => onIntensitySelect(level.id)}
                        className="space-y-1 sm:space-y-2 cursor-pointer group"
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
                                className={`text-xs sm:text-sm font-medium transition-colors ${selectedIntensity === level.id
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

            {/* Custom Intensity Section */}
            <div className="border-t border-gray-700 pt-4 mt-4 space-y-3">
                <div
                    onClick={() => onIntensitySelect("custom")}
                    className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-all ${selectedIntensity === "custom"
                        ? "bg-purple-600/30 border border-purple-600"
                        : "bg-gray-800/30 border border-gray-700 hover:bg-gray-800/50"
                        }`}
                >
                    <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${selectedIntensity === "custom"
                            ? "border-purple-500"
                            : "border-gray-600"
                            }`}
                    >
                        {selectedIntensity === "custom" && (
                            <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        )}
                    </div>
                    <span className="text-sm font-medium text-gray-200">Custom Intensity</span>
                </div>

                {selectedIntensity === "custom" && (
                    <div className="pl-6 space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                            <span>Intensity Level</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={customIntensity}
                            onChange={(e) => onCustomIntensityChange(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>0%</span>
                            <span className="text-purple-400 font-semibold">{customIntensity}%</span>
                            <span>100%</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
