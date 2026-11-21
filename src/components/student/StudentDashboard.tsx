import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  TrendingUp,
  AlertTriangle,
  Clock,
  ArrowRight,
  Brain,
  CheckCircle2,
  Calendar,
  Sparkles,
  BookOpen,
  ChevronRight,
  Flame
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { PROGRESS_HISTORY } from '../../data/mockDatabase';
import { CONCEPTS_CBSE_ELECTRICITY } from '../../data/curriculumData';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    studentMastery,
    misconceptions,
    revisionTasks,
    setActiveStudentTab,
    setSelectedConceptId
  } = useApp();

  // Compute metrics from real state
  const masteryEntries = Object.values(studentMastery);
  const totalConcepts = CONCEPTS_CBSE_ELECTRICITY.length;
  const avgMastery = Math.round(
    masteryEntries.reduce((acc, curr) => acc + curr.masteryPercentage, 0) / (masteryEntries.length || 1)
  );
  const conceptsMastered = masteryEntries.filter(m => m.masteryPercentage >= 80).length;
  const conceptsToImprove = masteryEntries.filter(m => m.masteryPercentage < 50).length;
  const revisionsDueCount = revisionTasks.filter(r => r.status === 'today' || r.status === 'overdue').length;

  // Weakest concept recommendation
  const recommendedConcept =
    masteryEntries.find(m => m.conceptId === 'elec_03') ||
    masteryEntries.sort((a, b) => a.masteryPercentage - b.masteryPercentage)[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Welcome Greeting Banner */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#6658D3]">
              <Sparkles className="h-4 w-4" />
              <span>Learner Model • Continuously Updated</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-extrabold text-[#17213D] sm:text-3xl">
              Good morning, {currentUser?.name?.split(' ')[0] || 'Alex'}.
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Let's strengthen your understanding of <span className="font-semibold text-[#17213D]">CBSE Class 10 Science (Electricity)</span> today.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setSelectedConceptId('elec_03');
                setActiveStudentTab('practice');
              }}
              className="flex items-center space-x-2 rounded-btn bg-[#6658D3] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#5546C4] active:scale-[0.98]"
            >
              <span>Continue Learning</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveStudentTab('concept_graph')}
              className="flex items-center space-x-2 rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] px-3.5 py-2.5 text-xs font-semibold text-[#17213D] hover:bg-white"
            >
              <BookOpen className="h-4 w-4 text-gray-500" />
              <span>Explore Graph</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Overall Mastery */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card transition-all hover:shadow-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Overall Mastery
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEECFC] text-[#6658D3]">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="font-metric text-3xl font-extrabold text-[#17213D]">{avgMastery}%</span>
            <span className="text-xs font-semibold text-[#159B85]">+4% this week</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-[#EEF0F7] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#6658D3] transition-all duration-500"
              style={{ width: `${avgMastery}%` }}
            />
          </div>
        </div>

        {/* Concepts Mastered */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card transition-all hover:shadow-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Concepts Mastered
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E2F7F3] text-[#159B85]">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="font-metric text-3xl font-extrabold text-[#17213D]">
              {conceptsMastered}
            </span>
            <span className="text-xs text-gray-500">of {totalConcepts} concepts</span>
          </div>
          <p className="mt-3 text-xs text-gray-500">Criteria: &gt;80% verified recall</p>
        </div>

        {/* Concepts to Improve */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card transition-all hover:shadow-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Needs Attention
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FDEFF0] text-[#E16D78]">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="font-metric text-3xl font-extrabold text-[#E16D78]">
              {conceptsToImprove}
            </span>
            <span className="text-xs text-gray-500">concepts below 50%</span>
          </div>
          <p className="mt-3 text-xs text-gray-500">Includes active misconceptions</p>
        </div>

        {/* Revisions Due */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card transition-all hover:shadow-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Revisions Due
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF6E9] text-[#E6A448]">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="font-metric text-3xl font-extrabold text-[#17213D]">
              {revisionsDueCount}
            </span>
            <span className="text-xs font-semibold text-[#E6A448]">due today</span>
          </div>
          <p className="mt-3 text-xs text-gray-500">Spaced repetition retention</p>
        </div>
      </div>

      {/* Main Middle Row (70% main content + 30% useful side panel) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Personalized Recommendation & Concept Mastery Grid */}
        <div className="space-y-6 lg:col-span-2">
          {/* Explainable Recommendation Card */}
          <div className="rounded-card border border-[#A99CF7]/40 bg-gradient-to-r from-white to-[#F4F3FD] p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center rounded-full bg-[#6658D3] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Why this is recommended
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold text-[#17213D]">
                  Target Focus: {recommendedConcept?.conceptName}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">
                  <span className="font-semibold text-[#E16D78]">Misconception Identified:</span> Your previous answer indicated confusion between direct and inverse proportionality when voltage is constant. Practising this will unblock subsequent topics like Series & Parallel Combinations.
                </p>
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-xs text-gray-500">Current Mastery</span>
                <div className="font-metric text-2xl font-extrabold text-[#E16D78]">
                  {recommendedConcept?.masteryPercentage}%
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 pt-3 border-t border-[#E2E6F0]">
              <button
                onClick={() => {
                  setSelectedConceptId(recommendedConcept?.conceptId || 'elec_03');
                  setActiveStudentTab('practice');
                }}
                className="flex items-center space-x-1.5 rounded-btn bg-[#6658D3] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Flame className="h-3.5 w-3.5" />
                <span>Start Targeted Practice</span>
              </button>
              <button
                onClick={() => {
                  setSelectedConceptId(recommendedConcept?.conceptId || 'elec_03');
                  setActiveStudentTab('concept_graph');
                }}
                className="rounded-btn border border-[#E2E6F0] bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                View Prerequisites
              </button>
            </div>
          </div>

          {/* Interactive Concept Mastery Snapshot */}
          <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-base font-bold text-[#17213D]">
                  Curriculum Mastery Breakdown
                </h3>
                <p className="text-xs text-gray-500">
                  CBSE Class 10 Science • Chapter 12: Electricity
                </p>
              </div>
              <button
                onClick={() => setActiveStudentTab('concept_graph')}
                className="flex items-center space-x-1 text-xs font-semibold text-[#6658D3] hover:underline"
              >
                <span>Interactive Graph</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {CONCEPTS_CBSE_ELECTRICITY.map(concept => {
                const mastery = studentMastery[concept.id];
                const score = mastery?.masteryPercentage ?? 50;

                let badgeColor = 'bg-gray-100 text-gray-700';
                let barColor = 'bg-gray-400';
                if (score >= 80) {
                  badgeColor = 'bg-[#E2F7F3] text-[#159B85]';
                  barColor = 'bg-[#159B85]';
                } else if (score >= 50) {
                  badgeColor = 'bg-[#FEF6E9] text-[#E6A448]';
                  barColor = 'bg-[#E6A448]';
                } else {
                  badgeColor = 'bg-[#FDEFF0] text-[#E16D78]';
                  barColor = 'bg-[#E16D78]';
                }

                return (
                  <div
                    key={concept.id}
                    onClick={() => {
                      setSelectedConceptId(concept.id);
                      setActiveStudentTab('concept_graph');
                    }}
                    className="group flex cursor-pointer items-center justify-between rounded-lg p-2.5 transition-colors hover:bg-[#F7F8FC]"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[#17213D] group-hover:text-[#6658D3]">
                          {concept.name}
                        </span>
                        <span className="text-[10px] text-gray-400">{concept.code}</span>
                      </div>
                      <div className="mt-1.5 flex items-center space-x-3">
                        <div className="h-1.5 flex-1 rounded-full bg-[#EEF0F7] overflow-hidden">
                          <div
                            className={`h-full rounded-full ${barColor}`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold ${badgeColor}`}>
                        {score}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Useful Side Panel */}
        <div className="space-y-6">
          {/* Today's Learning Goal */}
          <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#17213D]">
              <Calendar className="h-4 w-4 text-[#6658D3]" />
              <span>Today's Learning Plan</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">2 priority actions for high retention</p>

            <div className="mt-4 space-y-2.5">
              <div className="rounded-lg border border-[#E2E6F0] bg-[#F7F8FC] p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#17213D]">Ohm's Law Remediation</span>
                  <span className="rounded bg-[#FDEFF0] px-1.5 py-0.2 text-[10px] font-bold text-[#E16D78]">
                    Priority
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-gray-500">
                  Review inverse current-resistance behavior. 3 targeted questions (~8 min).
                </p>
                <button
                  onClick={() => {
                    setSelectedConceptId('elec_03');
                    setActiveStudentTab('practice');
                  }}
                  className="mt-2 text-xs font-bold text-[#6658D3] hover:underline"
                >
                  Start now →
                </button>
              </div>

              <div className="rounded-lg border border-[#E2E6F0] bg-[#F7F8FC] p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#17213D]">Charge & Current Refresh</span>
                  <span className="rounded bg-[#FEF6E9] px-1.5 py-0.2 text-[10px] font-bold text-[#E6A448]">
                    Review
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-gray-500">
                  Maintain foundational recall of I = Q/t. 2 quick questions (~4 min).
                </p>
                <button
                  onClick={() => {
                    setSelectedConceptId('elec_01');
                    setActiveStudentTab('practice');
                  }}
                  className="mt-2 text-xs font-bold text-[#6658D3] hover:underline"
                >
                  Start now →
                </button>
              </div>
            </div>
          </div>

          {/* AI Learning Insight Tip */}
          <div className="rounded-card border border-[#EEECFC] bg-[#F4F3FD] p-5 shadow-sm">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#6658D3]">
              <Brain className="h-4 w-4" />
              <span>AI Learning Intelligence</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-gray-700">
              "When you explain your thinking in writing, the system detects not just whether an answer was right, but why your intuition worked. You grasp mathematical formulas quickly when accompanied by physical circuit analogies."
            </p>
          </div>

          {/* Active Misconception Alert */}
          {misconceptions.length > 0 && (
            <div className="rounded-card border border-[#F6B8BD] bg-[#FDEFF0]/40 p-5">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#E16D78]">
                <AlertTriangle className="h-4 w-4" />
                <span>Active Misconception Logged</span>
              </div>
              <p className="mt-1 text-xs text-gray-700">
                "{misconceptions[0].tag.replace(/_/g, ' ')}"
              </p>
              <button
                onClick={() => setActiveStudentTab('misconceptions')}
                className="mt-3 block text-xs font-bold text-[#E16D78] hover:underline"
              >
                Inspect reasoning evidence ({misconceptions.length}) →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: Mastery Over Time Recharts Chart & Recent Learning Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Progress Over Time Chart (2 cols) */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading text-base font-bold text-[#17213D]">
                Mastery Trajectory (Past 7 Days)
              </h3>
              <p className="text-xs text-gray-500">
                Continuous evidence-weighted Bayesian mastery tracking
              </p>
            </div>
            <span className="text-xs font-semibold text-[#159B85] bg-[#E2F7F3] px-2.5 py-1 rounded-full">
              Steady Growth (+11%)
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROGRESS_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="masteryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6658D3" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6658D3" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#9FAAC2" fontSize={11} tickLine={false} />
                <YAxis domain={[40, 80]} stroke="#9FAAC2" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E6F0',
                    fontSize: '12px',
                    boxShadow: '0 4px 12px rgba(23,33,61,0.08)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="overallMastery"
                  name="Overall Mastery %"
                  stroke="#6658D3"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#masteryGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity (1 col) */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
          <h3 className="font-heading text-base font-bold text-[#17213D] mb-3">
            Recent Learning Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 text-xs">
              <div className="h-2 w-2 rounded-full bg-[#159B85] mt-1.5 shrink-0" />
              <div>
                <p className="font-semibold text-[#17213D]">
                  Electric Potential numerical test submitted
                </p>
                <p className="text-[11px] text-gray-500">Yesterday, 3:45 PM • Score 82%</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-xs">
              <div className="h-2 w-2 rounded-full bg-[#E16D78] mt-1.5 shrink-0" />
              <div>
                <p className="font-semibold text-[#17213D]">
                  Ohm's Law reasoning analyzed
                </p>
                <p className="text-[11px] text-gray-500">Yesterday, 4:15 PM • Misconception detected</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-xs">
              <div className="h-2 w-2 rounded-full bg-[#6658D3] mt-1.5 shrink-0" />
              <div>
                <p className="font-semibold text-[#17213D]">
                  CBSE Class 10 diagnostic completed
                </p>
                <p className="text-[11px] text-gray-500">Nov 18, 2026 • 5 concepts evaluated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
