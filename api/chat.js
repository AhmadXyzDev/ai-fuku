export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Call Fukushima API
      const apiUrl = `https://api.nekolabs.web.id/ai/gpt/4o-mini?text=${encodeURIComponent(message)}&systemPrompt=${encodeURIComponent('Nama kamu adalah Fukushima yang di ciptakan oleh AhmadXyz')}`;
      
      console.log('Calling Fukushima API:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      res.status(200).json({
        success: true,
        result: data.result,
        timestamp: data.timestamp,
        responseTime: data.responseTime
      });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch response from Fukushima API',
        details: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
