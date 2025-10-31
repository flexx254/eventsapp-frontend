// Toggle menu open/close
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navLinks.classList.toggle("active");
});





const mic = document.querySelector('.mic');
const loader = document.getElementById('loader');
const fireworks = document.querySelector('.fireworks');
const pageContent = document.getElementById('page-content');
let fireInterval;

// Firework function
function fireDollars() {
  mic.classList.add('vibrate');
  setTimeout(() => mic.classList.remove('vibrate'), 400);

  for (let i = 0; i < 10; i++) {
    const dollar = document.createElement('div');
    dollar.classList.add('dollar');
    dollar.textContent = '$';
    const angle = Math.random() * Math.PI * 2;
    const distance = 150 + Math.random() * 100;
    const x = Math.cos(angle) * distance + 'px';
    const y = -Math.sin(angle) * distance + 'px';
    dollar.style.setProperty('--x', x);
    dollar.style.setProperty('--y', y);
    dollar.style.fontSize = 20 + Math.random() * 20 + 'px';
    fireworks.appendChild(dollar);
    setTimeout(() => dollar.remove(), 1500);
  }
}

// Run loader animation every 2s
fireInterval = setInterval(fireDollars, 2000);

// Stop loader when page fully loads
window.onload = () => {
  clearInterval(fireInterval);
  loader.classList.add('fade-out');
  setTimeout(() => {
    loader.style.display = 'none';
    pageContent.style.display = 'block';
  }, 1000);
};
