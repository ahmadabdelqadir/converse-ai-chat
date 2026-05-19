import { motion } from "framer-motion";
import { Logo } from "@/Components/Shared/Logo/Logo";

interface EmptyStateProps {
  onPick: (prompt: string) => void;
}

// Starter prompts shown before the first message is sent.
const suggestions = [
  "Explain a tricky concept in simple words",
  "Help me draft a short, friendly email",
  "Give me three ideas for a weekend project",
  "Summarise a book or film I name for you",
];

// Welcome screen shown before the first message is sent.
export function EmptyState({ onPick }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 0.9, 0.32, 1] }}
      className="flex flex-col items-center pt-[7vh] text-center"
    >
      <Logo markOnly className="mb-6 scale-[1.6]" />

      <h1 className="font-display text-[2.6rem] font-medium leading-tight text-ink">
        What&rsquo;s on your mind?
      </h1>
      <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-ink-soft">
        Converse is a calm place to think out loud. Ask a question, draft something,
        or work an idea through &mdash; the conversation keeps its full context.
      </p>

      <div className="mt-9 grid w-full max-w-xl gap-2.5 sm:grid-cols-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion}
            type="button"
            onClick={() => onPick(suggestion)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + index * 0.07 }}
            className="group rounded-2xl border border-edge bg-surface px-4 py-3.5 text-left text-sm text-ink-soft shadow-card transition-all hover:-translate-y-0.5 hover:border-clay/40 hover:text-ink hover:shadow-lift"
          >
            <span className="font-display text-clay">&rarr;</span> {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
