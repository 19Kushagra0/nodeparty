"use client";

import {
  X,
  Camera,
  Heart,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setMomentsGalleryOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl bg-white border border-zinc-200/80 rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.12)] text-left space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-2xs shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
                Party Moments & Memories
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                Live snapshots and unforgettable watch moments captured by your crew.
              </p>
            </div>
          </div>

          <button
            onClick={() => setMomentsGalleryOpen(false)}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Moments Polaroid Grid */}
        {capturedMoments.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#F0F2F6] border border-zinc-200/80 flex items-center justify-center text-zinc-400 mx-auto">
              <ImageIcon className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold text-zinc-800">No Moments Captured Yet</p>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto">
              Click the <span className="text-rose-500 font-semibold">[📷 Capture Moment]</span> button on the left sidebar to snapshot live scenes!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
            {capturedMoments.map((moment) => (
              <div
                key={moment.id}
                className="group relative bg-[#F8FAFC] border border-zinc-200/70 hover:border-zinc-300 rounded-2xl p-3 shadow-2xs flex flex-col justify-between space-y-3 transition-all"
              >
                {/* Image Snapshot Frame */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/40">
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
                  <h4 className="text-xs sm:text-sm font-semibold text-zinc-800 line-clamp-1">
                    {moment.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <div
                      className="w-4 h-4 rounded-full bg-zinc-200 flex items-center justify-center text-[10px] font-semibold text-zinc-700"
                    >
                      {moment.capturedBy[0]}
                    </div>
                    <span>{moment.capturedBy}</span>
                  </div>
                </div>

                {/* Actions: Like & Delete */}
                <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between">
                  <button
                    onClick={() => likeMoment(moment.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      moment.hasLiked
                        ? "bg-rose-50 text-rose-500 border border-rose-100"
                        : "bg-white hover:bg-zinc-50 text-zinc-600 border border-zinc-200/60"
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
                      className="p-1.5 rounded-xl hover:bg-rose-50 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
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

