"use client";

import { FilterCategories } from "@/components/filters-and-effects/FilterCategories";
import { BackgroundsGrid } from "@/components/filters-and-effects/BackgroundsGrid";
import { VideoPlayerPreview } from "@/components/filters-and-effects/VideoPlayerPreview";
import Sidebar from "@/components/common/sidebar";
import FiltersAndEffectsContent from "@/components/filters-and-effects/FiltersAndEffectsContent";

export default function FiltersAndEffectsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-800 via-slate-950 to-black py-38">
            <Sidebar />
            <FiltersAndEffectsContent />

        </div>
    );
}
