require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");
const rootRoutes = require("./routes/root");
const authRoutes = require("./routes/auth");
const app = express();

const auth = require("./middlewares/auth");
const Reservation = require("./models/reservation"); // Assure-toi d'avoir un modèle pour stocker les réservations

const corsOptions = {
  origin: ["https://parky-ajgq.onrender.com", "http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", rootRoutes);

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/parky")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const annonceSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true },
  adresse: { type: String, required: true },
  ville: { type: String, required: true },
  proprietaire_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: { type: String, required: false }, // Champ pour stocker l'URL de l'image
  duree: { type: String, required: true },
});
const Annonce = mongoose.model("Annonce", annonceSchema);

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "frontonethan@gmail.com",
    subject: `Nouveau message de ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email envoyé avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'envoi de l'email.");
  }
});
app.post("/api/annonces", async (req, res) => {
  const nouvelleAnnonce = new Annonce(req.body);
  await nouvelleAnnonce.save();
  res.status(201).send(nouvelleAnnonce);
});

// Route pour récupérer toutes les annonces
app.get("/api/annonces", async (req, res) => {
  const annonces = await Annonce.find();
  res.json(annonces);
});

app.delete("/api/annonces/:id", auth, async (req, res) => {
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

app.put("/api/annonces/:id", auth, async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);

    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    // Vérifie si l'utilisateur est bien le propriétaire
    if (annonce.proprietaire_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Modification non autorisée" });
    }

    // Mettre à jour l'annonce avec les nouvelles valeurs
    const updatedAnnonce = await Annonce.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedAnnonce);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post("/api/reservations", async (req, res) => {
  try {
    const { annonceId, userId } = req.body;
    const reservation = new Reservation({ annonceId, userId });
    await reservation.save();
    res.status(201).json({ message: "Réservation effectuée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la réservation", error });
  }
});

app.get("/api/reservations", auth, async (req, res) => {
  try {
    const reservations = await Reservation.find({
      userId: req.user.id,
    }).populate("annonceId");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations",
      error,
    });
  }
});

app.delete("/api/reservations/:id", auth, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    // Vérifiez si l'utilisateur est bien le propriétaire de la réservation
    if (reservation.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Suppression non autorisée" });
    }

    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Réservation supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la réservation :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.get("/recherche", async (req, res) => {
  try {
    let query = {};

    if (req.query.ville) {
      query.ville = { $regex: req.query.ville, $options: "i" }; // Recherche insensible à la casse
    }
    if (req.query.prix_max) {
      query.prix = { $lte: parseInt(req.query.prix_max) };
    }

    const annonces = await Annonce.find(query);
    res.json(annonces);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.use(authRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
