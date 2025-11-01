(() => {
  const loader = document.getElementById('loader');
  const micWrap = document.getElementById('micWrap');
  const pageContent = document.getElementById('page-content');

  const BURST_INTERVAL = 2000;  // every 2 seconds
  const BURST_DURATION = 420;   // vibration duration (ms)
  const DOLLAR_COUNT = 12;      // per burst
  let hasBurstOnce = false;
  let burstTimer = null;

  // Create a burst (vibrate + dollars)
  function doBurst() {
    hasBurstOnce = true;
    micWrap.classList.add('mic-vibrate', 'mic-glow');

    setTimeout(() => {
      micWrap.classList.remove('mic-vibrate', 'mic-glow');
    }, BURST_DURATION);

    // equally spread around the mic
    for (let i = 0; i < DOLLAR_COUNT; i++) {
      const dollar = document.createElement('div');
      dollar.className = 'dollar';
      dollar.textContent = '$';

      const angle = (i / DOLLAR_COUNT) * Math.PI * 2;
      const distance = 120 + Math.random() * 120;
      const x = Math.cos(angle) * distance + 'px';
      const y = -Math.sin(angle) * distance + 'px';

      const size = 16 + Math.random() * 20;
      const dur = 1.8 + Math.random() * 1.2;

      dollar.style.fontSize = `${size}px`;
      dollar.style.setProperty('--x', x);
      dollar.style.setProperty('--y', y);
      dollar.style.animation = `dollarBurst ${dur}s ease-out forwards`;

      loader.appendChild(dollar);

      setTimeout(() => dollar.remove(), dur * 1000 + 200);
    }
  }

  function startBursts() {
    doBurst();
    burstTimer = setInterval(doBurst, BURST_INTERVAL);
  }

  function stopBursts() {
    clearInterval(burstTimer);
    burstTimer = null;
  }

  startBursts();

  window.addEventListener('load', () => {
    // Ensure at least one burst occurs
    if (!hasBurstOnce) doBurst();

    stopBursts();
    micWrap.classList.remove('mic-vibrate', 'mic-glow');

    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
        pageContent.style.display = 'block';
      }, 900);
    }, 800);
  });
})();
