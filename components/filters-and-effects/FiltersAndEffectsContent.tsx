"use client";

import { useState } from "react";
import { FilterCategories } from "@/components/filters-and-effects/FilterCategories";
import { BackgroundsGrid } from "@/components/filters-and-effects/BackgroundsGrid";
import { VideoPlayerPreview } from "@/components/filters-and-effects/VideoPlayerPreview";

const intensityLevels = [
    { id: "none", label: "None", value: 0 },
    { id: "low", label: "Low", value: 25 },
    { id: "medium", label: "Medium", value: 50 },
    { id: "high", label: "High", value: 75 },
    { id: "custom", label: "Custom", value: 60 },
];

export default function FiltersAndEffectsContent() {
    const [selectedIntensity, setSelectedIntensity] = useState("medium");
    const [customIntensity, setCustomIntensity] = useState(50);

    const handleIntensitySelect = (levelId: string) => {
        setSelectedIntensity(levelId);
        if (levelId !== "custom") {
            const level = intensityLevels.find((l) => l.id === levelId);
            if (level) {
                setCustomIntensity(level.value);
            }
        }
    };

    const handleCustomIntensityChange = (value: number) => {
        setCustomIntensity(value);
        setSelectedIntensity("custom");
    };

    const getIntensityValue = () => {
        if (selectedIntensity === "custom") {
            return customIntensity;
        }
        const level = intensityLevels.find((l) => l.id === selectedIntensity);
        return level?.value || 0;
    };

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="mb-4 sm:mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-1 sm:mb-2 md:mb-3">
                    Filters & Effects
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg tracking-tight text-gray-300">
                    Make your video stand out with these cool effects
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                    <FilterCategories />
                    <BackgroundsGrid
                        selectedIntensity={selectedIntensity}
                        customIntensity={customIntensity}
                        onIntensitySelect={handleIntensitySelect}
                        onCustomIntensityChange={handleCustomIntensityChange}
                    />
                </div>

                <div className="lg:col-span-3">
                    <VideoPlayerPreview
                        selectedIntensity={selectedIntensity}
                        intensityValue={getIntensityValue()}
                    />
                </div>
            </div>
        </div>
    );
}
