# Arquitetura da aplicação (sem n8n)

## 1. Descrição da arquitetura

A aplicação utiliza front-end React e backend serverless via Vercel Function em `/api/chat`. A função consulta páginas públicas do IFES Cariacica em tempo real e usa OpenAI no backend para gerar resposta objetiva.

## 2. Fluxo da aplicação

Usuário -> React -> `POST /api/chat` -> Consulta site IFES -> OpenAI (backend) -> Resposta JSON -> React

## 3. Responsabilidade do front-end

1. Exibir interface de chat responsiva.
2. Coletar pergunta do usuário.
3. Enviar requisição para `/api/chat`.
4. Exibir histórico, loading, erro amigável.
5. Exibir resposta, página relacionada e link oficial.

## 4. Responsabilidade da API `/api/chat`

1. Validar método e payload.
2. Selecionar URL candidata por palavras-chave.
3. Buscar HTML da página oficial.
4. Extrair e limpar conteúdo textual.
5. Chamar OpenAI com contexto da página.
6. Retornar contrato JSON padronizado.
7. Tratar erros sem expor detalhes sensíveis.

## 5. Regras de segurança

1. `OPENAI_API_KEY` somente no backend (Vercel Function).
2. Nunca expor chave no React.
3. Front-end chama apenas rota interna `/api/chat`.
4. Mensagens de erro genéricas para o usuário final.
5. Não retornar stack trace ou configuração interna.

## 6. Regras de resposta do chatbot

1. Priorizar site oficial do IFES Cariacica.
2. Não inventar datas, prazos, documentos ou contatos.
3. Se faltar conteúdo suficiente, retornar fallback com transparência.
4. Sempre que possível, indicar página relacionada e link oficial.
5. Não substituir editais, regulamentos ou comunicados oficiais.

## 7. Justificativa da remoção do n8n

O n8n foi removido por custo operacional e simplificação da arquitetura. Com Vercel Function, o projeto mantém baixo custo, menor complexidade e deploy unificado com o front-end.

## 8. Sem banco vetorial e sem ingestão prévia

Este projeto não usa banco vetorial, embeddings, ingestão prévia de documentos, banco de dados, login ou cadastro. A consulta é feita em tempo real no site oficial.
