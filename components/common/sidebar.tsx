"use client";

import { useRouter } from "next/navigation";
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
	{ label: "Home", icon: <FiHome size={18} />, path: "/" },
	{ label: "AI Tools", icon: <FiGrid size={18} />, path: "/ai-tools" },
	{ label: "Change Bg", icon: <FiImage size={18} />, path: "/change-bg" },
	{ label: "Filters & Effects", icon: <FaSlidersH size={18} />, path: "/filters-and-effects" },
	{ label: "Overlays & Stickers", icon: <FiLayers size={18} />, path: "/overlays-and-stickers" },
	{ label: "Auto Captions", icon: <FaRegStickyNote size={18} />, comingSoon: true },
];

const secondaryItems: SidebarItem[] = [
	{ label: "Dark Mode", icon: <FaRegMoon size={18} /> },
	{ label: "Support", icon: <FaRegQuestionCircle size={18} /> },
	{ label: "More", icon: <FiMoreHorizontal size={18} /> },
];

function SidebarButton({ item, onClick }: { item: SidebarItem; onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="group relative flex w-full flex-col items-center gap-1.5 rounded-xl border border-white/10 px-2 py-3 text-white transition hover:border-white/20 hover:bg-white/5"
		>
			<div className="relative">
				{item.icon}
				{item.comingSoon ? (
					<span className="absolute -right-6 -top-2 whitespace-nowrap rounded-full bg-white px-1.5 py-0.5 text-[7px] font-bold uppercase text-black shadow-md">
						New
					</span>
				) : null}
			</div>
			<span className="w-full break-words text-center text-[10px] sm:text-xs font-medium leading-tight line-clamp-3">
				{item.label}
			</span>
		</button>
	);
}

export default function Sidebar() {
	const router = useRouter();

	const handleNavigation = (path: string) => {
		router.push(path);
	};

	return (
		<aside className="flex h-screen w-[80px] sm:w-[90px] md:w-[100px] lg:w-[110px] xl:w-[120px] flex-col border-r border-white/10 bg-gradient-to-br from-zinc-800 via-slate-950 to-black px-2 sm:px-3 py-4 text-white backdrop-blur-md overflow-x-visible">
			<div className="flex-1 overflow-y-auto overflow-x-visible space-y-5 pt-2 sm:pt-2 md:pt-2 lg:pt-20">
				<div className="space-y-2">
					{mainItems.map((item) => (
						<SidebarButton
							key={item.label}
							item={item}
							onClick={() => {
								if (item.comingSoon) {
									alert(`${item.label} coming soon!`);
									return;
								}
								if (item.path) {
									handleNavigation(item.path);
								}
							}}
						/>
					))}
				</div>
			</div>

			<div className="space-y-2 border-t border-white/10 pt-3">
				{secondaryItems.map((item) => (
					<SidebarButton
						key={item.label}
						item={item}
						onClick={() => {
							console.log(`${item.label} clicked`);
						}}
					/>
				))}
			</div>
		</aside>
	);
}