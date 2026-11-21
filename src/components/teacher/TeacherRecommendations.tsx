import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { generateTeacherIntervention } from '../../services/api';
import {
  Sparkles,
  CheckCircle2,
  BookOpen,
  FileText,
  Layers,
  ArrowRight,
  Download,
  AlertTriangle
} from 'lucide-react';

export const TeacherRecommendations: React.FC = () => {
  const {
    teacherRecommendations,
    applyTeacherRecommendation,
    showToast
  } = useApp();

  const [activeModalContent, setActiveModalContent] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateAction = async (
    type: 'remedial_set' | 'lesson_outline',
    rec: any
  ) => {
    setIsLoading(true);
    setModalTitle(
      type === 'remedial_set'
        ? `Remedial Practice Set: ${rec.conceptName}`
        : `Pedagogical Lesson Outline: ${rec.conceptName}`
    );

    try {
      const plan = await generateTeacherIntervention(
        type === 'remedial_set' ? 'targeted remedial problem set' : 'interactive lesson plan outline',
        rec.conceptName,
        rec.title
      );
      setActiveModalContent(plan);
      showToast('AI teaching intervention generated successfully!', 'success');
    } catch (err: any) {
      showToast('Error generating intervention: ' + err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#6658D3]">
          <Sparkles className="h-4 w-4" />
          <span>Classroom Learning Intelligence Engine</span>
        </div>
        <h2 className="mt-1 font-heading text-xl font-bold text-[#17213D]">
          AI Teaching Interventions & Remedial Action Plans
        </h2>
        <p className="text-xs text-gray-500">
          Pedagogical recommendations automatically synthesized from cohort-wide written reasoning evidence in Class 10-A.
        </p>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-5">
        {teacherRecommendations.map(rec => {
          const isApplied = rec.status === 'applied';
          return (
            <div
              key={rec.id}
              className={`rounded-card border p-6 transition-all ${
                isApplied
                  ? 'border-[#A3E8DC] bg-white'
                  : 'border-[#E2E6F0] bg-white shadow-card hover:shadow-card-hover'
              }`}
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        rec.severity === 'high'
                          ? 'bg-[#FDEFF0] text-[#E16D78]'
                          : 'bg-[#FEF6E9] text-[#E6A448]'
                      }`}
                    >
                      {rec.severity.toUpperCase()} PRIORITY
                    </span>
                    <span className="font-heading text-base font-bold text-[#17213D]">
                      {rec.title}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#6658D3] font-semibold">
                    Target Concept: {rec.conceptName}
                  </p>
                </div>

                <div className="rounded-xl border border-[#E2E6F0] bg-[#F7F8FC] px-3 py-1.5 text-right shrink-0">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Impact</span>
                  <div className="font-metric text-base font-extrabold text-[#E16D78]">
                    {rec.affectedStudentCount} of {rec.totalStudents} students
                  </div>
                </div>
              </div>

              {/* Observation & Action */}
              <div className="mt-4 space-y-3 text-xs">
                <div className="rounded-xl border border-[#E2E6F0] bg-[#F7F8FC] p-3.5">
                  <span className="font-bold text-gray-600 block mb-1">
                    Classroom Evidence Synthesized:
                  </span>
                  <p className="text-gray-700 leading-relaxed">{rec.observation}</p>
                </div>

                <div className="rounded-xl border border-[#EEECFC] bg-[#F4F3FD] p-3.5">
                  <span className="font-bold text-[#6658D3] block mb-1">
                    Recommended Pedagogical Intervention:
                  </span>
                  <p className="text-gray-800 leading-relaxed">{rec.pedagogicalAction}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E6F0] pt-4 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleGenerateAction('remedial_set', rec)}
                    disabled={isLoading}
                    className="flex items-center space-x-1.5 rounded-btn bg-[#6658D3] px-3.5 py-2 font-bold text-white shadow-sm hover:bg-[#5546C4] disabled:opacity-50"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Generate Remedial Practice Set</span>
                  </button>
                  <button
                    onClick={() => handleGenerateAction('lesson_outline', rec)}
                    disabled={isLoading}
                    className="flex items-center space-x-1.5 rounded-btn border border-[#E2E6F0] bg-white px-3.5 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <Layers className="h-3.5 w-3.5 text-[#6658D3]" />
                    <span>Generate Lesson Outline</span>
                  </button>
                </div>

                <div>
                  {isApplied ? (
                    <span className="flex items-center space-x-1 text-xs font-bold text-[#159B85]">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Approved & Scheduled</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => applyTeacherRecommendation(rec.id)}
                      className="rounded-btn border border-[#159B85] bg-[#E2F7F3] px-4 py-2 text-xs font-bold text-[#159B85] hover:bg-[#cbf1eb]"
                    >
                      Approve Recommendation
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generated Content Modal */}
      {activeModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-fade-in">
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-card border border-[#E2E6F0] bg-white p-6 shadow-popover">
            <div className="flex items-center justify-between border-b border-[#E2E6F0] pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-[#6658D3]" />
                <h3 className="font-heading text-base font-bold text-[#17213D]">
                  {modalTitle}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalContent(null)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 prose prose-sm max-w-none text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
              {activeModalContent}
            </div>

            <div className="mt-6 flex justify-end space-x-3 border-t border-[#E2E6F0] pt-4">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center space-x-1 rounded-btn border border-[#E2E6F0] px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Print / Save Plan</span>
              </button>
              <button
                onClick={() => setActiveModalContent(null)}
                className="rounded-btn bg-[#6658D3] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
