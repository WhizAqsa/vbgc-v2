"use client";

import FiltersAndEffectsContent from "@/components/filters-and-effects/FiltersAndEffectsContent";

export default function FiltersAndEffectsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-zinc-800 via-slate-950 to-black pt-20 sm:pt-20 md:pt-24 pl-4 sm:pl-6 lg:pl-[calc(84px+2rem)] pr-4 sm:pr-6 lg:pr-8 py-12 sm:py-16 md:py-20 lg:py-24">
            <FiltersAndEffectsContent />
        </main>
    );
}
