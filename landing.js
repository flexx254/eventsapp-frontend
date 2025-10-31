// Toggle menu open/close
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navLinks.classList.toggle("active");
});


window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  setTimeout(() => (loader.style.display = "none"), 600);
});
