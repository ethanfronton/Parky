const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // Récupérer le token dans le header Authorization
    const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token manquant !" });
    }

    try {
        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ajouter l'utilisateur au request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide !" });
    }
};

module.exports = auth;
