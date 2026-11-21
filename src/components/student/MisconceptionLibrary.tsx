import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Flame,
  Info,
  ShieldAlert
} from 'lucide-react';

export const MisconceptionLibrary: React.FC = () => {
  const {
    misconceptions,
    updateMisconceptionStatus,
    setSelectedConceptId,
    setActiveStudentTab
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'newly_detected' | 'practicing' | 'resolved'>('all');

  const filtered = misconceptions.filter(m => (filter === 'all' ? true : m.status === filter));

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#E16D78]">
              <AlertTriangle className="h-4 w-4" />
              <span>Cognitive Diagnosis & Misconception Library</span>
            </div>
            <h2 className="mt-1 font-heading text-xl font-bold text-[#17213D]">
              My Misconceptions & Reasoning History
            </h2>
            <p className="text-xs text-gray-500">
              Specific reasoning divergences identified by the AI analyzer during your exercises and assessments.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 rounded-btn bg-[#EEF0F7] p-1 text-xs">
            {(['all', 'newly_detected', 'practicing', 'resolved'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-md px-3 py-1 font-semibold capitalize transition-all ${
                  filter === status
                    ? 'bg-white text-[#17213D] shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Misconceptions List */}
      {filtered.length === 0 ? (
        <div className="rounded-card border border-[#E2E6F0] bg-white p-12 text-center shadow-card">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E2F7F3] text-[#159B85]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="mt-3 font-heading text-base font-bold text-[#17213D]">
            No Misconceptions in this Category
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Keep practicing in the AI Practice Arena to maintain sharp understanding!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(misc => (
            <div
              key={misc.id}
              className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-heading text-sm font-bold text-[#17213D]">
                      {misc.conceptName}
                    </span>
                    <span className="font-mono text-[10px] text-gray-400">
                      Tag: {misc.tag}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    Detected: {misc.detectedAt} • Occurrences: {misc.occurrences}
                  </span>
                </div>

                {/* Status Toggle Dropdown / Badge */}
                <div className="flex items-center space-x-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      misc.status === 'resolved'
                        ? 'bg-[#E2F7F3] text-[#159B85]'
                        : misc.status === 'practicing'
                        ? 'bg-[#FEF6E9] text-[#E6A448]'
                        : 'bg-[#FDEFF0] text-[#E16D78]'
                    }`}
                  >
                    {misc.status === 'resolved'
                      ? '✓ Resolved'
                      : misc.status === 'practicing'
                      ? 'Practicing'
                      : 'Newly Detected'}
                  </span>

                  <select
                    value={misc.status}
                    onChange={e =>
                      updateMisconceptionStatus(
                        misc.id,
                        e.target.value as 'newly_detected' | 'practicing' | 'resolved'
                      )
                    }
                    className="rounded-md border border-[#E2E6F0] bg-[#F7F8FC] px-2 py-1 text-[11px] font-semibold text-gray-700"
                  >
                    <option value="newly_detected">Newly Detected</option>
                    <option value="practicing">Practicing</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Student Quote vs Evidence */}
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#F6B8BD] bg-[#FDEFF0]/40 p-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E16D78]">
                    Your Original Reasoning
                  </span>
                  <p className="mt-1 text-xs italic text-gray-800 leading-relaxed">
                    "{misc.studentQuote}"
                  </p>
                </div>

                <div className="rounded-xl border border-[#E2E6F0] bg-[#F7F8FC] p-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Reasoning Evidence Analyzed
                  </span>
                  <p className="mt-1 text-xs text-gray-700 leading-relaxed">
                    {misc.evidence}
                  </p>
                </div>
              </div>

              {/* Verified Physics Explanation */}
              <div className="mt-4 rounded-xl border border-[#A3E8DC] bg-[#E2F7F3]/30 p-3.5 text-xs">
                <span className="font-bold text-[#159B85] block mb-0.5">
                  Verified Physical Mechanism:
                </span>
                <p className="text-gray-700 leading-relaxed">
                  {misc.correctExplanation}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-between border-t border-[#E2E6F0] pt-3 text-xs">
                <span className="text-gray-500">
                  <span className="font-semibold text-gray-700">Recommendation:</span>{' '}
                  {misc.practiceRecommendation}
                </span>

                <button
                  onClick={() => {
                    setSelectedConceptId(misc.conceptId);
                    setActiveStudentTab('practice');
                  }}
                  className="flex items-center space-x-1 font-bold text-[#6658D3] hover:underline"
                >
                  <span>Practice this concept</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
