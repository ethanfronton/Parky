document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('verticalNav');
    const toggleImg = document.getElementById('toggleNavImg');

    if (toggleImg) { // Vérifie que l'image existe bien
        toggleImg.addEventListener('click', () => {
            console.log('Image cliquée !');
            nav.classList.toggle('active');
        });
    }
});
