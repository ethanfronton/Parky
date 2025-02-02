// verticle nav
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("verticalNav");
  const toggleImg = document.getElementById("toggleNavImg");

  if (toggleImg) {
    toggleImg.addEventListener("click", () => {
      console.log("Image cliquée !");
      nav.classList.toggle("active");
    });
  }
});
// connection de l'user
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("index.html")) {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Vous devez être connecté !");
      window.location.href = "../html/id.html";
    }
  }
});
//button deconnexion
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "../html/id.html";
});
