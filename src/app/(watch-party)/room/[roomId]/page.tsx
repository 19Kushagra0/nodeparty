import { RoomProvider } from "@/contexts/RoomProvider";
import { RoomHeader } from "@/components/watch-party/RoomHeader";
import { VideoPlayer } from "@/components/watch-party/VideoPlayer";
import { ParticipantSidebar } from "@/components/watch-party/ParticipantSidebar";

interface RoomPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { roomId } = await params;

  return (
    <RoomProvider roomId={roomId}>
      <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 relative">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        
        <RoomHeader />

        {/* Main Grid Layout */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 max-w-[1700px] w-full mx-auto">
          <VideoPlayer />
          <ParticipantSidebar />
        </div>
      </div>
    </RoomProvider>
  );
}
