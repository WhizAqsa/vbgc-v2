import {
	FaRegMoon,
	FaRegQuestionCircle,
	FaRegStickyNote,
	FaSlidersH,
} from "react-icons/fa";
import {
	FiGrid,
	FiHome,
	FiImage,
	FiLayers,
	FiMoreHorizontal,
} from "react-icons/fi";

import type { SidebarItem } from "@/types/home";

const mainItems: SidebarItem[] = [
	{ label: "Home", icon: <FiHome size={18} /> },
	{ label: "AI Tools", icon: <FiGrid size={18} /> },
	{ label: "Change Bg", icon: <FiImage size={18} /> },
	{ label: "Filters & Effects", icon: <FaSlidersH size={18} /> },
	{ label: "Overlays & Stickers", icon: <FiLayers size={18} /> },
	{ label: "Auto Captions", icon: <FaRegStickyNote size={18} />, comingSoon: true },
];

const secondaryItems: SidebarItem[] = [
	{ label: "Dark Mode", icon: <FaRegMoon size={18} /> },
	{ label: "Support", icon: <FaRegQuestionCircle size={18} /> },
	{ label: "More", icon: <FiMoreHorizontal size={18} /> },
];

function SidebarButton({ item }: { item: SidebarItem }) {
	return (
		<button
			type="button"
			className="group relative flex w-full flex-col items-center gap-2 rounded-xl border border-white/10 px-2 py-3 text-white transition hover:border-white/20 hover:bg-white/5"
		>
			<div className="relative">
				{item.icon}
				{item.comingSoon ? (
					<span className="absolute -right-3 -top-2 rounded-full bg-white px-1.5 py-0.5 text-[8px] font-bold uppercase text-black shadow-md">
						Coming Soon
					</span>
				) : null}
			</div>
			<span className="w-full break-words text-center text-xs font-medium leading-tight">
				{item.label}
			</span>
		</button>
	);
}

export default function Sidebar() {
	return (
		<aside className="fixed left-0 top-0 z-20 flex h-screen w-[100px] flex-col justify-between border-r border-white/10 bg-gradient-to-br from-zinc-800 via-slate-950 to-black px-3 py-4 text-white backdrop-blur-md">
			<div className="space-y-5 pt-2">
				<div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-text-primary">
					<span className="text-lg font-bold">V</span>
				</div>

				<div className="space-y-2">
					{mainItems.map((item) => (
						<SidebarButton key={item.label} item={item} />
					))}
				</div>
			</div>

			<div className="space-y-2 border-t border-white/10 pt-3">
				{secondaryItems.map((item) => (
					<SidebarButton key={item.label} item={item} />
				))}
			</div>
		</aside>
	);
}