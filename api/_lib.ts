// Shared helpers for the serverless AI endpoints.
// The API key is read ONLY from the OPENROUTER_API_KEY environment variable.
export interface Req { method?: string; body?: any }
export interface Res { status: (c: number) => Res; json: (d: unknown) => void }

export const MODEL = () => process.env.OPENROUTER_MODEL || 'openrouter/free';

export async function callAI(
  messages: { role: string; content: string }[],
  opts: { temperature?: number; max_tokens?: number } = {}
): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error('OPENROUTER_API_KEY is not set');
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 45000);
  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal: ctrl.signal,
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'https://learnloop.vercel.app',
        'X-Title': 'LearnLoop'
      },
      body: JSON.stringify({ model: MODEL(), messages, ...opts })
    });
    if (!r.ok) throw new Error(`AI provider error ${r.status}`);
    const d: any = await r.json();
    const text = d.choices?.[0]?.message?.content;
    if (!text) throw new Error('Empty AI response');
    return String(text);
  } finally {
    clearTimeout(timer);
  }
}

export const clip = (s: unknown, n: number) => String(s ?? '').slice(0, n);

export function extractJson(raw: string): any {
  const a = raw.indexOf('{');
  const b = raw.lastIndexOf('}');
  if (a < 0 || b < a) throw new Error('No JSON in AI response');
  return JSON.parse(raw.slice(a, b + 1));
}

export function guard(req: Req, res: Res): boolean {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return false;
  }
  return true;
}
