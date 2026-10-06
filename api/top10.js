export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const MINECRAFT_API_URL = "http://151.242.159.7:8080/api/top10";

  try {
    const response = await fetch(MINECRAFT_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (e) {
      console.error("Réponse Minecraft non-JSON :", text);
      return res.status(500).json({ error: "Format de réponse Minecraft invalide" });
    }

  } catch (error) {
    console.error("Vercel Proxy Error:", error);
    return res.status(500).json({ error: "Serveur Minecraft injoignable" });
  }
}
