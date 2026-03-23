"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptBlockProps {
  prompt: string;
}

export function PromptBlock({ prompt }: PromptBlockProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1.5 font-mono-brand text-[10px] uppercase tracking-[0.1em]",
          "text-[#2E2EFE] cursor-pointer transition-opacity duration-200 hover:opacity-70",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2E2EFE] rounded"
        )}
      >
        <ChevronDown
          size={10}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
        {open ? "↑ fechar prompt" : "↓ ver prompt"}
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-350 ease-in-out",
          open ? "max-h-[240px] mt-3" : "max-h-0 mt-0"
        )}
      >
        <div
          className="border-l-2 border-[#2E2EFE] pl-3 py-3 pr-3 rounded-r"
          style={{ background: "rgba(35,31,32,0.95)" }}
        >
          <p className="font-mono-brand text-[11px] text-white/45 leading-relaxed">
            {prompt}
          </p>
        </div>
      </div>
    </div>
  );
}
