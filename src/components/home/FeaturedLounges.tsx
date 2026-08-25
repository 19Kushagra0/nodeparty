import Link from "next/link";
import { featuredLounges } from "@/data/mockLounges";
import { Users, Play, Radio, ArrowRight } from "@/icons";

export function FeaturedLounges() {
  return (
    <section id="lounges" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-400 uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Community Lounges</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Jump Into a Live Public Watch Party
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
            Drop in on curated public screenings, join the live chat discussion, and stream together with fellow cinema and music enthusiasts worldwide.
          </p>
        </div>

        <Link
          href="/room/lounge-cinema-88"
          className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors"
        >
          <span>Explore All 24 Active Lounges</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Lounges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {featuredLounges.map((lounge) => (
          <div
            key={lounge.id}
            className="group relative bg-[#0e111a] border border-white/[0.08] hover:border-rose-500/40 rounded-3xl overflow-hidden shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Top Video Preview with badges */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lounge.videoThumbnail}
                alt={lounge.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e111a] via-black/20 to-transparent" />

              {/* LIVE Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>LIVE</span>
              </div>

              {/* Viewers count badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-zinc-200 text-[11px] font-mono border border-white/10">
                <Users className="w-3.5 h-3.5 text-rose-400" />
                <span>{lounge.viewersCount}</span>
              </div>

              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-xl shadow-rose-950/60 transform group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Content & Metadata */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {lounge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-2">
                  {lounge.title}
                </h3>
              </div>

              {/* Host and Jump In Action */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${lounge.hostAvatarBg} flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}
                  >
                    {lounge.hostName[0]}
                  </div>
                  <div className="text-[11px]">
                    <span className="text-zinc-400">Host: </span>
                    <span className="font-semibold text-zinc-200">{lounge.hostName}</span>
                  </div>
                </div>

                <Link
                  href={`/room/${lounge.id}`}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-rose-600 text-zinc-200 hover:text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
