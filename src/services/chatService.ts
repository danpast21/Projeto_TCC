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
      "https://script.google.com/macros/s/AKfycbzwpEDIRgXzpz24KfB1yto4iDvbLsSmu467n5l8ZwD8Ii2Y3--JGi34_7bomEs5EGRwqw/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
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