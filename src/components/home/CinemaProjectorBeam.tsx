"use client";

import React from "react";
import Image from "next/image";

export function CinemaProjectorBeam() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
    >
      {/* ── 1. Anime Cinema Watch Party Backdrop ── */}
      <div
        className="absolute inset-0 w-full h-full animate-cinematic-breathe origin-center scale-105"
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      >
        <Image
          src="/hero-anime.jpg"
          alt="Cinematic watch party lounge background"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover scale-100 sm:scale-60 object-center filter brightness-[0.88] contrast-[1.08]"
        />
      </div>

      {/* ── 2. Atmospheric Floating Dust Motes ── */}
      <div className="absolute inset-0 opacity-35 pointer-events-none">
        <span className="cinema-mote mote-1" />
        <span className="cinema-mote mote-2" />
        <span className="cinema-mote mote-3" />
        <span className="cinema-mote mote-4" />
        <span className="cinema-mote mote-5" />
      </div>
    </div>
  );
}
