# Chatbot IFES Cariacica (React + Vercel Function + OpenAI)

## 1. Objetivo do projeto

Criar um chatbot simples para reduzir dúvidas repetitivas enviadas por e-mail ao IFES Campus Cariacica, direcionando alunos e candidatos para páginas oficiais do site.

## 2. Problema que o sistema resolve

Dúvidas frequentes sobre matrícula, processo seletivo, cursos, assistência estudantil, requerimentos e documentos geram alta demanda administrativa. O chatbot responde com base no conteúdo público do site oficial.

## 3. Tecnologias usadas

- React
- TypeScript
- Vite
- Vercel Functions (`/api/chat`)
- OpenAI API (somente backend)
- Fetch HTTP para consulta em tempo real do site oficial

## 4. Instalação.

```bash
npm install
```

## 5. Execução local

1. Crie o arquivo `.env`:

```powershell
Copy-Item .env.example .env
```

2. Configure:

```env
OPENAI_API_KEY=sua_chave_openai_aqui
```

3. Rode o front-end:

```bash
npm run dev
```

Observação: para testar também a rota serverless `/api/chat` localmente, use `vercel dev`.

## 6. Configuração de ambiente

Arquivo `.env.example`:

```env
OPENAI_API_KEY=sua_chave_openai_aqui
```

Regra: nunca expor chave no front-end. Não usar `VITE_OPENAI_API_KEY`.

## 7. Deploy na Vercel

1. Suba o repositório no GitHub.
2. Importe o projeto na Vercel.
3. Em `Project Settings -> Environment Variables`, configure `OPENAI_API_KEY`.
4. Faça deploy.

## 8. Fluxo da aplicação

1. Usuário digita pergunta na interface React.
2. Front-end envia `POST /api/chat` com `{ question }`.
3. A Vercel Function seleciona URL candidata do IFES por palavras-chave.
4. A função consulta a página pública em tempo real.
5. A função limpa/extrai texto do HTML.
6. A função chama a OpenAI com pergunta + conteúdo + URL.
7. A função retorna JSON padronizado.
8. React exibe resposta, página relacionada e link oficial.

## 9. Limitações do projeto

1. Seleção de URL por palavras-chave simples.
2. Extração HTML simples (sem crawler avançado).
3. Pode precisar ajuste de URLs se o site oficial mudar.
4. Não substitui leitura de editais, regulamentos e comunicados oficiais.

## 10. Aviso de fonte de dados

O sistema usa apenas conteúdo público consultado em tempo real no site oficial do IFES Campus Cariacica.
