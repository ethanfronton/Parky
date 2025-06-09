# Parky

Parky est une application web permettant de publier, rechercher et réserver des places de parking entre particuliers.

## Fonctionnalités

- **Gestion des annonces** : Ajout, modification, suppression et affichage d’annonces de parkings.
- **Réservations** : Réservation d’une place de parking, consultation et annulation de ses réservations.
- **Recherche** : Filtre par ville et prix maximum.
- **Authentification** : Connexion sécurisée des utilisateurs.
- **Contact** : Formulaire de contact avec envoi d’email via Nodemailer.

## Stack technique

- **Backend** : Node.js, Express, MongoDB, Mongoose
- **Frontend** : HTML, CSS, JavaScript
- **Email** : Nodemailer (Gmail, mot de passe d’application requis)
- **Sécurité** : JWT pour l’authentification

## Installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```
2. **Configurer la base de données**
   - Renommer le fichier `.env.example` en `.env`
   - Ajouter votre URI MongoDB dans le fichier `.env`
   ```env
   MONGODB_URI=votre_uri_mongodb
   ```
3. **Lancer l’application**
   ```bash
   npm start
   ```
   L’application est accessible sur `http://localhost:3000`.

## Contribuer

Les contributions sont les bienvenues ! Pour proposer une amélioration ou signaler un bug, ouvrez une issue sur GitHub.

## License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
