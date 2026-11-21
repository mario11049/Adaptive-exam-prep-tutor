import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const TeacherAssessments: React.FC = () => {
  const { showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'drafts'>('active');

  const assessments = [
    {
      id: 'as_1',
      title: 'CBSE Class 10 Mid-Term Diagnostic Check',
      subject: 'Science (Physics)',
      dueDate: 'Today, 5:00 PM',
      submissions: '31 / 32 Submissions',
      avgScore: '64%',
      status: 'active',
      concepts: "Ohm's Law, Resistance, Series & Parallel"
    },
    {
      id: 'as_2',
      title: 'Formative Quiz: Heating Effect of Electric Current',
      subject: 'Science (Physics)',
      dueDate: 'Nov 24, 2026',
      submissions: 'Scheduled',
      avgScore: 'Pending',
      status: 'active',
      concepts: "Joule's Law & Safety Fuses"
    },
    {
      id: 'as_3',
      title: 'Baseline Electric Charge & Potential Difference Check',
      subject: 'Science (Physics)',
      dueDate: 'Nov 12, 2026',
      submissions: '32 / 32 Submissions',
      avgScore: '81%',
      status: 'completed',
      concepts: 'Charge flow, Voltmeter & Ammeter placement'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#6658D3]">
              <FileCheck className="h-4 w-4" />
              <span>Assessment Architecture & Scheduling</span>
            </div>
            <h2 className="mt-1 font-heading text-xl font-bold text-[#17213D]">
              Classroom Assessments & Diagnostic Tests
            </h2>
            <p className="text-xs text-gray-500">
              Create and deploy syllabus-mapped tests with integrated written reasoning evaluation.
            </p>
          </div>

          <button
            onClick={() => showToast('New Assessment Creator initialized.', 'info')}
            className="flex items-center space-x-1.5 rounded-btn bg-[#6658D3] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
          >
            <Plus className="h-4 w-4" />
            <span>Create Assessment</span>
          </button>
        </div>

        {/* Status Filters */}
        <div className="mt-6 flex items-center space-x-2 border-t border-[#E2E6F0] pt-4 text-xs font-semibold">
          {(['active', 'completed', 'drafts'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-btn px-3 py-1.5 capitalize transition-all ${
                activeTab === tab
                  ? 'bg-[#17213D] text-white shadow-sm'
                  : 'bg-[#EEF0F7] text-gray-600 hover:bg-[#E2E6F0]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Assessment Cards */}
      <div className="space-y-4">
        {assessments
          .filter(a => (activeTab === 'drafts' ? false : a.status === activeTab))
          .map(a => (
            <div
              key={a.id}
              className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <span className="rounded bg-[#EEECFC] px-2 py-0.5 text-[10px] font-bold text-[#6658D3]">
                    {a.subject}
                  </span>
                  <h3 className="mt-1 font-heading text-base font-bold text-[#17213D]">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Concepts Mapped: <span className="font-semibold text-gray-700">{a.concepts}</span>
                  </p>
                </div>

                <div className="flex items-center space-x-4 text-right">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Class Avg</span>
                    <div className="font-metric text-lg font-bold text-[#17213D]">{a.avgScore}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Submissions</span>
                    <div className="text-xs font-semibold text-[#159B85]">{a.submissions}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#E2E6F0] pt-3 text-xs">
                <span className="text-gray-400">Due: {a.dueDate}</span>
                <button
                  onClick={() => showToast(`Opening submission telemetry for "${a.title}"`, 'info')}
                  className="font-bold text-[#6658D3] hover:underline flex items-center space-x-1"
                >
                  <span>View Submission Telemetry</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
