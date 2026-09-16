export interface ChatApiResponse {
  answer: string;
}


const FRIENDLY_ERROR =
  "Não foi possível consultar o assistente no momento. Tente novamente mais tarde.";


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