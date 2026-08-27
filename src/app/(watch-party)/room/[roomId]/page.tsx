import { RoomHeader } from "@/components/watch-party/RoomHeader";
import { RoomClientView } from "@/components/watch-party/RoomClientView";

interface RoomPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  await params;

  return (
    <div className="flex flex-col min-h-screen bg-[#07080b] text-[#f4f4f5] relative selection:bg-rose-500 selection:text-white">
      {/* Background Structural Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Room Header */}
      <RoomHeader />

      {/* Client View with Co-Browsing Canvas, Sidebar, and Floating Control Dock */}
      <RoomClientView />
    </div>
  );
}
