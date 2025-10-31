// Toggle menu open/close
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navLinks.classList.toggle("active");
});




