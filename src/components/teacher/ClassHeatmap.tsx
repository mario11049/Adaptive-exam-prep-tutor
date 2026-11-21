import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CLASS_HEATMAP_DATA } from '../../data/mockDatabase';
import { CONCEPTS_CBSE_ELECTRICITY } from '../../data/curriculumData';
import { StudentHeatmapRow } from '../../types';
import {
  BarChart3,
  Filter,
  CheckCircle2,
  AlertTriangle,
  X,
  User,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const ClassHeatmap: React.FC = () => {
  const { studentMastery } = useApp();

  // Merge live student Alex mastery with class dataset
  const dynamicClassData: StudentHeatmapRow[] = CLASS_HEATMAP_DATA.map(s => {
    if (s.studentId === 'usr_student_alex') {
      const alexConceptMap: Record<string, number> = {};
      CONCEPTS_CBSE_ELECTRICITY.forEach(c => {
        alexConceptMap[c.id] = studentMastery[c.id]?.masteryPercentage ?? 50;
      });
      return {
        ...s,
        conceptMastery: alexConceptMap
      };
    }
    return s;
  });

  const [selectedCell, setSelectedCell] = useState<{
    student: StudentHeatmapRow;
    conceptId: string;
    score: number;
  } | null>(null);

  const [masteryFilter, setMasteryFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const getCellColor = (score: number) => {
    if (score >= 80) return 'bg-[#159B85] text-white hover:bg-[#12806E]';
    if (score >= 50) return 'bg-[#E6A448] text-white hover:bg-[#CF8E39]';
    return 'bg-[#E16D78] text-white hover:bg-[#C95B65]';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-[#E2F7F3] text-[#159B85]';
    if (score >= 50) return 'bg-[#FEF6E9] text-[#E6A448]';
    return 'bg-[#FDEFF0] text-[#E16D78]';
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Top Banner & Filters */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#6658D3]">
              <BarChart3 className="h-4 w-4" />
              <span>Cognitive Grid Matrix • Class 10-A</span>
            </div>
            <h2 className="mt-1 font-heading text-xl font-bold text-[#17213D]">
              Classroom Concept Heatmap
            </h2>
            <p className="text-xs text-gray-500">
              Granular concept-level mastery for authorized students in Class 10-A Science. Click any cell to inspect detailed reasoning evidence.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 rounded-btn bg-[#EEF0F7] p-1 text-xs">
            <button
              onClick={() => setMasteryFilter('all')}
              className={`rounded-md px-3 py-1 font-semibold ${
                masteryFilter === 'all' ? 'bg-white text-[#17213D] shadow-sm' : 'text-gray-500'
              }`}
            >
              All Ranges
            </button>
            <button
              onClick={() => setMasteryFilter('low')}
              className={`rounded-md px-3 py-1 font-semibold ${
                masteryFilter === 'low' ? 'bg-white text-[#E16D78] shadow-sm' : 'text-gray-500'
              }`}
            >
              Needs Practice (&lt;50%)
            </button>
            <button
              onClick={() => setMasteryFilter('high')}
              className={`rounded-md px-3 py-1 font-semibold ${
                masteryFilter === 'high' ? 'bg-white text-[#159B85] shadow-sm' : 'text-gray-500'
              }`}
            >
              Mastered (&gt;80%)
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-5 flex items-center space-x-4 border-t border-[#E2E6F0] pt-3 text-xs">
          <span className="font-bold text-gray-400 text-[11px] uppercase tracking-wider">
            Cell Color:
          </span>
          <div className="flex items-center space-x-1">
            <span className="h-3 w-3 rounded bg-[#159B85]" />
            <span className="text-[11px] text-gray-600">Strong Mastery (≥80%)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="h-3 w-3 rounded bg-[#E6A448]" />
            <span className="text-[11px] text-gray-600">Developing (50–79%)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="h-3 w-3 rounded bg-[#E16D78]" />
            <span className="text-[11px] text-gray-600">Low Mastery / Active Gap (&lt;50%)</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid Card */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#E2E6F0]">
              <th className="py-3 px-4 text-left font-bold text-gray-500 uppercase tracking-wider w-48">
                Student Name
              </th>
              {CONCEPTS_CBSE_ELECTRICITY.map(concept => (
                <th
                  key={concept.id}
                  className="py-3 px-2 text-center font-bold text-gray-600 tracking-tight text-[11px] max-w-[90px]"
                >
                  <div className="truncate" title={concept.name}>
                    {concept.name.split(' ')[0]}
                  </div>
                  <div className="text-[9px] text-gray-400 font-mono font-normal">
                    {concept.code.slice(-5)}
                  </div>
                </th>
              ))}
              <th className="py-3 px-3 text-center font-bold text-gray-500 uppercase tracking-wider w-24">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F4FA]">
            {dynamicClassData.map(student => {
              return (
                <tr key={student.studentId} className="hover:bg-[#F7F8FC]/60 transition-colors">
                  {/* Student Column */}
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={student.avatar}
                        alt={student.studentName}
                        className="h-7 w-7 rounded-full object-cover border border-[#E2E6F0]"
                      />
                      <div>
                        <div className="font-bold text-[#17213D] leading-tight">
                          {student.studentName}
                        </div>
                        <div className="text-[10px] text-gray-400">{student.lastActive}</div>
                      </div>
                    </div>
                  </td>

                  {/* Concept Cells */}
                  {CONCEPTS_CBSE_ELECTRICITY.map(concept => {
                    const score = student.conceptMastery[concept.id] ?? 50;

                    const matchesRange =
                      masteryFilter === 'all'
                        ? true
                        : masteryFilter === 'low'
                        ? score < 50
                        : masteryFilter === 'high'
                        ? score >= 80
                        : score >= 50 && score < 80;

                    return (
                      <td key={concept.id} className="py-2.5 px-2 text-center">
                        <button
                          onClick={() =>
                            setSelectedCell({
                              student,
                              conceptId: concept.id,
                              score
                            })
                          }
                          className={`h-9 w-full rounded-md font-metric text-xs font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xs ${
                            matchesRange ? getCellColor(score) : 'bg-gray-100 text-gray-300'
                          }`}
                          title={`${student.studentName} - ${concept.name}: ${score}%`}
                        >
                          {score}%
                        </button>
                      </td>
                    );
                  })}

                  {/* Attention Flag */}
                  <td className="py-3 px-3 text-center">
                    {student.flaggedForAttention ? (
                      <span className="rounded-full bg-[#FDEFF0] px-2 py-0.5 text-[10px] font-bold text-[#E16D78]">
                        Flagged
                      </span>
                    ) : (
                      <span className="rounded-full bg-[#E2F7F3] px-2 py-0.5 text-[10px] font-bold text-[#159B85]">
                        Normal
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Student Concept Summary Modal Drawer (PART 7C) */}
      {selectedCell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-card border border-[#E2E6F0] bg-white p-6 shadow-popover">
            <div className="flex items-start justify-between border-b border-[#E2E6F0] pb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedCell.student.avatar}
                  alt={selectedCell.student.studentName}
                  className="h-10 w-10 rounded-full object-cover border border-[#E2E6F0]"
                />
                <div>
                  <h3 className="font-heading text-base font-bold text-[#17213D]">
                    {selectedCell.student.studentName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Authorized Class 10-A Student Record
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCell(null)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Concept Assessed
                </span>
                <h4 className="font-heading text-sm font-bold text-[#17213D] mt-0.5">
                  {CONCEPTS_CBSE_ELECTRICITY.find(c => c.id === selectedCell.conceptId)?.name}
                </h4>
              </div>

              <div className="rounded-xl border border-[#E2E6F0] bg-[#F7F8FC] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-600">Current Mastery Level</span>
                  <span className={`rounded-md px-2.5 py-0.5 text-xs font-bold ${getScoreBadge(selectedCell.score)}`}>
                    {selectedCell.score}%
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-[#EEF0F7] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      selectedCell.score >= 80
                        ? 'bg-[#159B85]'
                        : selectedCell.score >= 50
                        ? 'bg-[#E6A448]'
                        : 'bg-[#E16D78]'
                    }`}
                    style={{ width: `${selectedCell.score}%` }}
                  />
                </div>
              </div>

              {/* Student Evidence Quote */}
              <div className="rounded-xl border border-[#EEECFC] bg-[#F4F3FD] p-3.5 text-xs">
                <span className="font-bold text-[#6658D3] block mb-1">
                  Recent Reasoning Evidence Recorded:
                </span>
                <p className="text-gray-700 italic">
                  {selectedCell.student.studentId === 'usr_student_alex' && selectedCell.conceptId === 'elec_03'
                    ? '"Since resistance doubled from 4 ohms to 8 ohms, more resistance makes it stronger and pulls double current from 12V."'
                    : selectedCell.student.studentId === 'usr_student_priya'
                    ? '"Calculated 1/Rp = 1/6 + 1/12 = 1/4 but reported Rp = 0.25 ohms."'
                    : 'Consistent adherence to standard formulas with minor arithmetic steps needing review.'}
                </p>
              </div>

              <div className="text-[11px] text-gray-500">
                Teacher Note: You can assign a targeted practice set or schedule a revision checkpoint for this student.
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3 border-t border-[#E2E6F0] pt-4">
              <button
                onClick={() => setSelectedCell(null)}
                className="rounded-btn border border-[#E2E6F0] px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
