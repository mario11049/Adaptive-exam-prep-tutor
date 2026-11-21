import { Question, ReasoningAnalysisResult, DoubtChatMessage, Concept } from '../types';
import { analyzeReasoningOffline } from './learnerModel';

export async function analyzeStudentReasoning(
  question: Question,
  studentAnswer: string,
  studentReasoning: string,
  currentMastery: number
): Promise<ReasoningAnalysisResult> {
  try {
    const res = await fetch('/api/analyze-reasoning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        studentAnswer,
        studentReasoning,
        currentMastery
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (!data.fallback && data.understoodPoints) {
        return {
          isCorrect: Boolean(data.isCorrect),
          reasoningQuality: data.reasoningQuality || 'solid',
          detectedMisconception: data.detectedMisconception || undefined,
          understoodPoints: data.understoodPoints || [],
          missingOrFlawedPoints: data.missingOrFlawedPoints || [],
          evidenceQuote: data.evidenceQuote || studentReasoning.slice(0, 100),
          feedback: data.feedback || '',
          recommendedConcept: data.recommendedConcept || {
            id: question.conceptId,
            name: question.conceptName,
            reason: 'Continued mastery practice'
          },
          previousMastery: currentMastery,
          newMastery: data.newMastery ?? currentMastery,
          masteryDelta: data.masteryDelta ?? 0
        };
      }
    }
  } catch (err) {
    console.warn('Backend API unavailable, using deterministic offline reasoning analyzer:', err);
  }

  // Guaranteed resilient offline fallback with verified curriculum rubrics
  return analyzeReasoningOffline(question, studentAnswer, studentReasoning, currentMastery);
}

export async function sendDoubtChat(
  messages: DoubtChatMessage[],
  currentConcept?: Concept,
  pdf?: { name: string; text: string }
): Promise<string> {
  let aiError = '';
  try {
    const res = await fetch('/api/chat-doubt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        currentConcept,
        pdfName: pdf?.name,
        pdfText: pdf?.text
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply && !data.fallback) {
        return data.reply;
      }
      aiError = data.error || 'unknown error';
    } else {
      aiError = `API returned HTTP ${res.status} (is the /api function deployed / dev server restarted?)`;
    }
  } catch (err: any) {
    aiError = err?.message || 'network error';
  }
  console.warn('Live AI unavailable:', aiError);
  const notice = `> ⚠️ Live AI unavailable: ${aiError}\n> Showing a built-in offline answer instead.\n\n`;
  return notice + offlineChatReply(messages, currentConcept, pdf);
}

function offlineChatReply(messages: DoubtChatMessage[], currentConcept?: Concept, pdf?: { name: string; text: string }): string {

  // Graceful offline tutoring fallback
  const lastUserMsg = messages.filter(m => m.sender === 'student').slice(-1)[0]?.text || '';
  const conceptName = currentConcept?.name || "Ohm's Law & Circuit Concepts";

  if (pdf) {
    const preview = pdf.text.replace(/\s+/g, ' ').slice(0, 280);
    return `### 📄 Notes from "${pdf.name}"\n\nThe live AI tutor is unreachable right now, but your PDF was read successfully. It begins:\n\n> ${preview}…\n\nPlease retry in a moment for a full step-by-step explanation.`;
  }

  if (lastUserMsg.toLowerCase().includes('example')) {
    return `### Practical Real-World Example: ${conceptName}

Imagine water flowing through a garden pipe from a water pump:
- **Voltage ($V$):** The pressure provided by the water pump (in Volts).
- **Current ($I$):** The rate at which liters of water flow past each second (in Amperes).
- **Resistance ($R$):** Squeezing or narrowing the hose (in Ohms).

If the pump pressure is held constant at $12\\text{V}$ and you narrow the pipe (double resistance from $4\\,\\Omega$ to $8\\,\\Omega$), the water flow must **slow down by half** ($3\\text{A} \\to 1.5\\text{A}$). It can never increase!`;
  }

  return `### Understanding ${conceptName}

Let's break this down step by step:
1. **Core Principle:** At constant physical conditions and temperature, the current $I$ passing through a metallic conductor is directly proportional to the potential difference $V$ across its terminals ($V \\propto I$).
2. **Formula:** $V = I \\cdot R \\implies I = \\frac{V}{R}$.
3. **Key Takeaway:** Resistance acts as an opposition to charge flow. Doubling resistance cuts current in half when voltage is fixed.

Feel free to ask a follow-up question or click the PDF icon to attach your notes or a worksheet!`;
}

export async function generateTeacherIntervention(
  actionType: string,
  conceptName: string,
  misconceptionName: string
): Promise<string> {
  try {
    const res = await fetch('/api/teacher-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actionType, conceptName, misconceptionName })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.content && !data.fallback) {
        return data.content;
      }
    }
  } catch (err) {
    console.warn('Teacher intervention backend error:', err);
  }

  return `### 📋 Remedial Action Plan: ${conceptName}
**Target Misconception:** ${misconceptionName}

#### 1. Pedagogical Objective
Ensure students intuitively grasp the inverse relationship $I = V/R$ at fixed source voltage through tactile observation.

#### 2. Recommended Classroom Demonstration (15 mins)
- Connect a $12\\text{V}$ battery to a rheostat (variable resistor) in series with an analog ammeter and a small $12\\text{V}$ lamp.
- Slide the rheostat contact to increase resistance while students observe the ammeter needle drop and the lamp dim.
- Ask students: *"Why did the needle move backward when the resistor was lengthened?"*

#### 3. Diagnostic Check Questions (Formative)
1. If an ammeter reads $4\\text{A}$ across a $24\\text{V}$ circuit, what resistor is installed? (Ans: $6\\,\\Omega$)
2. If resistance is tripled to $18\\,\\Omega$ with the same $24\\text{V}$ supply, what is the new current? (Ans: $1.33\\text{A}$, not $12\\text{A}$)
3. Why does household mains current drop when high-resistance appliances are switched on in series?`;
}
