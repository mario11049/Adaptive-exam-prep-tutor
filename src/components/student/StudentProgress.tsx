import React from 'react';
import { useApp } from '../../context/AppContext';
import { PROGRESS_HISTORY } from '../../data/mockDatabase';
import { CONCEPTS_CBSE_ELECTRICITY } from '../../data/curriculumData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Flame,
  Clock,
  Sparkles
} from 'lucide-react';

export const StudentProgress: React.FC = () => {
  const { studentMastery, misconceptions } = useApp();

  const conceptData = CONCEPTS_CBSE_ELECTRICITY.map(c => ({
    name: c.name.length > 15 ? c.name.slice(0, 14) + '...' : c.name,
    fullName: c.name,
    mastery: studentMastery[c.id]?.masteryPercentage ?? 50,
    attempts: studentMastery[c.id]?.totalAttempts ?? 0
  }));

  const resolvedCount = misconceptions.filter(m => m.status === 'resolved').length;
  const activeCount = misconceptions.filter(m => m.status !== 'resolved').length;

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#6658D3]">
          <TrendingUp className="h-4 w-4" />
          <span>Learner Analytics & Cognitive Telemetry</span>
        </div>
        <h2 className="mt-1 font-heading text-xl font-bold text-[#17213D]">
          My Learning Progress & Mastery Growth
        </h2>
        <p className="text-xs text-gray-500">
          Track your longitudinal understanding curve across CBSE Class 10 Science (Electricity).
        </p>

        {/* 4 Summary Stat Pills */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-[#E2E6F0] pt-4">
          <div className="rounded-lg bg-[#F7F8FC] p-3 text-center">
            <span className="text-[11px] font-semibold text-gray-500">Overall Accuracy</span>
            <div className="font-metric text-xl font-extrabold text-[#159B85] mt-0.5">74%</div>
          </div>
          <div className="rounded-lg bg-[#F7F8FC] p-3 text-center">
            <span className="text-[11px] font-semibold text-gray-500">Study Time</span>
            <div className="font-metric text-xl font-extrabold text-[#6658D3] mt-0.5">262 mins</div>
          </div>
          <div className="rounded-lg bg-[#F7F8FC] p-3 text-center">
            <span className="text-[11px] font-semibold text-gray-500">Misconceptions Resolved</span>
            <div className="font-metric text-xl font-extrabold text-[#159B85] mt-0.5">{resolvedCount} of {resolvedCount + activeCount}</div>
          </div>
          <div className="rounded-lg bg-[#F7F8FC] p-3 text-center">
            <span className="text-[11px] font-semibold text-gray-500">Active Revision Streak</span>
            <div className="font-metric text-xl font-extrabold text-[#E6A448] mt-0.5">7 Days 🔥</div>
          </div>
        </div>
      </div>

      {/* 2 Main Recharts Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Mastery Over Time */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
          <div className="mb-4">
            <h3 className="font-heading text-base font-bold text-[#17213D]">
              Mastery Growth Over Time
            </h3>
            <p className="text-xs text-gray-500">Daily average mastery percentage</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROGRESS_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6658D3" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6658D3" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEF0F7" />
                <XAxis dataKey="date" stroke="#9FAAC2" fontSize={11} tickLine={false} />
                <YAxis domain={[40, 90]} stroke="#9FAAC2" fontSize={11} tickLine={false} />
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
                  name="Mastery %"
                  stroke="#6658D3"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#progressGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Concept-Wise Progress Bar Chart */}
        <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
          <div className="mb-4">
            <h3 className="font-heading text-base font-bold text-[#17213D]">
              Concept-Wise Mastery Levels
            </h3>
            <p className="text-xs text-gray-500">Current mastery score per chapter concept</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conceptData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEF0F7" />
                <XAxis dataKey="name" stroke="#9FAAC2" fontSize={10} tickLine={false} interval={0} angle={-25} textAnchor="end" />
                <YAxis domain={[0, 100]} stroke="#9FAAC2" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Mastery']}
                  labelFormatter={(name, payload) => payload?.[0]?.payload?.fullName || name}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E6F0',
                    fontSize: '12px',
                    boxShadow: '0 4px 12px rgba(23,33,61,0.08)'
                  }}
                />
                <Bar dataKey="mastery" fill="#6658D3" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Daily Study Minutes & Activity Heat Bar */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <h3 className="font-heading text-base font-bold text-[#17213D] mb-3">
          Daily Study Effort & Practice Density
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-7">
          {PROGRESS_HISTORY.map((day, idx) => (
            <div key={idx} className="rounded-xl border border-[#E2E6F0] bg-[#F7F8FC] p-3 text-center">
              <span className="text-[11px] font-semibold text-gray-500">{day.date}</span>
              <div className="font-metric text-lg font-bold text-[#17213D] mt-1">{day.studyMinutes}m</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{day.questionsAnswered} questions</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
