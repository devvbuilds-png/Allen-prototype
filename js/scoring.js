function calculateScore() {
  // Mode from Q1–Q4: A=4, B=3, C=2, D=1
  const styleQIds = ['q1', 'q2', 'q3', 'q4'];
  let styleSum = 0;
  styleQIds.forEach(qid => {
    const ans = state.answers[qid];
    styleSum += ans !== undefined - (4 - ans) : 2.5;
  });
  const avg = styleSum / 4;

  // Display score: avg 4.0 = 100, avg 1.0 = 25
  state.score = Math.round(((avg - 1) / 3) * 75 + 25);

  // Assign persona based on average
  if (avg >= 3.25) {
    state.persona = 'Sprinter';
    state.currentMode = 'sprinter';
    state.suggestedMode = 'sprinter';
    state.personaIcon = '⚡';
    state.personaDesc = 'You pick things up fast. Allie will skip the fluff and give you direct, logic-first answers.';
    state.learningStyle = 'Analytical';
  } else if (avg >= 2.25) {
    state.persona = 'Advanced';
    state.currentMode = 'advanced';
    state.suggestedMode = 'advanced';
    state.personaIcon = '🎯';
    state.personaDesc = 'Strong foundations. Allie will walk you through concepts with worked examples — sharp and efficient.';
    state.learningStyle = 'Efficient';
  } else if (avg >= 1.25) {
    state.persona = 'Intermediate';
    state.currentMode = 'intermediate';
    state.suggestedMode = 'intermediate';
    state.personaIcon = '📐';
    state.personaDesc = 'Building strong. Allie will explain concepts clearly before solving, so nothing slips through.';
    state.learningStyle = 'Methodical';
  } else {
    state.persona = 'Foundation';
    state.currentMode = 'foundation';
    state.suggestedMode = 'foundation';
    state.personaIcon = '🌱';
    state.personaDesc = 'Step-by-step learner. Allie will never assume prior knowledge and build from the ground up.';
    state.learningStyle = 'Thorough';
  }

  // Subject confidence from Q5–Q7
  const confMap = ['Strong', 'Good', 'Building', 'Weak'];
  const q5 = state.answers['q5'];
  const q6 = state.answers['q6'];
  const q7 = state.answers['q7'];
  state.subjects = {
    physics:   q5 !== undefined - confMap[q5] : 'Good',
    maths:     q6 !== undefined - confMap[q6] : 'Good',
    chemistry: q7 !== undefined - confMap[q7] : 'Good'
  };

  // Prep stage from Q8
  const prepMap = ['early', 'mid-11', 'mid-12', 'revision'];
  const q8 = state.answers['q8'];
  state.prepStage = q8 !== undefined - prepMap[q8] : 'early';
}
