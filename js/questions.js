const QUESTIONS = [
  {
    id: 'q1', subject: 'Learning Style', type: 'style',
    text: 'When you\'re solving a problem and get stuck, your first instinct is to:',
    options: [
      'Look at the full solution and understand the approach',
      'Look at just the next step, then try again',
      'Go back and re-read the concept',
      'Ask someone to explain it from scratch'
    ],
    styleMap: ['sprinter', 'advanced', 'intermediate', 'foundation']
  },
  {
    id: 'q2', subject: 'Learning Style', type: 'style',
    text: 'You just learned a new formula. To feel confident using it, you need to:',
    options: [
      'See it once and start applying immediately',
      'See 1–2 solved examples then I\'m good',
      'Practice 3–4 questions before it clicks',
      'Understand where the formula comes from first, then practice'
    ],
    styleMap: ['sprinter', 'advanced', 'intermediate', 'foundation']
  },
  {
    id: 'q3', subject: 'Learning Style', type: 'style',
    text: 'How do you typically study a new chapter-',
    options: [
      'Jump straight to questions, refer to theory only when stuck',
      'Quick theory read, then straight to questions',
      'Full theory first, then solved examples, then questions',
      'Detailed notes, multiple reads, then slowly move to practice'
    ],
    styleMap: ['sprinter', 'advanced', 'intermediate', 'foundation']
  },
  {
    id: 'q4', subject: 'Learning Style', type: 'style',
    text: 'When an explanation doesn\'t click the first time, you\'d want it to:',
    options: [
      'Be rephrased more concisely — I just need the key idea',
      'Use a different example',
      'Be broken into smaller steps',
      'Start over from the absolute basics'
    ],
    styleMap: ['sprinter', 'advanced', 'intermediate', 'foundation']
  },
  {
    id: 'q5', subject: 'Physics', type: 'confidence',
    text: 'How confident are you in Physics right now-',
    options: [
      'Strong — can solve most JEE-level problems',
      'Good — comfortable with most concepts, some gaps',
      'Building — understand concepts but struggle with application',
      'Weak — need to revisit fundamentals'
    ],
    confidenceMap: ['Strong', 'Good', 'Building', 'Weak']
  },
  {
    id: 'q6', subject: 'Mathematics', type: 'confidence',
    text: 'How confident are you in Mathematics right now-',
    options: [
      'Strong — can solve most JEE-level problems',
      'Good — comfortable with most concepts, some gaps',
      'Building — understand concepts but struggle with application',
      'Weak — need to revisit fundamentals'
    ],
    confidenceMap: ['Strong', 'Good', 'Building', 'Weak']
  },
  {
    id: 'q7', subject: 'Chemistry', type: 'confidence',
    text: 'How confident are you in Chemistry right now-',
    options: [
      'Strong — can solve most JEE-level problems',
      'Good — comfortable with most concepts, some gaps',
      'Building — understand concepts but struggle with application',
      'Weak — need to revisit fundamentals'
    ],
    confidenceMap: ['Strong', 'Good', 'Building', 'Weak']
  },
  {
    id: 'q8', subject: 'Prep Stage', type: 'context',
    text: 'Where are you in your JEE preparation-',
    options: [
      'Just starting out',
      'Covered most of Class 11 syllabus',
      'Covered Class 11 + 12, working on revision',
      'Deep revision — solving mock tests'
    ],
    prepMap: ['early', 'mid-11', 'mid-12', 'revision']
  }
];
