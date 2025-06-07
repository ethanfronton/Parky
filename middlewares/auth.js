const jwt = require("jsonwebtoken");

// Middleware d'authentification
module.exports = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }
  try {
    console.log("Token reçu:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token décodé:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token invalide !");
    res.status(400).json({ message: 'Token invalide.' });
  }
};