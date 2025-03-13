document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("verticalNav");
  const toggleImg = document.getElementById("toggleNavImg");

  if (toggleImg) {
    toggleImg.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
});

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
      `;
      annoncesContainer.appendChild(annonceElement);
    });
  }
});
