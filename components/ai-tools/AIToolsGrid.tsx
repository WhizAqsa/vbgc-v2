import Image from "next/image";
import React from "react";

const AIToolsGrid: React.FC = () => {
    const tools = [
        {
            title: "Transparent Video",
            description: "Remove the background completely",
            tag: "NEW",
            image: "https://picsum.photos/300/400?random=1",
        },
        {
            title: "Change Backgrounds",
            description: "Replace background easily",
            tag: "NEW",
            image: "https://picsum.photos/300/400?random=2",
        },
        {
            title: "Blur Background",
            description: "Make the background soft and blurry",
            tag: "NEW",
            image: "https://picsum.photos/300/400?random=3",
        },
        {
            title: "Black & White",
            description: "Turn your video into black and white",
            tag: "NEW",
            image: "https://picsum.photos/300/400?random=4",
        },
        {
            title: "Green Screen",
            description: "Replace green background",
            tag: "NEW",
            image: "https://picsum.photos/300/400?random=5",
        },
        {
            title: "Overlays",
            description: "Add light effects on your video",
            tag: "NEW",
            image: "https://picsum.photos/300/400?random=6",
        },
        {
            title: "Filters",
            description: "Change the colors of your video",
            tag: "NEW",
            image: "https://picsum.photos/300/400?random=7",
        },
        {
            title: "Stickers",
            description: "Add fun stickers to your video",
            tag: "NEW",
            image: "https://picsum.photos/300/400?random=8",
        },
        {
            title: "Add Text",
            description: "Write words on your video",
            tag: "NEW",
            image: "https://picsum.photos/300/400?random=9",
        },
        {
            title: "Auto Captions",
            description: "Subtitles added automatically",
            tag: "COMING SOON",
            image: "https://picsum.photos/300/400?random=10",
        },
    ];


    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-800 via-slate-950 to-black py-16 px-4">
            <div className="max-w-7xl justify-center mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 mt-24 text-white tracking-tight">
                        AI Tools
                    </h1>
                    <p className="text-lg md:text-xl text-white font-sm max-w-3xl tracking-tight">
                        Next-Gen Video Tools to make your life easy
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {tools.map((tool, index) => (
                        <div
                            key={index}
                            className="group bg-zinc-800 rounded-2xl p-4 cursor-pointer transition-transform duration-300 hover:scale-105 flex flex-col h-full"
                        >
                            <div className="relative rounded-xl overflow-hidden mb-4 flex-shrink-0">
                                <Image
                                    src={tool.image}
                                    alt={tool.title}
                                    width={300}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                />

                                <div className="absolute top-2 left-2 z-10">
                                    <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-r-lg bg-white text-black">
                                        {tool.tag}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                                        {tool.title}
                                    </h3>
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>

                                <p className="text-xs text-gray-400 line-clamp-2">
                                    {tool.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AIToolsGrid;