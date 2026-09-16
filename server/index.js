import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";


dotenv.config();


const app = express();

app.use(cors());

app.use(express.json());


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);


app.post("/api/chat", async (req,res)=>{
    console.log("ENTROU NA API");
    try{

        const question = req.body.question;


        const model = genAI.getGenerativeModel({
            model:"gemini-2.0-flash"
        });


        const prompt = `
Você é o Assistente Virtual de Matrícula do IFES Campus Cariacica.

Ajude candidatos com:
- documentos;
- preenchimento da matrícula;
- dúvidas frequentes.

Não invente informações.
Caso não saiba, indique procurar a CRA.

Pergunta:
${question}
`;

console.log("Pergunta recebida:", question);

        const result =
        await model.generateContent(prompt);


        const answer =
        result.response.text();


        res.json({
            answer
        });


    }catch(error){

        console.log("ERRO GEMINI:");
        console.log(error);

        res.status(500).json({
            error:"Erro na IA"
        });
        

    }

});


app.listen(3001, () => {
    console.log("Servidor IA rodando na porta 3001");
});

process.on("exit", () => {
    console.log("SERVIDOR FOI ENCERRADO");
});