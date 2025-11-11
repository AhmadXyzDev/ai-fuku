const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { text, systemPrompt = 'Kamu adalah asisten AI yang membantu' } = req.query;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Parameter text diperlukan'
      });
    }

    const startTime = Date.now();
    
    // Encode parameters untuk URL
    const encodedText = encodeURIComponent(text);
    const encodedPrompt = encodeURIComponent(systemPrompt);
    
    const apiUrl = `https://api.nekolabs.web.id/ai/gpt/4.1-mini?text=${encodedText}&systemPrompt=${encodedPrompt}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    const responseTime = Date.now() - startTime;
    
    // Format response sesuai dengan contoh
    const formattedResponse = {
      success: true,
      result: data.result || data.message || 'Tidak ada response',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`
    };
    
    res.json(formattedResponse);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan pada server',
      timestamp: new Date().toISOString()
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { text, systemPrompt = 'Kamu adalah asisten AI yang membantu' } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Parameter text diperlukan'
      });
    }

    const startTime = Date.now();
    
    // Encode parameters untuk URL
    const encodedText = encodeURIComponent(text);
    const encodedPrompt = encodeURIComponent(systemPrompt);
    
    const apiUrl = `https://api.nekolabs.web.id/ai/gpt/4.1-mini?text=${encodedText}&systemPrompt=${encodedPrompt}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    const responseTime = Date.now() - startTime;
    
    // Format response
    const formattedResponse = {
      success: true,
      result: data.result || data.message || 'Tidak ada response',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`
    };
    
    res.json(formattedResponse);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan pada server',
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
