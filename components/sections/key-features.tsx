
const KeyFeatures = () => {
    const features = {
        tall: {
            title: "Professional Video Processing",
            description: "Handle videos up to 4K resolution with support for all major formats. Our advanced processing engine maintains video quality while removing backgrounds with precision.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            )
        },
        short: {
            title: "24/7 Support",
            description: "Expert assistance when you need help",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        rectangular1: {
            title: "Real-Time Preview",
            description: "See results instantly as you upload and process your videos.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            )
        },
        rectangular2: {
            title: "Custom Backgrounds",
            description: "Replace with solid colors, gradients, images, or other videos.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        rectangular3: {
            title: "Multiple Export Options",
            description: "Download in various formats and resolutions for any platform.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            )
        },
        rectangular4: {
            title: "Secure Processing",
            description: "Your videos are encrypted and automatically deleted after processing",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        }
    };

    return (
        <div className="py-12 md:py-16 bg-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-4">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
                        Key Features
                    </span>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-medium md:text-lg lg:text-xl text-gray-400 tracking-tight">
                        Everything you need to create professional videos with custom backgrounds
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">

                    <div className="flex flex-col gap-6">
                        <div className="group p-6 rounded-2xl bg-zinc-800 border border-gray-500 transition-all duration-300 hover:transform hover:-translate-y-1 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-900 flex items-center justify-center mb-4 text-white">
                                {features.tall.icon}
                            </div>
                            <h3 className="text-lg md:text-xl lg:text-2xl font-medium tracking-tight text-white mb-3">
                                {features.tall.title}
                            </h3>
                            <p className="text-sm md:text-base text-gray-400 text-medium tracking-tight leading-relaxed">
                                {features.tall.description}
                            </p>
                        </div>

                        <div className="group p-6 rounded-2xl bg-zinc-800 border border-gray-500 transition-all duration-300 hover:transform hover:-translate-y-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-900 flex items-center justify-center text-white">
                                    {features.short.icon}
                                </div>
                                <h3 className="text-2xl font-medium tracking-tight text-white">
                                    {features.short.title}
                                </h3>
                            </div>
                            <p className="text-gray-400 text-medium tracking-tight pl-0">
                                {features.short.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="group p-6 rounded-2xl bg-zinc-800 border border-gray-500 transition-all duration-300 hover:transform hover:-translate-y-1 h-full">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-900 flex items-center justify-center mb-4 text-white">
                                {features.rectangular1.icon}
                            </div>
                            <h3 className="text-2xl font-medium tracking-tight text-white mb-2">
                                {features.rectangular1.title}
                            </h3>
                            <p className="text-gray-400 text-medium tracking-tight">
                                {features.rectangular1.description}
                            </p>
                        </div>

                        <div className="group p-6 rounded-2xl bg-zinc-800 border border-gray-500 transition-all duration-300 hover:transform hover:-translate-y-1 h-full">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-900 flex items-center justify-center mb-4 text-white">
                                {features.rectangular2.icon}
                            </div>
                            <h3 className="text-2xl font-medium tracking-tight text-white mb-2">
                                {features.rectangular2.title}
                            </h3>
                            <p className="text-gray-400 text-medium tracking-tight">
                                {features.rectangular2.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="group p-6 rounded-2xl bg-zinc-800 border border-gray-500 transition-all duration-300 hover:transform hover:-translate-y-1 h-full">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-900 flex items-center justify-center mb-4 text-white">
                                {features.rectangular3.icon}
                            </div>
                            <h3 className="text-2xl font-medium tracking-tight text-white mb-2">
                                {features.rectangular3.title}
                            </h3>
                            <p className="text-gray-400 text-medium tracking-tight">
                                {features.rectangular3.description}
                            </p>
                        </div>

                        <div className="group p-6 rounded-2xl bg-zinc-800 border border-gray-500 transition-all duration-300 hover:transform hover:-translate-y-1 h-full">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-900 flex items-center justify-center mb-4 text-white">
                                {features.rectangular4.icon}
                            </div>
                            <h3 className="text-2xl font-medium tracking-tight text-white mb-2">
                                {features.rectangular4.title}
                            </h3>
                            <p className="text-gray-400 text-medium tracking-tight">
                                {features.rectangular4.description}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default KeyFeatures;