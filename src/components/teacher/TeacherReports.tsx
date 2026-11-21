import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Award,
  Layers
} from 'lucide-react';

export const TeacherReports: React.FC = () => {
  const { showToast } = useApp();

  const handlePrint = () => {
    window.print();
    showToast('Report sent to system print dialog / PDF export.', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Top Banner & Export Actions */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#6658D3]">
              <FileText className="h-4 w-4" />
              <span>Institutional Learning Telemetry Report</span>
            </div>
            <h2 className="mt-1 font-heading text-xl font-bold text-[#17213D]">
              Classroom Diagnostic & Mastery Report
            </h2>
            <p className="text-xs text-gray-500">
              Official summary for Class 10-A Science (Electricity) • Academic Year 2026–2027
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 rounded-btn bg-[#6658D3] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Download PDF Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Report Document Surface */}
      <div className="rounded-card border border-[#CBD2E1] bg-white p-8 shadow-card print:border-none print:shadow-none space-y-6">
        {/* Document Header */}
        <div className="flex items-start justify-between border-b border-[#E2E6F0] pb-5">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#17213D] text-white">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2.5" strokeDasharray="3 3" />
                <circle cx="12" cy="12" r="3" fill="#159B85" />
              </svg>
            </div>
            <div>
              <h1 className="font-heading text-lg font-extrabold text-[#17213D]">
                LearnLoop Classroom Diagnostic Intelligence Report
              </h1>
              <p className="text-xs text-gray-500">
                St. Jude International Academy • Department of Secondary Physics
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-gray-500">
            <div>Date: <span className="font-semibold text-[#17213D]">November 21, 2026</span></div>
            <div>Instructor: <span className="font-semibold text-[#17213D]">Mrs. Sarah Jenkins</span></div>
            <div>Cohort: <span className="font-semibold text-[#17213D]">Class 10-A (32 Students)</span></div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div>
          <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            1. Cohort Executive Summary
          </h3>
          <p className="text-xs leading-relaxed text-gray-700">
            Class 10-A completed the comprehensive diagnostic and formative assessment suite for CBSE Chapter 12 (Electricity). Average overall mastery across 8 syllabus concepts is <strong>64%</strong>. Students demonstrate high competency in foundational current flow ($I = Q/t$) and series circuits. However, significant cognitive bottlenecks have been localized in <strong>Ohm's Law inverse reasoning ($I \propto 1/R$)</strong> and <strong>parallel reciprocal equivalent resistance</strong> calculations.
          </p>

          <div className="mt-4 grid grid-cols-4 gap-3 text-center">
            <div className="rounded-lg bg-[#F7F8FC] border border-[#E2E6F0] p-3">
              <span className="text-[10px] uppercase font-bold text-gray-400">Class Average</span>
              <div className="font-metric text-xl font-bold text-[#17213D] mt-0.5">64%</div>
            </div>
            <div className="rounded-lg bg-[#E2F7F3] border border-[#A3E8DC] p-3">
              <span className="text-[10px] uppercase font-bold text-[#159B85]">Strongest Concept</span>
              <div className="font-heading text-xs font-bold text-[#17213D] mt-0.5">Charge & Current (88%)</div>
            </div>
            <div className="rounded-lg bg-[#FDEFF0] border border-[#F6B8BD] p-3">
              <span className="text-[10px] uppercase font-bold text-[#E16D78]">Primary Gap</span>
              <div className="font-heading text-xs font-bold text-[#17213D] mt-0.5">Ohm's Law (48%)</div>
            </div>
            <div className="rounded-lg bg-[#FEF6E9] border border-[#F8D8A8] p-3">
              <span className="text-[10px] uppercase font-bold text-[#E6A448]">Flagged Students</span>
              <div className="font-metric text-xl font-bold text-[#E6A448] mt-0.5">5 Students</div>
            </div>
          </div>
        </div>

        {/* Section 2: Cognitive Misconception Breakdown */}
        <div>
          <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            2. High-Prevalence Misconceptions Detected
          </h3>
          <table className="w-full text-left text-xs border border-[#E2E6F0] rounded-lg overflow-hidden">
            <thead className="bg-[#F7F8FC] border-b border-[#E2E6F0] text-gray-600 font-bold">
              <tr>
                <th className="p-2.5">Concept</th>
                <th className="p-2.5">Misconception Pattern</th>
                <th className="p-2.5">Affected Cohort</th>
                <th className="p-2.5">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E6F0] text-gray-700">
              <tr>
                <td className="p-2.5 font-bold">Ohm's Law & V-I</td>
                <td className="p-2.5">Assuming current scales directly with resistance at fixed 12V</td>
                <td className="p-2.5 font-bold text-[#E16D78]">14 / 32 (44%)</td>
                <td className="p-2.5">Live variable rheostat circuit demo showing ammeter drop</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Parallel Resistors</td>
                <td className="p-2.5">Omission of final reciprocal step (1/Rp = 1/4 =&gt; Rp = 0.25Ω)</td>
                <td className="p-2.5 font-bold text-[#E16D78]">11 / 32 (34%)</td>
                <td className="p-2.5">Sanity check: parallel equivalent must be smaller than lowest branch</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Electric Power</td>
                <td className="p-2.5">Omission of Watt-to-Kilowatt conversion in tariff formula</td>
                <td className="p-2.5 font-bold text-[#E6A448]">8 / 32 (25%)</td>
                <td className="p-2.5">Domestic utility billing energy audit exercise</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Faculty Intervention Protocol */}
        <div>
          <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            3. Recommended Instructional Next Steps
          </h3>
          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="h-4 w-4 text-[#159B85] shrink-0 mt-0.5" />
              <span><strong>Week 6 Focus:</strong> Dedicate 20 minutes to interactive rheostat demonstration before advancing to complex parallel circuit networks.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="h-4 w-4 text-[#159B85] shrink-0 mt-0.5" />
              <span><strong>Differentiated Support:</strong> Deploy the 3-question adaptive remedial practice set for Alex Chen, Priya Sharma, and Liam Davis.</span>
            </li>
          </ul>
        </div>

        {/* Signature & Seal */}
        <div className="pt-6 border-t border-[#E2E6F0] flex justify-between items-center text-xs text-gray-500">
          <div>Verified by LearnLoop Autonomous Reasoning Engine • Model v2.4</div>
          <div className="text-right">
            <span className="block font-bold text-[#17213D]">Mrs. Sarah Jenkins</span>
            <span>Head of Secondary Physics</span>
          </div>
        </div>
      </div>
    </div>
  );
};
