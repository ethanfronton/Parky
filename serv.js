require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const rootRoutes = require("./routes/root");
const authRoutes = require("./routes/auth");
const app = express();

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

app.delete('/api/annonces/:id', auth, async (req, res) => {
  try {
      const annonce = await Annonce.findById(req.params.id);

      if (!annonce) {
          return res.status(404).json({ message: "Annonce non trouvée" });
      }

      // Vérifie si l'utilisateur est bien le propriétaire de l'annonce
      if (annonce.proprietaire_id.toString() !== req.user.id) {
          return res.status(403).json({ message: "Suppression non autorisée" });
      }

      await Annonce.findByIdAndDelete(req.params.id);
      res.json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
  }
});
app.use(authRoutes);
app.listen(3000, () => console.log("Serveur en écoute sur le port 3000"));
