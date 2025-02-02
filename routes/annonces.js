const express = require("express");
const router = express.Router();
const Annonce = require("../models/champs.js");
const auth = require("../middlewares/auth.js"); // Importer le middleware d'authentification

// 🔹 Ajouter une annonce
router.post("/", auth, async (req, res) => { // Utiliser le middleware auth ici
  try {
    const annonce = new Annonce({ ...req.body, proprietaire_id: req.user.id });
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
router.put("/:id", auth, async (req, res) => { // Utiliser le middleware auth ici aussi
  try {
    const annonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!annonce) return res.status(404).json({ message: "Annonce non trouvée" });
    res.json(annonce);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Supprimer une annonce
router.delete("/:id", auth, async (req, res) => { // Et ici aussi
  try {
    const annonce = await Annonce.findByIdAndDelete(req.params.id);
    if (!annonce) return res.status(404).json({ message: "Annonce non trouvée" });
    res.json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
