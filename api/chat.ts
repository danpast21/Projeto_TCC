import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);


export async function POST(req: Request) {

  try {

    const body = await req.json();

    const question = body.question;


    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });


    const prompt = `
Você é o Assistente Virtual de Matrícula do IFES Campus Cariacica.

Seu objetivo é auxiliar candidatos no processo de matrícula.

Você pode responder dúvidas sobre:
- documentos necessários;
- preenchimento do formulário;
- orientações de matrícula.

Regras:
- Não invente informações.
- Não crie documentos ou prazos.
- Quando não souber, informe que o candidato deve procurar a CRA.

Pergunta do candidato:
${question}
`;


    const result = await model.generateContent(prompt);


    const answer = result.response.text();


    return Response.json({

      answer: answer,

      pageTitle: "Assistente Virtual IFES",

      sourceUrl: null,

      found: true,

      outOfScope: false

    });


  } catch(error){

    console.error(error);


    return Response.json({

      error:
      "Não foi possível consultar o assistente no momento."

    },
    {
      status:500
    });


  }

}