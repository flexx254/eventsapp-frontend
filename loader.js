window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.classList.add("hidden"); // fade out smoothly
  setTimeout(() => loader.remove(), 600); // remove from DOM after fade
});
