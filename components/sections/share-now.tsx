"use client";

import Image from "next/image";

const ShareNow: React.FC = () => {
    return (
        <section className="bg-zinc-900 py-20 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
                            Share with Friends &<br /> Family
                        </h2>
                        <p className="text-white text-medium max-w-xl mx-auto lg:mx-0 tracking-tight mb-8">
                            Create and grow together with the community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                className="group relative inline-flex items-center justify-center gap-2 bg-white text-black font-medium py-3 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Share Now
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 relative flex justify-center items-center h-96">
                        <div className="relative w-full max-w-2xl h-full">
                            <div className="absolute left-0 top-8 z-20">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 w-56 h-70">
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
                            <div className="absolute left-1/2 transform -translate-x-1/2 z-20" style={{ top: '20%' }}>
                                <Image
                                    src="/arrow.png"
                                    alt="Arrow pointing down"
                                    width={50}
                                    height={50}
                                    className="w-20 h-20"
                                />
                            </div>

                            <div className="absolute right-30 bottom-0 z-10">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 w-46 h-54">
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