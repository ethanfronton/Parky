require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const rootRoutes = require("./routes/root");
const authRoutes = require("./routes/auth");
const app = express();
const session = require("express-session");
const auth = require("./middlewares/auth");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", rootRoutes);

// Connexion à MongoDB  
mongoose
  .connect("mongodb://127.0.0.1:27017/parky")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const annonceSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    adresse: { type: String, required: true },
    ville: { type: String, required: true },
    proprietaire_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: false },  // Champ pour stocker l'URL de l'image
    duree: { type: String, required: true }
});
const Annonce = mongoose.model('Annonce', annonceSchema);

app.post('/api/annonces', async (req, res) => {
  const nouvelleAnnonce = new Annonce(req.body);
  await nouvelleAnnonce.save();
  res.status(201).send(nouvelleAnnonce);
});

// Route pour récupérer toutes les annonces
app.get('/api/annonces', async (req, res) => {
  const annonces = await Annonce.find();
  res.json(annonces);
});

app.use(authRoutes);
app.listen(3000, () => console.log("Serveur en écoute sur le port 3000"));
