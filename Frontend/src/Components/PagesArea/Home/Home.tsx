import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatComposer } from "@/Components/Shared/ChatComposer/ChatComposer";
import { ChatMessage } from "@/Components/Shared/ChatMessage/ChatMessage";
import { EmptyState } from "@/Components/Shared/EmptyState/EmptyState";
import { Button } from "@/Components/ui/button";
import { useTitle } from "@/Hooks/useTitle";
import type { Message } from "@/Models/Message";
import { chatService } from "@/Services/ChatService";
import { getErrorMessage } from "@/Utils/getErrorMessage";

// The chat page. Holds the current conversation in component state, so a
// page refresh starts a fresh conversation (as the brief allows).
export function Home() {
  useTitle("Converse - Chat");

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const streamEndRef = useRef<HTMLDivElement>(null);
  // Negative ids for the optimistic user messages, so they never clash
  // with the real ids the backend returns.
  const tempIdRef = useRef(-1);

  // Keep the newest message in view.
  useEffect(() => {
    streamEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  async function handleSend(text: string) {
    if (sending) return;
    setError(null);

    // Show the user message straight away (optimistic update).
    const userMessage: Message = {
      id: tempIdRef.current--,
      conversationId: conversationId ?? 0,
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((previous) => [...previous, userMessage]);
    setSending(true);

    try {
      // Create the conversation on the very first message.
      let activeId = conversationId;
      if (activeId === null) {
        const conversation = await chatService.createConversation();
        activeId = conversation.id;
        setConversationId(activeId);
      }

      // Send the message and append the assistant's reply.
      const reply = await chatService.sendMessage(activeId, text);
      setMessages((previous) => [...previous, reply]);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSending(false);
    }
  }

  // Clear everything and start over.
  function handleNewConversation() {
    setMessages([]);
    setConversationId(null);
    setError(null);
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-full flex-col">
      {/* Message stream */}
      <div className="stream-scroll flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-5 py-8">
          {isEmpty && !sending ? (
            <EmptyState onPick={handleSend} />
          ) : (
            <div className="flex flex-col gap-5">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {sending && (
                <ChatMessage
                  message={{
                    id: 0,
                    conversationId: conversationId ?? 0,
                    role: "assistant",
                    content: "",
                    createdAt: "",
                  }}
                  pending
                />
              )}
              <div ref={streamEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Composer dock */}
      <div className="border-t border-edge bg-paper/85 backdrop-blur">
        <div className="mx-auto w-full max-w-3xl px-5 py-4">
          {error && (
            <div className="mb-3 rounded-xl border border-clay/30 bg-clay/5 px-4 py-2.5 text-sm text-clay-deep">
              {error}
            </div>
          )}

          <ChatComposer onSend={handleSend} disabled={sending} />

          <div className="mt-2.5 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNewConversation}
              disabled={isEmpty || sending}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              New conversation
            </Button>
            <span className="text-xs text-ink-faint">
              Enter to send &middot; Shift + Enter for a new line
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
