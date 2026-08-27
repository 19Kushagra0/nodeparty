"use client";

import { useState } from "react";
import { X, Copy, Check, Share2 } from "@/icons";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0e1117] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl text-left space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-rose-500 flex items-center justify-center text-white">
                <Share2 className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-black text-[#f4f4f5] tracking-tight">
                Invite Friends to Lounge
              </h3>
            </div>
            <p className="text-xs text-zinc-400">
              Anyone with this link can jump in and watch in real-time sync.
            </p>
          </div>

          <button
            onClick={() => setInviteModalOpen(false)}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Share Link Box */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
            Lounge Direct Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#141722] border border-white/[0.08] text-xs font-mono text-zinc-300 focus:outline-none select-all"
            />
            <button
              onClick={copyLink}
              className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Room Passcode & QR Code Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Room Code Card */}
          <div className="p-4 rounded-xl bg-[#141722] border border-white/[0.08] flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                Room Passcode
              </span>
              <div className="font-mono text-lg font-black text-rose-400 tracking-wider">
                {roomPasscode || roomId}
              </div>
            </div>
            <button
              onClick={copyCode}
              className="w-full py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode ? "Code Copied!" : "Copy Code"}</span>
            </button>
          </div>

          {/* Simulated QR Code Card */}
          <div className="p-4 rounded-xl bg-[#141722] border border-white/[0.08] flex items-center gap-3">
            <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
              <div className="w-full h-full border-2 border-dashed border-zinc-900 rounded grid grid-cols-3 gap-0.5 p-0.5">
                <div className="bg-black rounded-xs" />
                <div className="bg-black/30 rounded-xs" />
                <div className="bg-black rounded-xs" />
                <div className="bg-black/50 rounded-xs" />
                <div className="bg-rose-600 rounded-xs" />
                <div className="bg-black/40 rounded-xs" />
                <div className="bg-black rounded-xs" />
                <div className="bg-black/60 rounded-xs" />
                <div className="bg-black rounded-xs" />
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white">Scan with Phone</h4>
              <p className="text-xs text-zinc-400 leading-tight">
                Scan QR to join instantly from mobile device.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Social Share Buttons */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
            Quick Share
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={shareWhatsApp}
              className="py-2.5 px-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Share to WhatsApp</span>
            </button>
            <button
              onClick={shareTwitter}
              className="py-2.5 px-3 rounded-xl bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/30 text-sky-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Share to Twitter / X</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
