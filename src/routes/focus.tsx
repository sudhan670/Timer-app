import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Square } from "lucide-react";

export const Route = createFileRoute("/focus")({
  head: () => ({
    meta: [
      { title: "Focus Session — Present" },
      { name: "description", content: "Pomodoro-style focus session with app blocking." },
    ],
  }),
  component: FocusPage,
});

const PRESETS = [15, 25, 50] as const;

const BLOCKED = [
  { name: "Instagram", initials: "IG" },
  { name: "TikTok", initials: "TT" },
  { name: "YouTube", initials: "YT" },
];

function format(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function FocusPage() {
  const [duration, setDuration] = useState<number>(25);
  const [remaining, setRemaining] = useState<number>(25 * 60);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          setCompleted(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const pick = (mins: number) => {
    setDuration(mins);
    setRemaining(mins * 60);
    setRunning(false);
    setCompleted(false);
  };

  const reset = () => {
    setRunning(false);
    setRemaining(duration * 60);
    setCompleted(false);
  };

  const total = duration * 60;
  const progress = ((total - remaining) / total) * 100;

  return (
    <main className="flex-1 flex flex-col">
      <nav className="flex justify-between items-center py-6 px-6 animate-slide-in">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {running ? "In Session" : completed ? "Complete" : "Ready"}
          </span>
          <span className="text-lg font-bold">Focus</span>
        </div>
        <div className="flex items-center gap-2 bg-foreground/5 px-3 py-1.5 rounded-full border border-border">
          <div className={`size-2 rounded-full ${running ? "bg-primary animate-pulse" : "bg-muted-foreground/40"}`} />
          <span className="font-mono text-xs font-medium">
            +{Math.round(duration * 2)} <span className="text-muted-foreground">PTS</span>
          </span>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center px-6 py-8 animate-slide-in">
        <div className="relative flex items-center justify-center w-full aspect-square max-w-[300px]">
          <div className={`absolute inset-0 rounded-full border border-primary ${running ? "animate-pulse-slow" : "opacity-30"}`} />
          <div className={`absolute inset-4 rounded-full border border-primary/30 ${running ? "animate-breathe" : ""}`} />
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="hsl(36 10% 12% / 0.06)" strokeWidth="1" />
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="hsl(28 55% 42%)"
              strokeWidth="1.5"
              strokeDasharray={`${(progress / 100) * 301.6} 301.6`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="text-center z-10">
            <span className="font-mono text-[10px] text-muted-foreground block mb-2 uppercase tracking-widest">
              {completed ? "Well done" : "Deep Work"}
            </span>
            <h1 className="text-6xl font-extrabold tracking-tighter tabular-nums">
              {format(remaining)}
            </h1>
            <p className="mt-3 text-xs text-muted-foreground">
              {running ? "Phone face down." : completed ? "+50 points earned" : "Choose a length"}
            </p>
          </div>
        </div>

        {!running && !completed && (
          <div className="mt-8 flex gap-2">
            {PRESETS.map((m) => (
              <button
                key={m}
                onClick={() => pick(m)}
                className={`px-4 py-2 rounded-full font-mono text-xs font-medium border transition-colors ${
                  duration === m
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground border-border hover:bg-foreground/5"
                }`}
              >
                {m} MIN
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center gap-3">
          {!completed && (
            <button
              onClick={() => setRunning((r) => !r)}
              className="size-16 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
              aria-label={running ? "Pause" : "Start"}
            >
              {running ? <Pause className="size-6 fill-current" /> : <Play className="size-6 fill-current ml-0.5" />}
            </button>
          )}
          {(running || remaining < total || completed) && (
            <button
              onClick={reset}
              className="size-12 rounded-full bg-foreground/5 border border-border grid place-items-center hover:bg-foreground/10 transition-colors"
              aria-label="Reset"
            >
              <Square className="size-4 fill-current" />
            </button>
          )}
        </div>
      </section>

      <section className="px-6 mt-6 animate-slide-in [animation-delay:200ms]">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
          Blocked During Session
        </p>
        <div className="space-y-2">
          {BLOCKED.map((app) => (
            <div
              key={app.name}
              className="flex justify-between items-center p-4 rounded-2xl bg-foreground/5 border border-border"
            >
              <div className="flex gap-3 items-center">
                <div className="size-10 bg-foreground/10 rounded-lg grid place-items-center">
                  <span className="text-[10px] font-mono font-semibold">{app.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{app.name}</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                    {running ? "Blocked" : "Will block"}
                  </p>
                </div>
              </div>
              <div className={`size-2 rounded-full ${running ? "bg-primary" : "bg-primary/30"}`} />
            </div>
          ))}
        </div>
      </section>

      {completed && (
        <section className="px-6 mt-8 animate-slide-in">
          <Link
            to="/rewards"
            className="block p-4 rounded-2xl bg-foreground text-background text-center text-sm font-semibold"
          >
            View your rewards →
          </Link>
        </section>
      )}
    </main>
  );
}
