# LearnLoop — Premium Adaptive Learning Intelligence Platform

> *"Understand deeper. Learn smarter. Master everything."*

LearnLoop is a production-grade adaptive educational technology web application that evaluates student reasoning, maintains a continuously updated Bayesian learner model, isolates conceptual misconceptions, adapts practice problems, and delivers actionable classroom intelligence to teachers.

---

## 🚀 Key Highlights & Architecture

### 1. Two Strictly Isolated Roles (Row Level Security)
- **Student Workspace**: Personal intelligent learning workspace (Overview, Diagnostic Assessment, Universal Syllabus Explorer, Interactive Concept Graph, AI Practice Arena, Misconceptions Library, Spaced Repetition Planner, Progress Analytics, Settings).
- **Teacher Workspace**: Classroom-level intelligence (Overview, My Classes, Classroom Concept Heatmap, Cohort Misconception Trends, Assessments, AI Pedagogical Interventions, Downloadable Reports, Settings).
- **No Parent Accounts or Administrative Clutter**: Tailored specifically for high-leverage student-to-teacher academic acceleration.

### 2. Multi-Engine AI Architecture
- **Reasoning Analyzer**: Does not evaluate only the final answer. Inspects written student justification against verified syllabus rubrics to pinpoint cognitive misconceptions.
- **Learner Model**: Deterministic Bayesian updates ($\text{New Mastery} = 0.70 \times \text{Prior} + 0.30 \times \text{Evidence}$) weighted by correctness, reasoning depth, and question difficulty.
- **Adaptive Practice Generator**: Recommends targeted questions based on prerequisite dependencies and active knowledge gaps.
- **Spaced Repetition Scheduler**: Calibrated on Ebbinghaus memory retention curves to ensure long-term conceptual recall.
- **Floating Instant Doubt Chatbot with PDF understanding**: Fixed to the bottom-right corner of the student workspace, enabling students to attach PDF notes or worksheets for step-by-step Socratic guidance.

### 3. Verified Curriculum Engine
- Pre-populated with official **CBSE Class 10 Science (Chapter 12: Electricity)** concepts, prerequisite edges, and rubric-mapped questions.
- Extensible selector for multiple boards (CBSE, ICSE, State Boards), classes, and subjects with custom JSON import capability.

---

## 🧭 Live Demo Journey for Evaluators & Judges

To experience the full end-to-end journey:

1. **Open the App**: Visit the deployed URL.
2. **Instant Demo Access**: Click **"Student (Alex)"** on the top bar or sign-in modal.
3. **Step 1 — Baseline Diagnostics**: Navigate to **Diagnostic Assessment** to view the initial concept mapping.
4. **Step 2 — AI Practice Arena**:
   - Go to **AI Practice Arena**.
   - Click the judge preset button: **"Load Alex's Flawed Reasoning (Inverse Confusion)"**.
   - Click **"Submit & Analyze Reasoning"**.
   - Watch the AI Reasoning Engine identify the misconception (*"Direct Proportionality Assumption in Ohm's Law"*), extract evidence from Alex's quote, and update the learner model.
   - Click **"Load Corrected Solution"** and submit to watch mastery rise from $48\% \to 56\%$.
5. **Step 3 — Inspect Concept Graph**: Open **Concept Explorer** to see node color transitions and examine prerequisite dependencies.
6. **Step 4 — Test Floating Instant Doubt AI**: Click **"Ask a Doubt"** in the bottom-right corner, attach a PDF (notes or a worksheet) and ask a question about it.
7. **Step 5 — Switch to Teacher Workspace**: Click **"Teacher View"** in the top bar.
   - Inspect the **Classroom Concept Heatmap** to see class-wide performance for Class 10-A. Click any cell to inspect student reasoning transcripts.
   - View **Misconception Trends** to see cohort-wide prevalence.
   - Explore **Teaching Recommendations** and click **"Generate Remedial Practice Set"** to produce AI lesson outlines.
   - Open **Reports** to print or export the official PDF diagnostic report.
8. **Reset Progress**: Click **"Reset Progress"** in the top bar at any time to return all records to the baseline benchmark state.

---

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Recharts.
- **AI backend**: Vercel serverless functions in `/api` (`analyze-reasoning`, `chat-doubt`, `teacher-action`) calling OpenRouter. The key lives only in the `OPENROUTER_API_KEY` environment variable.
- **PDF doubt solving**: PDFs are parsed in the browser with pdf.js; only extracted text is sent to the AI.
- **Resilience**: every AI endpoint has a deterministic offline fallback aligned to the NCERT rubric.

## ⚙️ Run locally

```bash
npm install
cp .env.example .env.local   # then paste your OpenRouter key
npm run dev
```

## 🚀 Deploy (Vercel)

1. Push this repo to GitHub (no secrets are committed).
2. Import it at vercel.com/new (framework auto-detected as Vite).
3. Add `OPENROUTER_API_KEY` under Project Settings → Environment Variables (Production, Preview, Development).
4. Deploy. Redeploy after changing env vars.
