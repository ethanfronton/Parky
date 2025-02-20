document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM chargé, affichage des annonces...");
  afficherAnnonces();
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

    if (!titre || !description || !adresse || !ville || !prix || !imageUrl || !duree || !proprietaire_id) {
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
        afficherAnnonces();
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
async function afficherAnnonces() {
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
    annonces.forEach((annonce) => {
      const div = document.createElement("div");
      div.className = "annonce";
      div.innerHTML = `
        <h3>${annonce.titre}</h3>
        <p>${annonce.description}</p>
        <p>${annonce.adresse}</p>
        <p class="prix">${annonce.prix}€</p>
        <img src="${annonce.image}" alt="Image de l'annonce">
        <button class="btn btn-danger" onclick="supprimerAnnonce('${annonce._id}')">Supprimer</button>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Erreur lors de l'affichage des annonces:", error);
  }
}

// Fonction pour supprimer une annonce
async function supprimerAnnonce(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Vous devez être connecté pour supprimer une annonce !");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/annonces/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (response.ok) {
      alert("Annonce supprimée avec succès !");
      afficherAnnonces();
    } else {
      const data = await response.json();
      alert(`Erreur: ${data.message}`);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'annonce:", error);
    alert("Erreur lors de la suppression de l'annonce");
  }
}

// Route pour supprimer une annonce
app.delete('/api/annonces/:id', auth, async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);

    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    // Vérifiez que l'utilisateur connecté est le propriétaire de l'annonce
    if (annonce.proprietaire_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cette annonce" });
    }

    await annonce.remove();
    res.json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'annonce:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
