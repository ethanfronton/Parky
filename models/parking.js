const mongoose = require("mongoose");

const ParkingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    adresse: { type: String, required: true },
    prix: { type: Number, required: true },
    disponible: { type: Boolean, default: true },
    temps: { type: Number, required: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model("Parking", ParkingSchema);