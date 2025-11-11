// api/fukushima.js
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    try {
      const { message } = JSON.parse(req.body);
      
      const url = `https://api.nekolabs.web.id/ai/gpt/4o-mini?text=${encodeURIComponent(message)}&systemPrompt=Nama+kamu+adalah+Fukushima+yang+di+ciptakan+oleh+AhmadXyz`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      res.json({
        success: true,
        result: data.result
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
};
