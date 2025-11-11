export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).end(`Method ${req.method} Not Allowed`);

  try {
    const { message } = req.query;
    if (!message) return res.status(400).json({ success: false, error: 'Message is required' });

    const systemPrompt = 'Nama kamu adalah Fukushima yang diciptakan oleh AhmadXyz';
    const apiUrl = `https://api.nekolabs.web.id/ai/gpt/4o-mini?text=${encodeURIComponent(message)}&systemPrompt=${encodeURIComponent(systemPrompt)}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json({
      success: true,
      result: data.result,
      timestamp: data.timestamp,
      responseTime: data.responseTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch response from Fukushima API',
      details: error.message,
    });
  }
}

