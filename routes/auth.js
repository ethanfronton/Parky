const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const auth = require("../middlewares/auth");

const router = express.Router();

// Route d'inscription
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Inscription réussie !", userId: newUser._id });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Route de connexion
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        // Créer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

router.get("/me", auth, async (req, res) => {
    try {
        console.log("Requête utilisateur:", req.user);
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            console.log("Utilisateur non trouvé");
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        console.log("Utilisateur trouvé:", user);
        res.json(user);
    } catch (err) {
        console.log("Erreur serveur:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
