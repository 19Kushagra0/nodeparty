"use client";

import Link from "next/link";
import { Plus, Film } from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";

export function Navbar() {
  const { setCreateModalOpen } = useRoomStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#27211a] bg-[#0c0a07]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#c8962e] text-[#0c0a07] border border-[#dba940]/30 group-hover:bg-[#dba940] transition-colors">
              <Film className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-[#f2e9d6]">
              Node<span className="text-[#c8962e]">Party</span>
            </span>
          </Link>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#907a5a]">
          <a href="#join-hub" className="hover:text-[#f2e9d6] transition-colors">
            Launch Room
          </a>
          <a href="#how-it-works" className="hover:text-[#f2e9d6] transition-colors">
            How It Works
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c8962e] hover:bg-[#dba940] active:scale-[0.98] text-[#0c0a07] text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
            <span>Create Room</span>
          </button>
        </div>
      </div>
    </header>
  );
}
