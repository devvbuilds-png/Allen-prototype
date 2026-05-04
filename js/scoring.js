function calculateScore() {
  const styleQIds = ['q1', 'q2', 'q3'];
  const styleTotals = { sprinter: 0, advanced: 0, intermediate: 0, foundation: 0 };
  let styleDepthSum = 0;

  styleQIds.forEach(qid => {
    const q = QUESTIONS.find(item => item.id === qid);
    const ans = state.answers[qid];
    const mode = ans !== undefined ? q.styleMap[ans] : 'intermediate';
    styleTotals[mode] += 1;
    styleDepthSum += ans !== undefined ? ans : 2;
  });

  const styleOrder = ['sprinter', 'advanced', 'intermediate', 'foundation'];
  const maxStyleVotes = Math.max(...Object.values(styleTotals));
  let suggestedMode;
  if (maxStyleVotes > 1) {
    suggestedMode = styleOrder.find(mode => styleTotals[mode] === maxStyleVotes);
  } else {
    const avgStyleDepth = styleDepthSum / styleQIds.length;
    suggestedMode =
      avgStyleDepth <= 0.5 ? 'sprinter' :
      avgStyleDepth <= 1.5 ? 'advanced' :
      avgStyleDepth <= 2.5 ? 'intermediate' :
      'foundation';
  }

  // If the basics check is weak, avoid pushing the student into a too-compressed mode.
  const diagnosticQIds = ['q4', 'q5', 'q6'];
  const correctDiagnostics = diagnosticQIds.filter(qid => {
    const q = QUESTIONS.find(item => item.id === qid);
    return state.answers[qid] === q.correct;
  }).length;

  if (correctDiagnostics <= 1 && suggestedMode === 'sprinter') suggestedMode = 'advanced';
  if (correctDiagnostics === 0 && suggestedMode === 'advanced') suggestedMode = 'intermediate';

  const modeProfiles = {
    sprinter: {
      persona: 'Sprinter',
      icon: '⚡',
      desc: 'You prefer fast, direct help. Allie will keep answers tight, formula-first, and focused on the result.',
      learningStyle: 'Fast'
    },
    advanced: {
      persona: 'Advanced',
      icon: '🎯',
      desc: 'You like efficient depth. Allie will start with the concept, then move into clean examples and application.',
      learningStyle: 'Efficient'
    },
    intermediate: {
      persona: 'Intermediate',
      icon: '📐',
      desc: 'You learn best when concepts are clear before solving. Allie will explain the idea, then build the steps.',
      learningStyle: 'Methodical'
    },
    foundation: {
      persona: 'Foundation',
      icon: '🌱',
      desc: 'You prefer everything built from the ground up. Allie will define terms, use simple steps, and avoid jumps.',
      learningStyle: 'Thorough'
    }
  };

  const profile = modeProfiles[suggestedMode];
  state.persona = profile.persona;
  state.currentMode = suggestedMode;
  state.suggestedMode = suggestedMode;
  state.personaIcon = profile.icon;
  state.personaDesc = profile.desc;
  state.learningStyle = profile.learningStyle;

  const confidenceScore = { Strong: 3, Good: 2, Building: 1, Weak: 0 };
  const confidenceMap = ['Strong', 'Good', 'Building', 'Weak'];
  const subjectConfig = {
    physics: { diagnostic: 'q4', confidence: 'q7' },
    maths: { diagnostic: 'q5', confidence: 'q8' },
    chemistry: { diagnostic: 'q6', confidence: 'q9' }
  };

  const subjectTotals = {};
  state.subjects = {};

  Object.entries(subjectConfig).forEach(([subject, config]) => {
    const diagnosticQuestion = QUESTIONS.find(item => item.id === config.diagnostic);
    const diagnosticCorrect = state.answers[config.diagnostic] === diagnosticQuestion.correct;
    const confidence = confidenceMap[state.answers[config.confidence]] || 'Good';
    const total = (diagnosticCorrect ? 2 : 0) + confidenceScore[confidence];

    subjectTotals[subject] = total;
    state.subjects[subject] =
      total >= 5 ? 'Strong' :
      total >= 4 ? 'Good' :
      total >= 2 ? 'Building' :
      'Weak';
  });

  const q10 = state.answers.q10;
  const prepMap = ['early', 'mid-11', 'mid-12', 'revision'];
  state.prepStage = q10 !== undefined ? prepMap[q10] : 'early';

  const subjectReadiness = Object.values(subjectTotals).reduce((sum, val) => sum + val, 0) / 15;
  const styleIndependence = 1 - (styleDepthSum / (styleQIds.length * 3));
  const prepReadiness = q10 !== undefined ? q10 / 3 : 0;

  const rawScore = Math.round(
    (subjectReadiness * 65) +
    (styleIndependence * 20) +
    (prepReadiness * 15)
  );
  state.score = Math.max(25, Math.min(100, rawScore));
}
