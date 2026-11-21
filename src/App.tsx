import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBar } from './components/common/TopBar';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/auth/AuthModal';
import { LandingPage } from './components/landing/LandingPage';

// Student Views
import { StudentDashboard } from './components/student/StudentDashboard';
import { DiagnosticAssessment } from './components/student/DiagnosticAssessment';
import { SyllabusExplorer } from './components/student/SyllabusExplorer';
import { ConceptGraphView } from './components/student/ConceptGraphView';
import { PracticeArena } from './components/student/PracticeArena';
import { MisconceptionLibrary } from './components/student/MisconceptionLibrary';
import { RevisionPlanner } from './components/student/RevisionPlanner';
import { StudentProgress } from './components/student/StudentProgress';
import { StudentSettings } from './components/student/StudentSettings';
import { FloatingDoubtChat } from './components/student/FloatingDoubtChat';

// Teacher Views
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { ClassManagement } from './components/teacher/ClassManagement';
import { ClassHeatmap } from './components/teacher/ClassHeatmap';
import { MisconceptionTrends } from './components/teacher/MisconceptionTrends';
import { TeacherRecommendations } from './components/teacher/TeacherRecommendations';
import { TeacherAssessments } from './components/teacher/TeacherAssessments';
import { TeacherReports } from './components/teacher/TeacherReports';
import { TeacherSettings } from './components/teacher/TeacherSettings';

const MainLayout: React.FC = () => {
  const { currentRole, activeStudentTab, activeTeacherTab } = useApp();

  if (currentRole === 'public') {
    return (
      <>
        <LandingPage />
        <AuthModal />
        <ToastContainer />
      </>
    );
  }

  // Get active page titles
  const studentTitles: Record<string, string> = {
    overview: 'Student Overview',
    diagnostic: 'Diagnostic Assessment',
    syllabus: 'Universal Syllabus Explorer',
    concept_graph: 'Interactive Concept Explorer',
    practice: 'AI Practice Arena',
    misconceptions: 'My Misconceptions Library',
    revision: 'Spaced Repetition Planner',
    progress: 'My Progress & Telemetry',
    settings: 'Settings & Profile'
  };

  const teacherTitles: Record<string, string> = {
    overview: 'Classroom Intelligence Overview',
    classes: 'Class Management & Enrollment',
    curriculum_map: 'Curriculum & Competency Map',
    analytics: 'Classroom Concept Heatmap',
    misconception_trends: 'Cohort Misconception Trends',
    assessments: 'Classroom Assessments',
    recommendations: 'AI Pedagogical Interventions',
    reports: 'Diagnostic & Progress Reports',
    settings: 'Faculty Settings'
  };

  const currentTitle =
    currentRole === 'student'
      ? studentTitles[activeStudentTab] || 'LearnLoop'
      : teacherTitles[activeTeacherTab] || 'Faculty Suite';

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F7F8FC] font-sans antialiased text-[#17213D]">
      {/* Role-specific Sidebar */}
      <Sidebar />

      {/* Main App Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <TopBar title={currentTitle} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
          {currentRole === 'student' ? (
            <>
              {activeStudentTab === 'overview' && <StudentDashboard />}
              {activeStudentTab === 'diagnostic' && <DiagnosticAssessment />}
              {activeStudentTab === 'syllabus' && <SyllabusExplorer />}
              {activeStudentTab === 'concept_graph' && <ConceptGraphView />}
              {activeStudentTab === 'practice' && <PracticeArena />}
              {activeStudentTab === 'misconceptions' && <MisconceptionLibrary />}
              {activeStudentTab === 'revision' && <RevisionPlanner />}
              {activeStudentTab === 'progress' && <StudentProgress />}
              {activeStudentTab === 'settings' && <StudentSettings />}
            </>
          ) : (
            <>
              {activeTeacherTab === 'overview' && <TeacherDashboard />}
              {activeTeacherTab === 'classes' && <ClassManagement />}
              {activeTeacherTab === 'curriculum_map' && <SyllabusExplorer />}
              {activeTeacherTab === 'analytics' && <ClassHeatmap />}
              {activeTeacherTab === 'misconception_trends' && <MisconceptionTrends />}
              {activeTeacherTab === 'assessments' && <TeacherAssessments />}
              {activeTeacherTab === 'recommendations' && <TeacherRecommendations />}
              {activeTeacherTab === 'reports' && <TeacherReports />}
              {activeTeacherTab === 'settings' && <TeacherSettings />}
            </>
          )}
        </main>
      </div>

      {/* Floating Instant Doubt Chatbot with Picture Upload (Active on Student Workspace) */}
      {currentRole === 'student' && <FloatingDoubtChat />}

      {/* Shared Modals and Toasts */}
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
