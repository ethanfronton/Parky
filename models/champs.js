const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    type: { type: String, required: true },
    disponibilite: { type: String, required: true },
    adresse: { type: String, required: true },
    ville: { type: String, required: true },
    proprietaire_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: false },
    duree: { type: Number, required: true },
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
});

module.exports = mongoose.model('Annonce', annonceSchema);
