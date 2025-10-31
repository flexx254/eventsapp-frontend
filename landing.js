// Toggle menu open/close
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navLinks.classList.toggle("active");
});




const loader = document.getElementById('loader');
const mic = document.querySelector('.mic');

function fireDollars() {
  for (let i = 0; i < 12; i++) {
    const dollar = document.createElement('div');
    dollar.classList.add('dollar');
    dollar.textContent = '$';
    
    // random directions for firework
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 150 + 80;
    const x = Math.cos(angle) * distance + 'px';
    const y = -(Math.sin(angle) * distance + 50) + 'px';
    
    dollar.style.setProperty('--x', x);
    dollar.style.setProperty('--y', y);
    
    loader.appendChild(dollar);
    setTimeout(() => dollar.remove(), 1500);
  }
}

// shoot every 2 seconds
const interval = setInterval(fireDollars, 2000);

// stop loader when page fully loads
window.addEventListener('load', () => {
  clearInterval(interval);
  loader.classList.add('fade-out');
  setTimeout(() => loader.remove(), 800);
});
