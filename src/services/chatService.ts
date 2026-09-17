export interface ChatApiResponse {
  answer: string;
}


const FRIENDLY_ERROR =
  "ERRO: ";  


export async function sendQuestionToApi(
  question: string
): Promise<ChatApiResponse> {

  try {

    const response = await fetch(
      "http://localhost:3001/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      }
    );


    const data = await response.json();

const asError = data as { error?: unknown };

if (!response.ok) {
    throw new Error(JSON.stringify(data));
}
    if (!response.ok) {
      throw new Error(
        data.error || FRIENDLY_ERROR
      );
    }


    return {
      answer: data.answer,
    };


  } catch (error) {

    console.error(error);

    throw new Error(FRIENDLY_ERROR);

  }
}