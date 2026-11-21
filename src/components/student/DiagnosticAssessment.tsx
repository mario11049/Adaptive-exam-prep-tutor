import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_QUESTIONS } from '../../data/curriculumData';
import {
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export const DiagnosticAssessment: React.FC = () => {
  const { applyMasteryUpdate, setActiveStudentTab, setSelectedConceptId, showToast } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    q_ohms_law_alex: 'Current becomes 6A because resistance doubled.',
    q_parallel_resistors: 'Rp = 4 ohms, I = 1.5A',
  });
  const [reasonings, setReasonings] = useState<Record<string, string>>({
    q_ohms_law_alex: 'Since resistance doubled from 4 ohms to 8 ohms, more resistance makes it stronger and pulls double current from 12V.',
    q_parallel_resistors: '1/Rp = 1/6 + 1/12 = 3/12 = 1/4 => Rp = 4 ohms. Then I = 6/4 = 1.5 A.',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = SAMPLE_QUESTIONS.slice(0, 4);
  const currentQ = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmitDiagnostic = () => {
    setIsSubmitted(true);
    // Apply baseline diagnostic updates
    applyMasteryUpdate('elec_03', 48, false, 'Diagnostic reasoning identified inverse ratio confusion');
    applyMasteryUpdate('elec_06', 75, true, 'Diagnostic confirmed solid reciprocal computation');
    showToast('Diagnostic completed! Learner model updated.', 'success');
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div className="rounded-card border border-[#A3E8DC] bg-white p-8 text-center shadow-card">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E2F7F3] text-[#159B85]">
            <Award className="h-8 w-8" />
          </div>
          <h2 className="mt-4 font-heading text-2xl font-extrabold text-[#17213D]">
            Diagnostic Assessment Complete
          </h2>
          <p className="mt-1 text-sm text-gray-600 max-w-lg mx-auto">
            Your learner model has been initialized with deep reasoning analysis for CBSE Class 10 Science (Electricity).
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 text-left">
            <div className="rounded-xl border border-[#E2E6F0] bg-[#F7F8FC] p-4">
              <span className="text-xs text-gray-500 font-semibold">Estimated Baseline</span>
              <div className="mt-1 font-metric text-2xl font-extrabold text-[#6658D3]">62%</div>
              <p className="mt-1 text-[11px] text-gray-500">Across 8 verified syllabus concepts</p>
            </div>
            <div className="rounded-xl border border-[#A3E8DC] bg-[#E2F7F3]/40 p-4">
              <span className="text-xs text-[#159B85] font-semibold">Primary Strength</span>
              <div className="mt-1 font-heading text-sm font-bold text-[#17213D]">
                Parallel Combinations & Current
              </div>
              <p className="mt-1 text-[11px] text-gray-600">Accurately applied reciprocal inversion</p>
            </div>
            <div className="rounded-xl border border-[#F6B8BD] bg-[#FDEFF0]/40 p-4">
              <span className="text-xs text-[#E16D78] font-semibold">Concept Needing Focus</span>
              <div className="mt-1 font-heading text-sm font-bold text-[#17213D]">
                Ohm's Law (V = IR)
              </div>
              <p className="mt-1 text-[11px] text-[#E16D78]">Inverse current proportionality gap</p>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => {
                setSelectedConceptId('elec_03');
                setActiveStudentTab('practice');
              }}
              className="flex items-center space-x-2 rounded-btn bg-[#6658D3] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
            >
              <span>Begin Targeted Practice Arena</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveStudentTab('concept_graph')}
              className="rounded-btn border border-[#E2E6F0] bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Explore Syllabus Concept Graph
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Bar: Assessment Title & Progress */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#6658D3]">
              <ClipboardCheck className="h-4 w-4" />
              <span>Diagnostic Assessment • CBSE Class 10 Science</span>
            </div>
            <h2 className="mt-1 font-heading text-lg font-bold text-[#17213D]">
              Baseline Reasoning & Concept Mapping
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold text-gray-500">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="h-2 w-32 rounded-full bg-[#EEF0F7] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#6658D3] transition-all"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Column Diagnostic Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left: Question Navigation List */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card lg:col-span-1">
          <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
            Questions
          </h3>
          <div className="space-y-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const hasAnswered = Boolean(answers[q.id]);
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex w-full items-center justify-between rounded-lg p-2.5 text-xs font-semibold transition-colors ${
                    isCurrent
                      ? 'bg-[#EEECFC] text-[#6658D3] border border-[#A99CF7]'
                      : hasAnswered
                      ? 'bg-[#F7F8FC] text-gray-700 hover:bg-[#EEF0F7]'
                      : 'text-gray-400 hover:bg-[#F7F8FC]'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-[#6658D3] text-white'
                          : hasAnswered
                          ? 'bg-[#159B85] text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="truncate max-w-[110px] text-left">{q.conceptName}</span>
                  </div>
                  {hasAnswered && <CheckCircle2 className="h-3.5 w-3.5 text-[#159B85]" />}
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-lg bg-[#F7F8FC] p-3 text-[11px] text-gray-600">
            <span className="font-bold text-[#17213D]">Note:</span> You are graded on your written reasoning, not just your multiple-choice or numeric answer.
          </div>
        </div>

        {/* Middle: Question & Reasoning Inputs (2 cols) */}
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#EEECFC] px-2.5 py-0.5 text-[10px] font-bold text-[#6658D3]">
                {currentQ.conceptName}
              </span>
              <span className="text-xs text-gray-400 capitalize">
                Difficulty: {currentQ.difficulty}
              </span>
            </div>

            {/* Question Text */}
            <div className="mt-4 text-sm font-medium leading-relaxed text-[#17213D]">
              {currentQ.questionText}
            </div>

            {/* Optional Circuit Diagram */}
            {currentQ.diagramSvg && (
              <div
                className="my-4 rounded-lg border border-[#E2E6F0] bg-[#F7F8FC] p-2"
                dangerouslySetInnerHTML={{ __html: currentQ.diagramSvg }}
              />
            )}

            {/* Answer Input */}
            <div className="mt-5">
              <label className="block text-xs font-bold text-[#17213D] mb-1">
                Your Answer:
              </label>
              {currentQ.options ? (
                <div className="space-y-2 mt-2">
                  {currentQ.options.map(opt => (
                    <label
                      key={opt.id}
                      className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 text-xs transition-colors ${
                        answers[currentQ.id] === opt.id
                          ? 'border-[#6658D3] bg-[#F4F3FD] text-[#6658D3] font-bold'
                          : 'border-[#E2E6F0] hover:bg-[#F7F8FC]'
                      }`}
                    >
                      <input
                        type="radio"
                        name={currentQ.id}
                        value={opt.id}
                        checked={answers[currentQ.id] === opt.id}
                        onChange={e =>
                          setAnswers({ ...answers, [currentQ.id]: e.target.value })
                        }
                        className="text-[#6658D3] focus:ring-[#6658D3]"
                      />
                      <span>{opt.text}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Enter your final answer..."
                  value={answers[currentQ.id] || ''}
                  onChange={e =>
                    setAnswers({ ...answers, [currentQ.id]: e.target.value })
                  }
                  className="w-full rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] p-2.5 text-xs text-[#17213D] focus:border-[#6658D3] focus:bg-white focus:outline-none"
                />
              )}
            </div>

            {/* Reasoning Explanation Box (Critical Requirement) */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#17213D]">
                  Explain Your Reasoning (Required):
                </label>
                <span className="text-[10px] text-[#6658D3] font-semibold">
                  Evaluated by AI Reasoning Engine
                </span>
              </div>
              <textarea
                rows={4}
                placeholder="Walk through your thought process: Which formulas or physical principles apply? Why does the circuit behave this way?"
                value={reasonings[currentQ.id] || ''}
                onChange={e =>
                  setReasonings({ ...reasonings, [currentQ.id]: e.target.value })
                }
                className="w-full rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] p-3 text-xs text-[#17213D] leading-relaxed focus:border-[#6658D3] focus:bg-white focus:outline-none"
              />
            </div>

            {/* Navigation Controls */}
            <div className="mt-6 flex items-center justify-between border-t border-[#E2E6F0] pt-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center space-x-1 rounded-btn border border-[#E2E6F0] px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Previous</span>
              </button>

              {currentIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmitDiagnostic}
                  className="flex items-center space-x-1.5 rounded-btn bg-[#159B85] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#12806E]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Submit Diagnostic</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-1 rounded-btn bg-[#6658D3] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
                >
                  <span>Next Question</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Useful Side Panel: Rubric Guidance */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card lg:col-span-1 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#17213D]">
            <HelpCircle className="h-4 w-4 text-[#6658D3]" />
            <span>Rubric Expectations</span>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            The reasoning engine checks for scientific rigor, accurate variable relationships, and formula application.
          </p>

          <div className="rounded-lg bg-[#F7F8FC] p-3 text-xs">
            <span className="font-semibold text-[#17213D] block mb-1">Evaluation Criteria:</span>
            <ul className="space-y-1.5 text-[11px] text-gray-600 list-disc list-inside">
              <li>Identify constant vs varying circuit parameters.</li>
              <li>State the relevant physics formula.</li>
              <li>Justify inverse or direct proportionality.</li>
            </ul>
          </div>

          <div className="border-t border-[#E2E6F0] pt-3 text-[11px] text-gray-500">
            Current syllabus reference:
            <span className="block font-semibold text-[#17213D] mt-0.5">
              {currentQ.chapterName} • NCERT Section 12
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
