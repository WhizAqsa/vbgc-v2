// components/best-practices.tsx
import React from 'react';

const BestPractices = () => {
    const tips = [
        {
            title: "Good Lighting",
            description: "Use even, well-distributed lighting to help the AI distinguish between subject and background.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
        },
        {
            title: "High Contrast",
            description: "Choose clothing and subjects that contrast with your background for cleaner edge detection.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
            ),
        },
        {
            title: "Stable Camera",
            description: "Use a tripod or stable surface to minimize camera shake and improve processing accuracy.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
        {
            title: "Subject Distance",
            description: "Maintain some distance between your subject and the background to avoid shadows and blending.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        }
    ];

    return (
        <section className="py-20 px-4 bg-zinc-900">
            <div className="max-w-7xl mx-auto">
                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="sticky top-20">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                            Best Practices &<br />Tips
                        </h2>
                        <p className="text-gray-400 text-medium md:text-lg lg:text-xl tracking-tight">
                            Follow these recommendations to achieve<br /> the best possible results with our AI Video<br /> Background Changer.
                        </p>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                        {tips.map((tip, index) => (
                            <div
                                key={index}
                                className="bg-zinc-800/60 rounded-2xl p-6 border border-zinc-700 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
                            >
                                <div className="mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-900 flex items-center justify-center text-white">
                                        {tip.icon}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {tip.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {tip.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BestPractices;