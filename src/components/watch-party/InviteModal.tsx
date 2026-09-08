"use client";

import { useState } from "react";
import { X, Copy, Check, Share2, MessageCircle, Send } from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";

export function InviteModal() {
  const { isInviteModalOpen, setInviteModalOpen, roomId, roomName, roomPasscode } = useRoomStore();
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setInviteModalOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-zinc-200/80 rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.12)] text-left space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-2xs shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
                Invite Friends to Lounge
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                Anyone with this link can jump in and watch in real-time sync.
              </p>
            </div>
          </div>

          <button
            onClick={() => setInviteModalOpen(false)}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Share Link Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Lounge Direct Link
          </label>
          <div className="flex items-center gap-2 p-1 bg-[#F0F2F6] rounded-2xl border border-zinc-200/80">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 px-3 py-2 bg-transparent text-xs sm:text-sm font-mono text-zinc-700 focus:outline-none select-all truncate"
            />
            <button
              onClick={copyLink}
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer shrink-0"
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
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-zinc-200/70 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Room Passcode
              </span>
              <div className="font-mono text-base sm:text-lg font-bold text-zinc-900 tracking-wider">
                {roomPasscode || roomId}
              </div>
            </div>
            <button
              onClick={copyCode}
              className="w-full py-2 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200/80 text-zinc-700 text-xs font-medium flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied" : "Copy Code"}</span>
            </button>
          </div>

          {/* QR Code Card */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-zinc-200/70 flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-white p-1 border border-zinc-200/80 shadow-2xs flex items-center justify-center shrink-0">
              <div className="w-full h-full border border-dashed border-zinc-400 rounded grid grid-cols-3 gap-0.5 p-0.5">
                <div className="bg-zinc-900 rounded-xs" />
                <div className="bg-zinc-300 rounded-xs" />
                <div className="bg-zinc-900 rounded-xs" />
                <div className="bg-zinc-400 rounded-xs" />
                <div className="bg-rose-500 rounded-xs" />
                <div className="bg-zinc-300 rounded-xs" />
                <div className="bg-zinc-900 rounded-xs" />
                <div className="bg-zinc-400 rounded-xs" />
                <div className="bg-zinc-900 rounded-xs" />
              </div>
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-zinc-800">Scan to Join</h4>
              <p className="text-[11px] text-zinc-500 leading-tight">
                Scan QR from your phone to sync instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Social Share Buttons */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-semibold text-zinc-700">
            Quick Share
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={shareWhatsApp}
              className="py-2.5 px-3 rounded-2xl bg-[#F8FAFC] hover:bg-emerald-50 border border-zinc-200/70 hover:border-emerald-200 text-zinc-700 hover:text-emerald-700 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={shareTwitter}
              className="py-2.5 px-3 rounded-2xl bg-[#F8FAFC] hover:bg-sky-50 border border-zinc-200/70 hover:border-sky-200 text-zinc-700 hover:text-sky-700 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
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

