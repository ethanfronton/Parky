const express = require("express");
const router = express.Router();
const Annonce = require("../models/champs.js");
const auth = require("../middlewares/auth.js");
const upload = require("../middlewares/upload.js");  // Importer le middleware d'upload

// 🔹 Ajouter une annonce avec image
router.post("/", auth, upload, async (req, res) => {
  try {
    // Si une image a été téléchargée, on ajoute l'URL de l'image à l'annonce
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const annonce = new Annonce({
      ...req.body,
      proprietaire_id: req.user.id,
      image: imageUrl // Ajout de l'image dans le modèle
    });

    await annonce.save();
    res.status(201).json(annonce);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Récupérer toutes les annonces
router.get("/", async (req, res) => {
  try {
    const annonces = await Annonce.find();
    res.json(annonces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Récupérer une annonce par ID
router.get("/:id", async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);
    if (!annonce) return res.status(404).json({ message: "Annonce non trouvée" });
    res.json(annonce);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Modifier une annonce
router.put("/:id", auth, async (req, res) => {
  try {
    const annonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!annonce) return res.status(404).json({ message: "Annonce non trouvée" });
    res.json(annonce);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Supprimer une annonce
router.delete("/:id", auth, async (req, res) => {
  try {
    const annonce = await Annonce.findByIdAndDelete(req.params.id);
    if (!annonce) return res.status(404).json({ message: "Annonce non trouvée" });
    res.json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
