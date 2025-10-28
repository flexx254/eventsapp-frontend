// Fade-in hero text
window.addEventListener("load", () => {
  document.querySelector(".hero-content").style.opacity = "1";
});

// Scroll reveal for sections and images
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-section, .scroll-fade, .event-card img")
  .forEach(el => observer.observe(el));

// MENU TOGGLE
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navLinks.classList.toggle("show");
});
