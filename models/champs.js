const mongoose = require("mongoose");

const AnnonceSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true },
  type: { type: String, required: true },
  disponibilite: { type: String, required: true },
  adresse: { type: String, required: true },
  ville: { type: String, required: true },
  proprietaire_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // ou "user" selon ton choix
});

module.exports = mongoose.model("Annonce", AnnonceSchema);
