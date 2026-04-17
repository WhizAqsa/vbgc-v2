import Navbar from "@/components/common/navbar";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-zinc-800 via-slate-950 to-black">
                {children}
            </main>
        </>
    );
}