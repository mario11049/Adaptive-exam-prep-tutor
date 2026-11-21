import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Bell, Shield, BookOpen, Save } from 'lucide-react';

export const StudentSettings: React.FC = () => {
  const { currentUser, showToast } = useApp();

  const [name, setName] = useState(currentUser?.name || 'Alex Chen');
  const [email] = useState(currentUser?.email || 'alex.chen@student.learnloop.edu');
  const [school] = useState(currentUser?.school || 'St. Jude International Academy');
  const [grade] = useState('Class 10');
  const [section] = useState('Section A');
  const [enableDailyReminders, setEnableDailyReminders] = useState(true);
  const [enableAdaptiveAlerts, setEnableAdaptiveAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Student preferences saved successfully.', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <h2 className="font-heading text-xl font-bold text-[#17213D]">
          Student Profile & Learning Preferences
        </h2>
        <p className="text-xs text-gray-500">
          Manage your personal information, curriculum defaults, and adaptive notification settings.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#17213D] border-b border-[#E2E6F0] pb-3">
            <User className="h-4 w-4 text-[#6658D3]" />
            <span>Academic Identity</span>
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
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full rounded-btn border border-[#E2E6F0] bg-[#EEF0F7] p-2.5 text-xs text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">School / Institution</label>
              <input
                type="text"
                value={school}
                disabled
                className="w-full rounded-btn border border-[#E2E6F0] bg-[#EEF0F7] p-2.5 text-xs text-gray-500 cursor-not-allowed"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Grade</label>
                <input
                  type="text"
                  value={grade}
                  disabled
                  className="w-full rounded-btn border border-[#E2E6F0] bg-[#EEF0F7] p-2.5 text-xs text-gray-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Section</label>
                <input
                  type="text"
                  value={section}
                  disabled
                  className="w-full rounded-btn border border-[#E2E6F0] bg-[#EEF0F7] p-2.5 text-xs text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#17213D] border-b border-[#E2E6F0] pb-3">
            <Bell className="h-4 w-4 text-[#6658D3]" />
            <span>Spaced Repetition & Notification Controls</span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="font-semibold text-[#17213D] block">Daily Revision Reminders</span>
                <span className="text-gray-500">Alert me when spaced review decay thresholds are met</span>
              </div>
              <input
                type="checkbox"
                checked={enableDailyReminders}
                onChange={e => setEnableDailyReminders(e.target.checked)}
                className="h-4 w-4 text-[#6658D3] rounded focus:ring-[#6658D3]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-[#F2F4FA]">
              <div>
                <span className="font-semibold text-[#17213D] block">Adaptive Misconception Flagging</span>
                <span className="text-gray-500">Automatically flag conceptual reasoning discrepancies in my library</span>
              </div>
              <input
                type="checkbox"
                checked={enableAdaptiveAlerts}
                onChange={e => setEnableAdaptiveAlerts(e.target.checked)}
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
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
