import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Brain,
  TrendingUp,
  AlertTriangle,
  Award,
  CheckCircle2,
  Layers,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Users,
  Compass,
  Zap,
  BarChart3
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setAuthModalOpen, loginAsStudent, loginAsTeacher } = useApp();

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#17213D] selection:bg-[#6658D3] selection:text-white">
      {/* Public Header */}
      <header className="sticky top-0 z-40 border-b border-[#E2E6F0] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#17213D] shadow-sm">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2.5" strokeDasharray="3 3" />
                <circle cx="12" cy="12" r="3" fill="#159B85" />
              </svg>
            </div>
            <span className="font-heading text-xl font-extrabold tracking-tight text-[#17213D]">
              LearnLoop
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center space-x-8 md:flex text-xs font-semibold text-gray-600">
            <a href="#how-it-works" className="hover:text-[#6658D3] transition-colors">How it works</a>
            <a href="#student-experience" className="hover:text-[#6658D3] transition-colors">Student Learning</a>
            <a href="#teacher-intelligence" className="hover:text-[#6658D3] transition-colors">Teacher Intelligence</a>
            <a href="#responsible-ai" className="hover:text-[#6658D3] transition-colors">Responsible AI</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setAuthModalOpen(true, 'signin')}
              className="rounded-btn px-4 py-2 text-xs font-bold text-gray-700 hover:text-[#17213D] hover:bg-[#EEF0F7] transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => loginAsStudent()}
              className="flex items-center space-x-1.5 rounded-btn bg-[#6658D3] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4] transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section (PART 4) */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-[#E2E6F0] bg-gradient-to-b from-white to-[#F7F8FC]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left 6 Cols: Headline & Core Promise */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full border border-[#A99CF7]/40 bg-[#EEECFC] px-3.5 py-1 text-xs font-bold text-[#6658D3]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next-Gen Adaptive Learning Intelligence</span>
              </div>

              <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#17213D] sm:text-5xl lg:text-5xl leading-[1.15]">
                Stop studying harder.{' '}
                <span className="text-[#6658D3] block sm:inline">Start understanding better.</span>
              </h1>

              <p className="text-base text-gray-600 leading-relaxed max-w-xl">
                An intelligent learning companion that understands your thinking, identifies knowledge gaps, and creates a personalized path towards academic mastery.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => loginAsStudent()}
                  className="flex items-center space-x-2 rounded-btn bg-[#6658D3] px-6 py-3.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#5546C4] hover:scale-[1.02]"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Start Learning (Alex Demo)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => loginAsTeacher()}
                  className="flex items-center space-x-2 rounded-btn border border-[#E2E6F0] bg-white px-5 py-3.5 text-xs font-bold text-[#17213D] shadow-sm hover:bg-[#F7F8FC] hover:border-[#6658D3]"
                >
                  <GraduationCap className="h-4 w-4 text-[#6658D3]" />
                  <span>Faculty Intelligence (Sarah Demo)</span>
                </button>
              </div>

              <div className="flex items-center space-x-6 pt-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#159B85]" />
                  <span>CBSE & ICSE Aligned</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#159B85]" />
                  <span>Reasoning Rubric Evaluated</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#159B85]" />
                  <span>Zero Rote Guesswork</span>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Premium Product Preview */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-popover space-y-4">
                {/* Preview Concept Mastery Card */}
                <div className="flex items-center justify-between border-b border-[#E2E6F0] pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Concept Mastery Snapshot</span>
                    <h3 className="font-heading text-sm font-bold text-[#17213D]">
                      Ohm's Law & V-I Characteristics
                    </h3>
                  </div>
                  <div className="rounded-md bg-[#FEF6E9] px-2.5 py-1 text-xs font-bold text-[#E6A448]">
                    56% Developing
                  </div>
                </div>

                {/* Preview Adaptive Question */}
                <div className="rounded-xl border border-[#E2E6F0] bg-[#F7F8FC] p-3.5 text-xs">
                  <span className="font-bold text-[#6658D3] block mb-1">Adaptive Question:</span>
                  <p className="text-gray-700">
                    "If resistance doubles from 4 Ω to 8 Ω at constant 12V, what happens to current and why?"
                  </p>
                </div>

                {/* Preview Misconception Insight */}
                <div className="rounded-xl border border-[#F6B8BD] bg-[#FDEFF0] p-3.5 text-xs">
                  <div className="flex items-center space-x-1.5 font-bold text-[#E16D78] mb-1">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Cognitive Misconception Detected</span>
                  </div>
                  <p className="text-gray-700">
                    "Student assumed higher resistance draws more current, inverting $I = V/R$."
                  </p>
                </div>

                {/* Learning Progress Indicator */}
                <div className="flex items-center justify-between rounded-xl border border-[#A3E8DC] bg-[#E2F7F3] p-3 text-xs">
                  <span className="font-bold text-[#159B85]">Learner Model Dynamic Delta:</span>
                  <span className="font-mono font-bold text-[#159B85]">48% → 56% (+8%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 border-b border-[#E2E6F0] bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E16D78]">The Problem</span>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-[#17213D]">
            Why standard quizzes fail students
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl mx-auto">
            Traditional platforms only check whether option A or B was clicked. They miss why a student made a mistake, leaving deep misconceptions uncorrected.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 text-left">
            <div className="rounded-card border border-[#E2E6F0] bg-[#F7F8FC] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDEFF0] text-[#E16D78]">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-[#17213D]">
                Invisible Reasoning Gaps
              </h3>
              <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                A lucky guess looks identical to real mastery on a multiple-choice quiz. Teachers never see the broken logic behind correct or incorrect answers.
              </p>
            </div>

            <div className="rounded-card border border-[#E2E6F0] bg-[#F7F8FC] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF6E9] text-[#E6A448]">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-[#17213D]">
                Broken Prerequisite Chains
              </h3>
              <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                Students struggling with parallel circuits usually have an unaddressed misunderstanding in Ohm's Law. Without graph intelligence, they remain stuck.
              </p>
            </div>

            <div className="rounded-card border border-[#E2E6F0] bg-[#F7F8FC] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEECFC] text-[#6658D3]">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-[#17213D]">
                Memory Decay Without Recall
              </h3>
              <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                Concepts practiced once fade rapidly. Without an active spaced repetition scheduler, retention drops over 60% within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How LearnLoop Works */}
      <section id="how-it-works" className="py-16 border-b border-[#E2E6F0] bg-[#F7F8FC]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6658D3]">Methodology</span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-[#17213D]">
              How LearnLoop Works
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto">
              Five logically separate AI engines working in tandem to map and advance student cognition.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 text-left">
            <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card">
              <span className="font-metric text-2xl font-extrabold text-[#6658D3]">01</span>
              <h4 className="mt-2 font-heading text-sm font-bold text-[#17213D]">Diagnostic Assessment</h4>
              <p className="mt-1 text-xs text-gray-600">Maps initial knowledge state and baseline cognitive confidence across verified curriculum.</p>
            </div>

            <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card">
              <span className="font-metric text-2xl font-extrabold text-[#6658D3]">02</span>
              <h4 className="mt-2 font-heading text-sm font-bold text-[#17213D]">Reasoning Analyzer</h4>
              <p className="mt-1 text-xs text-gray-600">Evaluates written justification against scientific rubrics to isolate exact misconceptions.</p>
            </div>

            <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card">
              <span className="font-metric text-2xl font-extrabold text-[#6658D3]">03</span>
              <h4 className="mt-2 font-heading text-sm font-bold text-[#17213D]">Dynamic Learner Model</h4>
              <p className="mt-1 text-xs text-gray-600">Maintains deterministic Bayesian mastery scores updated by incoming evidence.</p>
            </div>

            <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card">
              <span className="font-metric text-2xl font-extrabold text-[#6658D3]">04</span>
              <h4 className="mt-2 font-heading text-sm font-bold text-[#17213D]">Adaptive Generator</h4>
              <p className="mt-1 text-xs text-gray-600">Selects or generates the precise next problem needed to unblock prerequisite gaps.</p>
            </div>

            <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card">
              <span className="font-metric text-2xl font-extrabold text-[#6658D3]">05</span>
              <h4 className="mt-2 font-heading text-sm font-bold text-[#17213D]">Spaced Repetition</h4>
              <p className="mt-1 text-xs text-gray-600">Schedules targeted recall intervals to solidify permanent conceptual retention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student & Teacher Dual Experience (Role Separation) */}
      <section id="student-experience" className="py-16 border-b border-[#E2E6F0] bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#6658D3]">
                <BookOpen className="h-4 w-4" />
                <span>Student Experience</span>
              </div>
              <h2 className="font-heading text-3xl font-extrabold text-[#17213D]">
                A personal intelligent learning workspace
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Students explore an interactive concept map, receive immediate feedback on their written scientific reasoning, and get instant answers from a vision-capable AI tutor whenever they get stuck on a textbook problem.
              </p>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#159B85]" />
                  <span>Explain reasoning in plain text — get feedback on why your logic holds.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#159B85]" />
                  <span>Interactive concept graph with prerequisite dependency tracking.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#159B85]" />
                  <span>Floating instant doubt chatbot with camera photo upload.</span>
                </li>
              </ul>
              <button
                onClick={() => loginAsStudent()}
                className="mt-4 rounded-btn bg-[#6658D3] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
              >
                Explore Student Workspace →
              </button>
            </div>

            <div className="space-y-4 lg:border-l lg:border-[#E2E6F0] lg:pl-12" id="teacher-intelligence">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#159B85]">
                <GraduationCap className="h-4 w-4" />
                <span>Teacher Intelligence</span>
              </div>
              <h2 className="font-heading text-3xl font-extrabold text-[#17213D]">
                Actionable classroom learning intelligence
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Teachers get a granular concept heatmap of their authorized classes, cohort-wide misconception prevalence trends, and AI-assisted remedial lesson outlines that target exact student confusion.
              </p>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#159B85]" />
                  <span>Student x Concept heatmap with cell-level reasoning inspections.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#159B85]" />
                  <span>Misconception taxonomy showing how many students share the same bug.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#159B85]" />
                  <span>Downloadable and printable classroom diagnostic PDF reports.</span>
                </li>
              </ul>
              <button
                onClick={() => loginAsTeacher()}
                className="mt-4 rounded-btn border border-[#17213D] bg-white px-5 py-2.5 text-xs font-bold text-[#17213D] shadow-sm hover:bg-[#F7F8FC]"
              >
                Explore Teacher Workspace →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible AI & Privacy (PART 4) */}
      <section id="responsible-ai" className="py-16 border-b border-[#E2E6F0] bg-[#F7F8FC]">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E2F7F3] text-[#159B85]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-heading text-2xl font-extrabold text-[#17213D]">
            Responsible AI & Row-Level Privacy
          </h2>
          <p className="mt-2 text-xs text-gray-600 max-w-xl mx-auto leading-relaxed">
            AI is never used as an uncalibrated final judge. All mastery updates follow deterministic formulas. Sensitive student information is protected with strict database Row Level Security (RLS) — teachers only access their authorized classes, and students never see another peer's profile.
          </p>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-[#17213D] text-white">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl tracking-tight">
            Understand deeper. Learn smarter. Master everything.
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Experience the complete student-to-teacher demonstration journey for CBSE Class 10 Science right now.
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => loginAsStudent()}
              className="rounded-btn bg-[#6658D3] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#5546C4]"
            >
              Start Student Experience (Alex)
            </button>
            <button
              onClick={() => loginAsTeacher()}
              className="rounded-btn border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold text-white hover:bg-white/20"
            >
              Open Teacher Dashboard (Mrs. Jenkins)
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E2E6F0] bg-white py-8 text-center text-xs text-gray-500">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-heading font-bold text-[#17213D]">LearnLoop</span>
            <span>• Adaptive Learning Intelligence Platform</span>
          </div>
          <div className="space-x-4">
            <a href="#how-it-works" className="hover:text-[#6658D3]">How it works</a>
            <a href="#responsible-ai" className="hover:text-[#6658D3]">Privacy & RLS</a>
            <button onClick={() => setAuthModalOpen(true, 'signin')} className="hover:text-[#6658D3]">
              Demo Portal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
