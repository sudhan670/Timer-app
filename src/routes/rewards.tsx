import { createFileRoute } from "@tanstack/react-router";
import { Lock, Check } from "lucide-react";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Rewards — Present" },
      { name: "description", content: "Points, badges, and milestones earned from staying present." },
    ],
  }),
  component: RewardsPage,
});

const badges = [
  { name: "First Session", desc: "Complete 1 focus session", unlocked: true },
  { name: "Early Riser", desc: "Focus before 8 AM × 5", unlocked: true },
  { name: "Week Warrior", desc: "7-day streak", unlocked: true },
  { name: "Zen Master", desc: "30-day streak", unlocked: false, progress: 40 },
  { name: "Deep Diver", desc: "10 sessions over 50 min", unlocked: false, progress: 70 },
  { name: "Silent Sage", desc: "Block 50 hours total", unlocked: false, progress: 22 },
];

const milestones = [
  { pts: 1000, label: "Sunrise Theme", claimed: true },
  { pts: 1500, label: "Forest Soundscape", claimed: false, current: true },
  { pts: 2500, label: "Premium Insights", claimed: false },
];

function RewardsPage() {
  return (
    <main className="flex-1 flex flex-col">
      <nav className="flex justify-between items-center py-6 px-6 animate-slide-in">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Level 4 · Mindful
          </span>
          <span className="text-lg font-bold">Rewards</span>
        </div>
      </nav>

      <section className="px-6 animate-slide-in">
        <div className="bg-foreground text-background rounded-3xl p-6 relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-1">
              Total Points
            </p>
            <h1 className="text-5xl font-extrabold tracking-tighter tabular-nums">1,240</h1>
            <p className="mt-3 text-xs opacity-70">+50 today · earn 260 more this week</p>

            <div className="mt-6 w-full bg-white/15 h-1.5 rounded-full">
              <div className="bg-primary h-full rounded-full" style={{ width: "82%" }} />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] uppercase opacity-70">
              <span>Forest Soundscape</span>
              <span>260 PTS to go</span>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 size-40 bg-primary/30 rounded-full blur-3xl" />
        </div>
      </section>

      <section className="px-6 mt-10 animate-slide-in [animation-delay:150ms]">
        <h2 className="text-base font-bold tracking-tight mb-4">Milestones</h2>
        <div className="space-y-2">
          {milestones.map((m) => (
            <div
              key={m.label}
              className={`flex justify-between items-center p-4 rounded-2xl border ${
                m.current
                  ? "bg-primary/10 border-primary/30"
                  : "bg-foreground/5 border-border"
              }`}
            >
              <div className="flex gap-3 items-center">
                <div
                  className={`size-10 rounded-full grid place-items-center ${
                    m.claimed
                      ? "bg-primary text-primary-foreground"
                      : m.current
                      ? "bg-primary/20 text-primary"
                      : "bg-foreground/10 text-muted-foreground"
                  }`}
                >
                  {m.claimed ? <Check className="size-4" strokeWidth={3} /> : <Lock className="size-4" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">{m.label}</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                    {m.pts.toLocaleString()} pts
                  </p>
                </div>
              </div>
              {m.claimed && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                  Claimed
                </span>
              )}
              {m.current && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                  Next
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 mt-10 animate-slide-in [animation-delay:300ms]">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-base font-bold tracking-tight">Badges</h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            3 / 6
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((b) => (
            <div
              key={b.name}
              className={`p-4 rounded-2xl border border-border relative overflow-hidden ${
                b.unlocked ? "bg-foreground/5" : "bg-transparent opacity-70"
              }`}
            >
              <div
                className={`size-10 rounded-full grid place-items-center mb-3 ${
                  b.unlocked ? "bg-primary text-primary-foreground" : "bg-foreground/10 text-muted-foreground"
                }`}
              >
                {b.unlocked ? (
                  <Check className="size-4" strokeWidth={3} />
                ) : (
                  <Lock className="size-3.5" />
                )}
              </div>
              <p className="text-sm font-semibold">{b.name}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{b.desc}</p>
              {!b.unlocked && b.progress !== undefined && (
                <div className="mt-3 w-full h-1 bg-foreground/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 rounded-full"
                    style={{ width: `${b.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 mt-10 mb-4 text-center animate-slide-in [animation-delay:450ms]">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
          developed by sudhan
        </p>
      </footer>
    </main>
  );
}
