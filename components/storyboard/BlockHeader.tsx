interface BlockHeaderProps {
  number: string;
  label: string;
}

export function BlockHeader({ number, label }: BlockHeaderProps) {
  return (
    <div className="relative pt-16 pb-10 overflow-hidden">
      {/* Ghost number */}
      <span className="section-ghost-number">{number}</span>

      {/* Accent line */}
      <div className="accent-line mb-4" />

      {/* Label */}
      <p
        className="font-institutional font-medium text-[11px] tracking-[0.25em] uppercase"
        style={{ color: "#2E2EFE" }}
      >
        {label}
      </p>
    </div>
  );
}
