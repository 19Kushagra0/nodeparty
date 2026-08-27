import Link from "next/link";
import { Film, Zap, Shield, Sparkles, Heart } from "@/icons";

export function Footer() {
  return (
    <footer className="border-t border-[#27211a] bg-[#0a0806] text-[#907a5a] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#27211a]">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#c8962e] text-[#0c0a07] font-black">
                <Film className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-[#f2e9d6]">
                Node<span className="text-[#c8962e]">Party</span>
              </span>
            </div>
            <p className="text-xs text-[#907a5a] max-w-sm leading-relaxed">
              The next-generation synchronized cinema lounge. Stream YouTube, trailers, and indie films together with friends in ultra-low latency sub-millisecond sync.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#907a5a] pt-2">
              <span className="flex items-center gap-1 text-[#b09070]">
                <Zap className="w-3.5 h-3.5 text-[#c8962e]" />
                <span>Sub-18ms sync lock</span>
              </span>
              <span className="flex items-center gap-1 text-[#b09070]">
                <Shield className="w-3.5 h-3.5 text-[#c8962e]" />
                <span>Host RBAC</span>
              </span>
              <span className="flex items-center gap-1 text-[#b09070]">
                <Sparkles className="w-3.5 h-3.5 text-[#c8962e]" />
                <span>4K HDR 60fps</span>
              </span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#f2e9d6]">
              Product
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#join-hub" className="hover:text-[#f2e9d6] transition-colors">
                  Launch Private Room
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#f2e9d6] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link href="/room/lounge-demo" className="hover:text-[#f2e9d6] transition-colors">
                  Live Cinema Demo
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-[#f2e9d6] transition-colors">
                  Sync Engine
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech & Privacy */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#f2e9d6]">
              Room Privacy
            </h3>
            <ul className="space-y-2 text-xs text-[#907a5a]">
              <li>End-to-End Room Isolation</li>
              <li>Zero Account Requirement</li>
              <li>Auto-Expiring Ephemeral Rooms</li>
              <li>WebRTC Audio Ready</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#907a5a]">
          <p>© {new Date().getFullYear()} NodeParty Cinema. Built for cinematic shared experiences.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#c8962e] fill-[#c8962e]" />
            <span>for movie buffs worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
