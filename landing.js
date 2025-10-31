// Toggle menu open/close
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navLinks.classList.toggle("active");
});



window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const floatersContainer = document.getElementById("floaters");
  const symbols = ["🎵", "🎶", "💲", "✨", "🎷", "💰"];

  // Create 12 random floating symbols
  for (let i = 0; i < 12; i++) {
    const span = document.createElement("span");
    span.classList.add("floater");
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // random horizontal position and delay
    const x = (Math.random() * 140 - 70) + "px";
    const delay = (Math.random() * 2) + "s";
    const duration = (Math.random() * 2 + 2) + "s";

    span.style.left = x;
    span.style.animationDelay = delay;
    span.style.animationDuration = duration;
    span.style.color = Math.random() > 0.5 ? "gold" : "#f5e19b";

    floatersContainer.appendChild(span);
  }

  // Remove loader after full load + smooth fade
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 2000); // loader shows for 2s after everything is loaded
});
