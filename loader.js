const loader = document.getElementById('loader');
const micImg = document.querySelector('.mic-img');
const dollarLayer = document.querySelector('.dollar-layer');
const pageContent = document.getElementById('page-content');

// Vibrate mic and fire dollars
function vibrateMic() {
  micImg.classList.add('vibrate');
  createDollarBursts();
  setTimeout(() => micImg.classList.remove('vibrate'), 500);
}

// Create animated dollar signs
function createDollarBursts() {
  for (let i = 0; i < 10; i++) {
    const dollar = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    dollar.textContent = '$';
    dollar.setAttribute('x', '100');
    dollar.setAttribute('y', '100');
    dollar.setAttribute('fill', '#FFD700');
    dollar.setAttribute('font-size', '22');
    dollar.setAttribute('filter', 'drop-shadow(0 0 6px #FFD700)');
    dollarLayer.appendChild(dollar);

    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 60;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    // Animate outward
    dollar.animate([
      { transform: 'translate(0,0)', opacity: 1 },
      { transform: `translate(${x}px, ${y}px) scale(0.5)`, opacity: 0 }
    ], {
      duration: 1500,
      easing: 'ease-out',
      fill: 'forwards'
    });

    setTimeout(() => dollar.remove(), 1500);
  }
}

// Vibrate every 2 seconds
let vibrateInterval = setInterval(vibrateMic, 2000);

// Start loader immediately
document.addEventListener("DOMContentLoaded", () => {
  vibrateMic(); // ensure at least one vibration right away
});

// Fade out once everything (images, scripts, etc.) is fully loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    clearInterval(vibrateInterval);
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
      pageContent.style.display = 'block';
    }, 800);
  }, 1800); // ensure at least one visible vibration
});
