import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Bell, Shield, Save, GraduationCap } from 'lucide-react';

export const TeacherSettings: React.FC = () => {
  const { currentUser, showToast } = useApp();

  const [name, setName] = useState(currentUser?.name || 'Mrs. Sarah Jenkins');
  const [email] = useState(currentUser?.email || 'sarah.jenkins@faculty.learnloop.edu');
  const [school] = useState(currentUser?.school || 'St. Jude International Academy');
  const [department] = useState('Secondary Physics & Natural Sciences');
  const [autoFlagMisconceptions, setAutoFlagMisconceptions] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Faculty preferences saved successfully.', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <h2 className="font-heading text-xl font-bold text-[#17213D]">
          Faculty Profile & Classroom Configuration
        </h2>
        <p className="text-xs text-gray-500">
          Manage teacher credentials, classroom telemetry preferences, and automated intervention thresholds.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#17213D] border-b border-[#E2E6F0] pb-3">
            <GraduationCap className="h-4 w-4 text-[#6658D3]" />
            <span>Faculty Information</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] p-2.5 text-xs text-[#17213D] focus:border-[#6658D3] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Official Faculty Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full rounded-btn border border-[#E2E6F0] bg-[#EEF0F7] p-2.5 text-xs text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Institution</label>
              <input
                type="text"
                value={school}
                disabled
                className="w-full rounded-btn border border-[#E2E6F0] bg-[#EEF0F7] p-2.5 text-xs text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Department</label>
              <input
                type="text"
                value={department}
                disabled
                className="w-full rounded-btn border border-[#E2E6F0] bg-[#EEF0F7] p-2.5 text-xs text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#17213D] border-b border-[#E2E6F0] pb-3">
            <Bell className="h-4 w-4 text-[#6658D3]" />
            <span>Automated Classroom Telemetry</span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="font-semibold text-[#17213D] block">Cohort Misconception Alerts</span>
                <span className="text-gray-500">Notify when &gt;25% of students exhibit the same reasoning flaw</span>
              </div>
              <input
                type="checkbox"
                checked={autoFlagMisconceptions}
                onChange={e => setAutoFlagMisconceptions(e.target.checked)}
                className="h-4 w-4 text-[#6658D3] rounded focus:ring-[#6658D3]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-[#F2F4FA]">
              <div>
                <span className="font-semibold text-[#17213D] block">Weekly Executive Digest</span>
                <span className="text-gray-500">Send Friday class diagnostic summaries directly to inbox</span>
              </div>
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={e => setWeeklyDigest(e.target.checked)}
                className="h-4 w-4 text-[#6658D3] rounded focus:ring-[#6658D3]"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-1.5 rounded-btn bg-[#6658D3] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
