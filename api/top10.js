export default async function handler(req, res) {
  // Permet d'éviter tout souci de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  const MINECRAFT_API_URL = "http://151.242.159.7:8080/api/top10";

  try {
    // Vercel (en arrière-plan en HTTPS) fait la requête HTTP vers OneHeberge
    const response = await fetch(MINECRAFT_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Minecraft API error" });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Vercel API Proxy Error:", error);
    return res.status(500).json({ error: "Failed to connect to Minecraft server" });
  }
}
