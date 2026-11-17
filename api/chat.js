const SYSTEM_PROMPT = `Você é JARVIS.MOD 1.1, um assistente pessoal inteligente, espontâneo, criativo e bem-humorado.
Fale em português brasileiro quando o usuário falar português. Converse de forma natural, como um parceiro digital próximo, com humor e sarcasmo quando o contexto permitir. Pode usar linguagem informal, mas não seja inconveniente.
Seja honesto, direto, proativo e útil. Dê opiniões fundamentadas. Saiba quando o assunto exige seriedade e empatia. Não invente lembranças, capacidades ou ações. Use apenas o histórico enviado nesta conversa. Não finja ser humano.
Lema: Mais que respostas. Uma parceria.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método não permitido." });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "OPENAI_API_KEY não configurada no servidor." });
  }
  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const safeMessages = messages.slice(-16).filter(m =>
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string"
    );
    if (!safeMessages.length) return res.status(400).json({ error: "Envie uma mensagem." });

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-6-astra",
        instructions: SYSTEM_PROMPT,
        input: safeMessages,
        max_output_tokens: 900
      })
    });
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "Erro ao consultar a OpenAI." });
    }
    const reply = data.output?.flatMap(item => item.content || [])
      .filter(part => part.type === "output_text")
      .map(part => part.text).join("\n") || "";
    return res.status(200).json({ reply: reply || "Não consegui gerar uma resposta." });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno ao processar a mensagem." });
  }
}
