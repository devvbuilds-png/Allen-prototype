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

async function sendMessage() {
  const input = document.getElementById('chat-input-field');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';

  // Hide allie hero when chat starts
  if (state.chatMessages.length === 0) {
    const allieCenter = document.getElementById('allie-center');
    allieCenter.style.transition = 'all 0.3s';
    allieCenter.style.maxHeight = '0';
    allieCenter.style.opacity = '0';
    allieCenter.style.overflow = 'hidden';
    allieCenter.style.padding = '0';
    allieCenter.style.margin = '0';
  }

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
