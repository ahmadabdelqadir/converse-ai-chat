import { motion } from "framer-motion";
import type { Message } from "@/Models/Message";
import { TypingIndicator } from "@/Components/Shared/TypingIndicator/TypingIndicator";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  // When true, show the typing animation instead of the message text.
  pending?: boolean;
}

// The Converse mark shown beside every assistant message.
function AssistantMark() {
  return (
    <svg viewBox="0 0 32 32" className="mt-0.5 h-8 w-8 shrink-0" aria-hidden="true">
      <rect width="32" height="32" rx="10" fill="var(--ink)" />
      <rect x="6" y="9.5" width="13" height="5" rx="2.5" fill="var(--clay)" />
      <rect x="13" y="17.5" width="13" height="5" rx="2.5" fill="var(--paper)" />
    </svg>
  );
}

// One message in the stream. User messages sit on the right in an ink
// bubble; assistant messages sit on the left with the Converse mark.
export function ChatMessage({ message, pending = false }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 0.9, 0.32, 1] }}
      className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && <AssistantMark />}

      <div className={cn("flex max-w-[80%] flex-col", isUser ? "items-end" : "items-start")}>
        {!isUser && (
          <span className="mb-1 font-display text-sm font-medium text-ink-soft">Converse</span>
        )}
        <div
          className={cn(
            "text-[0.95rem] leading-relaxed",
            isUser
              ? "rounded-2xl rounded-br-md bg-ink px-4 py-3 text-paper"
              : "rounded-2xl rounded-bl-md border border-edge bg-surface px-4 py-3 text-ink shadow-card",
          )}
        >
          {pending ? <TypingIndicator /> : <p className="whitespace-pre-wrap">{message.content}</p>}
        </div>
      </div>
    </motion.div>
  );
}
