// components/step-by-step-guide.tsx
import React from 'react';
import Image from 'next/image';

const StepByStepGuide = () => {
    const steps = [
        {
            number: "01",
            title: "Upload Your Video",
            description: "Our video file or is MP4, MOV, AVI, resolution.",
            image: "https://picsum.photos/id/0/400/500",
        },
        {
            number: "02",
            title: "Adjust Settings",
            description: "Fine-tune AI detection, adjust edge refinement, and preview results in real-time.",
            image: "https://picsum.photos/id/26/400/500",
        },
        {
            number: "03",
            title: "Choose Background",
            description: "Pick from professional backgrounds, upload your own, or export with transparency.",
            image: "https://picsum.photos/id/20/400/500",
        },
        {
            number: "04",
            title: "Process with AI",
            description: "Let our AI process your video in minutes. Continue working while it renders.",
            image: "https://picsum.photos/id/96/400/500",
        },
        {
            number: "05",
            title: "Download & Share",
            description: "Preview, adjust, and your preferred format any platform.",
            image: "https://picsum.photos/id/42/400/500",
        }
    ];

    return (
        <section className="py-20 px-4 bg-zinc-900">
            <div className="max-w-full mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Step-by-Step Guide
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Get started in minutes with our simple, intuitive workflow
                    </p>
                </div>

                {/* Steps in a Row */}
                <div className="flex flex-nowrap justify-center gap-6 mb-16 overflow-x-auto pb-6 px-4">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-64"
                        >
                            {/* Image Container with Overlay Arrow */}
                            <div className="relative mb-4">
                                <div className="relative h-60 w-full rounded-2xl overflow-hidden">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        width={300}
                                        height={400}
                                        className="w-full h-full object-cover"
                                        priority={index < 2}
                                    />
                                </div>

                                {index < steps.length - 1 && (
                                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
                                            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="text-left">

                                <h3 className="text-medium md:text-lg lg:text-xl font-semibold text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 tracking-tight">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center mt-12">
                    <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:shadow-white/20 transition-all duration-300 transform hover:scale-105">
                        Start Processing Your First Video
                    </button>
                </div>
            </div>
        </section>
    );
};

export default StepByStepGuide;