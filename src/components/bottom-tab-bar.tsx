import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Timer, BarChart3, Award } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/focus", label: "Focus", icon: Timer },
  { to: "/insights", label: "Insights", icon: BarChart3 },
  { to: "/rewards", label: "Rewards", icon: Award },
] as const;

export function BottomTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[min(380px,calc(100%-2rem))] bg-foreground/95 backdrop-blur-md rounded-full py-2.5 px-3 flex justify-between items-center shadow-2xl z-50 ring-1 ring-white/10"
    >
      {tabs.map(({ to, label, icon: Icon }) => {
        const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            aria-label={label}
            className={`size-11 rounded-full flex items-center justify-center transition-colors ${
              active ? "bg-primary text-primary-foreground" : "text-white/45 hover:text-white/80"
            }`}
          >
            <Icon className="size-[18px]" strokeWidth={2} />
          </Link>
        );
      })}
    </nav>
  );
}
