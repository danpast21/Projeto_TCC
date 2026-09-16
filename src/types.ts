export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  pageTitle?: string | null;
  sourceUrl?: string | null;
  found?: boolean;
  outOfScope?: boolean;
  createdAt: string;
}

export interface ChatApiResponse {
  answer: string;
  pageTitle: string | null;
  sourceUrl: string | null;
  found: boolean;
  outOfScope?: boolean;
}
