import { FaGlobe } from 'react-icons/fa';



export default function Navbar() {
    return (
        <header className="fixed right-0 top-0 z-30 w-full pl-[84px]">
            <div className="flex justify-end gap-2 p-4 sm:gap-4 sm:p-5">
                <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-text-secondary transition hover:bg-white/5 hover:text-text-primary"
                >
                    <FaGlobe className="inline-block" />
                    English
                </button>
                <button
                    type="button"
                    className="rounded-full px-3 py-2 text-sm font-semibold text-text-secondary transition hover:bg-white/5 hover:text-text-primary"
                >
                    Log in
                </button>
                <button
                    type="button"
                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-background-primary transition hover:opacity-90"
                >
                    Sign up
                </button>
            </div>
        </header>
    );
}