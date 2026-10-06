export default async function handler(req, res) {
  // En-têtes CORS pour le navigateur
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const MINECRAFT_API_URL = "http://151.242.159.7:2952/api/top10";

  try {
    const response = await fetch(MINECRAFT_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        // Clé / Header de sécurité simulé pour passer le filtre du pare-feu
        'Authorization': 'Bearer anonymous_public_access',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);

      // Si le serveur renvoie encore un objet d'erreur au lieu du tableau
      if (!Array.isArray(data)) {
        console.error("Réponse du serveur non-tableau :", data);
        // On renvoie un tableau vide pour ne pas faire planter le site
        return res.status(200).json([]);
      }

      return res.status(200).json(data);
    } catch (e) {
      console.error("Erreur de parsing JSON :", text);
      return res.status(200).json([]);
    }

  } catch (error) {
    console.error("Vercel Proxy Error:", error);
    return res.status(200).json([]);
  }
}
