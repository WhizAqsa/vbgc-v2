// components/sections/financial-metrics.tsx
export default function FinancialMetrics() {
    const metrics = [
        {
            value: "100M+",
            label: "Downloads",
        },
        {
            value: "100K+",
            label: "Creators",
        },
        {
            value: "4.8",
            label: "App Store Ratings",
        },
        {
            value: "15+",
            label: "Languages",
        },
    ];

    return (
        <section className="w-full bg-zinc-900 py-16 sm:py-30 lg:py-38">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white mb-1">
                                {metric.value}
                            </div>
                            <div className="text-xs sm:text-sm text-zinc-400 font-normal">
                                {metric.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}