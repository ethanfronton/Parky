document
  .getElementById("createParkingForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user")) || {}; // Évite une erreur si "user" est null
    console.log("👤 Utilisateur connecté :", user); // Vérifie si l'utilisateur est bien récupéré

    if (!user._id) {
      // Vérifie si l'ID est valide
      alert("Vous devez être connecté !");
      return (window.location.href = "login.html");
    }

    const adresse = document.getElementById("adresse").value;
    const prix = document.getElementById("prix").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").files[0];
    const durée = document.getElementById("durée").value;

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("adresse", adresse);
    formData.append("prix", prix);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("durée", durée);

    console.log("📤 FormData envoyée :", Object.fromEntries(formData)); // Vérifie ce qui est envoyé

    try {
      const response = await fetch("http://localhost:3000/create-parking", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Parking créé !");
        window.location.href = "../html/index.html";
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("❌ Erreur requête :", error);
    }
  });
