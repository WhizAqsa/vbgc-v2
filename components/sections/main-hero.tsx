import { FiUpload } from "react-icons/fi";

import type { FloatingCard } from "@/types/home";

const leftCards: FloatingCard[] = [
    {
        title: "Portrait",
        gradient: "from-orange-300/70 via-fuchsia-500/30 to-cyan-300/70",
        positionClass: "left-8 top-28 rotate-[-10deg]",
    },
    {
        title: "Lifestyle",
        gradient: "from-emerald-300/80 via-teal-400/40 to-sky-300/80",
        positionClass: "left-28 top-36 rotate-[12deg]",
    },
    {
        title: "Sports",
        gradient: "from-cyan-300/75 via-blue-500/35 to-orange-300/70",
        positionClass: "left-24 top-64 rotate-[5deg]",
    },
];

const rightCards: FloatingCard[] = [
    {
        title: "Studio",
        gradient: "from-fuchsia-300/70 via-blue-500/35 to-cyan-300/75",
        positionClass: "right-20 top-28 rotate-[12deg]",
    },
    {
        title: "Travel",
        gradient: "from-orange-300/70 via-pink-500/30 to-indigo-300/80",
        positionClass: "right-4 top-36 rotate-[-10deg]",
    },
    {
        title: "Outdoors",
        gradient: "from-cyan-300/80 via-blue-500/30 to-emerald-300/80",
        positionClass: "right-24 top-64 rotate-[-5deg]",
    },
];

function FloatingMiniCard({ card }: { card: FloatingCard }) {
    return (
        <div
            className={`absolute hidden h-24 w-24 rounded-2xl border border-white/20 bg-gradient-to-br p-2 shadow-xl md:block ${card.gradient} ${card.positionClass}`}
        >
            <div className="flex h-full items-end rounded-xl bg-black/35 px-2 py-1 text-xs font-semibold text-white">
                {card.title}
            </div>
        </div>
    );
}

export default function MainHero() {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-background-secondary via-background-primary to-background-primary px-6 pb-10 pt-8 sm:px-10 sm:pt-10">
            <div className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-28 top-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />

            {[...leftCards, ...rightCards].map((card) => (
                <FloatingMiniCard key={card.title} card={card} />
            ))}

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
                    Video Background Changer
                </h1>
                <p className="mt-3 text-lg text-text-secondary sm:text-2xl">
                    Instantly remove your video backgrounds using AI
                </p>

                <button
                    type="button"
                    className="mt-10 flex w-full max-w-3xl flex-col items-center justify-center rounded-[34px] border border-white/15 bg-gradient-to-br from-background-secondary via-background-primary to-background-secondary px-6 py-12 text-center shadow-2xl transition hover:border-white/30 hover:shadow-lg"
                >
                    <FiUpload size={38} className="text-text-primary" />
                    <span className="mt-3 text-3xl font-medium text-text-primary">Click or Drag & Drop to Upload</span>
                    <span className="mt-2 text-xl text-text-secondary">
                        supported formats: .mp4, .webm, .mov, .gif
                    </span>
                </button>
            </div>
        </section>
    );
}