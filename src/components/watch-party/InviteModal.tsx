"use client";

import { useState } from "react";
import { X, Copy, Check, Share2, MessageCircle, Send } from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";

export function InviteModal() {
  const { isInviteModalOpen, setInviteModalOpen, roomId, roomName, roomPasscode } = useRoomStore();
  const t = useRoomTheme();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isInviteModalOpen) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://nodeparty.app/room/${roomId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(roomPasscode || roomId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`🍿 Join my Watch Party on NodeParty: "${roomName}"\n👉 ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(`Watching "${roomName}" live on @NodeParty Cinema! Join our synchronized watch party:`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setInviteModalOpen(false)}
    >
      <div
        className="relative w-full max-w-lg border rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-left space-y-5 transition-all"
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
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: t.text }}>
                Invite Friends to Lounge
              </h3>
              <p className="text-xs sm:text-sm mt-0.5" style={{ color: t.muted }}>
                Anyone with this link can jump in and watch in real-time sync.
              </p>
            </div>
          </div>

          <button
            onClick={() => setInviteModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0"
            style={{ backgroundColor: t.surfaceHover, color: t.muted }}
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Share Link Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold" style={{ color: t.text }}>
            Lounge Direct Link
          </label>
          <div
            className="flex items-center gap-2 p-1 rounded-2xl border"
            style={{ backgroundColor: t.surfaceHover, borderColor: t.border }}
          >
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 px-3 py-2 bg-transparent text-xs sm:text-sm font-mono focus:outline-none select-all truncate"
              style={{ color: t.text }}
            />
            <button
              onClick={copyLink}
              className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer shrink-0"
              style={{ backgroundColor: t.accent, color: t.accentFg }}
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Room Passcode & QR Code Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Room Code Card */}
          <div
            className="p-4 rounded-2xl border flex flex-col justify-between space-y-3"
            style={{ backgroundColor: t.surfaceHover, borderColor: t.border }}
          >
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: t.muted }}>
                Room Passcode
              </span>
              <div className="font-mono text-base sm:text-lg font-bold tracking-wider" style={{ color: t.text }}>
                {roomPasscode || roomId}
              </div>
            </div>
            <button
              onClick={copyCode}
              className="w-full py-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              style={{ backgroundColor: t.surface, borderColor: t.border, color: t.text }}
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied" : "Copy Code"}</span>
            </button>
          </div>

          {/* QR Code Card */}
          <div
            className="p-4 rounded-2xl border flex items-center gap-3"
            style={{ backgroundColor: t.surfaceHover, borderColor: t.border }}
          >
            <div
              className="w-14 h-14 rounded-xl p-1 border shadow-2xs flex items-center justify-center shrink-0"
              style={{ backgroundColor: t.surface, borderColor: t.border }}
            >
              <div className="w-full h-full border border-dashed border-zinc-500 rounded grid grid-cols-3 gap-0.5 p-0.5">
                <div className="rounded-xs" style={{ backgroundColor: t.text }} />
                <div className="rounded-xs" style={{ backgroundColor: t.border }} />
                <div className="rounded-xs" style={{ backgroundColor: t.text }} />
                <div className="rounded-xs" style={{ backgroundColor: t.muted }} />
                <div className="rounded-xs" style={{ backgroundColor: t.accent }} />
                <div className="rounded-xs" style={{ backgroundColor: t.border }} />
                <div className="rounded-xs" style={{ backgroundColor: t.text }} />
                <div className="rounded-xs" style={{ backgroundColor: t.muted }} />
                <div className="rounded-xs" style={{ backgroundColor: t.text }} />
              </div>
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold" style={{ color: t.text }}>Scan to Join</h4>
              <p className="text-[11px] leading-tight" style={{ color: t.muted }}>
                Scan QR from your phone to sync instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Social Share Buttons */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-semibold" style={{ color: t.text }}>
            Quick Share
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={shareWhatsApp}
              className="py-2.5 px-3 rounded-2xl border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              style={{
                backgroundColor: t.surfaceHover,
                borderColor: t.border,
                color: t.text,
              }}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={shareTwitter}
              className="py-2.5 px-3 rounded-2xl border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              style={{
                backgroundColor: t.surfaceHover,
                borderColor: t.border,
                color: t.text,
              }}
            >
              <Send className="w-3.5 h-3.5 text-sky-500" />
              <span>Twitter / X</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


