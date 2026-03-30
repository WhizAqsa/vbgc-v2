import Navbar from "@/components/common/navbar";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
        </>
    );
}