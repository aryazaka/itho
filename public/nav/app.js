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
});