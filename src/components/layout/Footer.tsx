import Link from "next/link";
import { Film, Zap, Shield, Sparkles, Heart } from "@/icons";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#07080b] text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/[0.06]">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600 text-white font-black shadow-md shadow-rose-950/40">
                <Film className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                Node<span className="text-rose-500">Party</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              The next-generation synchronized cinema lounge. Stream YouTube, trailers, and indie films together with friends in ultra-low latency sub-millisecond sync.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 pt-2">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> &lt;18ms sync lock
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Host RBAC
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" /> 4K HDR 60fps
              </span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#lounges" className="hover:text-white transition-colors">
                  Public Lounges
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link href="/room/lounge-demo" className="hover:text-white transition-colors">
                  Live Cinema Demo
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Sync Engine Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech & Privacy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Room Privacy
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-zinc-400">End-to-End Room Isolation</li>
              <li className="text-zinc-400">Zero Account Requirement</li>
              <li className="text-zinc-400">Auto-Expiring Ephemeral Rooms</li>
              <li className="text-zinc-400">WebRTC Audio Ready</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} NodeParty Cinema. Built for cinematic shared experiences.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for movie buffs & friends worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
