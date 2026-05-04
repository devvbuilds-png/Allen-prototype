module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const openAiApiKey = process.env.OPENAI_API_KEY;
  const openAiModel = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

  if (!openAiApiKey) {
    res.status(401).json({ error: 'OpenAI API key is not configured.' });
    return;
  }

  const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const maxTokens = Number(req.body?.max_tokens || 560);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: openAiModel,
        messages,
        max_tokens: maxTokens,
        temperature: 0.7
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      res.status(response.status).json({
        error: data.error?.message || `OpenAI API error: ${response.status}`
      });
      return;
    }

    res.status(200).json({
      content: data.choices?.[0]?.message?.content || ''
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'OpenAI request failed.' });
  }
};
