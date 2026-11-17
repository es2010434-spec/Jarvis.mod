# JARVIS.MOD 1.1

## O que está incluído
- Interface responsiva de chat.
- Histórico de mensagens durante a sessão.
- Backend serverless em `api/chat.js`, conectado à OpenAI Responses API.
- Personalidade JARVIS.MOD 1.1 no prompt do servidor.
- Consulta meteorológica Open-Meteo após clique e autorização explícita de localização.
- Sem rastreamento contínuo de localização.

## Publicar na Vercel
1. Crie um repositório no GitHub e envie o conteúdo desta pasta.
2. Entre na Vercel e importe esse repositório.
3. Em **Project Settings > Environment Variables**, crie:
   - Nome: `OPENAI_API_KEY`
   - Valor: sua chave secreta completa, copiada diretamente da plataforma OpenAI.
   - Opcional: `OPENAI_MODEL` com `gpt-6-astra` ou outro modelo habilitado na sua conta.
4. Salve e faça um novo deploy.
5. Abra o endereço publicado. O chat chama `/api/chat`.

**Nunca coloque a chave no `index.html`, em código público, no GitHub ou nesta conversa.** Ela deve ficar somente como variável de ambiente no servidor.

## Teste
Abrir `index.html` diretamente como arquivo permite testar o visual e o módulo de clima, mas não ativa o chat com IA. Para conversar com a IA, publique o projeto na Vercel com a variável `OPENAI_API_KEY` configurada.

## Privacidade
A geolocalização só é solicitada quando a pessoa toca no botão de autorização. As coordenadas são usadas no navegador para consultar o Open-Meteo e não são enviadas ao endpoint de chat.
