import Image from "next/image";

export default function FeatureBreakdown() {
    const features = [
        {
            id: 1,
            title: "Smart AI Detection",
            description:
                "Precisely detects humans, hair edges, and motion with frame-by-frame accuracy—even in complex scenes.",
            buttonText: "Try AI Detection",
            image: "https://picsum.photos/id/1/600/400",
            imageAlt: "AI Detection feature",
            imageLeft: true,
            tags: ["Precision hair detection", "Real-time motion Tracking", "Shadow and Edge Refinement"],
        },
        {
            id: 2,
            title: "Custom Backgrounds",
            description:
                "Swap backgrounds instantly with solid colors, high-res images, or dynamic video loops for any creative vision.",
            buttonText: "Explore Backgrounds",
            image: "https://picsum.photos/id/2/600/400",
            imageAlt: "Custom Backgrounds feature",
            imageLeft: false,
            tags: ["Solid Color Library", "High-res Images", "Dynamic Video Loops"],
        },
    ];

    return (
        <section className="w-full px-4 py-16 md:py-24 bg-zinc-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
                        <span className="bg-clip-text text-white">
                            Everything You Need to
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-purple-500 via-sky-400 to-purple-500 bg-clip-text text-transparent">
                            Remove Backgrounds Like a Pro
                        </span>
                    </h2>
                    <p className="text-xs md:text-sm text-white max-w-3xl mx-auto mt-4">
                        Professional-grade AI tools for creators, marketers, and teams—from single clips to full-length
                        productions.
                    </p>
                </div>

                <div className="space-y-16 md:space-y-24">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className={`flex flex-col ${feature.imageLeft ? "md:flex-row" : "md:flex-row-reverse"
                                } gap-8 md:gap-12 items-center`}
                        >
                            <div className="flex-1 w-full">
                                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/9] w-full">
                                    <Image
                                        src={feature.image}
                                        alt={feature.imageAlt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 w-full">
                                <h3 className="text-lg md:text-xl lg:text-2xl tracking-tight font-semibold text-white mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-sm text-gray-400 mb-6">
                                    {feature.description}
                                </p>

                                {/* Feature Tags */}
                                {feature.tags && (
                                    <div className="space-y-2 mb-6">
                                        {feature.tags.map((tag, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <svg
                                                    className="w-5 h-5 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                <span className="text-gray-400 text-sm">{tag}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Button */}
                                <button className="flex items-center text-black bg-white rounded-full font-semibold px-4 py-3 hover:text-purple-700 transition-colors duration-200">
                                    <span className="text-xs justify-center md:text-xs">{feature.buttonText}</span>
                                    <svg
                                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 md:mt-24">
                    <div className="rounded-2xl border border-blue-300 p-8 md:p-12 text-center max-w-6xl mx-auto">
                        <div className="flex flex-row items-center justify-between gap-8">
                            <div className="space-y-2 text-left flex-1">
                                <h2 className="text-xl md:text-2xl lg:text-3xl tracking-tight font-semibold text-white">
                                    Ready To Transform Your Videos?
                                </h2>
                                <p className="text-gray-400 text-medium tracking-tight md:text-lg">
                                    Start removing backgrounds with AI in seconds. No credit card required.
                                </p>
                            </div>

                            <div className="flex flex-row gap-4">
                                <button className="px-10 py-3 bg-white text-black rounded-full text-xs hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap">
                                    Start Free Trial
                                </button>
                                <button className="px-10 py-3 bg-black text-white border border-gray-200 rounded-full text-xs hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap">
                                    Watch Demo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-16 md:py-24 bg-zinc-900 mt-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                            <div>
                                <div className="mb-4">
                                    <span className="text-sm md:text-base font-semibold bg-gradient-to-r from-purple-500 via-sky-300 to-purple-300 bg-clip-text text-transparent tracking-wide uppercase">
                                        WHAT IS IT
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-6">
                                        AI-Powered Video Background Removal Made Simple
                                    </h2>
                                </div>

                                <div className="mb-8">
                                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
                                        AI Video Background Changer is a cutting-edge tool that uses artificial intelligence to automatically detect and remove backgrounds from your videos. Whether you&rsquo;re filming in your bedroom, office, or any location, our AI can isolate you or your subject and replace the background with anything you want or make it completely transparent.
                                    </p>
                                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                                        Built on state-of-the-art machine learning models, our platform analyzes each frame of your video to precisely identify the subject and separate it from the background. The result is clean, professional-looking videos with transparent backgrounds that you can overlay on any scene or environment you choose.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="rounded-2xl border-2 border-white overflow-hidden mb-8 aspect-video bg-gray-800">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="https://picsum.photos/id/20/800/600"
                                            fill
                                            alt="Video background removal demo"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-base font-bold text-white tracking-tight mb-1">
                                            Lightning<br /> Fast
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            Process videos in minutes
                                        </p>
                                    </div>

                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-base font-bold text-white tracking-tight mb-1">
                                            AI-Powered Precision
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            Advanced machine learning
                                        </p>
                                    </div>

                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-base font-bold text-white tracking-tight mb-1">
                                            Professional Quality
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            Studio-grade results
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}