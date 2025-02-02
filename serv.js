require("dotenv").config();  // Charge les variables d'environnement depuis .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const rootRoutes = require("./routes/root");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.static(path.join(__dirname, "public"))); // Ajoutez cette ligne
app.use("/", rootRoutes);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/parky')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Utiliser les routes d'authentification
app.use(authRoutes);

const annonceRoutes = require("./routes/annonces");
app.use("/api/annonces", annonceRoutes);

// Lancer le serveur
app.listen(3000, () => console.log("Serveur en écoute sur le port 3000"));
