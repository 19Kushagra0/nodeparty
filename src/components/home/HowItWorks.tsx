import Link from "next/link";
import { Film, Share2, Zap, ArrowRight, Check, Radio, Sparkles } from "@/icons";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full max-w-7xl mx-auto py-16 space-y-16 text-left">
      {/* ── Top Statement Banner ── */}
      <div className="w-full rounded-2xl bg-[#c8962e] p-6 sm:p-8 text-[#0c0a07] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-left">
          <p className="text-xs font-black tracking-widest uppercase text-[#0c0a07]/80">
            OPERATING SPECIFICATION • 100% BROWSER NATIVE
          </p>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            No Plugins. No Extensions. No Accounts.
          </h2>
          <p className="text-xs sm:text-sm font-medium text-[#0c0a07]/80 max-w-xl">
            Just paste a link, invite your group, and experience deterministic frame-synchronized playback.
          </p>
        </div>

        <Link
          href="/room/lounge-demo"
          className="px-6 py-3.5 rounded-xl bg-[#0c0a07] hover:bg-[#1e1a14] text-[#f2e9d6] font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
        >
          Try Live Demo
        </Link>
      </div>

      {/* ── Cinema Call Sheet: 3 Dedicated Ticket Stubs Across 3 Columns ── */}
      <div className="relative rounded-2xl bg-[#161310] border border-[#27211a] p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Subtle background ledger watermark */}
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none font-mono text-[9px] text-[#f2e9d6] hidden lg:block text-right leading-relaxed">
          SYS_SPEC: WEBRTC_MESH_V4<br />
          DRIFT_COMPENSATION: ACTIVE<br />
          FRAME_LOCK: ±0.012s<br />
          ENCRYPT: E2E_DTLS_SRTP
        </div>

        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#27211a] pb-6">
            <div className="space-y-1">
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#c8962e]">
                PRODUCTION CALL SHEET • SPEC NO. 2026-NP
              </p>
              <h3 className="text-2xl sm:text-4xl font-black text-[#f2e9d6] tracking-tight">
                How Frame-Locked Sync Operates
              </h3>
            </div>
            <span className="text-xs font-mono text-[#907a5a]">
              DIRECT WEBRTC BROADCAST ENGINE
            </span>
          </div>

          {/* 3 Dedicated Equal Columns for Step 1, Step 2, and Step 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

            {/* Step 01: Ingest Ticket Stub */}
            <div className="rounded-xl bg-[#110e0b] border border-[#27211a] p-6 flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-dashed border-[#27211a] pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c8962e]">
                      STEP 01 • INGEST
                    </span>
                    <h4 className="text-base font-bold text-[#f2e9d6]">Paste Any Stream Link</h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#27211a] text-[#f2e9d6] border border-[#3a3022]">
                    AUTO_PARSE
                  </span>
                </div>

                <p className="text-xs text-[#907a5a] leading-relaxed">
                  Drop a YouTube link, Twitch livestream, movie trailer, or direct MP4. NodeParty parses and syncs the timecodes with zero transcoding delay.
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-2 text-[11px] font-mono text-[#b09070]">
                  <span className="px-2 py-0.5 rounded bg-[#1e1a14] border border-[#27211a]">YouTube</span>
                  <span className="px-2 py-0.5 rounded bg-[#1e1a14] border border-[#27211a]">Twitch</span>
                  <span className="px-2 py-0.5 rounded bg-[#1e1a14] border border-[#27211a]">MP4/HLS</span>
                </div>
              </div>

              <div className="pt-4 border-t border-dashed border-[#27211a] flex items-center justify-between text-xs font-mono text-[#907a5a]">
                <span>STREAM DETECTED</span>
                <span className="text-[#c8962e] font-bold">READY</span>
              </div>
            </div>

            {/* Step 02: Connect Ticket Stub */}
            <div className="rounded-xl bg-[#110e0b] border border-[#27211a] p-6 flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-dashed border-[#27211a] pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c8962e]">
                      STEP 02 • CONNECT
                    </span>
                    <h4 className="text-base font-bold text-[#f2e9d6]">Share 6-Digit Code</h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#c8962e] text-[#0c0a07]">
                    NO SIGN-UP
                  </span>
                </div>

                <p className="text-xs text-[#907a5a] leading-relaxed">
                  Send the invite URL or 6-digit room code to your squad. Friends join directly in the browser with synchronized presence and voice audio.
                </p>

                {/* Simulated Room Punch Code Ticket */}
                <div className="p-3 rounded-lg bg-[#161310] border border-[#27211a] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-[#907a5a]">EPHEMERAL ROOM CODE</span>
                    <p className="text-sm font-mono font-bold text-[#f2e9d6] tracking-wider">#CYBER-4096</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#c8962e] px-2 py-1 rounded bg-[#27211a] border border-[#3a3022]">
                    1-CLICK JOIN
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-dashed border-[#27211a] flex items-center justify-between text-xs font-mono text-[#907a5a]">
                <span>PEER MESH</span>
                <span className="text-[#c8962e] font-bold">CONNECTED</span>
              </div>
            </div>

            {/* Step 03: Playback Ledger Ticket Stub */}
            <div className="rounded-xl bg-[#110e0b] border border-[#27211a] p-6 flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-dashed border-[#27211a] pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c8962e]">
                      STEP 03 • PLAYBACK
                    </span>
                    <h4 className="text-base font-bold text-[#f2e9d6]">Deterministic Sync</h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#27211a] text-[#c8962e] border border-[#3a3022]">
                    ±12MS ACCURACY
                  </span>
                </div>

                <p className="text-xs text-[#907a5a] leading-relaxed">
                  When anyone pauses, plays, or seeks, high-frequency WebRTC heartbeat signals align all video clocks instantly to the exact same frame.
                </p>

                {/* Compact Telemetry items */}
                <div className="space-y-1.5 pt-1 text-[11px] font-mono">
                  <div className="p-2 rounded bg-[#161310] border border-[#27211a] flex items-center justify-between">
                    <span className="text-[#907a5a]">FRAME LOCK</span>
                    <span className="text-[#c8962e] font-bold">±0.012 SECONDS</span>
                  </div>
                  <div className="p-2 rounded bg-[#161310] border border-[#27211a] flex items-center justify-between">
                    <span className="text-[#907a5a]">DATA PRIVACY</span>
                    <span className="text-[#f2e9d6] font-bold">100% P2P</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-dashed border-[#27211a] flex items-center justify-between text-xs font-mono text-[#907a5a]">
                <span>BROADCAST STATE</span>
                <span className="text-[#c8962e] font-bold">LOCKED &amp; SYNCED</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Asymmetrical Editorial Photo Spread (No AI 3-Card Grid) ── */}
      <div className="space-y-6 pt-4 border-t border-[#27211a]">
        <div className="text-left space-y-1 max-w-xl">
          <h3 className="text-2xl sm:text-4xl font-black text-[#f2e9d6] tracking-tight">
            Built for Game Day, Movie Nights &amp; Squad Marathons
          </h3>
          <p className="text-xs sm:text-sm text-[#907a5a] leading-relaxed">
            From late-night repertory marathons to high-stakes esports tournaments.
          </p>
        </div>

        {/* Asymmetrical 7/5 Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Main Large Cinematic Feature (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-[#161310] border border-[#27211a] shadow-xl flex flex-col justify-between group">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0c0a07]">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161310] via-black/20 to-transparent" />
            </div>

            <div className="p-6 space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#c8962e] uppercase tracking-wider">
                  CINEMA ARCHIVE • 4K HDR MASTER
                </span>
                <span className="text-xs font-mono font-semibold text-[#907a5a]">SPATIAL AUDIO</span>
              </div>
              <h4 className="text-xl font-bold text-[#f2e9d6] leading-snug">
                Theaters Without Borders
              </h4>
              <p className="text-xs sm:text-sm text-[#c4b59d] leading-relaxed max-w-lg">
                4K master color grade, spatial stereo sync, and real-time live chat with no stream delays or account walls.
              </p>
            </div>
          </div>

          {/* 2 Stacked Asymmetrical Blocks (5 cols) — Styled identical to left card (Image top, text below) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Block 1: Esports & Gaming */}
            <div className="rounded-2xl overflow-hidden bg-[#161310] border border-[#27211a] shadow-xl flex flex-col justify-between group">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0c0a07]">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161310] via-black/20 to-transparent" />
              </div>

              <div className="p-5 space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#c8962e] uppercase tracking-wider">
                    ESPORTS &amp; STREAMING
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#907a5a]">60 FPS SYNC</span>
                </div>
                <h5 className="text-base font-bold text-[#f2e9d6] group-hover:text-[#c8962e] transition-colors leading-snug">
                  Big Screens. Sound On.
                </h5>
                <p className="text-xs text-[#c4b59d] leading-relaxed">
                  VCT tournaments, anime marathons, and weekend streams with zero frame lag.
                </p>
              </div>
            </div>

            {/* Block 2: Private Screening Rooms */}
            <div className="rounded-2xl overflow-hidden bg-[#161310] border border-[#27211a] shadow-xl flex flex-col justify-between group">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0c0a07]">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161310] via-black/20 to-transparent" />
              </div>

              <div className="p-5 space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#c8962e] uppercase tracking-wider">
                    PEER-TO-PEER WEBRTC
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#907a5a]">ENCRYPTED</span>
                </div>
                <h5 className="text-base font-bold text-[#f2e9d6] group-hover:text-[#c8962e] transition-colors leading-snug">
                  Private Rooms. Instant Access.
                </h5>
                <p className="text-xs text-[#c4b59d] leading-relaxed">
                  Encrypted browser mesh. Your video link never touches central servers.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
