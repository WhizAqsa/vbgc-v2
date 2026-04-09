
import { UploadVideo } from "@/components/change-bg/UploadVideo";
import Sidebar from "@/components/common/sidebar";
export default function ChangeBgPage() {
    return (
        <div className="min-h-screen">
            <Sidebar />
            <UploadVideo />
        </div>
    )
}