// app/page.tsx
import Sidebar from "@/components/common/sidebar";
import FeatureGrid from "@/components/sections/feature-grid";
import MainHero from "@/components/sections/main-hero";




export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-800 via-slate-950 to-black">
            <Sidebar />

            <main className="min-h-screen pl-[84px]">
                <MainHero />

                <div className="pt-8 sm:pt-8 lg:pt-12">
                    <FeatureGrid />
                </div>
            </main>
        </div>
    );
}