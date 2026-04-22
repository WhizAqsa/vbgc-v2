"use client";

const intensityLevels = [
    { id: "none", label: "None", value: 0 },
    { id: "low", label: "Low", value: 25 },
    { id: "medium", label: "Medium", value: 50 },
    { id: "high", label: "High", value: 75 },
    { id: "custom", label: "Custom", value: 60 }, // Default custom value
];

interface BackgroundsGridProps {
    selectedIntensity: string;
    customIntensity: number;
    onIntensitySelect: (levelId: string) => void;
    onCustomIntensityChange: (value: number) => void;
}

import { BlurIntensityGrid } from "@/components/filters-and-effects/BlurIntensityGrid";

export function BackgroundsGrid({
    selectedIntensity,
    customIntensity,
    onIntensitySelect,
    onCustomIntensityChange,
}: BackgroundsGridProps) {
    return (
        <BlurIntensityGrid
            intensityLevels={intensityLevels}
            selectedIntensity={selectedIntensity}
            customIntensity={customIntensity}
            onIntensitySelect={onIntensitySelect}
            onCustomIntensityChange={onCustomIntensityChange}
        />
    );
}