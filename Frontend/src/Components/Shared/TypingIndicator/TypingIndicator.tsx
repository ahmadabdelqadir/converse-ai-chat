// Three pulsing dots, shown while the assistant is preparing a reply.
export function TypingIndicator() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="Converse is typing">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="h-1.5 w-1.5 rounded-full bg-ink-faint animate-blink-dot"
          style={{ animationDelay: `${index * 0.16}s` }}
        />
      ))}
    </span>
  );
}
