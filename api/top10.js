export default async function handler(req, res) {
  // En-têtes CORS pour Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const MINECRAFT_API_URL = "http://151.242.159.7:8080/api/top10";

  try {
    const response = await fetch(MINECRAFT_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        // Envoie d'un User-Agent réel pour ne pas être rejeté par le pare-feu
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error(`Minecraft API Error ${response.status}:`, errorText);
      return res.status(response.status).json({ 
        error: `Minecraft API returned status ${response.status}` 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Vercel API Proxy Error:", error);
    return res.status(500).json({ error: "Failed to connect to Minecraft server" });
  }
}
