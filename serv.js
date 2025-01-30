const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/parky')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));


// Modèle utilisateur
const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = mongoose.model("User", UserSchema);

// Route d'inscription
app.post("/register", async (req, res) => {
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

        res.status(201).json({ message: "Inscription réussie !" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        res.status(200).json({ message: "Connexion réussie !" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Lancer le serveur
app.listen(3000, () => console.log("Serveur en écoute sur le port 3000"));

