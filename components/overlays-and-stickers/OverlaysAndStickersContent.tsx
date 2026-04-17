"use client";

import { FilterCategories } from "@/components/overlays-and-stickers/FilterCategories";
import { BackgroundsGrid } from "@/components/overlays-and-stickers/BackgroundsGrid";
import { VideoPlayerPreview } from "@/components/filters-and-effects/VideoPlayerPreview";

export default function OverlaysAndStickersContent() {
    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="mb-4 sm:mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-1 sm:mb-2 md:mb-3">
                    Overlays & Stickers
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg tracking-tight text-gray-300">
                    Gone are the days when you needed a physical one
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                    <FilterCategories />
                    <BackgroundsGrid />
                </div>

                <div className="lg:col-span-3">
                    <VideoPlayerPreview />
                </div>
            </div>
        </div>
    );
}
