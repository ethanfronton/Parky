document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (response.ok) {
        localStorage.setItem("user", JSON.stringify({ email })); // Stocker l'utilisateur AVANT redirection
        alert("Connexion réussie !");
        window.location.href = "../html/index.html"; // Redirection
    } else {
        alert(data.message);
    }
});
