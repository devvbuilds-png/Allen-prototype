// ── Info screen ────────────────────────────────────────────────────────────

let selectedClass = '';
let selectedTargets = [];

function selectClass(el, val) {
  document.querySelectorAll('.class-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedClass = val;
}

function toggleTarget(el) {
  el.classList.toggle('selected');
  selectedTargets = Array.from(document.querySelectorAll('.target-chip.selected')).map(c => c.textContent);
}

function goToQuiz() {
  const name = document.getElementById('input-name').value.trim();
  if (!name) { document.getElementById('input-name').focus(); return; }

  state.name = name;
  state.class = selectedClass || '12';
  state.target = selectedTargets.join(', ') || 'JEE Advanced';
  state.year = document.getElementById('input-year').value || '2026';

  document.getElementById('welcome-name').textContent = name.split(' ')[0];
  showScreen('screen-quiz');
}

function backToInfo() {
  if (document.getElementById('quiz-questions').style.display !== 'none') {
    showWelcome();
  } else if (document.getElementById('quiz-score').style.display !== 'none') {
    // stay on score screen
  } else {
    showScreen('screen-info');
  }
}

// ── Quiz flow ──────────────────────────────────────────────────────────────

function startQuiz() {
  state.currentQuestion = 0;
  state.answers = {};
  document.getElementById('quiz-welcome').style.display = 'none';
  document.getElementById('quiz-questions').style.display = 'block';
  document.getElementById('quiz-nav').style.display = 'flex';
  document.getElementById('quiz-progress-bar').style.display = 'block';
  renderQuestion();
}

function selectOption(idx) {
  const q = QUESTIONS[state.currentQuestion];
  state.answers[q.id] = idx;

  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.classList.remove('selected');
    if (i === idx) btn.classList.add('selected');
  });
}

function prevQuestion() {
  if (state.currentQuestion > 0) {
    state.currentQuestion--;
    renderQuestion();
  }
}

function nextQuestion() {
  const q = QUESTIONS[state.currentQuestion];
  if (state.answers[q.id] === undefined) {
    const questionCard = document.querySelector('.question-card');
    if (questionCard) {
      questionCard.classList.remove('shake-warning');
      void questionCard.offsetWidth;
      questionCard.classList.add('shake-warning');
    }
    return;
  }

  if (state.currentQuestion < QUESTIONS.length - 1) {
    state.currentQuestion++;
    renderQuestion();
  } else {
    calculateScore();
    showScore();
  }
}

// ── App entry ──────────────────────────────────────────────────────────────

function enterApp() {
  updateHomeWithProfile();
  showScreen('screen-home');
}

// ── Modal overlay close on backdrop click ──────────────────────────────────

document.getElementById('modes-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModesModal();
});

document.getElementById('mode-select-modal').addEventListener('click', function(e) {
  if (e.target === this) document.getElementById('mode-select-modal').classList.add('hidden');
});
