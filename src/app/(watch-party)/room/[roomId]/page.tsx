import { RoomSidebar } from "@/components/layout/RoomSidebar";
import { RoomClientView } from "@/components/watch-party/RoomClientView";

interface RoomPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  await params;

  return (
    <div className="w-full h-screen max-h-screen p-2 sm:p-3.5 lg:p-4 flex flex-col justify-center items-center overflow-hidden relative">
      {/* Unified Rounded Main App Container */}
      <div className="w-full h-full max-w-[1780px] bg-white/75 backdrop-blur-2xl border border-white/90 rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] flex overflow-hidden p-2 sm:p-3.5 lg:p-4 gap-3 lg:gap-4 relative">
        {/* Column 1: Left Sidebar Rail */}
        <RoomSidebar />

        {/* Columns 2 & 3: Player Column + Chat Column (Starting directly from the top!) */}
        <div className="flex-1 min-w-0 h-full relative z-10 overflow-hidden">
          <RoomClientView />
        </div>
      </div>
    </div>
  );
}
