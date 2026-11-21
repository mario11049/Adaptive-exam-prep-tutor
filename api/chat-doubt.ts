import { callAI, clip, guard, Req, Res } from './_lib';

export default async function handler(req: Req, res: Res) {
  if (!guard(req, res)) return;
  try {
    const { messages, currentConcept, pdfText, pdfName } = req.body || {};
    const system = `You are "LearnLoop AI", an elite personal learning mentor for CBSE Class 10 Science.
Current concept: ${clip(currentConcept?.name || "Ohm's Law & Circuit Concepts", 200)}.
Description: ${clip(currentConcept?.description || 'Circuit resistance and potential difference', 400)}.
Guidelines: explain with clarity and warmth; scaffold step by step; never just dump final answers;
use markdown bullets, formulas and real-world analogies. If the student's reasoning is off, point out
exactly where it diverged.${pdfText ? `

The student attached a PDF named "${clip(pdfName, 120)}". Its extracted text is below. Answer using it,
and say so if the question is not covered by it.
--- PDF START ---
${clip(pdfText, 14000)}
--- PDF END ---` : ''}`;

    const history = (Array.isArray(messages) ? messages : []).slice(-12).map((m: any) => ({
      role: m.sender === 'student' ? 'user' : 'assistant',
      content: clip(m.text, 2000)
    }));
    const reply = await callAI([{ role: 'system', content: system }, ...history], {
      temperature: 0.3,
      max_tokens: 1000
    });
    res.status(200).json({ reply });
  } catch (e: any) {
    res.status(200).json({ fallback: true, error: e.message });
  }
}
