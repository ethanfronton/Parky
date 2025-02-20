const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "index.html"));
});

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "index.html"));
});

router.get("/reservation", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "resa.html"));
});

router.get("/identification", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "id.html"));
});

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "register.html"));
});

router.get("/my-parky", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "mesParky.html"));
});

router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "about.html"));
});

router.get("/mes-annonces", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "mesAnnonces.html"));
});
module.exports = router;
