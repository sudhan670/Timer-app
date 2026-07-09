import { createFileRoute } from "@tanstack/react-router";
import { TrendingDown, Flame, Clock } from "lucide-react";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Present" },
      { name: "description", content: "Weekly screen time, focus minutes, and top app usage." },
    ],
  }),
  component: InsightsPage,
});

const weekScreen = [3.2, 4.1, 2.8, 3.6, 2.2, 5.4, 4.0];
const weekFocus = [1.5, 2.0, 1.2, 2.4, 3.1, 0.5, 1.8];
const max = Math.max(...weekScreen);

const topApps = [
  { name: "Instagram", initials: "IG", minutes: 248, pct: 32 },
  { name: "TikTok", initials: "TT", minutes: 184, pct: 24 },
  { name: "YouTube", initials: "YT", minutes: 142, pct: 18 },
  { name: "Messages", initials: "iM", minutes: 96, pct: 12 },
  { name: "Safari", initials: "SF", minutes: 78, pct: 10 },
];

function InsightsPage() {
  return (
    <main className="flex-1 flex flex-col">
      <nav className="flex justify-between items-center py-6 px-6 animate-slide-in">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Week of Mar 10
          </span>
          <span className="text-lg font-bold">Insights</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
          −18% vs last
        </span>
      </nav>

      <section className="px-6 animate-slide-in">
        <div className="grid grid-cols-3 gap-2">
          <Stat icon={<Clock className="size-3.5" />} label="Avg / day" value="3h 30m" />
          <Stat icon={<Flame className="size-3.5" />} label="Streak" value="12d" highlight />
          <Stat icon={<TrendingDown className="size-3.5" />} label="Focus" value="12h 30m" />
        </div>
      </section>

      <section className="px-6 mt-10 animate-slide-in [animation-delay:150ms]">
        <h2 className="text-base font-bold tracking-tight mb-1">Daily Screen Time</h2>
        <p className="text-xs text-muted-foreground mb-5">Hours per day · brown = focus time</p>
        <div className="h-44 w-full flex items-end gap-2.5">
          {weekScreen.map((screen, i) => {
            const screenH = (screen / max) * 100;
            const focusH = (weekFocus[i] / max) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative h-40 flex flex-col justify-end">
                  <div
                    className="w-full bg-foreground/10 rounded-t-sm"
                    style={{ height: `${screenH}%` }}
                  >
                    <div
                      className="w-full bg-primary rounded-t-sm"
                      style={{ height: `${(focusH / screenH) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase text-muted-foreground">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 mt-10 animate-slide-in [animation-delay:300ms]">
        <h2 className="text-base font-bold tracking-tight mb-4">Top Apps This Week</h2>
        <div className="space-y-3">
          {topApps.map((app) => (
            <div key={app.name}>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex gap-3 items-center">
                  <div className="size-8 bg-foreground/10 rounded-lg grid place-items-center">
                    <span className="text-[10px] font-mono font-semibold">{app.initials}</span>
                  </div>
                  <span className="text-sm font-semibold">{app.name}</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {Math.floor(app.minutes / 60)}h {app.minutes % 60}m
                </span>
              </div>
              <div className="w-full h-1 bg-foreground/5 rounded-full overflow-hidden ml-11">
                <div
                  className="h-full bg-primary/70 rounded-full"
                  style={{ width: `${app.pct * 3}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 mt-10 animate-slide-in [animation-delay:450ms]">
        <div className="p-5 rounded-3xl border border-border bg-foreground/5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
            Weekly Insight
          </p>
          <p className="text-sm leading-relaxed">
            You spent <span className="font-bold">42% less</span> time on Instagram after evening
            focus sessions. Consider scheduling one daily at 8 PM.
          </p>
        </div>
      </section>
    </main>
  );
}

function Stat({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-4 rounded-2xl border border-border ${
        highlight ? "bg-foreground text-background" : "bg-foreground/5"
      }`}
    >
      <div
        className={`flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider mb-2 ${
          highlight ? "opacity-70" : "text-muted-foreground"
        }`}
      >
        {icon}
        {label}
      </div>
      <p className="text-xl font-extrabold tracking-tight tabular-nums">{value}</p>
    </div>
  );
}
