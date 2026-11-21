import { Concept, ConceptPrerequisite, Question } from '../types';

export interface CurriculumBoard {
  id: string;
  name: string;
  classes: string[];
  subjects: {
    name: string;
    chapters: {
      id: string;
      number: number;
      name: string;
      conceptCount: number;
    }[];
  }[];
}

export const VERIFIED_BOARDS: CurriculumBoard[] = [
  {
    id: 'CBSE',
    name: 'Central Board of Secondary Education (CBSE)',
    classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
    subjects: [
      {
        name: 'Science (Physics, Chemistry, Biology)',
        chapters: [
          { id: 'ch_electricity', number: 12, name: 'Electricity', conceptCount: 8 },
          { id: 'ch_magnetic', number: 13, name: 'Magnetic Effects of Electric Current', conceptCount: 6 },
          { id: 'ch_light', number: 10, name: 'Light — Reflection and Refraction', conceptCount: 7 },
          { id: 'ch_chemical_rxn', number: 1, name: 'Chemical Reactions and Equations', conceptCount: 5 },
          { id: 'ch_life_processes', number: 6, name: 'Life Processes', conceptCount: 6 },
        ]
      },
      {
        name: 'Mathematics',
        chapters: [
          { id: 'ch_real_num', number: 1, name: 'Real Numbers', conceptCount: 4 },
          { id: 'ch_polynomials', number: 2, name: 'Polynomials', conceptCount: 5 },
          { id: 'ch_quadratic', number: 4, name: 'Quadratic Equations', conceptCount: 6 },
        ]
      }
    ]
  },
  {
    id: 'ICSE',
    name: 'Indian Certificate of Secondary Education (ICSE)',
    classes: ['Class 9', 'Class 10'],
    subjects: [
      {
        name: 'Physics',
        chapters: [
          { id: 'ch_icse_current', number: 8, name: 'Current Electricity', conceptCount: 7 },
          { id: 'ch_icse_force', number: 1, name: 'Force, Work, Power & Energy', conceptCount: 5 },
        ]
      }
    ]
  },
  {
    id: 'STATE_BOARD',
    name: 'State Secondary Education Board',
    classes: ['Class 10'],
    subjects: [
      {
        name: 'Physical Science',
        chapters: [
          { id: 'ch_sb_elec', number: 9, name: 'Electric Current', conceptCount: 6 },
        ]
      }
    ]
  }
];

export const CONCEPTS_CBSE_ELECTRICITY: Concept[] = [
  {
    id: 'elec_01',
    code: 'PHY-10-EL-01',
    name: 'Electric Charge and Current',
    chapterId: 'ch_electricity',
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    description: 'Definition of electric charge (Q), rate of flow of charge (I = Q/t), Ampere unit, and direction of conventional current vs electronic drift.',
    learningObjectives: [
      'Define electric current as the net rate of flow of charge across a cross-section.',
      'Calculate current using I = Q/t and understand SI units (Coulombs, Amperes).',
      'Distinguish between conventional current direction and electron drift direction.'
    ],
    prerequisites: [],
    difficultyLevel: 'Foundational',
    sourceReference: 'NCERT Class 10 Science, Chapter 12, Section 12.1'
  },
  {
    id: 'elec_02',
    code: 'PHY-10-EL-02',
    name: 'Electric Potential & Potential Difference',
    chapterId: 'ch_electricity',
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    description: 'Work done in moving a unit positive charge (V = W/Q), Volt definition, voltmeter connection in parallel, and role of chemical cells.',
    learningObjectives: [
      'Understand electrical potential difference as work done per unit positive charge (V = W/Q).',
      'Explain why a battery maintains a potential difference across a closed circuit.',
      'Identify proper instrument connections (voltmeter in parallel, high resistance).'
    ],
    prerequisites: ['elec_01'],
    difficultyLevel: 'Foundational',
    sourceReference: 'NCERT Class 10 Science, Chapter 12, Section 12.2'
  },
  {
    id: 'elec_03',
    code: 'PHY-10-EL-03',
    name: "Ohm's Law & V-I Characteristics",
    chapterId: 'ch_electricity',
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    description: "Mathematical statement V = IR at constant temperature, linear V-I relationship for ohmic conductors, and physical concept of resistance.",
    learningObjectives: [
      "State Ohm's Law and explain the condition of constant temperature.",
      'Interpret V-I graphs and calculate resistance from the slope (R = V/I).',
      'Understand the inverse relationship between current and resistance at constant voltage.'
    ],
    prerequisites: ['elec_01', 'elec_02'],
    difficultyLevel: 'Intermediate',
    sourceReference: 'NCERT Class 10 Science, Chapter 12, Section 12.3'
  },
  {
    id: 'elec_04',
    code: 'PHY-10-EL-04',
    name: 'Resistance Factors & Resistivity',
    chapterId: 'ch_electricity',
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    description: 'Dependence of resistance on conductor length, cross-sectional area, material resistivity (rho), and temperature (R = rho * L / A).',
    learningObjectives: [
      'State how resistance varies directly with length and inversely with area of cross-section.',
      'Define electrical resistivity (rho) as an intrinsic material property with unit Ohm-metre.',
      'Explain why heating elements (nichrome) use alloys rather than pure metals.'
    ],
    prerequisites: ['elec_03'],
    difficultyLevel: 'Intermediate',
    sourceReference: 'NCERT Class 10 Science, Chapter 12, Section 12.4'
  },
  {
    id: 'elec_05',
    code: 'PHY-10-EL-05',
    name: 'Resistors in Series Combination',
    chapterId: 'ch_electricity',
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    description: 'Equivalent resistance of series circuit (Rs = R1 + R2 + ...), constant current throughout, and additive potential differences.',
    learningObjectives: [
      'Derive equivalent resistance for series circuits (Rs = R1 + R2 + ...).',
      'Recognize that current is identical in every series component.',
      'Explain drawbacks of series circuits in domestic wiring.'
    ],
    prerequisites: ['elec_03', 'elec_04'],
    difficultyLevel: 'Intermediate',
    sourceReference: 'NCERT Class 10 Science, Chapter 12, Section 12.5.1'
  },
  {
    id: 'elec_06',
    code: 'PHY-10-EL-06',
    name: 'Resistors in Parallel Combination',
    chapterId: 'ch_electricity',
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    description: 'Equivalent resistance in parallel (1/Rp = 1/R1 + 1/R2 + ...), identical voltage across branches, total current division, and advantages in domestic wiring.',
    learningObjectives: [
      'Derive equivalent resistance for parallel circuits (1/Rp = 1/R1 + 1/R2 + ...).',
      'Explain why effective resistance decreases below the lowest individual resistance.',
      'Analyze why household appliances are wired in parallel.'
    ],
    prerequisites: ['elec_03', 'elec_04'],
    difficultyLevel: 'Advanced',
    sourceReference: 'NCERT Class 10 Science, Chapter 12, Section 12.5.2'
  },
  {
    id: 'elec_07',
    code: 'PHY-10-EL-07',
    name: "Heating Effect & Joule's Law",
    chapterId: 'ch_electricity',
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    description: "Conversion of electrical energy into thermal dissipation (H = I^2 R t), factors governing heat generated, and practical safety devices (fuses).",
    learningObjectives: [
      "State Joule's Law of heating and write formula H = I^2 R t.",
      'Differentiate between high-resistance heating elements and low-resistance connecting leads.',
      'Explain the working principle and rating of an electric fuse.'
    ],
    prerequisites: ['elec_03', 'elec_05'],
    difficultyLevel: 'Intermediate',
    sourceReference: 'NCERT Class 10 Science, Chapter 12, Section 12.6'
  },
  {
    id: 'elec_08',
    code: 'PHY-10-EL-08',
    name: 'Electric Power & Commercial Energy Units',
    chapterId: 'ch_electricity',
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    description: 'Rate of electrical work consumption (P = VI = I^2 R = V^2/R), Watt and Kilowatt units, and commercial kilowatt-hour (1 kWh = 3.6 x 10^6 J).',
    learningObjectives: [
      'Calculate power using P = VI, P = I^2 R, and P = V^2 / R depending on constant V or I.',
      'Convert between Joules and kilowatt-hours (kWh).',
      'Calculate domestic electricity consumption and utility billing.'
    ],
    prerequisites: ['elec_07'],
    difficultyLevel: 'Advanced',
    sourceReference: 'NCERT Class 10 Science, Chapter 12, Section 12.7'
  }
];

export const CONCEPT_EDGES: ConceptPrerequisite[] = [
  { sourceId: 'elec_01', targetId: 'elec_02', type: 'hard_prerequisite' },
  { sourceId: 'elec_01', targetId: 'elec_03', type: 'hard_prerequisite' },
  { sourceId: 'elec_02', targetId: 'elec_03', type: 'hard_prerequisite' },
  { sourceId: 'elec_03', targetId: 'elec_04', type: 'hard_prerequisite' },
  { sourceId: 'elec_03', targetId: 'elec_05', type: 'hard_prerequisite' },
  { sourceId: 'elec_04', targetId: 'elec_05', type: 'hard_prerequisite' },
  { sourceId: 'elec_03', targetId: 'elec_06', type: 'hard_prerequisite' },
  { sourceId: 'elec_04', targetId: 'elec_06', type: 'hard_prerequisite' },
  { sourceId: 'elec_03', targetId: 'elec_07', type: 'hard_prerequisite' },
  { sourceId: 'elec_05', targetId: 'elec_07', type: 'hard_prerequisite' },
  { sourceId: 'elec_07', targetId: 'elec_08', type: 'hard_prerequisite' }
];

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q_ohms_law_alex',
    conceptId: 'elec_03',
    conceptName: "Ohm's Law & V-I Characteristics",
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    difficulty: 'Intermediate',
    type: 'conceptual_reasoning',
    questionText: 'A variable resistor is connected across a 12V DC battery with negligible internal resistance. If the resistance of the resistor is doubled from 4 Ω to 8 Ω, what happens to the current flowing through the circuit? State the new current and explain the physical reasoning.',
    diagramSvg: `<svg viewBox="0 0 320 160" class="w-full max-w-sm mx-auto my-2"><rect x="20" y="20" width="280" height="120" rx="8" fill="#F7F8FC" stroke="#CBD2E1" stroke-dasharray="4 4"/><circle cx="50" cy="80" r="14" fill="#6658D3" fill-opacity="0.1" stroke="#6658D3" stroke-width="2"/><text x="44" y="85" font-size="12" font-weight="bold" fill="#6658D3">12V</text><path d="M 64 80 L 130 80 L 140 70 L 150 90 L 160 70 L 170 90 L 180 80 L 250 80" fill="none" stroke="#17213D" stroke-width="2.5"/><text x="145" y="60" font-size="12" font-weight="600" fill="#17213D">R = 4Ω → 8Ω</text><path d="M 250 80 L 270 80 L 270 120 L 50 120 L 50 94" fill="none" stroke="#17213D" stroke-width="2"/><circle cx="210" cy="80" r="10" fill="#159B85" fill-opacity="0.1" stroke="#159B85" stroke-width="2"/><text x="206" y="84" font-size="10" font-weight="bold" fill="#159B85">A</text></svg>`,
    correctAnswer: 'The current halves from 3 A to 1.5 A.',
    rubric: {
      keyCriteria: [
        "Recall Ohm's Law: I = V / R.",
        "Recognize voltage is constant at 12V.",
        "Deduce that current is inversely proportional to resistance.",
        "Calculate initial current I1 = 12/4 = 3A, and new current I2 = 12/8 = 1.5A."
      ],
      commonMisconceptions: [
        {
          id: 'incorrect_inverse_relationship',
          triggerReasoning: 'more resistance makes it stronger or current increases or direct proportionality',
          misconceptionName: 'Direct Proportionality Assumption (Current vs Resistance)',
          explanation: 'The student mistakenly believes that higher resistance somehow draws more current or confuses V = IR with I proportional to R.'
        },
        {
          id: 'voltage_drop_confusion',
          triggerReasoning: 'battery voltage drops to 6V',
          misconceptionName: 'Battery Potential Fluctuation Misconception',
          explanation: 'The student assumes that changing circuit resistance alters the terminal electromotive force of an ideal voltage source.'
        }
      ]
    },
    standardExplanation: "According to Ohm's Law, V = IR, which gives I = V/R. When the voltage V is held constant by the 12V battery, current I is inversely proportional to resistance R. Initially at R = 4 Ω, I = 12/4 = 3 A. When resistance doubles to 8 Ω, the current is halved: I = 12/8 = 1.5 A."
  },
  {
    id: 'q_parallel_resistors',
    conceptId: 'elec_06',
    conceptName: 'Resistors in Parallel Combination',
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    difficulty: 'Advanced',
    type: 'numerical',
    questionText: 'Two resistors of 6 Ω and 12 Ω are connected in parallel across a 6V power supply. Calculate: (a) the equivalent resistance of the combination, and (b) the total current drawn from the battery. Show your working.',
    correctAnswer: 'Equivalent resistance = 4 Ω; Total current = 1.5 A',
    rubric: {
      keyCriteria: [
        'Apply formula 1/Rp = 1/R1 + 1/R2 = 1/6 + 1/12 = 3/12 = 1/4.',
        'Invert to find Rp = 4 Ω.',
        'Apply I_total = V / Rp = 6V / 4Ω = 1.5 A.'
      ],
      commonMisconceptions: [
        {
          id: 'additive_parallel_misconception',
          triggerReasoning: 'adds 6 and 12 to get 18 ohms',
          misconceptionName: 'Series Addition Applied to Parallel Network',
          explanation: 'Student added resistance values directly (6 + 12 = 18 Ω) instead of reciprocal harmonic addition.'
        },
        {
          id: 'forgot_to_invert_reciprocal',
          triggerReasoning: 'equivalent resistance is 1/4 or 0.25 ohms',
          misconceptionName: 'Reciprocal Inversion Omission',
          explanation: 'Student calculated 1/Rp = 1/4 but forgot to invert to solve for Rp = 4 Ω.'
        }
      ]
    },
    standardExplanation: 'In a parallel circuit, 1/Rp = 1/R1 + 1/R2 = 1/6 + 1/12 = (2 + 1)/12 = 3/12 = 1/4. Therefore Rp = 4 Ω. Total current I = V / Rp = 6V / 4Ω = 1.5 A.'
  },
  {
    id: 'q_joule_heating',
    conceptId: 'elec_07',
    conceptName: "Heating Effect & Joule's Law",
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    difficulty: 'Intermediate',
    type: 'conceptual_reasoning',
    questionText: 'An electric iron of resistance 20 Ω takes a current of 5 A. Calculate the heat developed in 30 seconds, and explain why the cord connecting the iron does not glow while the heating element becomes red hot.',
    correctAnswer: 'Heat developed = 15,000 J (15 kJ). Connecting cord has negligible resistance compared to the element.',
    rubric: {
      keyCriteria: [
        "Apply Joule's Law: H = I^2 * R * t.",
        "Calculate H = (5)^2 * 20 * 30 = 25 * 20 * 30 = 15,000 J.",
        "Explain that the same current flows through both cord (copper, very low R) and element (nichrome, very high R); since H ∝ R for series current, heat in the cord is negligible."
      ],
      commonMisconceptions: [
        {
          id: 'current_loss_fallacy',
          triggerReasoning: 'current is consumed or reduced as it goes through the cord',
          misconceptionName: 'Current Consumption Misconception',
          explanation: 'Student imagines current gets "used up" before reaching the element, violating conservation of charge.'
        }
      ]
    },
    standardExplanation: "Using Joule's Law: H = I^2 R t = 5^2 * 20 * 30 = 25 * 600 = 15,000 Joules. Both the cord and heating element are in series and carry the identical 5A current. However, copper cord has very low resistance (near 0.01 Ω), producing minuscule heat, whereas the nichrome heating element has high resistance (20 Ω), dissipating sufficient energy to glow red hot."
  },
  {
    id: 'q_factors_resistance',
    conceptId: 'elec_04',
    conceptName: 'Resistance Factors & Resistivity',
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    difficulty: 'Intermediate',
    type: 'multiple_choice',
    questionText: 'A cylindrical copper wire of length L and cross-sectional area A has resistance R. If the wire is drawn out and stretched uniformly so that its length becomes 2L without changing its density, what is its new resistance?',
    options: [
      { id: 'opt_a', text: '2R' },
      { id: 'opt_b', text: '4R' },
      { id: 'opt_c', text: 'R / 2' },
      { id: 'opt_d', text: 'R (unchanged)' }
    ],
    correctAnswer: 'opt_b',
    rubric: {
      keyCriteria: [
        'Recognize that volume V = A * L remains constant during stretching.',
        'When length becomes 2L, cross-sectional area must halve to A/2.',
        'Apply R = rho * (new L) / (new A) = rho * (2L) / (A/2) = 4 * (rho * L / A) = 4R.'
      ],
      commonMisconceptions: [
        {
          id: 'neglecting_area_reduction',
          triggerReasoning: 'chose 2R because length is doubled',
          misconceptionName: 'Constant Area Fallacy in Material Stretching',
          explanation: 'Student assumed cross-sectional area stays constant when a wire is stretched, neglecting volume conservation.'
        }
      ]
    },
    standardExplanation: 'When a wire is stretched uniformly to twice its original length (L_new = 2L), its volume V = A * L remains constant. Hence, A_new = A / 2. Since R = ρ * L / A, R_new = ρ * (2L) / (A/2) = 4 * (ρ * L / A) = 4R. Correct answer is 4R.'
  },
  {
    id: 'q_electric_power',
    conceptId: 'elec_08',
    conceptName: 'Electric Power & Commercial Energy Units',
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    difficulty: 'Advanced',
    type: 'numerical',
    questionText: 'An electric refrigerator rated 400 W operates 8 hours/day and a television rated 100 W operates 6 hours/day. Calculate the total cost of electricity to operate them for 30 days if the utility tariff is ₹5.00 per kWh.',
    correctAnswer: 'Total energy = 114 kWh; Total cost = ₹570.00',
    rubric: {
      keyCriteria: [
        'Calculate refrigerator energy: 400 W * 8 h = 3200 Wh/day = 3.2 kWh/day.',
        'Calculate TV energy: 100 W * 6 h = 600 Wh/day = 0.6 kWh/day.',
        'Daily total = 3.8 kWh. For 30 days = 3.8 * 30 = 114 kWh.',
        'Cost = 114 kWh * ₹5.00 = ₹570.'
      ],
      commonMisconceptions: [
        {
          id: 'watt_kwh_conversion_error',
          triggerReasoning: 'forgot to divide watts by 1000',
          misconceptionName: 'Metric Prefix Energy Unit Confusion',
          explanation: 'Student multiplied Watts directly by hours without converting to Kilowatt-hours (kWh).'
        }
      ]
    },
    standardExplanation: 'Daily energy consumption = (400W * 8h + 100W * 6h) = 3200 Wh + 600 Wh = 3800 Wh = 3.8 kWh/day. For 30 days = 3.8 * 30 = 114 kWh. Total cost = 114 * ₹5 = ₹570.00.'
  }
];
