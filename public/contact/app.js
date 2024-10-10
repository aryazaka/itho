document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("loginButton");
    const signinButton = document.getElementById("signinButton");
    const profileIcon = document.getElementById("profileIcon");
    const contactForm = document.getElementById("contactForm");
    const textarea = contactForm.querySelector("textarea");

    // Trigger animations with a delay
    setTimeout(() => {
        loginButton.classList.add("show"); // Show Log In button
        signinButton.classList.add("show"); // Show Sign In button
    }, 700); // Delay for buttons

    setTimeout(() => {
        profileIcon.classList.add("show"); // Show profile icon
    }, 900); // Delay for profile icon

    setTimeout(() => {
        contactForm.classList.add("show"); // Show contact form
    }, 1100); // Delay for contact form
});