export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const MINECRAFT_API_URL = "http://151.242.159.7:2952/api/teams";

  try {
    const response = await fetch(MINECRAFT_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Vercel Teams API Error:", error);
    return res.status(200).json([]);
  }
}
