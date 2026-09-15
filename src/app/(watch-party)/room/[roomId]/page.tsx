import { RoomShell } from "@/components/watch-party/RoomShell";

interface RoomPageProps {
  params: Promise<{
    roomId: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RoomPage({ params, searchParams }: RoomPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isGuest = resolvedSearchParams?.guest !== undefined;

  return <RoomShell roomId={resolvedParams.roomId} isGuest={isGuest} />;
}

