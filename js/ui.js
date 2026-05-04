// ── Screen navigation ──────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function switchTab(tab) {
  state.currentTab = tab;

  if (tab === 'home') {
    showScreen('screen-home');
  } else if (tab === 'doubts') {
    showScreen('screen-doubts');
    document.getElementById('screen-doubts').classList.toggle('chat-active', state.chatMessages.length > 0);
    updateModeUI();
    if (!state.hasSeenModesModal) {
      state.hasSeenModesModal = true;
      setTimeout(() => showModesModal(), 350);
    }
  }
}

function updateNavActive(screenId, activeIdx) {
  const nav = document.querySelector(`#${screenId} .bottom-nav`);
  if (!nav) return;
  nav.querySelectorAll('.nav-item').forEach((item, i) => {
    item.classList.toggle('active', i === activeIdx);
  });
}

// ── Quiz sub-screens ───────────────────────────────────────────────────────

function showWelcome() {
  document.getElementById('quiz-welcome').style.display = 'flex';
  document.getElementById('quiz-questions').style.display = 'none';
  document.getElementById('quiz-score').style.display = 'none';
  document.getElementById('quiz-nav').style.display = 'none';
  document.getElementById('quiz-progress-bar').style.display = 'none';
  document.getElementById('quiz-step-badge').textContent = "Let's build your profile";
}

function renderQuestion() {
  const q = QUESTIONS[state.currentQuestion];
  const n = state.currentQuestion + 1;
  const total = QUESTIONS.length;
  const subjectBadge = q.subject === 'Physics'
    ? 'PHY'
    : (q.subject === 'Maths' || q.subject === 'Mathematics')
      ? 'MATH'
      : q.subject === 'Chemistry'
        ? 'CHEM'
        : q.subject === 'Prep Stage'
          ? 'PREP'
          : 'MODE';

  document.getElementById('quiz-step-badge').textContent = `${n} of ${total}`;
  document.getElementById('quiz-progress-fill').style.width = `${(n / total) * 100}%`;
  document.getElementById('quiz-prev-btn').style.opacity = n === 1 ? '0.4' : '1';
  document.getElementById('quiz-next-btn').textContent = n === total ? 'See my results ->' : 'Next ->';

  const container = document.getElementById('quiz-questions');
  const answered = state.answers[q.id];

  container.innerHTML = `
    <div class="question-card slide-in-right">
      <div class="q-subject-tag">
        ${subjectBadge} ${q.subject}
      </div>
      <div class="q-number">Question ${n}</div>
      <div class="q-text">${q.text}</div>
      <div class="options-list">
        ${q.options.map((opt, i) => `
          <button class="option-btn ${answered === i ? 'selected' : ''}" onclick="selectOption(${i})">
            <span class="option-label">${String.fromCharCode(65 + i)}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function showScore() {
  document.getElementById('quiz-questions').style.display = 'none';
  document.getElementById('quiz-nav').style.display = 'none';
  document.getElementById('quiz-progress-bar').style.display = 'none';
  document.getElementById('quiz-step-badge').textContent = 'Your Profile';

  const scoreEl = document.getElementById('quiz-score');
  scoreEl.style.display = 'flex';
  scoreEl.style.flexDirection = 'column';
  scoreEl.style.alignItems = 'center';
  scoreEl.style.gap = '16px';
  scoreEl.style.overflowY = 'auto';
  scoreEl.style.padding = '20px';
  scoreEl.style.flex = '1';

  const confColor = (level) =>
    level === 'Strong' ? 'var(--allen-green)' :
    level === 'Good'   ? 'var(--allen-blue)'  :
    level === 'Building' ? '#B45309' : '#EF4444';

  scoreEl.innerHTML = `
    <div class="score-screen-top">
      <div class="score-heading">
        <div class="score-heading-title">Profile built!</div>
        <div class="score-heading-sub">Your mode is ready to go.</div>
      </div>

      <div class="score-circle-wrap score-circle-wrap-compact">
        <div class="score-circle-bg score-circle-bg-compact">
          <div class="score-number">${state.score}</div>
          <div class="score-label">/ 100</div>
        </div>
        <svg style="position:absolute;inset:-4px;width:124px;height:124px;transform:rotate(-90deg);" viewBox="0 0 124 124">
          <circle cx="62" cy="62" r="58" fill="none" stroke="#E5E7EB" stroke-width="6"/>
          <circle cx="62" cy="62" r="58" fill="none" stroke="var(--allen-blue)" stroke-width="6"
            stroke-dasharray="${Math.round(2 * Math.PI * 58)}"
            stroke-dashoffset="${Math.round(2 * Math.PI * 58 * (1 - state.score / 100))}"
            stroke-linecap="round" style="transition: stroke-dashoffset 1.2s ease-out;"/>
        </svg>
      </div>
    </div>

    <div class="persona-card persona-card-compact">
      <div class="persona-badge">${state.personaIcon} ${state.persona} Mode</div>
      <div class="persona-desc">${state.personaDesc}</div>
      <button class="btn-primary score-enter-btn" onclick="enterApp()">
        Enter ALLEN →
      </button>
    </div>

    <div class="score-breakdown score-breakdown-compact" style="width:100%">
      <div class="breakdown-title">Score Breakdown</div>
      <div class="breakdown-row">
        <span class="breakdown-left">Overall Score</span>
        <span class="breakdown-right" style="color:var(--allen-blue)">${state.score}/100</span>
      </div>
      <div class="breakdown-row">
        <span class="breakdown-left">Physics</span>
        <span class="breakdown-right" style="color:${confColor(state.subjects.physics)}">${state.subjects.physics}</span>
      </div>
      <div class="breakdown-row">
        <span class="breakdown-left">Maths</span>
        <span class="breakdown-right" style="color:${confColor(state.subjects.maths)}">${state.subjects.maths}</span>
      </div>
      <div class="breakdown-row">
        <span class="breakdown-left">Chemistry</span>
        <span class="breakdown-right" style="color:${confColor(state.subjects.chemistry)}">${state.subjects.chemistry}</span>
      </div>
      <div class="breakdown-row">
        <span class="breakdown-left">Assigned Mode</span>
        <span class="breakdown-right" style="color:var(--allen-blue)">${state.persona} ${state.personaIcon}</span>
      </div>
    </div>
  `;
}

// ── Home ───────────────────────────────────────────────────────────────────

function updateHomeWithProfile() {
  document.getElementById('home-name').textContent = state.name;
  document.getElementById('home-persona-name').textContent = `${state.persona} Mode`;
  document.getElementById('home-persona-icon').textContent = state.personaIcon;
  document.getElementById('meta-class').textContent = `Class ${state.class}`;
  document.getElementById('meta-target').textContent = state.target.split(',')[0] || 'JEE Advanced';
  document.getElementById('meta-year').textContent = state.year;
  document.getElementById('home-class-tag').textContent = `${state.class}+`;
  document.getElementById('home-target-tag').textContent = (state.target.split(',')[0] || 'JEE Adv.').replace('JEE Advanced', 'JEE Adv.').replace('JEE Main', 'JEE Main');

  document.getElementById('stat-overall').textContent = state.score;
  document.getElementById('stat-bar-overall').style.width = `${state.score}%`;
  document.getElementById('stat-style').textContent = state.learningStyle;

  // Subject confidence levels from quiz answers
  const confClassMap = { Strong: 'level-strong', Good: 'level-good', Building: 'level-building', Weak: 'level-building' };
  const setLevel = (id, level) => {
    const el = document.getElementById(id);
    el.textContent = level;
    el.className = `subject-level ${confClassMap[level] || 'level-building'}`;
  };
  setLevel('phys-level', state.subjects.physics);
  setLevel('math-level', state.subjects.maths);
  setLevel('chem-level', state.subjects.chemistry);

  // Insights
  const insightTitles = {
    Sprinter: 'Fast absorber: skip the basics',
    Advanced: 'Balanced learner: examples first',
    Intermediate: 'Methodical thinker: concepts first',
    Foundation: 'Step by step: build solid ground'
  };
  document.getElementById('insight-1-title').textContent = insightTitles[state.persona] || insightTitles.Foundation;
  document.getElementById('insight-1-sub').textContent = state.personaDesc;

  const confOrder = ['Weak', 'Building', 'Good', 'Strong'];
  const weakest = ['physics', 'maths', 'chemistry'].sort((a, b) => confOrder.indexOf(state.subjects[a]) - confOrder.indexOf(state.subjects[b]))[0];
  const weakLabel = weakest === 'physics' ? 'Physics' : weakest === 'maths' ? 'Maths' : 'Chemistry';
  document.getElementById('insight-2-title').textContent = `Focus area: ${weakLabel}`;
  document.getElementById('insight-2-sub').textContent = `Your answers suggest ${weakLabel} needs extra attention. Allie will reinforce key concepts here.`;
}

// ── Modes modal ────────────────────────────────────────────────────────────

function showModesModal() {
  state.modalSlide = 0;
  document.getElementById('modal-score').textContent = state.score;
  document.getElementById('modal-mode-icon').textContent = state.personaIcon;
  document.getElementById('modal-mode-name').textContent = `${state.persona} Mode`;
  document.getElementById('modal-mode-desc').textContent = MODES[state.suggestedMode].desc;
  document.getElementById('modal-style-chip').textContent = `${state.learningStyle} learner`;
  updateModalSlides();
  updateModalDots();
  document.getElementById('modes-modal').classList.remove('hidden');
}

function closeModesModal() {
  document.getElementById('modes-modal').classList.add('hidden');
  updateModeUI();
}

function nextModalSlide() {
  state.modalSlide = 1;
  updateModalSlides();
  updateModalDots();
}

function prevModalSlide() {
  state.modalSlide = 0;
  updateModalSlides();
  updateModalDots();
}

function updateModalSlides() {
  const slide0 = document.getElementById('modes-slide-0');
  const slide1 = document.getElementById('modes-slide-1');
  slide0.classList.toggle('active', state.modalSlide === 0);
  slide1.classList.toggle('active', state.modalSlide === 1);
}

function updateModalDots() {
  document.getElementById('dot-0').className = `slide-dot ${state.modalSlide === 0 ? 'active' : ''}`;
  document.getElementById('dot-1').className = `slide-dot ${state.modalSlide === 1 ? 'active' : ''}`;
}

// ── Mode select modal ──────────────────────────────────────────────────────

function selectMode(modeKey, btn) {
  state.pendingMode = modeKey;
  showModeSelectModal();
}

function showModeSelectModal() {
  const listEl = document.getElementById('mode-options-list');
  listEl.innerHTML = Object.entries(MODES).map(([key, m]) => `
    <div class="mode-select-option ${state.currentMode === key ? 'selected' : ''}" onclick="pendingSelectMode('${key}', this)">
      <div class="mode-select-icon" style="background:${m.color}">${m.icon}</div>
      <div class="mode-select-info">
        <div class="mode-select-name">${m.name}</div>
        <div class="mode-select-desc">${m.desc.substring(0, 60)}...</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
        ${key === state.suggestedMode ? '<span class="mode-suggested-badge">Suggested</span>' : ''}
        <div class="mode-check">
          ${state.currentMode === key ? '<svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/><path stroke="white" stroke-width="3" stroke-linecap="round" fill="none" d="M5 12l4 4L19 7"/></svg>' : ''}
        </div>
      </div>
    </div>
  `).join('');
  state.pendingMode = state.currentMode;
  document.getElementById('mode-select-modal').classList.remove('hidden');
}

function pendingSelectMode(key, el) {
  state.pendingMode = key;
  document.querySelectorAll('.mode-select-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  el.querySelector('.mode-check').innerHTML = '<svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path stroke="white" stroke-width="3" stroke-linecap="round" fill="none" d="M5 12l4 4L19 7"/></svg>';
}

function confirmModeSwitch() {
  state.currentMode = state.pendingMode;
  document.getElementById('mode-select-modal').classList.add('hidden');
  updateModeUI();

  if (state.chatMessages.length > 0) {
    addSystemMsg(`Switched to ${MODES[state.currentMode].name} mode ${MODES[state.currentMode].icon}`);
  }
}

function updateModeUI() {
  Object.keys(MODES).forEach(key => {
    [document.getElementById(`mode-btn-${key}`), document.getElementById(`mode-btn-${key}-bottom`)]
      .filter(Boolean)
      .forEach(btn => {
        btn.classList.remove('active');
        if (key === state.currentMode) btn.classList.add('active');
      });

    const dot = document.getElementById(`suggested-dot-${key}`);
    if (dot) dot.style.display = key === state.suggestedMode ? 'block' : 'none';
  });
}

// ── Chat UI ────────────────────────────────────────────────────────────────

if (window.marked) {
  marked.setOptions({
    breaks: true,
    gfm: true
  });
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeReplyText(text) {
  return String(text)
    .replace(/\$\$([\s\S]+?)\$\$/g, '\\[$1\\]')
    .replace(/(^|[^\$])\$([^\$\n]+?)\$(?!\$)/g, '$1\\($2\\)')
    .replace(/^\[\s*(.+?)\s*\]$/gm, '\\[$1\\]')
    .replace(/^\[\s*$/gm, '\\[')
    .replace(/^\]\s*$/gm, '\\]')
    .split('—').join('-')
    .split('–').join('-');
}

function normalizeSuperscripts(text) {
  const superscriptMap = {
    '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
    '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
    '⁺': '+', '⁻': '-', '⁽': '(', '⁾': ')', 'ⁿ': 'n'
  };

  return String(text).replace(/([A-Za-z0-9)\]])([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁽⁾ⁿ]+)/g, (_, base, superscript) => {
    const normalized = superscript
      .split('')
      .map(char => superscriptMap[char] || char)
      .join('');
    return `${base}^{${normalized}}`;
  });
}

function convertPlainMathToLatex(text) {
  return normalizeSuperscripts(String(text))
    .replace(/∫/g, '\\int ')
    .replace(/√/g, '\\sqrt ')
    .replace(/∞/g, '\\infty ')
    .replace(/≈/g, '\\approx ')
    .replace(/≠/g, '\\ne ')
    .replace(/≤/g, '\\le ')
    .replace(/≥/g, '\\ge ')
    .replace(/→/g, '\\to ')
    .replace(/×/g, '\\times ')
    .replace(/÷/g, '\\div ')
    .replace(/π/g, '\\pi ')
    .replace(/θ/g, '\\theta ')
    .replace(/α/g, '\\alpha ')
    .replace(/β/g, '\\beta ')
    .replace(/ω/g, '\\omega ');
}

function looksLikeStandaloneMath(line) {
  const trimmed = line.trim();

  if (!trimmed) return false;
  if (trimmed.includes('\\(') || trimmed.includes('\\[')) return false;
  if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\./.test(trimmed)) return false;
  if (/^Answer\s*:/i.test(trimmed)) return false;

  return (
    /[=≈≠≤≥∫√]/.test(trimmed) ||
    /[⁰¹²³⁴⁵⁶⁷⁸⁹]/.test(trimmed) ||
    /[A-Za-z0-9)\]][\^\/][A-Za-z0-9({]/.test(trimmed) ||
    /[A-Za-z0-9)\]]\s*[-+]\s*[A-Za-z0-9(\\]/.test(trimmed) ||
    /\b(sin|cos|tan|cot|sec|cosec|log|ln|lim|theta|alpha|beta|omega)\b/i.test(trimmed)
  );
}

function autoWrapMathLines(text) {
  return String(text)
    .split('\n')
    .map(line => {
      const trimmed = line.trim();

      if (!trimmed) {
        return line;
      }

      const answerMatch = trimmed.match(/^(Answer\s*:\s*)(.+)$/i);
      if (answerMatch && looksLikeStandaloneMath(answerMatch[2])) {
        return `${answerMatch[1]}\\(${convertPlainMathToLatex(answerMatch[2])}\\)`;
      }

      if (looksLikeStandaloneMath(trimmed)) {
        return `\\[${convertPlainMathToLatex(trimmed)}\\]`;
      }

      return line;
    })
    .join('\n');
}

function protectMathSegments(text) {
  const tokens = [];
  const protectedText = String(text).replace(/\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)/g, match => {
    const token = `@@MATH_${tokens.length}@@`;
    tokens.push(match);
    return token;
  });

  return { protectedText, tokens };
}

function restoreMathSegments(text, tokens) {
  return tokens.reduce((output, math, index) => output.replaceAll(`@@MATH_${index}@@`, math), text);
}

function renderRichText(text) {
  const normalizedText = autoWrapMathLines(normalizeReplyText(text));
  const fallbackHtml = escapeHtml(normalizedText).replace(/\n/g, '<br>');

  if (!window.marked || !window.DOMPurify) {
    return fallbackHtml;
  }

  const { protectedText, tokens } = protectMathSegments(normalizedText);
  const rawHtml = marked.parse(protectedText || '');
  const sanitizedHtml = DOMPurify.sanitize(rawHtml);
  return restoreMathSegments(sanitizedHtml, tokens);
}

function typesetMath(container) {
  if (window.MathJax?.typesetPromise) {
    window.MathJax.typesetPromise([container]).catch(err => {
      console.error('MathJax render failed:', err);
    });
  }
}

function addChatBubble(role, text) {
  const chatArea = document.getElementById('chat-area');
  const div = document.createElement('div');
  div.className = `chat-bubble ${role}`;

  if (role === 'ai') {
    div.innerHTML = `
      <div class="bubble-sender">Allie <span class="mode-tag">${MODES[state.currentMode].name}</span></div>
      <div class="bubble-content rich-text">${renderRichText(text)}</div>
    `;
  } else {
    div.innerHTML = `<div class="bubble-content">${escapeHtml(text)}</div>`;
  }

  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;

  if (role === 'ai') {
    typesetMath(div);
  }
}

function addImageBubble(imageUrl, fileName) {
  const chatArea = document.getElementById('chat-area');
  const div = document.createElement('div');
  div.className = 'chat-bubble user';
  div.innerHTML = `
    <div class="bubble-content">
      <img class="chat-image-preview" src="${imageUrl}" alt="${escapeHtml(fileName || 'Selected image')}">
      <div class="chat-image-caption">${escapeHtml(fileName || 'Image selected')}</div>
    </div>
  `;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function addSystemMsg(text) {
  const chatArea = document.getElementById('chat-area');
  const div = document.createElement('div');
  div.style.cssText = 'text-align:center; font-size:11px; font-weight:700; color:var(--text-light); padding: 4px 0;';
  div.textContent = `- ${normalizeReplyText(text)} -`;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

let typingCounter = 0;

function showTyping() {
  const chatArea = document.getElementById('chat-area');
  const id = `typing-${typingCounter++}`;
  const div = document.createElement('div');
  div.className = 'chat-bubble ai';
  div.id = id;
  div.innerHTML = `
    <div class="bubble-sender">Allie</div>
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}
