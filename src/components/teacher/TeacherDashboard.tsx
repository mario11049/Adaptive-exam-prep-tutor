import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  FileText,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { CLASS_HEATMAP_DATA } from '../../data/mockDatabase';
import { CONCEPTS_CBSE_ELECTRICITY } from '../../data/curriculumData';

export const TeacherDashboard: React.FC = () => {
  const {
    currentUser,
    teacherRecommendations,
    setActiveTeacherTab,
    applyTeacherRecommendation
  } = useApp();

  const totalStudents = 32;
  const avgClassMastery = 64;
  const conceptsNeedingAttention = 3;
  const studentsNeedingSupport = CLASS_HEATMAP_DATA.filter(s => s.flaggedForAttention).length;

  const classProgressData = [
    { week: 'Wk 1', mastery: 50 },
    { week: 'Wk 2', mastery: 54 },
    { week: 'Wk 3', mastery: 59 },
    { week: 'Wk 4', mastery: 61 },
    { week: 'Wk 5', mastery: 64 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Welcome Banner */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#6658D3]">
              <Sparkles className="h-4 w-4" />
              <span>Classroom Learning Intelligence • Authorized Class 10-A</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-extrabold text-[#17213D]">
              Classroom Overview — {currentUser?.name || 'Mrs. Sarah Jenkins'}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Aggregated real-time concept telemetry for <span className="font-semibold text-[#17213D]">Class 10-A Science (Physics)</span>.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTeacherTab('recommendations')}
              className="flex items-center space-x-2 rounded-btn bg-[#6658D3] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
            >
              <Sparkles className="h-4 w-4" />
              <span>AI Recommendations (3)</span>
            </button>
            <button
              onClick={() => setActiveTeacherTab('analytics')}
              className="rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] px-3.5 py-2.5 text-xs font-semibold text-[#17213D] hover:bg-white"
            >
              View Heatmap
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Metric Cards (PART 7A) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Students */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Authorized Students
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEECFC] text-[#6658D3]">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-metric text-3xl font-extrabold text-[#17213D]">
            {totalStudents}
          </div>
          <p className="mt-2 text-xs text-gray-500">Enrolled in Class 10-A</p>
        </div>

        {/* Average Class Mastery */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Average Class Mastery
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E2F7F3] text-[#159B85]">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="font-metric text-3xl font-extrabold text-[#17213D]">{avgClassMastery}%</span>
            <span className="text-xs font-bold text-[#159B85]">+3% this month</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">Target benchmark: 75%</p>
        </div>

        {/* Concepts Requiring Attention */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Concepts Below 50%
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FDEFF0] text-[#E16D78]">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-metric text-3xl font-extrabold text-[#E16D78]">
            {conceptsNeedingAttention}
          </div>
          <p className="mt-2 text-xs text-[#E16D78] font-medium">Ohm's Law, Parallel, Power</p>
        </div>

        {/* Students Needing Support */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Needs Support
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF6E9] text-[#E6A448]">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-metric text-3xl font-extrabold text-[#E6A448]">
            {studentsNeedingSupport}
          </div>
          <p className="mt-2 text-xs text-gray-500">Students flagged with active gaps</p>
        </div>
      </div>

      {/* Middle Grid (Main 2 Cols + Right 1 Col) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Class Mastery Trend & Students Needing Support */}
        <div className="space-y-6 lg:col-span-2">
          {/* Class Mastery Progress Chart */}
          <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-base font-bold text-[#17213D]">
                  Class 10-A Mastery Trajectory
                </h3>
                <p className="text-xs text-gray-500">Cohort performance across 5 instructional weeks</p>
              </div>
              <span className="rounded-full bg-[#E2F7F3] px-2.5 py-1 text-xs font-bold text-[#159B85]">
                +14% Term-to-Date
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={classProgressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="teacherGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6658D3" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6658D3" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEF0F7" />
                  <XAxis dataKey="week" stroke="#9FAAC2" fontSize={11} tickLine={false} />
                  <YAxis domain={[40, 80]} stroke="#9FAAC2" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E6F0',
                      fontSize: '12px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mastery"
                    name="Class Avg Mastery %"
                    stroke="#6658D3"
                    strokeWidth={2.5}
                    fill="url(#teacherGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Students Requiring Pedagogical Intervention */}
          <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-base font-bold text-[#17213D]">
                  Students Flagged for Pedagogical Support
                </h3>
                <p className="text-xs text-gray-500">
                  Identified by repeated reasoning misconceptions or low mastery scores
                </p>
              </div>
              <button
                onClick={() => setActiveTeacherTab('analytics')}
                className="text-xs font-bold text-[#6658D3] hover:underline"
              >
                Open Full Heatmap →
              </button>
            </div>

            <div className="space-y-3">
              {CLASS_HEATMAP_DATA.filter(s => s.flaggedForAttention).map(student => (
                <div
                  key={student.studentId}
                  className="flex items-center justify-between rounded-xl border border-[#E2E6F0] bg-[#F7F8FC] p-3 transition-colors hover:bg-white"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={student.avatar}
                      alt={student.studentName}
                      className="h-9 w-9 rounded-full object-cover border border-[#E2E6F0]"
                    />
                    <div>
                      <h4 className="font-heading text-xs font-bold text-[#17213D]">
                        {student.studentName}
                      </h4>
                      <p className="text-[11px] text-[#E16D78]">
                        Primary Gap: <span className="font-semibold">{student.primaryStruggleConcept}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="rounded-full bg-[#FDEFF0] px-2 py-0.5 text-[10px] font-bold text-[#E16D78]">
                      Active Gap
                    </span>
                    <button
                      onClick={() => setActiveTeacherTab('analytics')}
                      className="rounded-btn border border-[#E2E6F0] bg-white px-2.5 py-1 text-xs font-semibold text-gray-700 hover:bg-[#EEF0F7]"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Useful Side Panel */}
        <div className="space-y-6">
          {/* Urgent AI Teaching Recommendation */}
          <div className="rounded-card border border-[#EEECFC] bg-gradient-to-b from-white to-[#F4F3FD] p-6 shadow-card">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#6658D3]">
              <Sparkles className="h-4 w-4" />
              <span>Priority Class Recommendation</span>
            </div>

            <h4 className="mt-2 font-heading text-sm font-bold text-[#17213D]">
              {teacherRecommendations[0]?.title}
            </h4>

            <p className="mt-2 text-xs leading-relaxed text-gray-600">
              {teacherRecommendations[0]?.observation}
            </p>

            <div className="mt-4 rounded-lg bg-white p-3 border border-[#E2E6F0] text-xs">
              <span className="font-bold text-[#6658D3] block mb-1">Suggested Intervention:</span>
              <p className="text-gray-700 text-[11px] leading-relaxed">
                {teacherRecommendations[0]?.pedagogicalAction}
              </p>
            </div>

            <div className="mt-4 flex flex-col space-y-2">
              <button
                onClick={() => applyTeacherRecommendation(teacherRecommendations[0]?.id)}
                className="rounded-btn bg-[#6658D3] py-2 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
              >
                Approve Lesson Outline
              </button>
              <button
                onClick={() => setActiveTeacherTab('recommendations')}
                className="rounded-btn border border-[#E2E6F0] bg-white py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                View All Recommendations (3)
              </button>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Quick Actions
            </span>
            <button
              onClick={() => setActiveTeacherTab('reports')}
              className="flex w-full items-center justify-between rounded-lg p-2.5 text-xs font-semibold text-gray-700 hover:bg-[#F7F8FC]"
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-[#6658D3]" />
                <span>Export Classroom Diagnostic Report</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            </button>
            <button
              onClick={() => setActiveTeacherTab('assessments')}
              className="flex w-full items-center justify-between rounded-lg p-2.5 text-xs font-semibold text-gray-700 hover:bg-[#F7F8FC]"
            >
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-[#159B85]" />
                <span>Schedule Formative Check</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
