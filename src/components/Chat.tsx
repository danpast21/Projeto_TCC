import { useEffect, useMemo, useRef, useState } from "react";
import { sendQuestionToApi } from "../services/chatService";
import { ChatMessage } from "../types";
import { InputBar } from "./InputBar";
import { MessageBubble } from "./MessageBubble";

const ERROR_MESSAGE =
  "Não foi possível consultar o assistente no momento. Tente novamente mais tarde.";

const WELCOME_MESSAGE: ChatMessage = {
  id: crypto.randomUUID(),
  role: "assistant",
  text: "Olá! Sou o assistente virtual do IFES Cariacica. Pergunte sobre matrícula, cursos, processos seletivos, calendário, requerimentos e outros assuntos administrativos.",
  createdAt: new Date().toISOString(),
};

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  const orderedMessages = useMemo(
    () => [...messages].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [messages],
  );

  useEffect(() => {
    historyRef.current?.scrollTo({
      top: historyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [orderedMessages, loading]);

  async function handleSend(question: string) {
    if (loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: question,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const result = await sendQuestionToApi(question);
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: result.answer,
        pageTitle: result.pageTitle,
        sourceUrl: result.sourceUrl,
        found: result.found,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const text = error instanceof Error ? error.message : ERROR_MESSAGE;
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="chat-wrapper" aria-label="Assistente virtual do IFES Cariacica">
      <header className="chat-header">
        <h1>Assistente Virtual IFES Cariacica</h1>
        <p>Respostas com base em páginas oficiais do campus.</p>
      </header>

      <div ref={historyRef} className="chat-history" aria-live="polite" aria-label="Histórico da conversa">
        {orderedMessages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {loading && (
          <article className="message assistant loading" aria-label="Consultando resposta">
            <p>Consultando informações no site oficial...</p>
          </article>
        )}
      </div>

      <InputBar disabled={loading} onSend={handleSend} />
    </section>
  );
}
