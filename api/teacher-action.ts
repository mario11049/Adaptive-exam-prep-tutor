import { callAI, clip, guard, Req, Res } from './_lib';

export default async function handler(req: Req, res: Res) {
  if (!guard(req, res)) return;
  try {
    const { actionType, conceptName, misconceptionName } = req.body || {};
    const prompt = `You are LearnLoop's Classroom Intelligence Architect for teachers.
Generate a structured ${clip(actionType, 80)} for CBSE Class 10 Science:
Concept: ${clip(conceptName, 200)}
Target Misconception: ${clip(misconceptionName, 300)}

Return concise, high-value pedagogical content in markdown: clear objectives, a classroom experiment, and 3 targeted diagnostic questions.`;
    const content = await callAI([{ role: 'user', content: prompt }], { temperature: 0.3, max_tokens: 800 });
    res.status(200).json({ content });
  } catch (e: any) {
    res.status(200).json({ fallback: true, error: e.message });
  }
}
