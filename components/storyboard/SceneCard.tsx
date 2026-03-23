"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PromptBlock } from "./PromptBlock";

interface SceneCardProps {
  id: string;
  sceneTag: string;
  timeTag: string;
  title: string;
  narration: string;
  description: string;
  prompt: string;
  imageSrc: string;
  imageAlt: string;
  isActive?: boolean;
  reversed?: boolean;
}

export function SceneCard({
  id,
  sceneTag,
  timeTag,
  title,
  narration,
  description,
  prompt,
  imageSrc,
  imageAlt,
  isActive = false,
  reversed = false,
}: SceneCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id={id}
      className="group mb-0.5 rounded-2xl overflow-hidden scroll-mt-6"
    >
      <div
        className={cn(
          "grid min-h-[340px] transition-all duration-300",
          reversed ? "md:grid-cols-[45fr_55fr]" : "md:grid-cols-[55fr_45fr]",
          "grid-cols-1"
        )}
      >
        {/* ── Image panel ── */}
        <div
          className={cn(
            "relative overflow-hidden min-h-[220px] md:min-h-[340px]",
            reversed ? "md:order-2" : "md:order-1"
          )}
        >
          {imgError ? (
            /* Placeholder when image not found */
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, rgba(46,46,254,0.08), rgba(91,45,232,0.05))",
              }}
            >
              <span className="font-mono-brand text-[10px] text-white/20 uppercase tracking-widest">
                Aguardando imagem
              </span>
              <span className="font-mono-brand text-[11px] text-[#2E2EFE] opacity-40">
                {imageSrc.replace("/", "")}
              </span>
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              onError={() => setImgError(true)}
              priority={id === "cena-01"}
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 img-overlay pointer-events-none" />

          {/* Scene tag bottom-left */}
          <div className="absolute bottom-3 left-3 z-10">
            <span
              className="inline-flex items-center gap-1.5 font-mono-brand text-[11px]
                         text-[#2E2EFE] border border-[rgba(46,46,254,0.6)] rounded
                         px-2.5 py-1 backdrop-blur-sm"
              style={{ background: "rgba(35,31,32,0.85)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E2EFE] animate-glow-pulse" />
              {sceneTag}
            </span>
          </div>

          {/* Time tag top-right */}
          <div className="absolute top-3 right-3 z-10">
            <span className="font-mono-brand text-[10px] text-white/45">
              {timeTag}
            </span>
          </div>
        </div>

        {/* ── Content panel ── */}
        <div
          className={cn(
            "flex flex-col justify-center gap-4 px-8 py-10 md:px-10 md:py-12",
            "transition-all duration-300",
            reversed ? "md:order-1" : "md:order-2",
            isActive
              ? "scene-active"
              : "border-l-2 border-[rgba(46,46,254,0.12)] hover:border-[rgba(46,46,254,0.3)]",
            "glass-card rounded-none"
          )}
          style={{ borderRadius: 0 }}
        >
          {/* Label */}
          <p
            className="font-institutional text-[10px] font-medium tracking-[0.25em] uppercase"
            style={{ color: "#2E2EFE" }}
          >
            {sceneTag}
          </p>

          {/* Title */}
          <h2 className="font-institutional font-bold text-xl md:text-2xl text-white leading-snug">
            {title}
          </h2>

          {/* Narration */}
          <p
            className="font-digital text-sm italic leading-[1.85]"
            style={{
              color: "rgba(230,231,232,0.65)",
              borderLeft: "2px solid rgba(46,46,254,0.3)",
              paddingLeft: "12px",
            }}
          >
            "{narration}"
          </p>

          {/* Separator */}
          <div className="separator-blue h-px w-full" />

          {/* Description */}
          <p className="font-digital text-[13px] leading-[1.75]" style={{ color: "rgba(230,231,232,0.45)" }}>
            {description}
          </p>

          {/* Prompt */}
          <PromptBlock prompt={prompt} />
        </div>
      </div>
    </section>
  );
}
