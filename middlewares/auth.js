const jwt = require("jsonwebtoken"); // Importation du module jsonwebtoken pour gérer les tokens JWT

// Middleware d'authentification
const auth = (req, res, next) => {
  // Récupération de l'en-tête Authorization de la requête
  const authHeader = req.header("Authorization");
  // Extraction du token de l'en-tête Authorization (le token est après "Bearer ")
  const token = authHeader && authHeader.split(" ")[1];

  try {
    console.log("Token reçu:", token); // Affichage du token reçu pour le débogage
    // Vérification et décodage du token avec la clé secrète JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token décodé:", decoded); // Affichage du token décodé pour le débogage
    // Ajout des informations décodées du token à l'objet req (requête)
    req.user = decoded;
    // Passage au middleware suivant
    next();
  } catch (error) {
    console.log("Token invalide !"); // Affichage d'un message d'erreur pour le débogage
    // Envoi d'une réponse 401 Unauthorized avec un message d'erreur
    return res.status(401).json({ message: "Token invalide !" });
  }
};

module.exports = auth; // Exportation du middleware pour l'utiliser dans d'autres fichiers