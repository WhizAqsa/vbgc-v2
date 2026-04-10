"use client";

import { FilterCategories } from "@/components/overlays-and-stickers/FilterCategories";
import { BackgroundsGrid } from "@/components/overlays-and-stickers/BackgroundsGrid";
import { VideoPlayerPreview } from "@/components/filters-and-effects/VideoPlayerPreview";

export default function OverlaysAndStickersContent() {
    return (
        <div className="max-w-7xl mx-auto ">
            <div className=" mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-3">
                    Overlays & Stickers
                </h1>
                <p className="text-lg tracking-tight text-gray-300">
                    Gone are the days when you needed a physical one
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 space-y-8">
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
