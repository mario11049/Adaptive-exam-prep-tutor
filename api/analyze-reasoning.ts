import { callAI, clip, extractJson, guard, Req, Res } from './_lib';

export default async function handler(req: Req, res: Res) {
  if (!guard(req, res)) return;
  try {
    const { question, studentAnswer, studentReasoning, currentMastery } = req.body || {};
    const system = `You are the LearnLoop Reasoning Analyzer for CBSE Class 10 Science.
Evaluate the student's written reasoning against the rubric. Judge the reasoning, not only the final answer.
Question: ${clip(question?.questionText, 1500)}
Correct answer: ${clip(question?.correctAnswer, 500)}
Rubric criteria: ${clip(JSON.stringify(question?.rubric?.keyCriteria || []), 1500)}
Common misconceptions: ${clip(JSON.stringify(question?.rubric?.commonMisconceptions || []), 2000)}

Student Answer: ${clip(studentAnswer, 500)}
Student Written Reasoning: ${clip(studentReasoning, 2000)}

Respond ONLY with valid JSON in this exact structure:
{"isCorrect": boolean, "reasoningQuality": "solid"|"partial"|"flawed"|"unclear",
"detectedMisconception": {"id": string, "name": string, "evidence": string, "confidence": number, "explanation": string, "remedialAdvice": string} or null,
"understoodPoints": [string], "missingOrFlawedPoints": [string], "evidenceQuote": string, "feedback": string,
"recommendedConcept": {"id": string, "name": string, "reason": string}}`;

    const raw = await callAI(
      [{ role: 'system', content: system }, { role: 'user', content: 'Analyze the student submission now.' }],
      { temperature: 0.1, max_tokens: 900 }
    );
    const parsed = extractJson(raw);

    // Deterministic learner-model update: new = 0.70*prior + 0.30*evidence
    const prior = Number.isFinite(currentMastery) ? Number(currentMastery) : 50;
    const isCorrect = Boolean(parsed.isCorrect);
    const quality = parsed.reasoningQuality || (isCorrect ? 'solid' : 'flawed');
    const q = quality === 'solid' ? 1 : quality === 'partial' ? 0.65 : 0.25;
    const evidence = Math.min(100, Math.max(10, (isCorrect ? 90 : 25) * q));
    const newMastery = Math.round(0.7 * prior + 0.3 * evidence);

    res.status(200).json({ ...parsed, previousMastery: prior, newMastery, masteryDelta: newMastery - prior });
  } catch (e: any) {
    res.status(200).json({ fallback: true, error: e.message });
  }
}
