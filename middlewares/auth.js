const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  try {
    console.log("Token reçu:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token décodé:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token invalide !");
    return res.status(401).json({ message: "Token invalide !" });
  }
};

module.exports = auth;
