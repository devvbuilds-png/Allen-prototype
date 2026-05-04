const QUESTIONS = [
  {
    id: 'q1', subject: 'Learning Style', type: 'style',
    text: 'When a doubt is explained to you, what helps you most?',
    options: [
      'Direct answer with the key formula and final logic',
      'Short concept first, then a clean example',
      'Step-by-step explanation with why each step happens',
      'Start from basics before using formulas'
    ],
    styleMap: ['sprinter', 'advanced', 'intermediate', 'foundation']
  },
  {
    id: 'q2', subject: 'Learning Style', type: 'style',
    text: 'If a new formula appears in class, you prefer to:',
    options: [
      'Use it in questions immediately',
      'See one example, then apply it',
      'Understand the meaning of each term first',
      'Understand where it comes from before applying it'
    ],
    styleMap: ['sprinter', 'advanced', 'intermediate', 'foundation']
  },
  {
    id: 'q3', subject: 'Learning Style', type: 'style',
    text: 'When an answer does not click, the explanation should:',
    options: [
      'Make it shorter and show only the key idea',
      'Use a different example',
      'Break the same idea into smaller steps',
      'Restart from the basic definition'
    ],
    styleMap: ['sprinter', 'advanced', 'intermediate', 'foundation']
  },
  {
    id: 'q4', subject: 'Physics', type: 'diagnostic',
    text: 'Basic Physics check: why does the value of g decrease as height above Earth increases?',
    options: [
      'Because distance from Earth\'s centre increases, so gravitational pull weakens',
      'Because the object\'s mass decreases with height',
      'Because Earth\'s mass decreases with height',
      'Because air pressure directly controls gravity'
    ],
    correct: 0,
    diagnosticSubject: 'physics'
  },
  {
    id: 'q5', subject: 'Mathematics', type: 'diagnostic',
    text: 'Basic Maths check: what does it mean if a function is one-one?',
    options: [
      'Different inputs always give different outputs',
      'Every input gives output 1',
      'The graph must be a straight line',
      'The function is always increasing'
    ],
    correct: 0,
    diagnosticSubject: 'maths'
  },
  {
    id: 'q6', subject: 'Chemistry', type: 'diagnostic',
    text: 'Basic Chemistry check: why does atomic radius generally decrease across a period?',
    options: [
      'Nuclear charge increases while electrons enter the same shell',
      'The number of shells increases across a period',
      'Atoms lose all valence electrons across a period',
      'Neutrons pull electrons closer than protons do'
    ],
    correct: 0,
    diagnosticSubject: 'chemistry'
  },
  {
    id: 'q7', subject: 'Physics', type: 'confidence',
    text: 'How confident are you in Physics right now?',
    options: [
      'Strong: I can handle most JEE-level questions',
      'Good: concepts are mostly clear, with some gaps',
      'Building: concepts make sense but application is hard',
      'Weak: I need to rebuild fundamentals'
    ],
    confidenceMap: ['Strong', 'Good', 'Building', 'Weak']
  },
  {
    id: 'q8', subject: 'Mathematics', type: 'confidence',
    text: 'How confident are you in Mathematics right now?',
    options: [
      'Strong: I can handle most JEE-level questions',
      'Good: concepts are mostly clear, with some gaps',
      'Building: concepts make sense but application is hard',
      'Weak: I need to rebuild fundamentals'
    ],
    confidenceMap: ['Strong', 'Good', 'Building', 'Weak']
  },
  {
    id: 'q9', subject: 'Chemistry', type: 'confidence',
    text: 'How confident are you in Chemistry right now?',
    options: [
      'Strong: I can handle most JEE-level questions',
      'Good: concepts are mostly clear, with some gaps',
      'Building: concepts make sense but application is hard',
      'Weak: I need to rebuild fundamentals'
    ],
    confidenceMap: ['Strong', 'Good', 'Building', 'Weak']
  },
  {
    id: 'q10', subject: 'Prep Stage', type: 'context',
    text: 'Where are you in your JEE preparation?',
    options: [
      'Just starting out',
      'Covered most of Class 11 syllabus',
      'Covered Class 11 + 12, now revising',
      'Mock test and deep revision phase'
    ],
    prepMap: ['early', 'mid-11', 'mid-12', 'revision']
  }
];
