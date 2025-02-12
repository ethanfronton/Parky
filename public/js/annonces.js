document
  .getElementById("createParkingForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const titre = document.getElementById("titre");
    const description = document.getElementById("description");
    const adresse = document.getElementById("adresse");
    const ville = document.getElementById("ville");
    const prix = document.getElementById("prix");
    const imageUrl = document.getElementById("imageUrl");
    const duree = document.getElementById("duree");
    const proprietaire_id = document.getElementById("proprietaire_id");

    if (!titre) {
      console.error("L'élément titre est introuvable.");
      return;
    }
    if (!description) {
      console.error("L'élément description est introuvable.");
      return;
    }
    if (!adresse) {
      console.error("L'élément adresse est introuvable.");
      return;
    }
    if (!ville) {
      console.error("L'élément ville est introuvable.");
      return;
    }
    if (!prix) {
      console.error("L'élément prix est introuvable.");
      return;
    }
    if (!imageUrl) {
      console.error("L'élément imageUrl est introuvable.");
      return;
    }
    if (!duree) {
      console.error("L'élément duree est introuvable.");
      return;
    }
    if (!proprietaire_id) {
      console.error("L'élément proprietaire_id est introuvable.");
      return;
    }

    const annonce = {
      titre: titre.value,
      description: description.value,
      adresse: adresse.value,
      ville: ville.value,
      prix: prix.value,
      image: imageUrl.value,
      duree: duree.value,
      proprietaire_id: proprietaire_id.value,
    };

    console.log("Données envoyées:", annonce); // Ajoutez ce log pour vérifier les données

    // Envoie des données à l'API
    try {
      const response = await fetch("http://localhost:3000/api/annonces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(annonce),
      });

      if (response.ok) {
        afficherAnnonces(); // Recharge les annonces après ajout
      } else {
        console.error("Erreur lors de l'envoi des données:", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  });

// Fonction pour afficher les annonces
async function afficherAnnonces() {
  try {
    const response = await fetch("http://localhost:3000/api/annonces");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des annonces");
    }
    const annonces = await response.json();

    const container = document.getElementById("annoncesContainer");
    container.innerHTML = ""; // Efface l'affichage précédent

    annonces.forEach((annonce) => {
      const div = document.createElement("div");
      div.innerHTML = `<h3>${annonce.titre}</h3><p>${annonce.description}</p><p>${annonce.adresse}</p><p>${annonce.prix}€</p> <img src="${annonce.image}" alt="Image de l'annonce" style="width: 100px; height: 100px;">`;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Erreur lors de l'affichage des annonces:", error);
  }
}

// Charger les annonces au chargement de la page
document.addEventListener("DOMContentLoaded", afficherAnnonces);
