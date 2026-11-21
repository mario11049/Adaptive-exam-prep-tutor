import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Plus,
  Copy,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Sparkles,
  Search
} from 'lucide-react';

export const ClassManagement: React.FC = () => {
  const { classes, showToast } = useApp();

  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || 'cls_10a_science');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const currentClass = classes.find(c => c.id === selectedClassId) || classes[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Enrollment code ${code} copied to clipboard!`, 'success');
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) return;
    showToast(`Student ${studentName} invited to ${currentClass.name}.`, 'success');
    setShowAddStudentModal(false);
    setStudentName('');
    setStudentEmail('');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#6658D3]">
              <Users className="h-4 w-4" />
              <span>Cohort Roster & Access Control</span>
            </div>
            <h2 className="mt-1 font-heading text-xl font-bold text-[#17213D]">
              Class Management & Enrollment
            </h2>
            <p className="text-xs text-gray-500">
              Manage authorized student access and curriculum assignments for your sections.
            </p>
          </div>

          <button
            onClick={() => setShowAddStudentModal(true)}
            className="flex items-center space-x-1.5 rounded-btn bg-[#6658D3] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
          >
            <Plus className="h-4 w-4" />
            <span>Enroll New Student</span>
          </button>
        </div>

        {/* Class Tabs */}
        <div className="mt-6 flex items-center space-x-2 border-t border-[#E2E6F0] pt-4">
          {classes.map(cls => (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`rounded-btn px-4 py-2 text-xs font-bold transition-all ${
                selectedClassId === cls.id
                  ? 'bg-[#17213D] text-white shadow-sm'
                  : 'bg-[#EEF0F7] text-gray-600 hover:bg-[#E2E6F0]'
              }`}
            >
              {cls.name} ({cls.studentCount} students)
            </button>
          ))}
        </div>
      </div>

      {/* Class Details Card */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Details & Security */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
            <div className="flex items-center justify-between border-b border-[#E2E6F0] pb-4">
              <div>
                <span className="rounded bg-[#EEECFC] px-2 py-0.5 text-[10px] font-bold text-[#6658D3]">
                  {currentClass.curriculum}
                </span>
                <h3 className="mt-1 font-heading text-lg font-bold text-[#17213D]">
                  {currentClass.name} • {currentClass.subject}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Class Avg</span>
                <div className="font-metric text-xl font-extrabold text-[#159B85]">
                  {currentClass.averageMastery}%
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-lg bg-[#F7F8FC] p-3">
                <span className="font-semibold text-gray-500">Academic Year</span>
                <div className="font-bold text-[#17213D] mt-0.5">{currentClass.academicYear}</div>
              </div>
              <div className="rounded-lg bg-[#F7F8FC] p-3">
                <span className="font-semibold text-gray-500">Grade & Section</span>
                <div className="font-bold text-[#17213D] mt-0.5">{currentClass.grade} - {currentClass.section}</div>
              </div>
            </div>

            {/* Enrollment Code */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-[#EEECFC] bg-[#F4F3FD] p-4 text-xs">
              <div>
                <span className="font-bold text-[#6658D3] block">Secure Student Enrollment Code</span>
                <span className="text-gray-600">Students join via this code to link to your authorized roster</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-extrabold text-[#17213D] bg-white px-3 py-1 rounded-md border border-[#A99CF7]">
                  {currentClass.enrollmentCode}
                </span>
                <button
                  onClick={() => handleCopyCode(currentClass.enrollmentCode)}
                  className="rounded-btn p-1.5 text-[#6658D3] hover:bg-white"
                  title="Copy Code"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Row Level Security Guarantee */}
        <div className="rounded-card border border-[#A3E8DC] bg-[#E2F7F3]/20 p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#159B85]">
            <CheckCircle2 className="h-4 w-4" />
            <span>RLS Boundary Enforcement</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            Row Level Security prevents cross-class data leakage. Only authorized faculty members assigned to {currentClass.name} can access individual student reasoning transcripts.
          </p>
          <div className="border-t border-[#A3E8DC] pt-3 text-[11px] text-gray-600">
            • Enrolled Students: {currentClass.studentCount}<br />
            • RLS Session Status: Verified Strict<br />
            • Teacher Key: sarah.jenkins@faculty
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-card border border-[#E2E6F0] bg-white p-6 shadow-popover">
            <h3 className="font-heading text-lg font-bold text-[#17213D]">
              Enroll Student to {currentClass.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Student will receive secure magic access linked to this syllabus.
            </p>

            <form onSubmit={handleAddStudent} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Maya Lin"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-full rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] p-2.5 text-xs text-[#17213D] focus:border-[#6658D3] focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Student School Email</label>
                <input
                  type="email"
                  placeholder="e.g. maya.lin@student.learnloop.edu"
                  value={studentEmail}
                  onChange={e => setStudentEmail(e.target.value)}
                  className="w-full rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] p-2.5 text-xs text-[#17213D] focus:border-[#6658D3] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="mt-5 flex justify-end space-x-2 pt-3 border-t border-[#E2E6F0]">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="rounded-btn border border-[#E2E6F0] px-3.5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-btn bg-[#6658D3] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
                >
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
