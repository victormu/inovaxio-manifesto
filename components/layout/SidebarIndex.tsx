"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const SCENES = [
  { id: "cena-01", label: "01" },
  { id: "cena-02", label: "02" },
  { id: "cena-03", label: "03" },
  { id: "cena-04", label: "04" },
  { id: "cena-05", label: "05" },
  { id: "cena-06", label: "06" },
  { id: "cena-07", label: "07" },
  { id: "cena-08", label: "08" },
  { id: "cena-09", label: "09" },
  { id: "cena-10", label: "10" },
  { id: "cena-11a", label: "11A" },
  { id: "cena-11b", label: "11B" },
  { id: "cena-11c", label: "11C" },
];

interface SidebarIndexProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

export function SidebarIndex({ activeId, onNavigate }: SidebarIndexProps) {
  return (
    <nav
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3"
      aria-label="Índice de cenas"
    >
      {SCENES.map((scene) => (
        <button
          key={scene.id}
          onClick={() => onNavigate(scene.id)}
          aria-label={`Ir para cena ${scene.label}`}
          className={cn(
            "font-mono-brand text-[10px] tracking-widest transition-all duration-200 cursor-pointer text-left",
            "hover:text-[#2E2EFE] focus-visible:outline-none focus-visible:text-[#2E2EFE]",
            activeId === scene.id
              ? "text-[#2E2EFE] [text-shadow:0_0_10px_rgba(46,46,254,0.6)]"
              : "text-white/25"
          )}
        >
          {scene.label}
        </button>
      ))}
    </nav>
  );
}

export function useActiveScene() {
  const [activeId, setActiveId] = useState("cena-01");

  useEffect(() => {
    const ids = SCENES.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.4, rootMargin: "-10% 0px -10% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return { activeId, navigate };
}

export function SceneCounter({ activeId }: { activeId: string }) {
  const current = SCENES.findIndex((s) => s.id === activeId) + 1;
  const label = SCENES.find((s) => s.id === activeId)?.label ?? "01";

  return (
    <div
      className="fixed bottom-7 left-1/2 -translate-x-1/2 z-40
                 font-mono-brand text-[10px] tracking-[0.12em] text-white/40
                 bg-black/60 border border-white/[0.06] rounded-full px-4 py-1.5
                 backdrop-blur-sm"
      aria-live="polite"
    >
      CENA {label} · {SCENES.length}
    </div>
  );
}

export function KeyboardHint() {
  return (
    <div
      className="fixed bottom-7 right-7 z-40 hidden md:flex items-center gap-2
                 bg-black/60 border border-white/[0.06] rounded-lg px-3 py-1.5
                 backdrop-blur-sm"
      aria-hidden="true"
    >
      {["←↑", "→↓"].map((key, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <kbd className="font-mono-brand text-[9px] text-white/40 bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5">
            {key}
          </kbd>
          <span className="font-mono-brand text-[9px] text-white/20">
            {i === 0 ? "anterior" : "próxima"}
          </span>
          {i === 0 && <span className="text-white/10 text-[9px]">|</span>}
        </span>
      ))}
    </div>
  );
}
