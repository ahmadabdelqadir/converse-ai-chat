// One chat. Each conversation has its own unique id.
export interface Conversation {
  id: number;
  title: string | null;
  createdAt: string;
}
