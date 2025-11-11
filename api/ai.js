const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

// router kamu
app.get('/', async (req, res) => {
  try {
    const { text, systemPrompt = 'Kamu adalah asisten AI yang membantu' } = req.query;
    if (!text) return res.status(400).json({ success: false, error: 'Parameter text diperlukan' });

    const startTime = Date.now();
    const apiUrl = `https://api.nekolabs.web.id/ai/gpt/4.1-mini?text=${encodeURIComponent(text)}&systemPrompt=${encodeURIComponent(systemPrompt)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const responseTime = Date.now() - startTime;
    res.json({
      success: true,
      result: data.result || data.message || 'Tidak ada response',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Terjadi kesalahan pada server' });
  }
});

app.post('/', async (req, res) => {
  try {
    const { text, systemPrompt = 'Kamu adalah asisten AI yang membantu' } = req.body;
    if (!text) return res.status(400).json({ success: false, error: 'Parameter text diperlukan' });

    const startTime = Date.now();
    const apiUrl = `https://api.nekolabs.web.id/ai/gpt/4.1-mini?text=${encodeURIComponent(text)}&systemPrompt=${encodeURIComponent(systemPrompt)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const responseTime = Date.now() - startTime;
    res.json({
      success: true,
      result: data.result || data.message || 'Tidak ada response',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Terjadi kesalahan pada server' });
  }
});

// ini penting ⤵️
module.exports = app;
