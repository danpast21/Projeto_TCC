import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// CAMINHO DO ARQUIVO OFICIAL
// ==========================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caminhoArquivo = path.join(
  __dirname,
  "..",
  "docs",
  "informacoes_matricula.txt"
);

// ==========================================
// CARREGAR BASE OFICIAL
// ==========================================

let informacoesOficiais = "";

try {
  informacoesOficiais = fs.readFileSync(
    caminhoArquivo,
    "utf8"
  );

  console.log("=================================");
  console.log("BASE OFICIAL CARREGADA");
  console.log("=================================");
  console.log("Arquivo:");
  console.log(caminhoArquivo);

} catch (erro) {

  console.error("ERRO AO LER A BASE OFICIAL:");
  console.error(erro);

}

// ==========================================
// GEMINI - NOVO SDK
// ==========================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// ==========================================
// API DO CHAT
// ==========================================

app.post("/api/chat", async (req, res) => {

  console.log("\n=================================");
  console.log("ENTROU NA API");
  console.log("=================================");

  try {

    const question = req.body.question;

    console.log("PERGUNTA:");
    console.log(question);

    // ======================================
    // PROMPT
    // ======================================

    const prompt = `
Você é o Assistente Virtual de Matrícula do IFES Campus Cariacica.

Sua função é ajudar candidatos a entender informações sobre matrícula,
inscrição, documentos, cursos, prazos e procedimentos.

========================================
INTERPRETAÇÃO DAS PERGUNTAS
========================================

Você deve interpretar o SENTIDO da pergunta do candidato, e não apenas
procurar palavras exatamente iguais na BASE OFICIAL.

Perguntas diferentes podem representar a mesma dúvida.

Por exemplo, quando o candidato perguntar sobre a possibilidade de
realizar matrícula, inscrição ou enviar documentos pela internet,
considere como perguntas relacionadas ao mesmo assunto:

- "Posso usar Google Forms?"
- "Posso fazer pela internet?"
- "Preciso ir pessoalmente?"
- "Posso mandar os documentos online?"
- "Tem como fazer a matrícula à distância?"
- "Posso fazer minha inscrição online?"
- "Preciso comparecer ao campus?"
- "Tenho que ir até o IFES?"
- "Posso enviar os documentos pela internet?"
- "Existe inscrição online?"
- "Posso fazer tudo de casa?"

OBS: É importante diferenciar os termos "inscrição", "matrícula" e
"envio de documentos".

Quando o candidato utilizar uma dessas palavras, analise o contexto
da pergunta para identificar qual procedimento ele realmente está
questionando.

Por exemplo:

- "Posso fazer a inscrição pela internet?"
  → procedimento de inscrição.

- "Posso fazer a matrícula pela internet?"
  → procedimento de matrícula.

- "Posso enviar os documentos online?"
  → forma de entrega dos documentos.

- "Preciso ir pessoalmente?"
  → forma/local de realização do procedimento mencionado no contexto.

Não trate automaticamente inscrição e matrícula como sendo a mesma coisa.

Essas perguntas devem ser interpretadas semanticamente como dúvidas
sobre o PROCEDIMENTO e o LOCAL/FORMA de realização da matrícula ou
inscrição.

Da mesma forma, você deve reconhecer perguntas equivalentes sobre:

DOCUMENTOS:
- "Quais documentos preciso?"
- "O que tenho que levar?"
- "Que documentos são necessários?"
- "O que preciso apresentar?"
- "Quais papéis preciso entregar?"

HORÁRIO:
- "Que horas posso fazer?"
- "Qual o horário?"
- "Quando posso ir?"
- "Que horas funciona?"
- "Posso ir à tarde?"

LOCAL:
- "Onde faço a matrícula?"
- "Onde preciso ir?"
- "Qual setor devo procurar?"
- "Tenho que ir em qual lugar?"
- "Onde entrego os documentos?"

PRAZO:
- "Até quando posso fazer?"
- "Qual a data limite?"
- "Quando termina?"
- "Qual o prazo?"
- "Ainda posso fazer a matrícula?"

CONTATO:
- "Qual o telefone?"
- "Como entro em contato?"
- "Qual número do IFES?"
- "Quem devo procurar?"
- "Como falo com a CRA?"

Sempre identifique primeiro QUAL É A INTENÇÃO da pergunta e depois
procure a informação correspondente na BASE OFICIAL.

========================================
REGRAS IMPORTANTES
========================================

1. Use a BASE OFICIAL abaixo como fonte principal.

2. NÃO invente informações.

3. NÃO invente documentos.

4. NÃO invente datas.

5. NÃO invente horários.

6. NÃO invente procedimentos.

7. Se a informação não estiver na BASE OFICIAL, informe claramente
que essa informação não consta na base disponível.

8. Nunca transforme uma possibilidade em uma informação oficial.

9. Se o candidato perguntar algo relacionado a inscrição online,
Google Forms, envio online de documentos ou comparecimento presencial,
procure primeiro na BASE OFICIAL informações sobre a forma de realização
da inscrição/matrícula.

10. Se a BASE OFICIAL disser que o procedimento é presencial,
responda claramente que é presencial.

11. Se a BASE OFICIAL disser que existe procedimento online,
explique como ele funciona conforme a BASE OFICIAL.

12. Se a BASE OFICIAL não informar se o procedimento pode ser realizado
online ou presencialmente, diga que essa informação não consta na base,
sem tentar adivinhar.

13. Responda em português do Brasil.

14. Seja claro e objetivo.

15. Quando houver vários documentos, apresente-os em tópicos.

========================================
BASE OFICIAL DO IFES
========================================

${informacoesOficiais}

========================================
FIM DA BASE OFICIAL
========================================

PERGUNTA DO CANDIDATO:

${question}

========================================
RESPOSTA
========================================
`;

    console.log("CHAMANDO GEMINI...");

    // ======================================
    // PRIMEIRA TENTATIVA
    // ======================================

    let response;

    try {

      console.log("Tentando Gemini 3.5 Flash...");

      response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
      });

    } catch (error) {

      console.log("Gemini 3.5 Flash indisponível.");
      console.log("Tentando modelo reserva...");

      // ====================================
      // MODELO RESERVA
      // ====================================

      response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt
      });

    }

    // ======================================
    // RESPOSTA
    // ======================================

    const answer = response.text;

    console.log("GEMINI RESPONDEU:");
    console.log(answer);

    // ======================================
    // DEVOLVER PARA O SITE
    // ======================================

    res.json({
      answer: answer
    });

  } catch (error) {

    console.log("\n========== ERRO GEMINI ==========");
    console.error(error);

    res.status(500).json({
      error: "Erro ao consultar a inteligência artificial."
    });

  }

});



app.listen(3001, () => {

  console.log("=================================");
  console.log("SERVIDOR IA RODANDO NA PORTA 3001");
  console.log("=================================");

});