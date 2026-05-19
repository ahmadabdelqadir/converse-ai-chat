import type { Conversation } from "../Models/Conversation";
import type { Message, MessageRole } from "../Models/Message";
import { appConfig } from "../Utils/AppConfig";
import { httpService } from "./HttpService";

// Raw shapes returned by the backend (snake_case keys).
interface RawConversation {
  id: number;
  created_at: string;
}

interface RawMessage {
  id: number;
  conversation_id: number;
  role: string;
  content: string;
  created_at: string;
}

// Talks to the chat REST API and maps the responses to frontend models.
class ChatService {
  // Start a new, empty conversation.
  public async createConversation(): Promise<Conversation> {
    const raw = await httpService.post<RawConversation>(appConfig.conversationsUrl);
    return { id: raw.id, createdAt: raw.created_at };
  }

  // Send a user message and get back the assistant's reply.
  public async sendMessage(conversationId: number, content: string): Promise<Message> {
    const raw = await httpService.post<RawMessage>(
      `${appConfig.conversationsUrl}/${conversationId}/messages`,
      { content },
    );
    return this.toMessage(raw);
  }

  // Get every message of a conversation.
  public async getMessages(conversationId: number): Promise<Message[]> {
    const raw = await httpService.get<RawMessage[]>(
      `${appConfig.conversationsUrl}/${conversationId}/messages`,
    );
    return raw.map((message) => this.toMessage(message));
  }

  // Map a backend message into the frontend Message model.
  private toMessage(raw: RawMessage): Message {
    const role: MessageRole = raw.role === "assistant" ? "assistant" : "user";
    return {
      id: raw.id,
      conversationId: raw.conversation_id,
      role,
      content: raw.content,
      createdAt: raw.created_at,
    };
  }
}

export const chatService = new ChatService();
