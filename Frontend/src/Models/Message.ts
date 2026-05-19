// Who sent a message: the person or the AI assistant.
export type MessageRole = "user" | "assistant";

// One message inside a conversation.
export interface Message {
  id: number;
  conversationId: number;
  role: MessageRole;
  content: string;
  createdAt: string;
}
