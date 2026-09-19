import { NextResponse } from "next/server";
import { search } from "youtube-ext";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || !query.trim()) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required", results: [] },
      { status: 400 }
    );
  }

  try {
    const searchRes = await search(query.trim());
    const videos = searchRes.videos || [];

    const mapped = videos.map((v) => {
      const channelIcon = ""; // youtube-ext doesn't provide channel icons in basic search

      const durationFormatted = v.duration?.text || "00:00";

      return {
        id: v.id || "",
        title: v.title || "YouTube Video",
        channel: {
          name: v.channel?.name || "YouTube Creator",
          id: v.channel?.id || "",
          url: v.channel?.url || "",
          icon: channelIcon,
          verified: false,
        },
        thumbnail:
          v.thumbnails?.[v.thumbnails.length - 1]?.url ||
          (v.id ? `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` : ""),
        duration: durationFormatted,
        views: v.views?.text || "0 views",
        uploadedAt: v.published?.pretty || "",
        url: v.url || (v.id ? `https://www.youtube.com/watch?v=${v.id}` : ""),
        description: "",
      };
    });

    return NextResponse.json({ results: mapped }, { status: 200 });
  } catch (error: any) {
    console.error("[API/youtube/search] Error searching YouTube:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to search YouTube videos", results: [] },
      { status: 500 }
    );
  }
}
