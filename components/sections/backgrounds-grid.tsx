import Image from "next/image";

export default function BackgroundsGrid() {
    const backgrounds = [
        {
            id: 1,
            src: "https://picsum.photos/id/104/800/600", // landscape with dog
            alt: "Classic nature background",
            width: 800,
            height: 600,
        },
        {
            id: 2,
            src: "https://picsum.photos/id/15/800/450", // landscape with river
            alt: "AI generated abstract",
            width: 800,
            height: 450,
        },
        {
            id: 3,
            src: "https://picsum.photos/id/169/800/400", // taller landscape - will be smallest height
            alt: "Timeless classic",
            width: 800,
            height: 400,
        },
        {
            id: 4,
            src: "https://picsum.photos/id/155/800/450", // another landscape
            alt: "Modern gradient",
            width: 800,
            height: 450,
        },
        {
            id: 5,
            src: "https://picsum.photos/id/20/800/600", // landscape with keyboard
            alt: "Vintage style",
            width: 800,
            height: 600,
        },
    ];

    return (
        <section className="w-full px-4 py-16 md:py-24 bg-zinc-900">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-4">
                        Backgrounds for Everything
                    </h2>
                    <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto">
                        From AI-generated ones to timeless classics,
                        <br />
                        find the perfect start for any video on
                        <br />
                        <span className=" text-zinc-600">Video Background Changer</span>
                    </p>
                    <button className="mt-8 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-800 transition-colors duration-200 shadow-md hover:shadow-lg">
                        Try now
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                    {backgrounds.map((bg, index) => {
                        // Determine height classes based on position (0-indexed)
                        // 1st (index 0) and last (index 4): largest height
                        // 2nd (index 1) and 4th (index 3): medium height
                        // 3rd (index 2): smallest height
                        let heightClass = "";
                        if (index === 0 || index === 4) {
                            heightClass = "h-32 sm:h-40 md:h-64 lg:h-96"; // largest
                        } else if (index === 1 || index === 3) {
                            heightClass = "h-28 sm:h-36 md:h-56 lg:h-80"; // medium
                        } else if (index === 2) {
                            heightClass = "h-24 sm:h-32 md:h-48 lg:h-72"; // smallest
                        }

                        return (
                            <div
                                key={bg.id}
                                className={`relative rounded-3xl overflow-hidden shadow-lg ${heightClass} w-full group cursor-pointer transition-transform duration-300 hover:scale-105`}
                            >
                                <Image
                                    src={bg.src}
                                    alt={bg.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 20vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                        );
                    })}
                </div>

                {/* Create, Edit & Share on the Go Button */}
                <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 flex justify-center px-4 sm:px-0">
                    <button className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gradient-to-r from-sky-400 via-white to-sky-400 text-gray-900 rounded-full font-medium hover:from-sky-500 hover:to-blue-500 transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto">
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>

                        <span className="text-sm sm:text-base md:text-lg text-center">
                            Create, Edit & Share on the Go
                        </span>

                        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200">
                            <svg
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                            <span className="text-xs sm:text-sm md:text-base font-medium">
                                Download for free
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}