import { NextResponse } from "next/server";
import YouTube from "youtube-sr";

function formatViews(views: number | undefined): string {
  if (typeof views !== "number" || isNaN(views)) return "0 views";
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B views`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1).replace(/\.0$/, "")}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1).replace(/\.0$/, "")}K views`;
  return `${views} views`;
}

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
    const videos = await YouTube.search(query.trim(), {
      limit: 12,
      type: "video",
      safeSearch: false,
    });

    const mapped = (videos || []).map((v) => {
      const channelIcon =
        typeof v.channel?.icon === "string"
          ? v.channel.icon
          : (v.channel?.icon as any)?.url || "";

      const durationFormatted =
        v.durationFormatted ||
        (v as any).duration_formatted ||
        (v.live ? "LIVE" : "00:00");

      return {
        id: v.id || "",
        title: v.title || "YouTube Video",
        channel: {
          name: v.channel?.name || "YouTube Creator",
          id: v.channel?.id || "",
          url: v.channel?.url || "",
          icon: channelIcon,
          verified: !!(v.channel as any)?.verified,
        },
        thumbnail:
          v.thumbnail?.url ||
          (v.id ? `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` : ""),
        duration: durationFormatted,
        views: formatViews(v.views),
        uploadedAt: v.uploadedAt || "",
        url: v.url || (v.id ? `https://www.youtube.com/watch?v=${v.id}` : ""),
        description: v.description || "",
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
