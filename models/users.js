const mongoose = require("mongoose"); // Importation de la bibliothèque mongoose pour interagir avec MongoDB

// Définition du schéma de l'utilisateur avec mongoose
const UserSchema = new mongoose.Schema({
    email: String,   // Champ email de type String
    password: String // Champ password de type String
});

// Exportation du modèle User basé sur le schéma UserSchema
module.exports = mongoose.model("User", UserSchema);