import { NextResponse } from "next/server";
import YouTube from "youtube-sr";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");
  const rawUrl = searchParams.get("url");

  const targetUrl = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : rawUrl;

  if (!targetUrl) {
    return NextResponse.json(
      { error: "videoId or url query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const video = await YouTube.getVideo(targetUrl);

    if (!video) {
      return NextResponse.json(
        { error: "Video metadata not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: video.id || videoId || "",
      title: video.title || "YouTube Video",
      description: video.description || "",
      durationFormatted: video.durationFormatted || "00:00",
      duration: video.duration || 0,
      uploadedAt: video.uploadedAt || "",
      views: video.views || 0,
      thumbnail: video.thumbnail?.url || (video.id ? `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg` : ""),
      channel: {
        name: video.channel?.name || "YouTube Creator",
        id: video.channel?.id || "",
        url: video.channel?.url || "",
        icon: video.channel?.icon?.url || "",
        subscribers: video.channel?.subscribers || "",
        verified: !!video.channel?.verified,
      },
      likes: video.likes || 0,
    });
  } catch (error: any) {
    console.warn("[API/youtube/video] Failed to fetch metadata:", error?.message || error);
    // Return fallback graceful response so client UI stays functional
    return NextResponse.json(
      {
        id: videoId || "",
        title: "YouTube Video",
        description: "",
        durationFormatted: "00:00",
        duration: 0,
        uploadedAt: "",
        views: 0,
        thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "",
        channel: {
          name: "YouTube Creator",
          id: "",
          url: "",
          icon: "",
          subscribers: "",
          verified: false,
        },
        likes: 0,
        isFallback: true,
      },
      { status: 200 }
    );
  }
}
