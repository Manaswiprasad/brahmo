import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt } = await req.json();
    const apiKey = process.env.LLM_API_KEY || '';

    if (!apiKey) {
      return NextResponse.json({ error: 'LLM_API_KEY not configured in .env.local' }, { status: 500 });
    }

    let llmResponseText = '';

    // Auto-detect provider based on key prefix
    if (apiKey.startsWith('sk-ant')) {
      // Anthropic
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          max_tokens: 1000,
          system: systemPrompt || undefined,
          messages: messages
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Anthropic API Error');
      llmResponseText = data.content[0].text;
    } 
    else if (apiKey.startsWith('sk-proj') || apiKey.startsWith('sk-')) {
      // OpenAI
      const openAiMessages = [];
      if (systemPrompt) openAiMessages.push({ role: 'system', content: systemPrompt });
      openAiMessages.push(...messages);

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: openAiMessages
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'OpenAI API Error');
      llmResponseText = data.choices[0].message.content;
    }
    else if (apiKey.startsWith('AIza')) {
      // Google Gemini
      const geminiMessages = messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));
      
      const systemInstruction = systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: systemInstruction,
          contents: geminiMessages
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Gemini API Error');
      llmResponseText = data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Could not detect LLM provider. Ensure LLM_API_KEY is valid.");
    }

    return NextResponse.json({ text: llmResponseText });
  } catch (error: any) {
    console.error('LLM API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
