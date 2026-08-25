import { Film, Share2, Zap, ShieldCheck, Sparkles } from "@/icons";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Film,
      title: "Select Any Video or Stream",
      description: "Choose from our curated 4K cinema presets, search YouTube, or paste any direct live stream URL in seconds.",
      accent: "from-rose-500 to-pink-600",
      pill: "Instant Setup",
    },
    {
      number: "02",
      icon: Share2,
      title: "Share 1-Click Invite Link",
      description: "Send your private lounge URL or 6-digit room passcode. Friends join instantly with zero app downloads or accounts required.",
      accent: "from-amber-500 to-orange-600",
      pill: "Frictionless",
    },
    {
      number: "03",
      icon: Zap,
      title: "Watch in Sub-Millisecond Sync",
      description: "Our high-precision clock drift engine keeps everyone's play, pause, and seek commands aligned down to 14 milliseconds.",
      accent: "from-cyan-500 to-blue-600",
      pill: "Ultra-Low Latency",
    },
  ];

  return (
    <section id="how-it-works" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Frictionless Shared Viewing</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          How Watch Party Works
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Designed from the ground up for movie nights, anime marathons, music listening sessions, and esports finals.
        </p>
      </div>

      {/* 3 Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="relative bg-[#0e111a] border border-white/[0.08] hover:border-white/[0.16] rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/30 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Step Number Background Watermark */}
              <div className="absolute top-4 right-6 font-mono text-4xl sm:text-5xl font-black text-white/[0.03] select-none pointer-events-none">
                {step.number}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.accent} flex items-center justify-center text-white shadow-lg shadow-black/50 border border-white/20`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
                    {step.pill}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Bottom Feature Pill */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-medium text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified End-to-End Room Isolation</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
