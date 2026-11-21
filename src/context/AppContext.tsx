import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  LearnerMastery,
  MisconceptionRecord,
  RevisionTask,
  TeacherRecommendation,
  ClassRoom,
  Concept
} from '../types';
import {
  DEMO_STUDENT,
  DEMO_TEACHER,
  INITIAL_STUDENT_MASTERY,
  INITIAL_MISCONCEPTIONS,
  INITIAL_REVISION_TASKS,
  TEACHER_CLASSES,
  TEACHER_RECOMMENDATIONS_DATA
} from '../data/mockDatabase';
import { CONCEPTS_CBSE_ELECTRICITY } from '../data/curriculumData';

export type StudentNavTab =
  | 'overview'
  | 'diagnostic'
  | 'syllabus'
  | 'concept_graph'
  | 'practice'
  | 'misconceptions'
  | 'revision'
  | 'progress'
  | 'settings';

export type TeacherNavTab =
  | 'overview'
  | 'classes'
  | 'curriculum_map'
  | 'analytics'
  | 'misconception_trends'
  | 'assessments'
  | 'recommendations'
  | 'reports'
  | 'settings';

export interface ToastItem {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  currentUser: UserProfile | null;
  currentRole: UserRole | 'public';
  activeStudentTab: StudentNavTab;
  activeTeacherTab: TeacherNavTab;
  studentMastery: Record<string, LearnerMastery>;
  misconceptions: MisconceptionRecord[];
  revisionTasks: RevisionTask[];
  teacherRecommendations: TeacherRecommendation[];
  classes: ClassRoom[];
  selectedConceptId: string;
  selectedConcept: Concept;
  isAuthModalOpen: boolean;
  authModalTab: 'signin' | 'signup';
  toasts: ToastItem[];
  setAuthModalOpen: (open: boolean, tab?: 'signin' | 'signup') => void;
  setActiveStudentTab: (tab: StudentNavTab) => void;
  setActiveTeacherTab: (tab: TeacherNavTab) => void;
  setSelectedConceptId: (conceptId: string) => void;
  loginAsStudent: (p?: { name: string; email: string }) => void;
  loginAsTeacher: (p?: { name: string; email: string }) => void;
  logout: () => void;
  resetDemoState: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  applyMasteryUpdate: (
    conceptId: string,
    newScore: number,
    isCorrect: boolean,
    evidenceText: string
  ) => void;
  addOrUpdateMisconception: (misc: MisconceptionRecord) => void;
  updateMisconceptionStatus: (id: string, status: 'newly_detected' | 'practicing' | 'resolved') => void;
  completeRevisionTask: (id: string) => void;
  applyTeacherRecommendation: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try loading saved state or initialize with pristine demo state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('learnloop_user');
    return saved ? JSON.parse(saved) : null; // Start on the landing page
  });

  const [activeStudentTab, setActiveStudentTab] = useState<StudentNavTab>('overview');
  const [activeTeacherTab, setActiveTeacherTab] = useState<TeacherNavTab>('overview');
  const [selectedConceptId, setSelectedConceptId] = useState<string>('elec_03');

  const [studentMastery, setStudentMastery] = useState<Record<string, LearnerMastery>>(() => {
    const saved = localStorage.getItem('learnloop_mastery');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_MASTERY;
  });

  const [misconceptions, setMisconceptions] = useState<MisconceptionRecord[]>(() => {
    const saved = localStorage.getItem('learnloop_misc');
    return saved ? JSON.parse(saved) : INITIAL_MISCONCEPTIONS;
  });

  const [revisionTasks, setRevisionTasks] = useState<RevisionTask[]>(() => {
    const saved = localStorage.getItem('learnloop_rev');
    return saved ? JSON.parse(saved) : INITIAL_REVISION_TASKS;
  });

  const [teacherRecommendations, setTeacherRecommendations] = useState<TeacherRecommendation[]>(() => {
    return TEACHER_RECOMMENDATIONS_DATA;
  });

  const [classes] = useState<ClassRoom[]>(TEACHER_CLASSES);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Persist state to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('learnloop_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('learnloop_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('learnloop_mastery', JSON.stringify(studentMastery));
  }, [studentMastery]);

  useEffect(() => {
    localStorage.setItem('learnloop_misc', JSON.stringify(misconceptions));
  }, [misconceptions]);

  useEffect(() => {
    localStorage.setItem('learnloop_rev', JSON.stringify(revisionTasks));
  }, [revisionTasks]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const setAuthModalOpen = (open: boolean, tab: 'signin' | 'signup' = 'signin') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(open);
  };

  const loginAsStudent = (p?: { name: string; email: string }) => {
    setCurrentUser(p ? { ...DEMO_STUDENT, id: `usr_${p.email}`, name: p.name, email: p.email, avatar: undefined as unknown as string } : DEMO_STUDENT);
    setIsAuthModalOpen(false);
    setActiveStudentTab('overview');
    showToast(`Welcome, ${(p?.name || 'Alex').split(' ')[0]}. Student workspace loaded.`, 'success');
  };

  const loginAsTeacher = (p?: { name: string; email: string }) => {
    setCurrentUser(p ? { ...DEMO_TEACHER, id: `usr_${p.email}`, name: p.name, email: p.email, avatar: undefined as unknown as string } : DEMO_TEACHER);
    setIsAuthModalOpen(false);
    setActiveTeacherTab('overview');
    showToast(`Welcome, ${p?.name || 'Mrs. Jenkins'}. Classroom intelligence workspace loaded.`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out of LearnLoop.', 'info');
  };

  const resetDemoState = () => {
    setStudentMastery(INITIAL_STUDENT_MASTERY);
    setMisconceptions(INITIAL_MISCONCEPTIONS);
    setRevisionTasks(INITIAL_REVISION_TASKS);
    setTeacherRecommendations(TEACHER_RECOMMENDATIONS_DATA);
    setSelectedConceptId('elec_03');
    localStorage.removeItem('learnloop_mastery');
    localStorage.removeItem('learnloop_misc');
    localStorage.removeItem('learnloop_rev');
    showToast('Demo state reset to initial verified benchmark (Alex, Ohm\'s Law @ 48%).', 'success');
  };

  const applyMasteryUpdate = (
    conceptId: string,
    newScore: number,
    isCorrect: boolean,
    evidenceText: string
  ) => {
    setStudentMastery(prev => {
      const current = prev[conceptId] || {
        conceptId,
        conceptName: CONCEPTS_CBSE_ELECTRICITY.find(c => c.id === conceptId)?.name || 'Concept',
        masteryPercentage: 50,
        previousMasteryPercentage: 50,
        status: 'developing',
        correctAttempts: 0,
        incorrectAttempts: 0,
        totalAttempts: 0,
        lastPracticed: 'Just now',
        confidenceScore: 0.6,
        recentEvidence: []
      };

      const prevScore = current.masteryPercentage;
      const status = newScore >= 80 ? 'mastered' : newScore < 50 ? 'needs_practice' : 'developing';

      return {
        ...prev,
        [conceptId]: {
          ...current,
          previousMasteryPercentage: prevScore,
          masteryPercentage: newScore,
          status,
          correctAttempts: current.correctAttempts + (isCorrect ? 1 : 0),
          incorrectAttempts: current.incorrectAttempts + (isCorrect ? 0 : 1),
          totalAttempts: current.totalAttempts + 1,
          lastPracticed: 'Just now',
          recentEvidence: [evidenceText, ...(current.recentEvidence || [])].slice(0, 5)
        }
      };
    });
  };

  const addOrUpdateMisconception = (record: MisconceptionRecord) => {
    setMisconceptions(prev => {
      const exists = prev.findIndex(m => m.id === record.id || m.tag === record.tag);
      if (exists >= 0) {
        const updated = [...prev];
        updated[exists] = {
          ...updated[exists],
          ...record,
          occurrences: updated[exists].occurrences + 1
        };
        return updated;
      }
      return [record, ...prev];
    });
  };

  const updateMisconceptionStatus = (id: string, status: 'newly_detected' | 'practicing' | 'resolved') => {
    setMisconceptions(prev =>
      prev.map(m => (m.id === id ? { ...m, status } : m))
    );
    showToast(`Misconception marked as ${status.replace('_', ' ')}.`, 'info');
  };

  const completeRevisionTask = (id: string) => {
    setRevisionTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, status: 'completed', completedAt: 'Just now' } : t))
    );
    showToast('Revision task completed! Recall evidence logged in learner model.', 'success');
  };

  const applyTeacherRecommendation = (id: string) => {
    setTeacherRecommendations(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'applied' } : r))
    );
    showToast('Pedagogical intervention applied to Class 10-A curriculum schedule.', 'success');
  };

  const selectedConcept =
    CONCEPTS_CBSE_ELECTRICITY.find(c => c.id === selectedConceptId) ||
    CONCEPTS_CBSE_ELECTRICITY[2]; // Default Ohm's Law

  const currentRole = currentUser?.role || 'public';

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        activeStudentTab,
        activeTeacherTab,
        studentMastery,
        misconceptions,
        revisionTasks,
        teacherRecommendations,
        classes,
        selectedConceptId,
        selectedConcept,
        isAuthModalOpen,
        authModalTab,
        toasts,
        setAuthModalOpen,
        setActiveStudentTab,
        setActiveTeacherTab,
        setSelectedConceptId,
        loginAsStudent,
        loginAsTeacher,
        logout,
        resetDemoState,
        showToast,
        removeToast,
        applyMasteryUpdate,
        addOrUpdateMisconception,
        updateMisconceptionStatus,
        completeRevisionTask,
        applyTeacherRecommendation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
