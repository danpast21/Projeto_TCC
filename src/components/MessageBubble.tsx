import { ChatMessage } from "../types";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <article className={`message ${isUser ? "user" : "assistant"}`}>
      <p>{message.text}</p>

      {!isUser && message.pageTitle && (
        <p className="message-meta">
          <strong>Página relacionada:</strong> {message.pageTitle}
        </p>
      )}

      {!isUser && message.sourceUrl && (
        <p className="message-meta">
          <strong>Link oficial:</strong>{" "}
          <a href={message.sourceUrl} target="_blank" rel="noreferrer" aria-label="Abrir página oficial em nova aba">
            Abrir página oficial
          </a>
        </p>
      )}
    </article>
  );
}
