
import Sidebar from "@/components/common/sidebar";
import FeatureGrid from "@/components/sections/feature-grid";
import MainHero from "@/components/sections/main-hero";

export default function Home() {
    return (
        <div className="min-h-screen bg-background-primary">
            <Sidebar />

            <main className="min-h-screen pl-[84px] pr-4 pt-24 sm:pr-6 lg:pr-8">
                <div className="mx-auto max-w-[1320px]">
                    <MainHero />
                    <FeatureGrid />
                </div>
            </main>
        </div>
    );
}