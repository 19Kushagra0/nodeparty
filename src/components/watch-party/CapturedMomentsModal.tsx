"use client";

import {
  X,
  Camera,
  Heart,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";

export function CapturedMomentsModal() {
  const {
    isMomentsGalleryOpen,
    setMomentsGalleryOpen,
    capturedMoments,
    likeMoment,
    deleteMoment,
  } = useRoomStore();

  const t = useRoomTheme();

  if (!isMomentsGalleryOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setMomentsGalleryOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl border rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-left space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar transition-all"
        style={{
          backgroundColor: t.surface,
          borderColor: t.border,
          color: t.text,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b" style={{ borderColor: t.border }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl border flex items-center justify-center shadow-2xs shrink-0"
              style={{
                backgroundColor: t.isDark ? `${t.accent}20` : "#fff1f2",
                color: t.accent,
                borderColor: t.isDark ? `${t.accent}40` : "#fecdd3",
              }}
            >
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: t.text }}>
                Party Moments & Memories
              </h3>
              <p className="text-xs sm:text-sm mt-0.5" style={{ color: t.muted }}>
                Live snapshots and unforgettable watch moments captured by your crew.
              </p>
            </div>
          </div>

          <button
            onClick={() => setMomentsGalleryOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0"
            style={{ backgroundColor: t.surfaceHover, color: t.muted }}
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Moments Polaroid Grid */}
        {capturedMoments.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div
              className="w-14 h-14 rounded-2xl border flex items-center justify-center mx-auto"
              style={{ backgroundColor: t.surfaceHover, borderColor: t.border, color: t.muted }}
            >
              <ImageIcon className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold" style={{ color: t.text }}>No Moments Captured Yet</p>
            <p className="text-xs max-w-xs mx-auto" style={{ color: t.muted }}>
              Click the <span className="font-semibold" style={{ color: t.accent }}>[📷 Capture Moment]</span> button on the left sidebar to snapshot live scenes!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
            {capturedMoments.map((moment) => (
              <div
                key={moment.id}
                className="group relative border rounded-2xl p-3 shadow-2xs flex flex-col justify-between space-y-3 transition-all"
                style={{
                  backgroundColor: t.surfaceHover,
                  borderColor: t.border,
                }}
              >
                {/* Image Snapshot Frame */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/40 border" style={{ borderColor: t.border }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={moment.imageUrl}
                    alt={moment.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/75 text-[11px] font-mono text-white backdrop-blur-2xs">
                    {moment.timestamp}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-semibold line-clamp-1" style={{ color: t.text }}>
                    {moment.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs" style={{ color: t.muted }}>
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-semibold"
                      style={{ backgroundColor: t.surface, color: t.muted, border: `1px solid ${t.border}` }}
                    >
                      {moment.capturedBy[0]}
                    </div>
                    <span>{moment.capturedBy}</span>
                  </div>
                </div>

                {/* Actions: Like & Delete */}
                <div className="pt-2 border-t flex items-center justify-between" style={{ borderColor: t.border }}>
                  <button
                    onClick={() => likeMoment(moment.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer border"
                    style={{
                      backgroundColor: moment.hasLiked
                        ? (t.isDark ? `${t.accent}20` : "#fff1f2")
                        : t.surface,
                      color: moment.hasLiked ? t.accent : t.muted,
                      borderColor: moment.hasLiked
                        ? (t.isDark ? `${t.accent}40` : "#fecdd3")
                        : t.border,
                    }}
                  >
                    <Heart
                      className="w-3.5 h-3.5"
                      style={{
                        fill: moment.hasLiked ? t.accent : "none",
                        color: moment.hasLiked ? t.accent : t.muted,
                      }}
                    />
                    <span>{moment.likes}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteMoment(moment.id)}
                      className="p-1.5 rounded-xl transition-colors cursor-pointer"
                      style={{ color: t.muted }}
                      title="Delete Moment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


