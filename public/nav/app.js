// JavaScript for text and button animations
document.addEventListener("DOMContentLoaded", function() {
    const textContent = document.getElementById("textContent");
    const loginButton = document.getElementById("loginButton");
    const signinButton = document.getElementById("signinButton");
    const profileIcon = document.getElementById("profileIcon");

    // Trigger animations with a delay
    setTimeout(() => {
        textContent.classList.add("show"); // Show text
    }, 500); // Delay for text

    setTimeout(() => {
        loginButton.classList.add("show"); // Show Log In button
        signinButton.classList.add("show"); // Show Sign In button
    }, 700); // Delay for buttons

    setTimeout(() => {
        profileIcon.classList.add("show"); // Show profile icon
    }, 900); // Delay for profile icon

    // Pop-up logic
    const popupMenu = document.getElementById('popupMenu');
    popupMenu.style.display = 'none'; // Ensure pop-up is hidden initially

    profileIcon.addEventListener('click', function(event) {
        // Tampilkan pop-up hanya ketika ikon profil diklik
        popupMenu.style.display = 'block';
        event.stopPropagation(); // Menghindari event bubbling
    });

    // Menyembunyikan pop-up ketika mengklik di luar
    window.addEventListener('click', function(event) {
        if (!event.target.matches('#profileIcon') && !popupMenu.contains(event.target)) {
            popupMenu.style.display = 'none';
        }
    });
});