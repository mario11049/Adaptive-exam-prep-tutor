import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  VERIFIED_BOARDS,
  CONCEPTS_CBSE_ELECTRICITY
} from '../../data/curriculumData';
import {
  BookOpen,
  Filter,
  Upload,
  CheckCircle2,
  FileJson,
  Layers,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

export const SyllabusExplorer: React.FC = () => {
  const { setSelectedConceptId, setActiveStudentTab, showToast } = useApp();

  const [selectedBoard, setSelectedBoard] = useState('CBSE');
  const [selectedYear, setSelectedYear] = useState('2026–2027');
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSubject, setSelectedSubject] = useState('Science (Physics, Chemistry, Biology)');
  const [selectedChapter, setSelectedChapter] = useState('ch_electricity');

  const currentBoardObj = VERIFIED_BOARDS.find(b => b.id === selectedBoard);
  const currentSubjectObj = currentBoardObj?.subjects.find(s => s.name.includes(selectedSubject.split(' ')[0]));
  const currentChapterObj = currentSubjectObj?.chapters.find(c => c.id === selectedChapter);

  const isVerifiedCBSEElectricity =
    selectedBoard === 'CBSE' &&
    selectedClass === 'Class 10' &&
    selectedChapter === 'ch_electricity';

  const handleImportSyllabus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result as string);
          showToast(`Syllabus JSON for "${parsed.board || 'Custom Board'}" imported successfully!`, 'success');
        } catch {
          showToast('Invalid JSON syllabus file structure.', 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Selector Strip */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#6658D3]">
              <Layers className="h-4 w-4" />
              <span>Universal Curriculum Engine</span>
            </div>
            <h2 className="mt-1 font-heading text-xl font-bold text-[#17213D]">
              Verified Syllabus & Pedagogical Map
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Structured concept hierarchy with prerequisites, learning objectives, and verified NCERT references.
            </p>
          </div>

          <label className="flex cursor-pointer items-center space-x-1.5 rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] px-3.5 py-2 text-xs font-semibold text-[#17213D] hover:bg-white shadow-sm">
            <Upload className="h-3.5 w-3.5 text-[#6658D3]" />
            <span>Import Syllabus JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportSyllabus}
              className="hidden"
            />
          </label>
        </div>

        {/* 5 Dropdown Selectors */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 border-t border-[#E2E6F0] pt-4">
          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Board</label>
            <select
              value={selectedBoard}
              onChange={e => setSelectedBoard(e.target.value)}
              className="w-full rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] p-2 text-xs font-medium text-[#17213D] focus:border-[#6658D3] focus:bg-white focus:outline-none"
            >
              {VERIFIED_BOARDS.map(b => (
                <option key={b.id} value={b.id}>{b.name.split('(')[0]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Academic Year</label>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="w-full rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] p-2 text-xs font-medium text-[#17213D] focus:border-[#6658D3] focus:bg-white focus:outline-none"
            >
              <option value="2026–2027">2026–2027 (Current)</option>
              <option value="2025–2026">2025–2026</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Class / Grade</label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="w-full rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] p-2 text-xs font-medium text-[#17213D] focus:border-[#6658D3] focus:bg-white focus:outline-none"
            >
              {currentBoardObj?.classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] p-2 text-xs font-medium text-[#17213D] focus:border-[#6658D3] focus:bg-white focus:outline-none"
            >
              {currentBoardObj?.subjects.map(sub => (
                <option key={sub.name} value={sub.name}>{sub.name.split('(')[0]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Chapter</label>
            <select
              value={selectedChapter}
              onChange={e => setSelectedChapter(e.target.value)}
              className="w-full rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] p-2 text-xs font-medium text-[#17213D] focus:border-[#6658D3] focus:bg-white focus:outline-none"
            >
              {currentSubjectObj?.chapters.map(ch => (
                <option key={ch.id} value={ch.id}>Ch {ch.number}: {ch.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Syllabus Body */}
      {isVerifiedCBSEElectricity ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="rounded-md bg-[#E2F7F3] px-2.5 py-1 text-xs font-bold text-[#159B85]">
                Verified Curriculum Dataset
              </span>
              <span className="text-xs text-gray-500">
                8 Core Concepts • NCERT Science Class 10
              </span>
            </div>
            <button
              onClick={() => setActiveStudentTab('concept_graph')}
              className="flex items-center space-x-1 text-xs font-bold text-[#6658D3] hover:underline"
            >
              <span>View Prerequisite Graph</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {CONCEPTS_CBSE_ELECTRICITY.map(concept => (
              <div
                key={concept.id}
                className="rounded-card border border-[#E2E6F0] bg-white p-5 shadow-card transition-all hover:border-[#A99CF7] hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#6658D3]">
                      {concept.code}
                    </span>
                    <h3 className="mt-1 font-heading text-base font-bold text-[#17213D]">
                      {concept.name}
                    </h3>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      concept.difficultyLevel === 'Foundational'
                        ? 'bg-[#E2F7F3] text-[#159B85]'
                        : concept.difficultyLevel === 'Intermediate'
                        ? 'bg-[#FEF6E9] text-[#E6A448]'
                        : 'bg-[#EEECFC] text-[#6658D3]'
                    }`}
                  >
                    {concept.difficultyLevel}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  {concept.description}
                </p>

                {/* Learning Objectives */}
                <div className="mt-3 border-t border-[#E2E6F0] pt-2.5">
                  <span className="text-[11px] font-bold text-gray-700">Learning Objectives:</span>
                  <ul className="mt-1 space-y-1">
                    {concept.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start space-x-1.5 text-[11px] text-gray-500">
                        <CheckCircle2 className="h-3 w-3 shrink-0 text-[#159B85] mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Reference & Practice Button */}
                <div className="mt-4 flex items-center justify-between pt-2 text-[11px] border-t border-[#F2F4FA]">
                  <span className="text-gray-400 truncate max-w-[200px]" title={concept.sourceReference}>
                    {concept.sourceReference}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedConceptId(concept.id);
                      setActiveStudentTab('practice');
                    }}
                    className="font-bold text-[#6658D3] hover:underline"
                  >
                    Practice →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty / Not yet populated state */
        <div className="rounded-card border border-[#E2E6F0] bg-white p-12 text-center shadow-card">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF0F7] text-gray-400">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="mt-3 font-heading text-lg font-bold text-[#17213D]">
            Curriculum Structure Prepared for Population
          </h3>
          <p className="mt-1 text-xs text-gray-500 max-w-md mx-auto">
            The schema for {selectedBoard} {selectedClass} {selectedSubject} is initialized. Use the JSON import button above or select <span className="font-semibold text-[#6658D3]">CBSE Class 10 Science (Electricity)</span> to view the fully verified live curriculum dataset.
          </p>
          <button
            onClick={() => {
              setSelectedBoard('CBSE');
              setSelectedClass('Class 10');
              setSelectedSubject('Science (Physics, Chemistry, Biology)');
              setSelectedChapter('ch_electricity');
            }}
            className="mt-4 rounded-btn bg-[#6658D3] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
          >
            Switch to CBSE Class 10 Science Demo
          </button>
        </div>
      )}
    </div>
  );
};
