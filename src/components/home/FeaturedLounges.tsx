"use client";

import { useState } from "react";
import Link from "next/link";
import { featuredLounges } from "@/data/mockLounges";
import { Users, ArrowRight, Film, Radio, Plus, Check } from "@/icons";

export function FeaturedLounges() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const categories = [
    { label: "All (24)", id: "All" },
    { label: "Cinema & Sci-Fi", id: "Cinema & Sci-Fi" },
    { label: "Gaming Lounge", id: "Gaming Lounge" },
    { label: "Music & Beats", id: "Music & Beats" },
    { label: "Anime & Film", id: "Anime & Film" },
  ];

  const filteredLounges = selectedCategory === "All"
    ? featuredLounges
    : featuredLounges.filter((l) => l.category === selectedCategory);

  const premiere = filteredLounges[0] || featuredLounges[0];
  const activeRooms = filteredLounges.slice(1);

  return (
    <section id="lounges" className="w-full max-w-7xl mx-auto py-16 space-y-8 text-left">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#27211a] pb-6">
        <div className="space-y-1.5 max-w-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#c8962e]">
            PUBLIC SCREENING PROGRAM • 24 LOUNGES ACTIVE
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f2e9d6] tracking-tight">
            Live Community Screenings
          </h2>
          <p className="text-sm text-[#907a5a] leading-relaxed">
            Drop into curated public screenings. Synchronized 4K playback and live group discussion.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#161310] border border-[#27211a] rounded-xl">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${selectedCategory === c.id
                  ? "bg-[#c8962e] text-[#0c0a07] shadow-sm"
                  : "text-[#907a5a] hover:text-[#f2e9d6] hover:bg-[#27211a]/50"
                }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Distilled Layout: 1 Featured Premier + Runsheet List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* Dominant Premiere Card (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-[#161310] border border-[#27211a] flex flex-col justify-between group shadow-xl">
          <div className="relative aspect-video w-full overflow-hidden bg-[#0c0a07]">
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url(${premiere.videoThumbnail})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161310] via-black/30 to-transparent" />

            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0c0a07]/90 text-xs font-bold text-[#c8962e] border border-[#27211a] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8962e] animate-pulse" />
              <span>FEATURED PREMIERE</span>
            </div>

            <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-[#0c0a07]/90 text-xs font-bold text-[#f2e9d6] border border-[#27211a] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#c8962e]" />
              <span>{premiere.viewersCount} Watching</span>
            </div>
          </div>

          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="text-xs text-[#907a5a] font-semibold">{premiere.category}</span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#f2e9d6] group-hover:text-[#c8962e] transition-colors leading-snug">
                {premiere.title}
              </h3>
              <p className="text-xs text-[#907a5a]">Hosted by @{premiere.hostName} • Playing now</p>
            </div>

            {/* Stream Progress & Action */}
            <div className="pt-4 border-t border-[#27211a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 flex-1 max-w-xs">
                <div className="h-1 bg-[#27211a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c8962e] rounded-full" style={{ width: "68%" }} />
                </div>
                <span className="text-[11px] text-[#907a5a]">01:14:20 / 01:48:00 (68% Complete)</span>
              </div>

              <Link
                href={`/room/${premiere.id}`}
                className="px-6 py-2.5 rounded-xl bg-[#c8962e] hover:bg-[#dba940] text-[#0c0a07] font-bold text-xs uppercase tracking-wider transition-colors text-center shrink-0 shadow-lg shadow-amber-950/20"
              >
                Join Premiere
              </Link>
            </div>
          </div>
        </div>

        {/* Screening Runsheet (5 cols) — Dense, multi-room list filling the vertical space */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#907a5a] uppercase tracking-wider px-1">
            <span>Now Streaming ({activeRooms.length} active)</span>
            <span>Live Sync</span>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {activeRooms.map((room) => (
              <div
                key={room.id}
                className="p-3.5 rounded-xl bg-[#161310] border border-[#27211a] hover:border-[#3a3022] flex items-center justify-between gap-3.5 transition-colors group shadow-md"
              >
                <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-[#0c0a07]">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${room.videoThumbnail})` }}
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8962e] shrink-0" />
                    <span className="text-[10px] font-bold text-[#c8962e] uppercase tracking-wider truncate">
                      {room.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#f2e9d6] group-hover:text-[#c8962e] transition-colors truncate">
                    {room.title}
                  </h4>
                  <p className="text-[10px] text-[#907a5a]">
                    @{room.hostName} • {room.viewersCount} watching
                  </p>
                </div>

                <Link
                  href={`/room/${room.id}`}
                  className="px-3 py-1.5 rounded-lg bg-[#27211a] hover:bg-[#c8962e] text-[#f2e9d6] hover:text-[#0c0a07] text-xs font-bold transition-colors shrink-0 border border-[#3a3022]"
                >
                  Join
                </Link>
              </div>
            ))}
          </div>

          {/* Quick Host Callout Card */}
          <div className="p-3.5 rounded-xl bg-[#161310] border border-[#27211a] flex items-center justify-between gap-3 text-xs mt-1">
            <div className="space-y-0.5">
              <p className="font-bold text-[#f2e9d6]">Want to host a public lounge?</p>
              <p className="text-[11px] text-[#907a5a]">Broadcast YouTube, Twitch, or MP4 in seconds.</p>
            </div>
            <a
              href="#join-hub"
              className="px-3 py-1.5 rounded-lg bg-[#c8962e] hover:bg-[#dba940] text-[#0c0a07] font-bold text-xs shrink-0 transition-colors"
            >
              Host Room
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
