export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  const MINECRAFT_API_URL = "http://151.242.159.7:8080/api/top10";

  // Si une clé a été définie dans la config de ton plugin (ex: config.yml), indique-la ici.
  // Si le plugin utilise Bearer Token : 'Bearer VOTRE_TOKEN'
  const API_KEY = "VOTRE_MOT_DE_PASSE_OU_TOKEN"; 

  try {
    const response = await fetch(MINECRAFT_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`, // Ou 'Key': API_KEY selon ce que le plugin attend
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Minecraft API returned status ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Vercel API Proxy Error:", error);
    return res.status(500).json({ error: "Failed to connect to Minecraft server" });
  }
}
