"use client";

import Link from "next/link";
import { Plus, Radio, Film } from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";

export function Navbar() {
  const { setCreateModalOpen } = useRoomStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#07080b]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 via-rose-600 to-pink-700 shadow-lg shadow-rose-950/50 border border-rose-400/30 group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                Node<span className="text-rose-500">Party</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Cinema
                </span>
              </span>
            </div>
          </Link>

          {/* Live Sync Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>1,842 streaming together</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <a href="#lounges" className="hover:text-white transition-colors">
            Featured Lounges
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Zero-Lag Engine
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/room/lounge-demo"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-850 border border-white/[0.08] transition-all"
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Live Demo Room</span>
          </Link>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-950/40 border border-rose-400/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
            <span>Create Party</span>
          </button>
        </div>
      </div>
    </header>
  );
}
