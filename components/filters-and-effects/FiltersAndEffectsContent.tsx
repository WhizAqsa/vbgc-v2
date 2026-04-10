"use client";

import { FilterCategories } from "@/components/filters-and-effects/FilterCategories";
import { BackgroundsGrid } from "@/components/filters-and-effects/BackgroundsGrid";
import { VideoPlayerPreview } from "@/components/filters-and-effects/VideoPlayerPreview";

export default function FiltersAndEffectsContent() {
    return (
        <div className="max-w-7xl mx-auto ">
            <div className=" mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-3">
                    Filters & Effects
                </h1>
                <p className="text-lg tracking-tight text-gray-300">
                    Make your video stand out with these cool effects
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
