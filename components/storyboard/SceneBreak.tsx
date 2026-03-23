import { PromptBlock } from "./PromptBlock";

interface SceneBreakProps {
  id: string;
  sceneTag: string;
  timeTag: string;
  text: string;
  sub: string;
  description: string;
  prompt: string;
}

export function SceneBreak({
  id,
  sceneTag,
  timeTag,
  text,
  sub,
  description,
  prompt,
}: SceneBreakProps) {
  return (
    <section
      id={id}
      className="scene-virada-bg rounded-2xl min-h-[360px] flex flex-col
                 items-center justify-center gap-5 px-8 py-16 text-center scroll-mt-6"
    >
      {/* Scene tag */}
      <span
        className="inline-flex items-center gap-2 font-mono-brand text-[11px]
                   text-[#2E2EFE] border border-[rgba(46,46,254,0.5)] rounded px-3 py-1"
        style={{ background: "rgba(35,31,32,0.9)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#2E2EFE] animate-glow-pulse" />
        {sceneTag}
      </span>

      {/* Main text */}
      <p
        className="font-institutional font-medium text-2xl md:text-3xl text-white
                   tracking-[0.28em] text-glow max-w-2xl leading-tight"
      >
        {text}
      </p>

      {/* Sub */}
      <p className="font-mono-brand text-[11px] text-white/25 tracking-widest">
        {sub}
      </p>

      {/* Time tag */}
      <span className="font-mono-brand text-[10px] text-white/35">{timeTag}</span>

      {/* Description */}
      <p
        className="font-digital text-[13px] text-white/35 max-w-md leading-relaxed"
        style={{ borderTop: "1px solid rgba(46,46,254,0.15)", paddingTop: "12px" }}
      >
        {description}
      </p>

      {/* Prompt */}
      <div className="text-left w-full max-w-sm">
        <PromptBlock prompt={prompt} />
      </div>
    </section>
  );
}
