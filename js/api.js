function buildAllieMessages() {
  return [
    { role: 'system', content: buildSystemPrompt() },
    ...state.chatMessages
  ];
}

function getMaxTokensForMode() {
  const budgets = {
    sprinter: 180,
    advanced: 430,
    intermediate: 560,
    foundation: 780
  };
  return budgets[state.currentMode] || 560;
}

async function callAllie() {
  const response = await fetch(ALLIE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: buildAllieMessages(),
      max_tokens: getMaxTokensForMode()
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const err = new Error(data.error || `API error: ${response.status}`);
    err.status = response.status;
    throw err;
  }

  return data.content || 'I could not generate a response just now.';
}

function buildUserFacingError(err) {
  if (err.status === 401) {
    return 'The OpenAI API key is missing or invalid. Please check the local server configuration.';
  }

  if (err.status === 429) {
    return 'Allie is being rate-limited by OpenAI right now. Please try again in a few seconds.';
  }

  return "Sorry, I'm having trouble connecting right now. Please try again in a moment.";
}

let activeRecognition = null;

function hideAllieHeroIfNeeded() {
  if (state.chatMessages.length !== 0) return;

  const doubtsScreen = document.getElementById('screen-doubts');
  if (doubtsScreen) {
    doubtsScreen.classList.add('chat-active');
  }

  const allieCenter = document.getElementById('allie-center');
  if (!allieCenter) return;

  allieCenter.style.transition = 'all 0.3s';
  allieCenter.style.maxHeight = '0';
  allieCenter.style.opacity = '0';
  allieCenter.style.overflow = 'hidden';
  allieCenter.style.padding = '0';
  allieCenter.style.margin = '0';
}

function openImagePicker() {
  const input = document.getElementById('chat-image-input');
  if (input) input.click();
}

function handleImageSelection(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  hideAllieHeroIfNeeded();

  const reader = new FileReader();
  reader.onload = () => {
    addImageBubble(reader.result, file.name);
    addSystemMsg('Image added. Type the question from the image and Allie will solve it with you.');
    const input = document.getElementById('chat-input-field');
    if (input && !input.value.trim()) {
      input.value = 'Solve the doubt from this image: ';
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function toggleVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    addSystemMsg('Voice input is not supported in this browser yet.');
    return;
  }

  if (activeRecognition) {
    activeRecognition.stop();
    return;
  }

  const micBtn = document.getElementById('chat-mic-btn');
  const input = document.getElementById('chat-input-field');
  const recognition = new SpeechRecognition();
  let finalTranscript = '';

  recognition.lang = 'en-IN';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  recognition.onstart = () => {
    activeRecognition = recognition;
    if (micBtn) micBtn.classList.add('listening');
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
    if (input) {
      input.value = `${finalTranscript}${interimTranscript}`.trimStart();
    }
  };

  recognition.onerror = (event) => {
    if (event.error !== 'aborted' && event.error !== 'no-speech') {
      addSystemMsg('Voice input could not start properly. Please try again.');
    }
  };

  recognition.onend = () => {
    activeRecognition = null;
    if (micBtn) micBtn.classList.remove('listening');
    if (input) input.focus();
  };

  recognition.start();
}

async function sendMessage() {
  const input = document.getElementById('chat-input-field');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  hideAllieHeroIfNeeded();

  state.chatMessages.push({ role: 'user', content: text });
  addChatBubble('user', text);

  const typingId = showTyping();

  try {
    const response = await callAllie();
    removeTyping(typingId);
    state.chatMessages.push({ role: 'assistant', content: response });
    addChatBubble('ai', response);
  } catch (err) {
    removeTyping(typingId);
    addChatBubble('ai', buildUserFacingError(err));
    console.error('Allie request failed:', err);
  }
}

function handleChatKey(e) {
  if (e.key === 'Enter') sendMessage();
}
