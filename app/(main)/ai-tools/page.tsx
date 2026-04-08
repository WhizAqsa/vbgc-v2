import AIToolsGrid from "@/components/ai-tools/AIToolsGrid";
import Sidebar from "@/components/common/sidebar";

export default function AIToolsPage() {
    return (
        <div className="min-h-screen">
            <Sidebar />
            <AIToolsGrid />
        </div>
    )
}