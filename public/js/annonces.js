document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM chargé, affichage des annonces...");
  const userId = localStorage.getItem("userId"); // Assurez-vous que l'ID utilisateur est stocké dans le localStorage
  afficherAnnonces(userId);
});

// Gestion du formulaire d'ajout d'annonce
document
  .getElementById("createParkingForm")
  ?.addEventListener("submit", async function (event) {
    event.preventDefault();

    const titre = document.getElementById("titre");
    const description = document.getElementById("description");
    const adresse = document.getElementById("adresse");
    const ville = document.getElementById("ville");
    const prix = document.getElementById("prix");
    const imageUrl = document.getElementById("imageUrl");
    const duree = document.getElementById("duree");
    const proprietaire_id = document.getElementById("proprietaire_id");

    if (
      !titre ||
      !description ||
      !adresse ||
      !ville ||
      !prix ||
      !imageUrl ||
      !duree ||
      !proprietaire_id
    ) {
      console.error("Un ou plusieurs champs du formulaire sont introuvables.");
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

    try {
      const response = await fetch("http://localhost:3000/api/annonces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(annonce),
      });

      if (response.ok) {
        alert("Annonce créée avec succès !");
        window.location.href = "/html/index.html"; 
      } else {
        const data = await response.json();
        alert(`Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'annonce:", error);
      alert("Erreur lors de la création de l'annonce");
    }
  });

// Fonction pour afficher les annonces
async function afficherAnnonces(userId = null) {
  const container = document.getElementById("annoncesContainer");

  if (!container) {
    console.error("L'élément #annoncesContainer est introuvable !");
    return;
  }

  try {
    container.innerHTML = "<p>Chargement des annonces...</p>";
    const response = await fetch("http://localhost:3000/api/annonces");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des annonces");
    }
    const annonces = await response.json();
    console.log("Annonces récupérées:", annonces);

    container.innerHTML = "";
    annonces
      .filter((annonce) => !userId || annonce.proprietaire_id === userId)
      .forEach((annonce) => {
        const div = document.createElement("div");
        div.className = "annonce";
        div.innerHTML = `
          <h3>${annonce.titre}</h3>
          <p>${annonce.description}</p>
          <p>${annonce.adresse}</p>
          <p>${annonce.ville}</p>
          <p class="prix">${annonce.prix}€</p>
          <img src="${annonce.image}" alt="Image de l'annonce">
        `;
        if (window.location.pathname.includes("mes-annonces")) {
          div.innerHTML += `<button class="btn btn-danger" onclick="supprimerAnnonce('${annonce._id}')">Supprimer</button>`;
          div.innerHTML += `<button class="btn btn-warning" onclick="modifierAnnonce('${annonce._id}')">Modifier</button>`;
        } else if (
          window.location.pathname === "/" ||
          window.location.pathname === "/home"
        ) {
          div.innerHTML += `<button class="btn btn-success" onclick="reserverAnnonce('${annonce._id}')">Réserver</button>`;
        }

        container.appendChild(div);
      });
  } catch (error) {
    console.error("Erreur lors de l'affichage des annonces:", error);
  }
}

async function supprimerAnnonce(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Vous devez être connecté pour supprimer une annonce.");
    return;
  }

  if (!confirm("Voulez-vous vraiment supprimer cette annonce ?")) return;

  try {
    const response = await fetch(`http://localhost:3000/api/annonces/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert("Annonce supprimée avec succès !");
      afficherAnnonces();
    } else {
      const data = await response.json();
      alert(`Erreur: ${data.message}`);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    alert("Erreur lors de la suppression");
  }
}
async function modifierAnnonce(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Vous devez être connecté pour modifier une annonce.");
    return;
  }

  // Récupère les nouvelles valeurs via un prompt
  const nouveauTitre = prompt("Nouveau titre :");
  const nouvelleDescription = prompt("Nouvelle description :");
  const nouvelleAdresse = prompt("Nouvelle adresse :");
  const nouvelleVille = prompt("Nouvelle ville :");
  const nouveauPrix = prompt("Nouveau prix (€) :");
  const nouvelleImage = prompt("Nouvelle URL de l'image :");
  const nouvelleDuree = prompt("Nouvelle durée de location :");

  if (
    !nouveauTitre ||
    !nouvelleDescription ||
    !nouvelleAdresse ||
    !nouvelleVille ||
    !nouveauPrix ||
    !nouvelleImage ||
    !nouvelleDuree
  ) {
    alert("Tous les champs doivent être remplis.");
    return;
  }

  const annonceModifiee = {
    titre: nouveauTitre,
    description: nouvelleDescription,
    adresse: nouvelleAdresse,
    ville: nouvelleVille,
    prix: Number(nouveauPrix),
    image: nouvelleImage,
    duree: nouvelleDuree,
  };

  try {
    const response = await fetch(`http://localhost:3000/api/annonces/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(annonceModifiee),
    });

    if (response.ok) {
      alert("Annonce modifiée avec succès !");
      afficherAnnonces(); // Recharge les annonces mises à jour
    } else {
      const data = await response.json();
      alert(`Erreur: ${data.message}`);
    }
  } catch (error) {
    console.error("Erreur lors de la modification:", error);
    alert("Erreur lors de la modification");
  }
}

async function reserverAnnonce(id) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Vous devez être connecté pour réserver.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ annonceId: id, userId: userId }),
    });

    if (response.ok) {
      alert("Annonce réservée avec succès !");
    } else {
      const data = await response.json();
      alert(`Erreur: ${data.message}`);
    }
  } catch (error) {
    console.error("Erreur lors de la réservation:", error);
    alert("Erreur lors de la réservation");
  }
}

document
  .getElementById("searchForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const location = document.getElementById("locationInput").value.trim();
    const price = document.getElementById("priceInput").value.trim();

    let url = `/api/annonces?`;
    if (location) url += `lieu=${encodeURIComponent(location)}&`;
    if (price) url += `prix_max=${price}`;

    try {
      const response = await fetch(url);
      const annonces = await response.json();

      console.log("Annonces récupérées :", annonces); // Ajoutez cette ligne

      const container = document.getElementById("annoncesContainer");
      container.innerHTML = annonces.length
        ? annonces
            .map(
              (annonce) => `
              <div class="annonce">
                  <h3>${annonce.titre}</h3>
                  <p><strong>Ville:</strong> ${annonce.ville}</p>
                  <p><strong>Prix:</strong> ${annonce.prix}€</p>
                  <img src="${annonce.image}" alt="Image de l'annonce" style="max-width: 100%; height: auto;">
                  <button class="btn btn-success" onclick="reserverAnnonce('${annonce._id}')">Réserver</button>
              </div>
          `
            )
            .join("")
        : "<p>Aucune annonce trouvée</p>";
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  });
