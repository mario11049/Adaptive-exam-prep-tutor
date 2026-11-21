export type UserRole = 'student' | 'teacher';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  grade?: string;
  section?: string;
  school: string;
  academicYear: string;
}

export interface ConceptPrerequisite {
  sourceId: string;
  targetId: string;
  type: 'hard_prerequisite' | 'recommended';
}

export interface Concept {
  id: string;
  code: string;
  name: string;
  chapterId: string;
  chapterName: string;
  subject: string;
  description: string;
  learningObjectives: string[];
  prerequisites: string[]; // Concept IDs
  difficultyLevel: 'Foundational' | 'Intermediate' | 'Advanced';
  sourceReference: string; // e.g. "CBSE Science Class 10 NCERT Chapter 12"
}

export type MasteryStatus = 'mastered' | 'developing' | 'needs_practice' | 'learning' | 'unassessed';

export interface LearnerMastery {
  conceptId: string;
  conceptName: string;
  masteryPercentage: number;
  previousMasteryPercentage: number;
  status: MasteryStatus;
  correctAttempts: number;
  incorrectAttempts: number;
  totalAttempts: number;
  lastPracticed: string;
  confidenceScore: number;
  recentEvidence: string[];
}

export interface QuestionRubric {
  keyCriteria: string[];
  commonMisconceptions: {
    id: string;
    triggerReasoning: string;
    misconceptionName: string;
    explanation: string;
  }[];
}

export interface Question {
  id: string;
  conceptId: string;
  conceptName: string;
  chapterName: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'multiple_choice' | 'numerical' | 'conceptual_reasoning';
  questionText: string;
  diagramSvg?: string;
  options?: { id: string; text: string }[];
  correctAnswer: string;
  unit?: string;
  rubric: QuestionRubric;
  standardExplanation: string;
}

export interface ReasoningAnalysisResult {
  isCorrect: boolean;
  reasoningQuality: 'solid' | 'partial' | 'flawed' | 'unclear';
  detectedMisconception?: {
    id: string;
    name: string;
    evidence: string;
    confidence: number;
    explanation: string;
    remedialAdvice: string;
  };
  understoodPoints: string[];
  missingOrFlawedPoints: string[];
  evidenceQuote: string;
  feedback: string;
  recommendedConcept: {
    id: string;
    name: string;
    reason: string;
  };
  previousMastery: number;
  newMastery: number;
  masteryDelta: number;
}

export interface MisconceptionRecord {
  id: string;
  conceptId: string;
  conceptName: string;
  tag: string;
  studentQuote: string;
  evidence: string;
  confidence: number;
  correctExplanation: string;
  practiceRecommendation: string;
  status: 'newly_detected' | 'practicing' | 'resolved';
  detectedAt: string;
  occurrences: number;
}

export interface RevisionTask {
  id: string;
  conceptId: string;
  conceptName: string;
  chapterName: string;
  dueDate: string;
  status: 'today' | 'upcoming' | 'overdue' | 'completed';
  reason: string;
  questionCount: number;
  estimatedMinutes: number;
  lastScore: number;
  completedAt?: string;
}

export interface StudentProgressMetric {
  date: string;
  overallMastery: number;
  conceptsMastered: number;
  studyMinutes: number;
  questionsAnswered: number;
}

export interface ClassRoom {
  id: string;
  name: string;
  grade: string;
  section: string;
  subject: string;
  curriculum: string;
  academicYear: string;
  enrollmentCode: string;
  studentCount: number;
  averageMastery: number;
}

export interface StudentHeatmapRow {
  studentId: string;
  studentName: string;
  avatar: string;
  conceptMastery: Record<string, number>; // conceptId -> mastery percentage
  flaggedForAttention: boolean;
  lastActive: string;
  primaryStruggleConcept?: string;
}

export interface TeacherRecommendation {
  id: string;
  title: string;
  conceptId: string;
  conceptName: string;
  severity: 'high' | 'medium' | 'low';
  affectedStudentCount: number;
  totalStudents: number;
  observation: string;
  pedagogicalAction: string;
  status: 'pending' | 'applied' | 'dismissed';
}

export interface DoubtChatMessage {
  id: string;
  sender: 'student' | 'ai';
  text: string;
  timestamp: string;
  pdfName?: string;
  conceptContext?: string;
  isStepByStep?: boolean;
}
