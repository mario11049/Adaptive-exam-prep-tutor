import React, { useState } from 'react';
import { useApp, StudentNavTab, TeacherNavTab } from '../../context/AppContext';
import {
  LayoutDashboard,
  ClipboardCheck,
  BookOpen,
  Share2,
  Flame,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Settings,
  Users,
  Layers,
  BarChart3,
  FileCheck,
  Sparkles,
  FileText,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    currentRole,
    activeStudentTab,
    setActiveStudentTab,
    activeTeacherTab,
    setActiveTeacherTab,
    currentUser
  } = useApp();

  const [collapsed, setCollapsed] = useState(false);

  // Student Navigation Items
  const studentNavItems: { id: StudentNavTab; label: string; icon: any; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'diagnostic', label: 'Diagnostic Assessment', icon: ClipboardCheck },
    { id: 'syllabus', label: 'My Syllabus', icon: BookOpen },
    { id: 'concept_graph', label: 'Concept Explorer', icon: Share2 },
    { id: 'practice', label: 'AI Practice', icon: Flame, badge: 'Adaptive' },
    { id: 'misconceptions', label: 'My Misconceptions', icon: AlertTriangle, badge: '2' },
    { id: 'revision', label: 'Revision Planner', icon: Calendar, badge: 'Due' },
    { id: 'progress', label: 'My Progress', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Teacher Navigation Items
  const teacherNavItems: { id: TeacherNavTab; label: string; icon: any; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'classes', label: 'My Classes', icon: Users, badge: '2' },
    { id: 'curriculum_map', label: 'Curriculum Map', icon: Layers },
    { id: 'analytics', label: 'Class Analytics', icon: BarChart3 },
    { id: 'misconception_trends', label: 'Misconception Trends', icon: AlertTriangle, badge: '3' },
    { id: 'assessments', label: 'Assessments', icon: FileCheck },
    { id: 'recommendations', label: 'Teaching Recommendations', icon: Sparkles, badge: 'New' },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`relative flex flex-col justify-between border-r border-[#1E2A4A] bg-[#17213D] text-white transition-all duration-200 ${
        collapsed ? 'w-20' : 'w-60'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="flex h-16 items-center justify-between px-4 border-b border-[#232F52]">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#6658D3] shadow-md">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2.5" strokeDasharray="3 3" />
                <circle cx="12" cy="12" r="3" fill="#159B85" />
              </svg>
            </div>
            {!collapsed && (
              <div className="truncate">
                <span className="font-heading text-lg font-bold tracking-tight text-white">
                  LearnLoop
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#A99CF7]">
                  {currentRole === 'teacher' ? 'Faculty Suite' : 'Learner Model'}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-md p-1.5 text-gray-400 hover:bg-[#232F52] hover:text-white"
            title={collapsed ? 'Expand menu' : 'Collapse menu'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1.5 p-3">
          {currentRole === 'student' ? (
            studentNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activeStudentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveStudentTab(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`group relative flex w-full items-center rounded-btn px-3 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#6658D3] text-white shadow-sm'
                      : 'text-gray-300 hover:bg-[#232F52] hover:text-white'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#A99CF7]'
                    } ${!collapsed ? 'mr-3' : 'mx-auto'}`}
                  />
                  {!collapsed && (
                    <span className="flex-1 truncate text-left">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badge === 'Due' || item.badge === '2'
                          ? 'bg-[#E16D78]/20 text-[#F6B8BD]'
                          : 'bg-[#159B85]/20 text-[#A3E8DC]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            teacherNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTeacherTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTeacherTab(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`group relative flex w-full items-center rounded-btn px-3 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#6658D3] text-white shadow-sm'
                      : 'text-gray-300 hover:bg-[#232F52] hover:text-white'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#A99CF7]'
                    } ${!collapsed ? 'mr-3' : 'mx-auto'}`}
                  />
                  {!collapsed && (
                    <span className="flex-1 truncate text-left">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#159B85]/20 text-[#A3E8DC]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </nav>
      </div>

      {/* Footer Profile & Security Badge */}
      <div className="border-t border-[#232F52] p-3">
        {!collapsed && (
          <div className="mb-2 flex items-center space-x-2 rounded-lg bg-[#1E2A4A] p-2 text-xs">
            <ShieldCheck className="h-4 w-4 text-[#159B85]" />
            <div className="truncate">
              <span className="font-semibold text-white">Learner Guard RLS</span>
              <span className="block text-[10px] text-gray-400">Isolated Role Session</span>
            </div>
          </div>
        )}
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <div className="h-2 w-2 rounded-full bg-[#159B85] animate-pulse" />
          {!collapsed && <span>Intelligence Engine Active</span>}
        </div>
      </div>
    </aside>
  );
};
