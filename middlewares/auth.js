const jwt = require("jsonwebtoken"); // Importation du module jsonwebtoken pour gérer les tokens JWT

// Middleware d'authentification
module.exports = (req, res, next) => {
  // Exemple de vérification d'authentification
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }
  try {
    console.log("Token reçu:", token); // Affichage du token reçu pour le débogage
    // Vérifiez le token ici (par exemple, avec JWT)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token décodé:", decoded); // Affichage du token décodé pour le débogage
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token invalide !"); // Affichage d'un message d'erreur pour le débogage
    res.status(400).json({ message: 'Token invalide.' });
  }
};