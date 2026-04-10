"use client";

import Sidebar from "@/components/common/sidebar";
import OverlaysAndStickersContent from "@/components/overlays-and-stickers/OverlaysAndStickersContent";

export default function OverlaysAndStickersPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-800 via-slate-950 to-black py-38">
            <Sidebar />
            <OverlaysAndStickersContent />
        </div>
    );
}
