import { ChatApiResponse } from "../types";

const FRIENDLY_ERROR =
  "Nao foi possivel consultar o assistente no momento. Tente novamente mais tarde.";

export async function sendQuestionToApi(question: string): Promise<ChatApiResponse> {
  let response: Response;

  try {
    response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
  } catch {
    throw new Error(FRIENDLY_ERROR);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new Error(FRIENDLY_ERROR);
  }

  const asError = data as { error?: unknown };
  if (!response.ok || typeof asError.error === "string") {
    throw new Error(typeof asError.error === "string" ? asError.error : FRIENDLY_ERROR);
  }

  const parsed = data as Partial<ChatApiResponse>;
  if (typeof parsed.answer !== "string") {
    throw new Error(FRIENDLY_ERROR);
  }

  return {
    answer: parsed.answer,
    pageTitle: parsed.pageTitle ?? null,
    sourceUrl: parsed.sourceUrl ?? null,
    found: parsed.found ?? false,
    outOfScope: parsed.outOfScope ?? false,
  };
}
