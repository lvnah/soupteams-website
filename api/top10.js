export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const MINECRAFT_API_URL = "http://151.242.159.7:8080/api/top10";

  try {
    const response = await fetch(MINECRAFT_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Anonymous', // Transmet un header bidon si un filtre exige la présence du mot "Authorization"
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "API Minecraft indisponible" });
  }
}
