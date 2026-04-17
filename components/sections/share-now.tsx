// components/share-now.tsx
"use client";

import Image from "next/image";

const ShareNow: React.FC = () => {
    return (
        <section className="bg-zinc-900 py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                    <div className="w-full md:w-5/12 lg:flex-1 text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white mb-3 sm:mb-4 tracking-tight">
                            Share with Friends &<br className="hidden sm:block" /> Family
                        </h2>
                        <p className="text-sm sm:text-base md:text-base lg:text-lg text-white max-w-lg mx-auto md:mx-0 tracking-tight mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                            Create and grow together with the community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                            <button
                                className="group relative inline-flex items-center justify-center gap-2 bg-white text-black font-medium py-2 sm:py-2.5 md:py-3 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                            >
                                Share Now
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-7/12 lg:flex-1 relative flex justify-center items-center h-48 sm:h-56 md:h-72 lg:h-80 xl:h-96">
                        <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl h-full">
                            <div className="absolute left-0 top-0 sm:top-4 md:top-6 lg:top-8 z-20">
                                <div className="relative rounded-2xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/20 w-32 sm:w-40 md:w-44 lg:w-48 xl:w-56 h-40 sm:h-48 md:h-52 lg:h-56 xl:h-70">
                                    <Image
                                        src="https://picsum.photos/id/100/400/300"
                                        alt="Friends sharing"
                                        width={400}
                                        height={300}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 z-20" style={{ top: '15%', left: '55%' }}>
                                <Image
                                    src="/arrow.png"
                                    alt="Arrow pointing down"
                                    width={50}
                                    height={50}
                                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
                                />
                            </div>

                            <div className="absolute right-0 sm:right-4 md:right-8 lg:right-16 bottom-0 sm:bottom-2 md:bottom-4 z-10">
                                <div className="relative rounded-2xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/20 w-28 sm:w-32 md:w-36 lg:w-40 xl:w-46 h-36 sm:h-40 md:h-44 lg:h-48 xl:h-54">
                                    <Image
                                        src="https://picsum.photos/id/101/400/300"
                                        alt="Family together"
                                        width={400}
                                        height={300}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShareNow;