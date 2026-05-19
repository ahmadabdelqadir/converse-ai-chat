import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface ChatComposerProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

// The message input: an auto-growing textarea with a send button.
// Enter sends the message; Shift+Enter inserts a new line.
export function ChatComposer({ onSend, disabled = false }: ChatComposerProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Grow the textarea with its content, up to a maximum height.
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, [value]);

  function submit() {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="flex items-end gap-2 rounded-[1.4rem] border border-edge bg-surface p-2 shadow-card transition-colors focus-within:border-clay/50">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Message Converse..."
        disabled={disabled}
        className="max-h-[200px] flex-1 resize-none bg-transparent px-3 py-2.5 text-[0.95rem] leading-relaxed text-ink placeholder:text-ink-faint focus:outline-none disabled:opacity-60"
      />
      <button
        type="button"
        onClick={submit}
        disabled={!canSend}
        aria-label="Send message"
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200",
          canSend
            ? "bg-clay text-paper hover:scale-105 hover:bg-clay-deep active:scale-95"
            : "bg-paper-2 text-ink-faint",
        )}
      >
        <ArrowUp className="h-[1.15rem] w-[1.15rem]" strokeWidth={2.5} />
      </button>
    </div>
  );
}
