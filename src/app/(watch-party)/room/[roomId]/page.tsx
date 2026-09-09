import { RoomShell } from "@/components/watch-party/RoomShell";

interface RoomPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  await params;

  return <RoomShell />;
}

