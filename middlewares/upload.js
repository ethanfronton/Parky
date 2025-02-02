const multer = require('multer');
const path = require('path');

// Configurer multer pour stocker les images dans un dossier spécifique
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Dossier où les images seront stockées
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour chaque image
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Erreur: Fichiers images uniquement!');
        }
    }
}).single('image');  // Attendre un fichier sous le champ 'image'

module.exports = upload;
