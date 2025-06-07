document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("verticalNav");
  const toggleImg = document.getElementById("toggleNavImg");

  if (toggleImg) {
    toggleImg.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
});
// l'accès à index.html pour les utilisateurs non connectés.
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("index.html")) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté !");
      window.location.href = "../html/id.html";
    }
  }
});

// button deconnexion
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "../html/id.html";
});
//gérer la recherche d'annonces sur une page web, sans recharger la page (fonctionnement "AJAX")
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const annoncesContainer = document.getElementById("annoncesContainer");

  searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(searchForm);
    const queryString = new URLSearchParams(formData).toString();
    const response = await fetch(`/recherche?${queryString}`);
    const annonces = await response.json();
    afficherAnnonces(annonces);
  });

  function afficherAnnonces(annonces) {
    annoncesContainer.innerHTML = "";
    annonces.forEach((annonce) => {
      const annonceElement = document.createElement("div");
      annonceElement.classList.add("annonce");
      annonceElement.innerHTML = `
        <h3>${annonce.titre}</h3>
        <p>${annonce.description}</p>
        <p>Prix: ${annonce.prix} €</p>
        <p>Ville: ${annonce.ville}</p>
         <img src="${
           annonce.image || "https://via.placeholder.com/150"
         }" alt="Image de l'annonce" style="max-width: 100%; height: auto;">
            <button class="btn btn-success" onclick="reserverAnnonce('${
              annonce._id
            }')">Réserver</button>
      `;
      annoncesContainer.appendChild(annonceElement);
    });
  }
});
