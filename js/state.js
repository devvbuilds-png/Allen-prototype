const ALLIE_API_URL = window.location.hostname === 'localhost' && window.location.port === '3000'
  ? 'http://localhost:3001/api/allie'
  : '/api/allie';

const state = {
  name: '',
  class: '',
  target: '',
  year: '',
  currentQuestion: 0,
  answers: {},
  score: 0,
  learningStyle: '',
  persona: '',
  personaIcon: '',
  personaDesc: '',
  currentMode: 'sprinter',
  suggestedMode: 'sprinter',
  currentTab: 'home',
  modalSlide: 0,
  pendingMode: null,
  chatMessages: [],
  allieVisible: true,
  hasSeenModesModal: false,
  subjects: { physics: 'Good', maths: 'Good', chemistry: 'Good' },
  prepStage: 'early'
};

const MODES = {
  sprinter:     { name: 'Sprinter',     icon: '⚡', color: '#EEF4FF', desc: 'Direct answers with key logic. No fluff, no overexplaining. You clearly know your stuff — let\'s move fast.' },
  advanced:     { name: 'Advanced',     icon: '🎯', color: '#E8FFF5', desc: 'Concept + worked example + you try. A sharp approach for students who want depth without hand-holding.' },
  intermediate: { name: 'Intermediate', icon: '📐', color: '#F0EDFF', desc: 'Concept first, then solve. Allie breaks problems down clearly before jumping to answers.' },
  foundation:   { name: 'Foundation',   icon: '🌱', color: '#FFF8E0', desc: 'Step by step, nothing assumed. Every concept built from the ground up.' }
};
