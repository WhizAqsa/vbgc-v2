import { FiUpload } from "react-icons/fi";

import type { FloatingCard } from "@/types/home";

const leftCards: FloatingCard[] = [
    {
        title: "Portrait",
        gradient: "from-orange-300/70 via-fuchsia-500/30 to-cyan-300/70",
        positionClass: "left-1 sm:left-2 md:left-4 lg:left-4 top-16 md:top-20 lg:top-20 xl:top-24 xl:left-22 rotate-[-8deg]",
    },
    {
        title: "Lifestyle",
        gradient: "from-emerald-300/80 via-teal-400/40 to-sky-300/80",
        positionClass: "left-8 sm:left-12 md:left-16 lg:left-12 top-28 md:top-32 lg:top-28 xl:top-100 xl:left-40 rotate-[8deg]",
    },
    {
        title: "Sports",
        gradient: "from-cyan-300/75 via-blue-500/35 to-orange-300/70",
        positionClass: "left-4 sm:left-6 md:left-10 lg:left-8 top-56 md:top-64 lg:top-48 xl:top-60 xl:left-50 rotate-[3deg]",
    },
];

const rightCards: FloatingCard[] = [
    {
        title: "Studio",
        gradient: "from-fuchsia-300/70 via-blue-500/35 to-cyan-300/75",
        positionClass: "right-1 sm:right-2 md:right-4 lg:right-20 xl:right-24 top-16 md:top-20 lg:top-20 xl:top-15 rotate-[8deg]",
    },
    {
        title: "Travel",
        gradient: "from-orange-300/70 via-pink-500/30 to-indigo-300/80",
        positionClass: "right-8 sm:right-12 md:right-16 lg:right-32 xl:right-55 top-28 md:top-32 lg:top-28 xl:top-54 rotate-[-8deg]",
    },
    {
        title: "Outdoors",
        gradient: "from-cyan-300/80 via-blue-500/30 to-emerald-300/80",
        positionClass: "right-4 sm:right-6 md:right-10 lg:right-24 xl:right-28 top-56 md:top-64 lg:top-48 xl:top-90 rotate-[-3deg]",
    },
];

function FloatingMiniCard({ card }: { card: FloatingCard }) {
    return (
        <div
            className={`hidden md:absolute md:flex md:h-16 md:w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 xl:h-24 xl:w-24 rounded-2xl border border-white/20 bg-gradient-to-br p-1.5 sm:p-2 shadow-xl backdrop-blur-sm ${card.gradient} ${card.positionClass}`}
        >
            <div className="flex h-full items-end rounded-xl bg-black/35 px-1.5 sm:px-2 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-white md:text-xs lg:text-sm">
                {card.title}
            </div>
        </div>
    );
}

export default function MainHero() {
    return (
        <section className="relative bg-gradient-to-br from-zinc-800 via-slate-950 to-black text-white shadow-2xl px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-8 md:pt-10 lg:pt-12 overflow-x-visible">
            <div className="pointer-events-none absolute -left-20 top-8 h-40 w-40 sm:h-52 sm:w-52 md:h-60 md:w-60 lg:h-72 lg:w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-28 top-10 h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80 rounded-full bg-accent/15 blur-3xl" />

            {[...leftCards, ...rightCards].map((card) => (
                <FloatingMiniCard key={card.title} card={card} />
            ))}

            <div className="relative z-10 mx-auto max-w-3xl sm:max-w-4xl md:max-w-4xl lg:max-w-5xl px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white">
                    Video Background Changer
                </h1>
                <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white">
                    Instantly remove your video backgrounds using AI
                </p>

                <div className="relative mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                    <button
                        type="button"
                        className="group mx-auto flex w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl flex-col items-center justify-center rounded-2xl sm:rounded-[28px] md:rounded-[34px] border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent px-4 sm:px-5 md:px-6 py-6 sm:py-8 md:py-10 lg:py-12 text-center shadow-2xl transition-all hover:border-white/30 hover:from-white/20 hover:shadow-3xl"
                    >
                        <FiUpload size={20} className="text-white sm:size-24 md:size-28 lg:size-32" />
                        <span className="mt-2 sm:mt-2 md:mt-3 text-sm sm:text-lg md:text-xl lg:text-2xl font-medium text-white">
                            Click or Drag & Drop to Upload
                        </span>
                        <span className="mt-1 sm:mt-1 md:mt-2 text-[10px] sm:text-xs md:text-sm lg:text-base text-white/70">
                            supported formats: .mp4, .webm, .mov, .gif
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}