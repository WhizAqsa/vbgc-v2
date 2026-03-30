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
	{ label: "Change Background", icon: <FiImage size={18} /> },
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
			className="group relative flex w-full flex-col items-center gap-2 rounded-xl border border-white/10 px-2 py-3 text-text-secondary transition hover:border-white/20 hover:bg-white/5 hover:text-text-primary"
		>
			{item.icon}
			<span className="text-center text-xs font-medium leading-tight">{item.label}</span>
			{item.comingSoon ? (
				<span className="absolute -right-2 top-1/2 -translate-y-1/2 rotate-[-28deg] rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-background-primary">
					Coming Soon
				</span>
			) : null}
		</button>
	);
}

export default function Sidebar() {
	return (
		<aside className="fixed left-0 top-0 z-20 flex h-screen w-[84px] flex-col justify-between border-r border-white/10 bg-background-sidebar/90 px-3 py-4 backdrop-blur-md">
			<div className="space-y-5">
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
