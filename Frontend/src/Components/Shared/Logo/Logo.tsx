import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  markOnly?: boolean;
}

// The Converse wordmark: a two-message conversation mark next to the name.
// The two offset bars echo the chat layout - one voice, then the other.
export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="var(--ink)" />
        <rect x="6" y="9.5" width="13" height="5" rx="2.5" fill="var(--clay)" />
        <rect x="13" y="17.5" width="13" height="5" rx="2.5" fill="var(--paper)" />
      </svg>
      {!markOnly && (
        <span className="font-display text-[1.4rem] font-semibold leading-none tracking-tight text-ink">
          Converse
        </span>
      )}
    </span>
  );
}
