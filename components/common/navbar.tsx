import { FaGlobe } from 'react-icons/fa';

export default function Navbar() {
    return (
        <header className="fixed right-0 top-0 z-30 w-full bg-gradient-to-br from-zinc-800 via-slate-950 to-black pl-[84px] text-white">
            <div className="flex items-center justify-end gap-3 px-6 py-4 sm:gap-6 sm:px-8 sm:py-5">
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                    <FaGlobe className="inline-block" size={18} />
                    English
                </button>
                <button
                    type="button"
                    className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                    Log in
                </button>
                <button
                    type="button"
                    className="rounded-full border-2 border-white bg-white px-6 py-2.5 text-sm font-bold text-black transition hover:bg-white/90"
                >
                    Sign up
                </button>
            </div>
        </header>
    );
}