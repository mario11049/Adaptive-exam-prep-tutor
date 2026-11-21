import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  SAMPLE_QUESTIONS,
  CONCEPTS_CBSE_ELECTRICITY
} from '../../data/curriculumData';
import { analyzeStudentReasoning } from '../../services/api';
import { ReasoningAnalysisResult, Question } from '../../types';
import {
  Flame,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Brain,
  RotateCcw,
  BookOpen
} from 'lucide-react';

export const PracticeArena: React.FC = () => {
  const {
    selectedConceptId,
    studentMastery,
    applyMasteryUpdate,
    addOrUpdateMisconception,
    setSelectedConceptId,
    showToast
  } = useApp();

  // Find question matching selected concept or fallback to Alex's Ohm's Law question
  const currentConcept =
    CONCEPTS_CBSE_ELECTRICITY.find(c => c.id === selectedConceptId) ||
    CONCEPTS_CBSE_ELECTRICITY[2];

  const currentQuestion: Question =
    SAMPLE_QUESTIONS.find(q => q.conceptId === currentConcept.id) ||
    SAMPLE_QUESTIONS[0];

  const currentMastery = studentMastery[currentConcept.id]?.masteryPercentage ?? 48;

  const [studentAnswer, setStudentAnswer] = useState('');
  const [studentReasoning, setStudentReasoning] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ReasoningAnalysisResult | null>(null);

  // Quick Preset Handlers for Demo Evaluators
  const loadAlexFlawedAttempt = () => {
    setStudentAnswer('Current becomes 6A (it doubles).');
    setStudentReasoning(
      'Since resistance doubled from 4 ohms to 8 ohms, having more resistance makes the circuit stronger and pulls double current (6A) from the 12V battery.'
    );
    showToast('Loaded Alex\'s initial flawed reasoning for testing.', 'info');
  };

  const loadCorrectedSolution = () => {
    setStudentAnswer('Current halves to 1.5 A.');
    setStudentReasoning(
      "According to Ohm's Law I = V / R. With a constant 12V supply, current is inversely proportional to resistance. At 4 ohms I = 12/4 = 3A. When resistance doubles to 8 ohms, current halves: I = 12/8 = 1.5A."
    );
    showToast('Loaded verified correct reasoning for testing.', 'info');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentAnswer.trim() || !studentReasoning.trim()) {
      showToast('Please provide both your answer and your written reasoning.', 'warning');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeStudentReasoning(
        currentQuestion,
        studentAnswer,
        studentReasoning,
        currentMastery
      );

      setAnalysisResult(result);

      // Update central state
      applyMasteryUpdate(
        currentConcept.id,
        result.newMastery,
        result.isCorrect,
        `Answer: ${studentAnswer.slice(0, 40)} | Reasoning: ${studentReasoning.slice(0, 60)}`
      );

      if (result.detectedMisconception) {
        addOrUpdateMisconception({
          id: `misc_${Date.now()}`,
          conceptId: currentConcept.id,
          conceptName: currentConcept.name,
          tag: result.detectedMisconception.id,
          studentQuote: studentReasoning,
          evidence: result.detectedMisconception.evidence,
          confidence: result.detectedMisconception.confidence,
          correctExplanation: result.detectedMisconception.explanation,
          practiceRecommendation: result.detectedMisconception.remedialAdvice,
          status: 'newly_detected',
          detectedAt: 'Just now',
          occurrences: 1
        });
        showToast('Misconception identified and added to your Library.', 'warning');
      } else if (result.isCorrect) {
        showToast(`Mastery increased! ${currentMastery}% → ${result.newMastery}%`, 'success');
      }
    } catch (err: any) {
      showToast('Error analyzing reasoning: ' + err.message, 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Top Breadcrumb & Concept Header */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#6658D3]">
              <Flame className="h-4 w-4" />
              <span>AI Practice Arena • Distraction-Free Adaptive Space</span>
            </div>
            <h2 className="mt-1 font-heading text-xl font-bold text-[#17213D]">
              {currentConcept.name}
            </h2>
            <p className="text-xs text-gray-500">
              CBSE Class 10 Science • Chapter 12: Electricity • NCERT Section 12.3
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="rounded-xl border border-[#E2E6F0] bg-[#F7F8FC] px-3 py-1.5 text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400">Current Mastery</span>
              <div className="font-metric text-lg font-extrabold text-[#17213D]">
                {currentMastery}%
              </div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                currentQuestion.difficulty === 'Beginner'
                  ? 'bg-[#E2F7F3] text-[#159B85]'
                  : currentQuestion.difficulty === 'Intermediate'
                  ? 'bg-[#FEF6E9] text-[#E6A448]'
                  : 'bg-[#EEECFC] text-[#6658D3]'
              }`}
            >
              {currentQuestion.difficulty}
            </span>
          </div>
        </div>

        {/* Demo Fast-fill helpers for Judges */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#E2E6F0] pt-3 text-xs">
          <span className="font-bold text-gray-500 text-[11px]">Sample Answers:</span>
          <button
            type="button"
            onClick={loadAlexFlawedAttempt}
            className="rounded-btn border border-[#F6B8BD] bg-[#FDEFF0] px-2.5 py-1 text-[11px] font-semibold text-[#E16D78] hover:bg-[#FCD8DC]"
          >
            Load Alex's Flawed Reasoning (Inverse Confusion)
          </button>
          <button
            type="button"
            onClick={loadCorrectedSolution}
            className="rounded-btn border border-[#A3E8DC] bg-[#E2F7F3] px-2.5 py-1 text-[11px] font-semibold text-[#159B85] hover:bg-[#C9F2EB]"
          >
            Load Corrected Solution (Halved Current: 48% → 56%)
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-400">
          Question Specification
        </h3>
        <p className="mt-2 text-sm font-medium leading-relaxed text-[#17213D]">
          {currentQuestion.questionText}
        </p>

        {currentQuestion.diagramSvg && (
          <div
            className="my-4 rounded-xl border border-[#E2E6F0] bg-[#F7F8FC] p-4 text-center"
            dangerouslySetInnerHTML={{ __html: currentQuestion.diagramSvg }}
          />
        )}

        {/* Practice Submission Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#17213D] mb-1">
              Your Numerical or Qualitative Answer:
            </label>
            <input
              type="text"
              placeholder="e.g. Current halves from 3A to 1.5A"
              value={studentAnswer}
              onChange={e => setStudentAnswer(e.target.value)}
              disabled={isAnalyzing}
              className="w-full rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] p-3 text-xs text-[#17213D] transition-colors focus:border-[#6658D3] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#17213D]">
                Your Reasoning & Physical Justification (Mandatory):
              </label>
              <span className="text-[11px] text-[#6658D3] font-semibold">
                Analyzed against verified NCERT rubric
              </span>
            </div>
            <textarea
              rows={4}
              placeholder="State the underlying laws (e.g. Ohm's Law V = IR), relationships between parameters, and step-by-step logic..."
              value={studentReasoning}
              onChange={e => setStudentReasoning(e.target.value)}
              disabled={isAnalyzing}
              className="w-full rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] p-3 text-xs leading-relaxed text-[#17213D] transition-colors focus:border-[#6658D3] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-gray-400">
              Deterministic Learner Model Bayesian Update on Submit
            </span>
            <button
              type="submit"
              disabled={isAnalyzing}
              className="flex items-center space-x-2 rounded-btn bg-[#6658D3] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#5546C4] disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Analyzing Reasoning...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Submit & Analyze Reasoning</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* AI Feedback & Learner Model Update Panel (PART 6E) */}
      {analysisResult && (
        <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-popover animate-fade-in space-y-6">
          {/* Header & Mastery Delta Banner */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#EEECFC] bg-[#F4F3FD] p-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center space-x-2">
                {analysisResult.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-[#159B85]" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-[#E16D78]" />
                )}
                <h3 className="font-heading text-base font-bold text-[#17213D]">
                  {analysisResult.isCorrect
                    ? 'Reasoning Validated: Concept Reinforced'
                    : 'Misconception Identified in Reasoning'}
                </h3>
              </div>
              <p className="mt-1 text-xs text-gray-600">
                Reasoning quality assessed as:{' '}
                <span className="font-bold uppercase text-[#6658D3]">
                  {analysisResult.reasoningQuality}
                </span>
              </p>
            </div>

            {/* Live Learner-Model Update Badge */}
            <div className="rounded-xl border border-white bg-white/90 p-3 text-center shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {currentConcept.name} Mastery Update
              </span>
              <div className="mt-1 flex items-center justify-center space-x-2">
                <span className="font-metric text-lg font-bold text-gray-400">
                  {analysisResult.previousMastery}%
                </span>
                <span className="text-gray-400">→</span>
                <span
                  className={`font-metric text-xl font-extrabold ${
                    analysisResult.masteryDelta >= 0 ? 'text-[#159B85]' : 'text-[#E16D78]'
                  }`}
                >
                  {analysisResult.newMastery}%
                </span>
                <span
                  className={`text-xs font-bold ${
                    analysisResult.masteryDelta >= 0 ? 'text-[#159B85]' : 'text-[#E16D78]'
                  }`}
                >
                  ({analysisResult.masteryDelta >= 0 ? '+' : ''}
                  {analysisResult.masteryDelta}%)
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Sections */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* What you understood correctly */}
            <div className="rounded-xl border border-[#A3E8DC] bg-[#E2F7F3]/30 p-4">
              <span className="text-xs font-bold text-[#159B85] flex items-center space-x-1 mb-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>What was understood correctly</span>
              </span>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {analysisResult.understoodPoints.map((pt, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-[#159B85] font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas of confusion / Detected Misconception */}
            <div className="rounded-xl border border-[#F6B8BD] bg-[#FDEFF0]/30 p-4">
              <span className="text-xs font-bold text-[#E16D78] flex items-center space-x-1 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span>
                  {analysisResult.detectedMisconception
                    ? 'Detected Misconception'
                    : 'Gaps in Reasoning'}
                </span>
              </span>
              {analysisResult.detectedMisconception ? (
                <div>
                  <div className="font-semibold text-xs text-[#17213D]">
                    {analysisResult.detectedMisconception.name}
                  </div>
                  <p className="mt-1 text-xs text-gray-600">
                    <span className="font-semibold">Evidence Quote:</span> "
                    {analysisResult.evidenceQuote}"
                  </p>
                  <p className="mt-1.5 text-xs text-gray-700 leading-relaxed">
                    {analysisResult.detectedMisconception.explanation}
                  </p>
                </div>
              ) : (
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {analysisResult.missingOrFlawedPoints.map((pt, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-[#E16D78] font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Standard Explanation */}
          <div className="rounded-xl border border-[#E2E6F0] bg-[#F7F8FC] p-4 text-xs">
            <span className="font-bold text-[#17213D] block mb-1">
              Verified NCERT Solution Explanation:
            </span>
            <p className="text-gray-600 leading-relaxed">
              {currentQuestion.standardExplanation}
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E6F0] pt-4">
            <div className="text-xs text-gray-500">
              Next recommendation:{' '}
              <span className="font-bold text-[#17213D]">
                {analysisResult.recommendedConcept.name}
              </span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setAnalysisResult(null);
                  setStudentAnswer('');
                  setStudentReasoning('');
                }}
                className="rounded-btn border border-[#E2E6F0] px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Try Another Problem
              </button>
              <button
                onClick={() => {
                  setSelectedConceptId(analysisResult.recommendedConcept.id);
                  setAnalysisResult(null);
                  setStudentAnswer('');
                  setStudentReasoning('');
                  showToast('Loaded targeted adaptive practice.', 'info');
                }}
                className="flex items-center space-x-1.5 rounded-btn bg-[#6658D3] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
              >
                <span>Continue Adaptive Path</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
