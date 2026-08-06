// ===========================
// Smooth Fade-In Animation
// ===========================

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll("section").forEach((section) => {
    section.classList.add("hidden");
    observer.observe(section);
});


// ===========================
// Navbar Shadow on Scroll
// ===========================

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 30) {

        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.08)";

    } else {

        header.style.boxShadow = "none";

    }

});


// ===========================
// Hero Background Letter Effect
// ===========================

const letter = document.querySelector(".background-letter");

document.addEventListener("mousemove", (e) => {

    let x = (window.innerWidth / 2 - e.clientX) / 60;
    let y = (window.innerHeight / 2 - e.clientY) / 60;

    letter.style.transform =
        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

});