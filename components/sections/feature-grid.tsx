import type { ShowcaseCard } from "@/types/home";

const showcaseCards: ShowcaseCard[] = [
    {
        badge: "NEW",
        title: "CHANGE VIDEO BACKGROUNDS",
        description: "Remove, select, and apply a fresh background instantly",
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
    return (
        <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-4">
            {showcaseCards.map((card) => (
                <article
                    key={card.title}
                    className={`group relative min-h-52 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${card.gradient} p-4 transition hover:-translate-y-1 hover:border-white/20`}
                >
                    <span className="inline-flex rounded-md bg-white px-2 py-1 text-[10px] font-bold text-background-primary">
                        {card.badge}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                        <h3 className="text-xl font-bold text-text-primary">{card.title}</h3>
                        <p className="mt-1 text-sm text-text-secondary">{card.description}</p>
                    </div>
                </article>
            ))}
        </section>
    );
}