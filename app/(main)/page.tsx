// app/page.tsx
import Sidebar from "@/components/common/sidebar";
import BackgroundsGrid from "@/components/sections/backgrounds-grid";
import FeatureBreakdown from "@/components/sections/feature-breakdown";
import FeatureGrid from "@/components/sections/feature-grid";
import FinancialMetrics from "@/components/sections/financial-metrics";
import HowItWorks from "@/components/sections/how-ai-works";
import KeyFeatures from "@/components/sections/key-features";
import MainHero from "@/components/sections/main-hero";
import StatCards from "@/components/sections/stat-cards";
import UserBenefits from "@/components/sections/user-benefits";
import BestPractices from "@/components/sections/best-practices";
import StepByStepGuide from "@/components/sections/step-by-step-guide";
import UseCases from "@/components/sections/use-cases";




export default function Home() {
    return (
        <div className="min-h-screen ">
            <Sidebar />

            <main className="min-h-screen pl-[84px]">
                <MainHero />

                <div className="pt-8 sm:pt-8 lg:pt-12 bg-gradient-to-br from-zinc-800 via-slate-950 to-black">
                    <FeatureGrid />
                </div>
                <div className="pt-8 sm:pt-8 lg:pt-12 bg-gradient-to-br from-zinc-800 via-slate-950 to-black">
                    <FinancialMetrics />
                </div>
                <div className="pt-8 sm:pt-8 lg:pt-12 bg-zinc-900">
                    <BackgroundsGrid />
                </div>
                <div className="pt-8 sm:pt-8 lg:pt-12 bg-zinc-900">
                    <FeatureBreakdown />
                </div>

                <div className="pt-8 sm:pt-8 lg:pt-12 bg-zinc-900">
                    <HowItWorks />
                </div>

                <div className="pt-8 sm:pt-8 lg:pt-12 bg-zinc-900">
                    <StatCards />
                </div>

                <div className="bg-zinc-900">
                    <KeyFeatures />
                </div>

                <div className="bg-zinc-900">
                    <UserBenefits />
                </div>

                <div className="bg-zinc-900">
                    <UseCases />
                </div>

                <div className="bg-zinc-900">
                    <StepByStepGuide />
                </div>

                <div className="bg-zinc-900">
                    <BestPractices />
                </div>



            </main>
        </div>
    );
}