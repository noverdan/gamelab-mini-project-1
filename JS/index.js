// Sticky Navbar
window.addEventListener("scroll", function () {
    const header = document.querySelector(".navbar");
    header.classList.toggle("sticky", window.scrollY > 0);
    const logo = document.querySelector(".navbar img");
    if (window.scrollY > 0) {
        logo.src = "./asset/armos_logo.png";
    } else {
        logo.src = "./asset/armos_logo_white.png";
    }
});