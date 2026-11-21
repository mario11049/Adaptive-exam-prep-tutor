import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  RotateCcw,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  BookOpen,
  GraduationCap
} from 'lucide-react';

interface TopBarProps {
  title: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const {
    currentUser,
    currentRole,
    loginAsStudent,
    loginAsTeacher,
    logout,
    resetDemoState,
    showToast
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 'n1',
      title: "Ohm's Law revision due",
      desc: 'Scheduled spaced recall to reinforce inverse proportionality.',
      time: '15m ago',
      unread: true
    },
    {
      id: 'n2',
      title: 'Learner model updated',
      desc: 'Confidence increased to 86% in Electric Charge & Current.',
      time: '2h ago',
      unread: false
    },
    {
      id: 'n3',
      title: 'Teacher recommendation generated',
      desc: 'Class 10-A remedial practice on parallel resistors is ready.',
      time: '1d ago',
      unread: false
    }
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#E2E6F0] bg-white px-6">
      {/* Left: Logo & Current Page Name */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#17213D] shadow-sm">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
              <path
                d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17"
                stroke="#6658D3"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12"
                stroke="#A99CF7"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="2 3"
              />
              <circle cx="12" cy="12" r="2.5" fill="#159B85" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <span className="font-heading text-lg font-extrabold tracking-tight text-[#17213D]">
              LearnLoop
            </span>
          </div>
        </div>

        <div className="h-5 w-px bg-[#E2E6F0]" />

        <div className="flex items-center space-x-2">
          <h1 className="font-heading text-lg font-bold text-[#17213D]">{title}</h1>
          <span className="hidden rounded-full bg-[#EEF0F7] px-2.5 py-0.5 text-xs font-medium text-[#6658D3] md:inline-block">
            CBSE Class 10 Science
          </span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden max-w-xs flex-1 px-4 lg:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search concepts, rubrics, questions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] py-1.5 pl-9 pr-4 text-xs font-medium text-[#17213D] placeholder-gray-400 transition-all focus:border-[#6658D3] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6658D3]"
          />
        </div>
      </div>

      {/* Right: Actions, Demo Switchers, Notifications, Profile */}
      <div className="flex items-center space-x-3">
        {/* Reset Demo Journey Button */}
        <button
          onClick={resetDemoState}
          title="Reset your progress to the starting benchmark"
          className="hidden items-center space-x-1.5 rounded-btn border border-[#E2E6F0] bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#17213D] sm:flex"
        >
          <RotateCcw className="h-3.5 w-3.5 text-[#6658D3]" />
          <span>Reset Progress</span>
        </button>

        {/* Quick Role Switcher for Test Judges */}
        {currentRole === 'student' ? (
          <button
            onClick={() => loginAsTeacher()}
            className="flex items-center space-x-1.5 rounded-btn bg-[#EEF0F7] px-2.5 py-1.5 text-xs font-semibold text-[#6658D3] transition-colors hover:bg-[#6658D3] hover:text-white"
          >
            <GraduationCap className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Teacher View</span>
          </button>
        ) : (
          <button
            onClick={() => loginAsStudent()}
            className="flex items-center space-x-1.5 rounded-btn bg-[#EEF0F7] px-2.5 py-1.5 text-xs font-semibold text-[#6658D3] transition-colors hover:bg-[#6658D3] hover:text-white"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Student View</span>
          </button>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative rounded-btn p-2 text-gray-500 hover:bg-[#EEF0F7] hover:text-[#17213D]"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#E16D78]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-card border border-[#E2E6F0] bg-white p-3 shadow-popover">
              <div className="mb-2 flex items-center justify-between border-b border-[#E2E6F0] pb-2">
                <span className="font-heading text-xs font-bold text-[#17213D]">Notifications</span>
                <span className="text-[11px] text-[#6658D3]">3 New</span>
              </div>
              <div className="space-y-2">
                {notifications.map(item => (
                  <div
                    key={item.id}
                    className={`rounded-lg p-2 text-xs transition-colors hover:bg-[#F7F8FC] ${
                      item.unread ? 'bg-[#F4F3FD]' : ''
                    }`}
                  >
                    <div className="font-semibold text-[#17213D]">{item.title}</div>
                    <div className="text-gray-500">{item.desc}</div>
                    <div className="mt-1 text-[10px] text-gray-400">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-2 rounded-btn p-1 text-left transition-colors hover:bg-[#EEF0F7]"
          >
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80'}
              alt={currentUser?.name}
              className="h-8 w-8 rounded-full border border-[#E2E6F0] object-cover"
            />
            <div className="hidden text-xs md:block">
              <div className="font-semibold leading-tight text-[#17213D]">{currentUser?.name}</div>
              <div className="text-[11px] font-medium capitalize text-gray-500">{currentUser?.role}</div>
            </div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-gray-400 md:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-card border border-[#E2E6F0] bg-white p-2 shadow-popover">
              <div className="border-b border-[#E2E6F0] p-2 text-xs">
                <div className="font-bold text-[#17213D]">{currentUser?.name}</div>
                <div className="text-gray-500">{currentUser?.email}</div>
                <div className="mt-1 inline-block rounded bg-[#EEF0F7] px-1.5 py-0.5 text-[10px] font-semibold text-[#6658D3]">
                  {currentUser?.school}
                </div>
              </div>
              <div className="pt-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    showToast('Settings opened', 'info');
                  }}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 text-xs text-gray-700 hover:bg-[#F7F8FC]"
                >
                  <User className="h-3.5 w-3.5 text-gray-500" />
                  <span>Account & Preferences</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 text-xs text-[#E16D78] hover:bg-[#FDEFF0]"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
