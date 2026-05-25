import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt } = await req.json();
    const apiKey = process.env.LLM_API_KEY || '';

    if (!apiKey) {
      return NextResponse.json({ error: 'LLM_API_KEY not configured in .env.local' }, { status: 500 });
    }

    let llmResponseText = '';

    if (apiKey.startsWith('sk-ant')) {
      // ── Anthropic Claude ──────────────────────────────────────────────
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1024,
          system: systemPrompt || undefined,
          messages,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Anthropic API Error');
      llmResponseText = data.content[0].text;

    } else if (apiKey.startsWith('sk-')) {
      // ── OpenAI GPT ────────────────────────────────────────────────────
      const openAiMessages = [];
      if (systemPrompt) openAiMessages.push({ role: 'system', content: systemPrompt });
      openAiMessages.push(...messages);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: openAiMessages,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'OpenAI API Error');
      llmResponseText = data.choices[0].message.content;

    } else if (apiKey.startsWith('AIza')) {
      // ── Google Gemini ─────────────────────────────────────────────────
      // Build contents array — Gemini uses "user" / "model" roles
      const geminiContents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const requestBody: Record<string, unknown> = {
        contents: geminiContents,
      };

      // System instruction is a top-level field in Gemini
      if (systemPrompt) {
        requestBody.system_instruction = {
          parts: [{ text: systemPrompt }],
        };
      }

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        const errMsg = data?.error?.message || JSON.stringify(data);
        throw new Error(`Gemini API Error ${response.status}: ${errMsg}`);
      }

      llmResponseText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.candidates?.[0]?.output ||
        'No response from Gemini';

    } else {
      throw new Error(
        'Could not detect LLM provider. Make sure LLM_API_KEY starts with "AIza" (Gemini), "sk-ant" (Claude), or "sk-" (OpenAI).'
      );
    }

    return NextResponse.json({ text: llmResponseText });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('LLM API Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
