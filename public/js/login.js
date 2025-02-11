document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("Login response:", data);

        if (response.ok) {
            localStorage.setItem("token", data.token);
            console.log("Token stocké:", localStorage.getItem("token"));

            alert("Connexion réussie !");

            const token = localStorage.getItem("token");

            // Vérification de l'utilisateur connecté
            const userResponse = await fetch("http://localhost:3000/me", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });

            const userData = await userResponse.json();
            console.log("User response:", userData);

            if (userResponse.ok) {
                console.log("Utilisateur connecté:", userData);

                // Vérifie si on récupère bien un email
                if (userData.email) { 
                    alert(`Connecté en tant que : ${userData.email}`);
                } else {
                    alert("Erreur : utilisateur non reconnu");
                }

                window.location.href = "../html/index.html"; // Redirection après connexion
            } else {
                console.error("Erreur lors de la récupération des informations utilisateur:", userData.message);
                alert("Erreur lors de la récupération des informations utilisateur");
            }
        } else {
            console.error("Erreur de connexion:", data.message);
            alert(data.message);
        }
    } catch (error) {
        console.error("Erreur lors de la requête:", error);
        alert("Erreur lors de la requête");
    }
});
