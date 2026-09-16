import { FormEvent, KeyboardEvent, useState } from "react";

interface InputBarProps {
  disabled: boolean;
  onSend: (question: string) => Promise<void>;
}

const MAX_QUESTION_LENGTH = 500;

export function InputBar({ disabled, onSend }: InputBarProps) {
  const [question, setQuestion] = useState("");

  async function submitQuestion(value: string) {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;

    setQuestion("");
    await onSend(trimmed);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitQuestion(question);
  }

  async function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await submitQuestion(question);
    }
  }

  return (
    <form className="input-bar" onSubmit={handleSubmit} aria-label="Enviar pergunta ao assistente">
      <label className="sr-only" htmlFor="question-input">
        Digite sua pergunta
      </label>
      <textarea
        id="question-input"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua dúvida sobre o IFES Cariacica"
        rows={2}
        maxLength={MAX_QUESTION_LENGTH}
        disabled={disabled}
        aria-describedby="question-helper"
      />
      <button type="submit" disabled={disabled || !question.trim()} aria-label="Enviar pergunta">
        {disabled ? "Enviando..." : "Enviar"}
      </button>
      <p id="question-helper" className="helper-text">
        Pressione Enter para enviar ou Shift+Enter para quebrar linha.
      </p>
    </form>
  );
}
