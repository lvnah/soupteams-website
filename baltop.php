<?php
// Autorise le navigateur à lire cette réponse sans blocage CORS
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

// Adresse de l'API de ton serveur Minecraft hébergé chez OneHeberge
$minecraft_api_url = "http://151.242.159.7:8080/api/top10";

// Exécution de la requête serveur à serveur (PHP -> OneHeberge)
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $minecraft_api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);

// Si ton plugin requiert un token d'autorisation, décommente la ligne ci-dessous :
// curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer VOTRE_TOKEN'));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Renvoi du résultat
if ($http_code === 200 && $response) {
    echo $response;
} else {
    http_response_code(502);
    echo json_encode(["error" => "Impossible de contacter l'API Minecraft"]);
}
