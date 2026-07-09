import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Play, Smartphone } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Present" },
      { name: "description", content: "Your screen time, focus goals, and points for the day." },
    ],
  }),
  component: HomePage,
});

const distractions = [
  { name: "Instagram", initials: "IG", minutes: 42 },
  { name: "TikTok", initials: "TT", minutes: 28 },
  { name: "X", initials: "X", minutes: 14 },
];

const weeklyBars = [40, 65, 30, 85, 95, 20, 45];
const todayIdx = 4;

function HomePage() {
  return (
    <main className="flex-1 flex flex-col">
      <nav className="flex justify-between items-center py-6 px-6 animate-slide-in">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Current State
          </span>
          <span className="text-lg font-bold">Present</span>
        </div>
        <div className="flex items-center gap-2 bg-foreground/5 px-3 py-1.5 rounded-full border border-border">
          <div className="size-2 rounded-full bg-primary" />
          <span className="font-mono text-xs font-medium">
            1,240 <span className="text-muted-foreground">PTS</span>
          </span>
        </div>
      </nav>

      <section className="px-6 pt-4 animate-slide-in">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
          Today's Screen Time
        </p>
        <div className="flex items-baseline gap-3">
          <h1 className="text-6xl font-extrabold tracking-tighter tabular-nums">2h 14m</h1>
          <span className="text-sm font-medium text-primary">−14%</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Goal: under 3 hours. You're on track.
        </p>
        <div className="mt-5 w-full h-2 bg-foreground/5 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: "74%" }} />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>0h</span>
          <span>3h goal</span>
        </div>
      </section>

      <section className="px-6 mt-10 animate-slide-in [animation-delay:150ms]">
        <Link
          to="/focus"
          className="group flex items-center justify-between p-5 rounded-3xl bg-foreground text-background relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-1">
              Start now
            </p>
            <h2 className="text-xl font-bold">Deep Work · 25 min</h2>
            <p className="text-xs opacity-70 mt-1">Blocks 3 apps · earns 50 pts</p>
          </div>
          <div className="size-12 rounded-full bg-primary grid place-items-center relative z-10 group-hover:scale-105 transition-transform">
            <Play className="size-5 fill-current ml-0.5" />
          </div>
          <div className="absolute -right-6 -bottom-6 size-32 bg-primary/30 rounded-full blur-3xl" />
        </Link>
      </section>

      <section className="px-6 mt-8 animate-slide-in [animation-delay:300ms]">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-base font-bold tracking-tight">This Week</h2>
          <Link
            to="/insights"
            className="font-mono text-[10px] text-muted-foreground underline underline-offset-4 uppercase flex items-center gap-1"
          >
            Insights <ArrowUpRight className="size-3" />
          </Link>
        </div>
        <div className="h-28 w-full flex items-end gap-2">
          {weeklyBars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-sm transition-colors ${
                i === todayIdx ? "bg-primary" : "bg-foreground/10"
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className={i === todayIdx ? "text-foreground font-semibold" : ""}>
              {d}
            </span>
          ))}
        </div>
      </section>

      <section className="px-6 mt-8 animate-slide-in [animation-delay:450ms]">
        <h2 className="text-base font-bold tracking-tight mb-4">Top Distractions</h2>
        <div className="space-y-2">
          {distractions.map((app) => (
            <div
              key={app.name}
              className="flex justify-between items-center p-3.5 rounded-2xl bg-foreground/5 border border-border"
            >
              <div className="flex gap-3 items-center">
                <div className="size-10 bg-foreground/10 rounded-lg grid place-items-center">
                  <span className="text-[10px] font-mono font-semibold">{app.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{app.name}</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                    {app.minutes}m today
                  </p>
                </div>
              </div>
              <Smartphone className="size-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 mt-10 mb-4 text-center animate-slide-in [animation-delay:600ms]">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
          developed by sudhan
        </p>
      </footer>
    </main>
  );
}
