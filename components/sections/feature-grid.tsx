"use client";
import { useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { ShowcaseCard } from "@/types/home";

const showcaseCards: ShowcaseCard[] = [
    {
        badge: "NEW",
        title: "CHANGE VIDEO BACKGROUNDS",
        description: "Remove, and apply a background instantly",
        gradient: "from-zinc-700 via-slate-900 to-zinc-950",
    },
    {
        badge: "TRENDING",
        title: "TRENDING EFFECTS",
        description: "Try out trending backgrounds and overlay effects",
        gradient: "from-indigo-500/70 via-slate-900 to-zinc-950",
    },
    {
        badge: "UNLIMITED",
        title: "GREEN SCREEN",
        description: "One-tap green screen, no need for a physical one",
        gradient: "from-lime-400 via-emerald-300 to-slate-800",
    },
    {
        badge: "UNLIMITED",
        title: "AI Background",
        description: "Generate your own custom backgrounds",
        gradient: "from-blue-300 via-slate-700 to-zinc-950",
    },
];

export default function FeatureGrid() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!carouselRef.current) return;
        const scrollAmount = carouselRef.current.offsetWidth;
        const newPosition =
            direction === "left"
                ? Math.max(scrollPosition - scrollAmount, 0)
                : scrollPosition + scrollAmount;

        carouselRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
        setScrollPosition(newPosition);
    };

    return (
        <section className="relative w-full px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-zinc-800 via-slate-950 to-black">
            <div className="relative">
                <div
                    ref={carouselRef}
                    className="flex gap-5 overflow-x-hidden scroll-smooth"
                >
                    {showcaseCards.map((card) => (
                        <article
                            key={card.title}
                            className={`group relative min-h-[250px] w-full sm:w-[350px] md:w-[400px] lg:w-[450px] flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${card.gradient} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
                        >
                            <span className="inline-flex rounded-md bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black shadow-md">
                                {card.badge}
                            </span>

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 pt-16">
                                <h3 className="text-xl font-bold text-white tracking-tight sm:text-2xl">
                                    {card.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-300 sm:text-base">
                                    {card.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-3 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/30 sm:-translate-x-4 sm:p-3"
                    type="button"
                    aria-label="Previous"
                >
                    <FiChevronLeft size={20} className="sm:h-6 sm:w-6" />
                </button>
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-3 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/30 sm:translate-x-4 sm:p-3"
                    type="button"
                    aria-label="Next"
                >
                    <FiChevronRight size={20} className="sm:h-6 sm:w-6" />
                </button>
            </div>
        </section>
    );
}