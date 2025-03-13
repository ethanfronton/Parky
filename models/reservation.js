const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    annonceId: { type: mongoose.Schema.Types.ObjectId, ref: "Annonce", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dateReservation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", reservationSchema);
