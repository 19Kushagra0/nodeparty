"use client";

import {
  X,
  Camera,
  Heart,
  Image as ImageIcon,
  Trash2,
} from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";

export function CapturedMomentsModal() {
  const {
    isMomentsGalleryOpen,
    setMomentsGalleryOpen,
    capturedMoments,
    likeMoment,
    deleteMoment,
  } = useRoomStore();

  if (!isMomentsGalleryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#0e1117] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl text-left space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-rose-500 flex items-center justify-center text-white">
                <Camera className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-black text-[#f4f4f5] tracking-tight">
                Party Moments & Memories
              </h3>
            </div>
            <p className="text-xs text-zinc-400">
              Live snapshots and unforgettable watch moments captured by your crew.
            </p>
          </div>

          <button
            onClick={() => setMomentsGalleryOpen(false)}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Moments Polaroid Grid */}
        {capturedMoments.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-14 h-14 rounded-xl bg-[#141722] border border-white/[0.08] flex items-center justify-center text-zinc-500 mx-auto">
              <ImageIcon className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold text-zinc-300">No Moments Captured Yet</p>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto">
              Click the <span className="text-rose-400 font-bold">[📷 Capture Moment]</span> button on the bottom control bar to snapshot live scenes!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
            {capturedMoments.map((moment) => (
              <div
                key={moment.id}
                className="group relative bg-[#141722] border border-white/[0.08] hover:border-white/[0.2] rounded-xl p-3 shadow-lg flex flex-col justify-between space-y-3 transition-colors"
              >
                {/* Image Snapshot Frame */}
                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={moment.imageUrl}
                    alt={moment.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/80 text-xs font-mono text-zinc-300 border border-white/10">
                    {moment.timestamp}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    {moment.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <div
                      className="w-4 h-4 rounded-full bg-[#1e2230] flex items-center justify-center text-xs font-mono font-bold text-white"
                    >
                      {moment.capturedBy[0]}
                    </div>
                    <span>{moment.capturedBy}</span>
                  </div>
                </div>

                {/* Actions: Like & Delete */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => likeMoment(moment.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      moment.hasLiked
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        : "bg-white/[0.05] text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        moment.hasLiked ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                    <span>{moment.likes}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteMoment(moment.id)}
                      className="p-1.5 rounded-lg hover:bg-white/[0.08] text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
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
