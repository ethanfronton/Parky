const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "index.html"));
});

router.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "index.html"));
});

router.get("/resa.html", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "resa.html"));
});

router.get("/id.html", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "id.html"));
});

router.get("/register.html", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "register.html"));
});

router.get("/mesParky.html", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "mesParky.html"));
});

router.get("/about.html", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "html", "about.html"));
});

module.exports = router;
