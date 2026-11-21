import {
  UserProfile,
  LearnerMastery,
  MisconceptionRecord,
  RevisionTask,
  StudentHeatmapRow,
  TeacherRecommendation,
  ClassRoom,
  StudentProgressMetric
} from '../types';

export const DEMO_STUDENT: UserProfile = {
  id: 'usr_student_alex',
  name: 'Alex Chen',
  email: 'alex.chen@student.learnloop.edu',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  grade: 'Class 10',
  section: 'Section A',
  school: 'St. Jude International Academy',
  academicYear: '2026–2027'
};

export const DEMO_TEACHER: UserProfile = {
  id: 'usr_teacher_sarah',
  name: 'Mrs. Sarah Jenkins',
  email: 'sarah.jenkins@faculty.learnloop.edu',
  role: 'teacher',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  school: 'St. Jude International Academy',
  academicYear: '2026–2027'
};

export const INITIAL_STUDENT_MASTERY: Record<string, LearnerMastery> = {
  elec_01: {
    conceptId: 'elec_01',
    conceptName: 'Electric Charge and Current',
    masteryPercentage: 86,
    previousMasteryPercentage: 82,
    status: 'mastered',
    correctAttempts: 12,
    incorrectAttempts: 2,
    totalAttempts: 14,
    lastPracticed: '2 days ago',
    confidenceScore: 0.91,
    recentEvidence: ['Correctly applied I = Q/t in 3 consecutive numerical problems', 'Accurately stated electron flow opposite to conventional current']
  },
  elec_02: {
    conceptId: 'elec_02',
    conceptName: 'Electric Potential & Potential Difference',
    masteryPercentage: 78,
    previousMasteryPercentage: 75,
    status: 'developing',
    correctAttempts: 9,
    incorrectAttempts: 3,
    totalAttempts: 12,
    lastPracticed: '3 days ago',
    confidenceScore: 0.84,
    recentEvidence: ['Understands work per unit charge V = W/Q', 'Properly identified parallel voltmeter connection']
  },
  elec_03: {
    conceptId: 'elec_03',
    conceptName: "Ohm's Law & V-I Characteristics",
    masteryPercentage: 48,
    previousMasteryPercentage: 48,
    status: 'needs_practice',
    correctAttempts: 4,
    incorrectAttempts: 5,
    totalAttempts: 9,
    lastPracticed: 'Yesterday',
    confidenceScore: 0.52,
    recentEvidence: ['Struggled with current vs resistance variation at fixed 12V voltage', 'Reasoning indicated confusion regarding inverse ratio']
  },
  elec_04: {
    conceptId: 'elec_04',
    conceptName: 'Resistance Factors & Resistivity',
    masteryPercentage: 62,
    previousMasteryPercentage: 60,
    status: 'developing',
    correctAttempts: 6,
    incorrectAttempts: 4,
    totalAttempts: 10,
    lastPracticed: '4 days ago',
    confidenceScore: 0.68,
    recentEvidence: ['Understands wire length dependence R ∝ L', 'Occasionally overlooks cross-sectional area changes during wire stretching']
  },
  elec_05: {
    conceptId: 'elec_05',
    conceptName: 'Resistors in Series Combination',
    masteryPercentage: 71,
    previousMasteryPercentage: 68,
    status: 'developing',
    correctAttempts: 8,
    incorrectAttempts: 3,
    totalAttempts: 11,
    lastPracticed: '5 days ago',
    confidenceScore: 0.76,
    recentEvidence: ['Reliably sums series resistances Rs = R1 + R2', 'Correctly noted current remains uniform across all elements']
  },
  elec_06: {
    conceptId: 'elec_06',
    conceptName: 'Resistors in Parallel Combination',
    masteryPercentage: 42,
    previousMasteryPercentage: 40,
    status: 'needs_practice',
    correctAttempts: 3,
    incorrectAttempts: 6,
    totalAttempts: 9,
    lastPracticed: '6 days ago',
    confidenceScore: 0.46,
    recentEvidence: ['Often forgets to invert the harmonic reciprocal sum (1/Rp)', 'Unclear about total current dividing across branches']
  },
  elec_07: {
    conceptId: 'elec_07',
    conceptName: "Heating Effect & Joule's Law",
    masteryPercentage: 65,
    previousMasteryPercentage: 65,
    status: 'developing',
    correctAttempts: 5,
    incorrectAttempts: 3,
    totalAttempts: 8,
    lastPracticed: '1 week ago',
    confidenceScore: 0.70,
    recentEvidence: ['Accurately applied H = I^2 R t for simple heating elements']
  },
  elec_08: {
    conceptId: 'elec_08',
    conceptName: 'Electric Power & Commercial Energy Units',
    masteryPercentage: 38,
    previousMasteryPercentage: 35,
    status: 'needs_practice',
    correctAttempts: 2,
    incorrectAttempts: 5,
    totalAttempts: 7,
    lastPracticed: '1 week ago',
    confidenceScore: 0.40,
    recentEvidence: ['Requires practice converting Watt-hours into commercial kWh units']
  }
};

export const INITIAL_MISCONCEPTIONS: MisconceptionRecord[] = [
  {
    id: 'misc_01',
    conceptId: 'elec_03',
    conceptName: "Ohm's Law & V-I Characteristics",
    tag: 'incorrect_inverse_relationship',
    studentQuote: "Since resistance became double (8 ohms), the circuit has more resistance so it pulls more energy and current doubles to 6A.",
    evidence: "The student explicitly assumes current scales directly with resistance at a fixed source voltage (12V), reversing the fundamental inverse relationship I = V / R.",
    confidence: 0.94,
    correctExplanation: "By Ohm's Law (V = IR => I = V/R), at a constant supply voltage of 12V, current is strictly inversely proportional to resistance. Doubling resistance from 4 Ω to 8 Ω halves the current from 3 A to 1.5 A.",
    practiceRecommendation: "Review conceptual ratio analysis of I = V/R with variable rheostat experiments.",
    status: 'newly_detected',
    detectedAt: 'Yesterday, 4:15 PM',
    occurrences: 2
  },
  {
    id: 'misc_02',
    conceptId: 'elec_06',
    conceptName: 'Resistors in Parallel Combination',
    tag: 'additive_parallel_misconception',
    studentQuote: "For the two resistors 6 ohm and 12 ohm in parallel, I added them together: 6 + 12 = 18 ohms total resistance.",
    evidence: "The student applied the series addition formula Rs = R1 + R2 to a parallel configuration, failing to recognize that parallel branches create multiple current paths that reduce overall equivalent resistance.",
    confidence: 0.91,
    correctExplanation: "In parallel circuits, reciprocal resistances add up: 1/Rp = 1/R1 + 1/R2. For 6 Ω and 12 Ω, 1/Rp = 1/6 + 1/12 = 3/12 = 1/4, meaning Rp = 4 Ω (lower than either individual resistor).",
    practiceRecommendation: "Complete guided equivalent resistance calculations on parallel branch circuits.",
    status: 'practicing',
    detectedAt: 'Nov 18, 2026',
    occurrences: 1
  }
];

export const INITIAL_REVISION_TASKS: RevisionTask[] = [
  {
    id: 'rev_01',
    conceptId: 'elec_03',
    conceptName: "Ohm's Law & V-I Characteristics",
    chapterName: 'Electricity',
    dueDate: 'Today',
    status: 'today',
    reason: 'Active misconception detected in inverse current-resistance relationship',
    questionCount: 3,
    estimatedMinutes: 8,
    lastScore: 48
  },
  {
    id: 'rev_02',
    conceptId: 'elec_06',
    conceptName: 'Resistors in Parallel Combination',
    chapterName: 'Electricity',
    dueDate: 'Tomorrow',
    status: 'upcoming',
    reason: 'Spaced review to solidify reciprocal equivalent resistance formula',
    questionCount: 4,
    estimatedMinutes: 12,
    lastScore: 42
  },
  {
    id: 'rev_03',
    conceptId: 'elec_01',
    conceptName: 'Electric Charge and Current',
    chapterName: 'Electricity',
    dueDate: 'Overdue (by 2 days)',
    status: 'overdue',
    reason: 'Retention check to prevent foundational decay of charge flow concepts',
    questionCount: 2,
    estimatedMinutes: 5,
    lastScore: 86
  },
  {
    id: 'rev_04',
    conceptId: 'elec_05',
    conceptName: 'Resistors in Series Combination',
    chapterName: 'Electricity',
    dueDate: 'In 3 days',
    status: 'upcoming',
    reason: 'Scheduled reinforcement after mastering series voltage divider rules',
    questionCount: 3,
    estimatedMinutes: 10,
    lastScore: 71
  }
];

export const PROGRESS_HISTORY: StudentProgressMetric[] = [
  { date: 'Nov 15', overallMastery: 52, conceptsMastered: 1, studyMinutes: 35, questionsAnswered: 14 },
  { date: 'Nov 16', overallMastery: 55, conceptsMastered: 1, studyMinutes: 40, questionsAnswered: 18 },
  { date: 'Nov 17', overallMastery: 58, conceptsMastered: 1, studyMinutes: 25, questionsAnswered: 10 },
  { date: 'Nov 18', overallMastery: 60, conceptsMastered: 1, studyMinutes: 50, questionsAnswered: 22 },
  { date: 'Nov 19', overallMastery: 62, conceptsMastered: 2, studyMinutes: 45, questionsAnswered: 19 },
  { date: 'Nov 20', overallMastery: 61, conceptsMastered: 2, studyMinutes: 30, questionsAnswered: 12 },
  { date: 'Nov 21', overallMastery: 63, conceptsMastered: 2, studyMinutes: 42, questionsAnswered: 16 }
];

export const TEACHER_CLASSES: ClassRoom[] = [
  {
    id: 'cls_10a_science',
    name: 'Class 10-A',
    grade: 'Class 10',
    section: 'A',
    subject: 'Science (Physics)',
    curriculum: 'CBSE 2026-27',
    academicYear: '2026–2027',
    enrollmentCode: 'LL-CBSE10-A',
    studentCount: 32,
    averageMastery: 64
  },
  {
    id: 'cls_10b_science',
    name: 'Class 10-B',
    grade: 'Class 10',
    section: 'B',
    subject: 'Science (Physics)',
    curriculum: 'CBSE 2026-27',
    academicYear: '2026–2027',
    enrollmentCode: 'LL-CBSE10-B',
    studentCount: 28,
    averageMastery: 59
  }
];

export const CLASS_HEATMAP_DATA: StudentHeatmapRow[] = [
  {
    studentId: 'usr_student_alex',
    studentName: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    conceptMastery: {
      elec_01: 86,
      elec_02: 78,
      elec_03: 48, // Flagged
      elec_04: 62,
      elec_05: 71,
      elec_06: 42, // Flagged
      elec_07: 65,
      elec_08: 38  // Flagged
    },
    flaggedForAttention: true,
    lastActive: 'Today, 10:45 AM',
    primaryStruggleConcept: "Ohm's Law & V-I Characteristics"
  },
  {
    studentId: 'usr_student_priya',
    studentName: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
    conceptMastery: {
      elec_01: 92,
      elec_02: 85,
      elec_03: 75,
      elec_04: 80,
      elec_05: 84,
      elec_06: 44, // Flagged
      elec_07: 78,
      elec_08: 70
    },
    flaggedForAttention: true,
    lastActive: 'Today, 9:20 AM',
    primaryStruggleConcept: 'Resistors in Parallel Combination'
  },
  {
    studentId: 'usr_student_liam',
    studentName: 'Liam Davis',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80',
    conceptMastery: {
      elec_01: 72,
      elec_02: 68,
      elec_03: 58,
      elec_04: 55,
      elec_05: 64,
      elec_06: 48,
      elec_07: 38, // Flagged
      elec_08: 35  // Flagged
    },
    flaggedForAttention: true,
    lastActive: 'Yesterday',
    primaryStruggleConcept: "Heating Effect & Joule's Law"
  },
  {
    studentId: 'usr_student_rohan',
    studentName: 'Rohan Patel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    conceptMastery: {
      elec_01: 88,
      elec_02: 82,
      elec_03: 84,
      elec_04: 44, // Flagged
      elec_05: 78,
      elec_06: 72,
      elec_07: 80,
      elec_08: 65
    },
    flaggedForAttention: false,
    lastActive: 'Today, 11:15 AM',
    primaryStruggleConcept: 'Resistance Factors & Resistivity'
  },
  {
    studentId: 'usr_student_maya',
    studentName: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
    conceptMastery: {
      elec_01: 94,
      elec_02: 90,
      elec_03: 88,
      elec_04: 86,
      elec_05: 90,
      elec_06: 85,
      elec_07: 82,
      elec_08: 48  // Flagged
    },
    flaggedForAttention: false,
    lastActive: 'Today, 8:45 AM',
    primaryStruggleConcept: 'Electric Power & Commercial Energy Units'
  },
  {
    studentId: 'usr_student_marcus',
    studentName: 'Marcus Wright',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
    conceptMastery: {
      elec_01: 84,
      elec_02: 80,
      elec_03: 78,
      elec_04: 76,
      elec_05: 82,
      elec_06: 74,
      elec_07: 70,
      elec_08: 68
    },
    flaggedForAttention: false,
    lastActive: 'Nov 19',
    primaryStruggleConcept: undefined
  },
  {
    studentId: 'usr_student_ananya',
    studentName: 'Ananya Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80',
    conceptMastery: {
      elec_01: 90,
      elec_02: 86,
      elec_03: 52, // Flagged
      elec_04: 70,
      elec_05: 75,
      elec_06: 50,
      elec_07: 74,
      elec_08: 60
    },
    flaggedForAttention: true,
    lastActive: 'Today, 10:10 AM',
    primaryStruggleConcept: "Ohm's Law & V-I Characteristics"
  }
];

export const TEACHER_RECOMMENDATIONS_DATA: TeacherRecommendation[] = [
  {
    id: 'rec_01',
    title: 'High Prevalence of Inverse Relationship Misconception in Ohm\'s Law',
    conceptId: 'elec_03',
    conceptName: "Ohm's Law & V-I Characteristics",
    severity: 'high',
    affectedStudentCount: 14,
    totalStudents: 32,
    observation: "44% of Class 10-A students reasoned that increasing resistance from 4Ω to 8Ω increases circuit current at constant 12V. They are incorrectly linking resistance directly to electrical current output.",
    pedagogicalAction: "Demonstrate a live rheostat bench experiment showing ammeter needle deflection dropping as resistance slides upward. Follow up with the targeted remediation problem set.",
    status: 'pending'
  },
  {
    id: 'rec_02',
    title: 'Parallel Circuit Reciprocal Inversion Omission',
    conceptId: 'elec_06',
    conceptName: 'Resistors in Parallel Combination',
    severity: 'high',
    affectedStudentCount: 11,
    totalStudents: 32,
    observation: "34% of students correctly write 1/Rp = 1/6 + 1/12 = 3/12 = 1/4, but conclude that equivalent resistance is 0.25 Ω without completing the reciprocal step Rp = 4 Ω.",
    pedagogicalAction: "Emphasize unit checking and dimensional sanity tests: the parallel equivalent of two resistors must always be smaller than the smallest branch resistor (Rp < 6Ω), but 0.25Ω is an arithmetic inversion oversight.",
    status: 'pending'
  },
  {
    id: 'rec_03',
    title: 'Commercial Kilowatt-hour Tariff Calculations',
    conceptId: 'elec_08',
    conceptName: 'Electric Power & Commercial Energy Units',
    severity: 'medium',
    affectedStudentCount: 8,
    totalStudents: 32,
    observation: "25% of students struggle to convert appliance wattage (W) into kilowatts (kW) when computing monthly billing costs.",
    pedagogicalAction: "Assign practical domestic energy auditing worksheet where students compute their home appliance consumption using real electricity bills.",
    status: 'pending'
  }
];
