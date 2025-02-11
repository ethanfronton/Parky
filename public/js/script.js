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
