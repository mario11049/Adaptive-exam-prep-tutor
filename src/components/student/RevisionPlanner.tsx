import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const RevisionPlanner: React.FC = () => {
  const {
    revisionTasks,
    completeRevisionTask,
    setSelectedConceptId,
    setActiveStudentTab
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'upcoming' | 'overdue' | 'completed'>('today');

  const filteredTasks = revisionTasks.filter(task =>
    activeFilter === 'all' ? true : task.status === activeFilter
  );

  const todayCount = revisionTasks.filter(t => t.status === 'today').length;
  const overdueCount = revisionTasks.filter(t => t.status === 'overdue').length;

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#6658D3]">
              <Calendar className="h-4 w-4" />
              <span>Ebbinghaus Decay Curve & Spaced Repetition Engine</span>
            </div>
            <h2 className="mt-1 font-heading text-xl font-bold text-[#17213D]">
              Adaptive Revision Planner
            </h2>
            <p className="text-xs text-gray-500">
              Deterministic review scheduling calibrated by individual concept mastery and recall evidence.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="rounded-full bg-[#FEF6E9] px-3 py-1 font-bold text-[#E6A448]">
              {todayCount} Due Today
            </span>
            {overdueCount > 0 && (
              <span className="rounded-full bg-[#FDEFF0] px-3 py-1 font-bold text-[#E16D78]">
                {overdueCount} Overdue
              </span>
            )}
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 border-t border-[#E2E6F0] pt-4">
          {(['today', 'upcoming', 'overdue', 'completed', 'all'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`rounded-btn px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                activeFilter === tab
                  ? 'bg-[#17213D] text-white shadow-sm'
                  : 'bg-[#EEF0F7] text-gray-600 hover:bg-[#E2E6F0]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Task Cards */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="rounded-card border border-[#E2E6F0] bg-white p-12 text-center shadow-card">
            <CheckCircle2 className="mx-auto h-10 w-10 text-[#159B85]" />
            <h3 className="mt-3 font-heading text-base font-bold text-[#17213D]">
              All Caught Up!
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              No tasks currently in this queue. Your memory retention is safely within optimal limits.
            </p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const isCompleted = task.status === 'completed';
            return (
              <div
                key={task.id}
                className={`rounded-card border p-5 transition-all ${
                  isCompleted
                    ? 'border-[#E2E6F0] bg-white/60 opacity-80'
                    : task.status === 'overdue'
                    ? 'border-[#F6B8BD] bg-white shadow-card'
                    : 'border-[#E2E6F0] bg-white shadow-card hover:shadow-card-hover'
                }`}
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        isCompleted
                          ? 'bg-[#E2F7F3] text-[#159B85]'
                          : task.status === 'overdue'
                          ? 'bg-[#FDEFF0] text-[#E16D78]'
                          : 'bg-[#EEECFC] text-[#6658D3]'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-heading text-sm font-bold text-[#17213D]">
                          {task.conceptName}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {task.chapterName}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-600">
                        <span className="font-semibold text-gray-700">Reason:</span> {task.reason}
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-[11px] text-gray-500">
                        <span>Questions: {task.questionCount}</span>
                        <span>•</span>
                        <span>Estimated time: ~{task.estimatedMinutes} mins</span>
                        <span>•</span>
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 sm:self-center">
                    {!isCompleted && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedConceptId(task.conceptId);
                            setActiveStudentTab('practice');
                          }}
                          className="flex items-center space-x-1.5 rounded-btn bg-[#6658D3] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>Start Revision</span>
                        </button>
                        <button
                          onClick={() => completeRevisionTask(task.id)}
                          className="rounded-btn border border-[#E2E6F0] bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                        >
                          Mark Done
                        </button>
                      </>
                    )}
                    {isCompleted && (
                      <span className="rounded-full bg-[#E2F7F3] px-3 py-1 text-xs font-bold text-[#159B85]">
                        Completed ✓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
