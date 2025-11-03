/* Alternating Fireworks Loader
   - Alternates musical-note and dollar fireworks every INTERVAL ms
   - Ensures both types have shown at least once before allowing hide
   - Hides (fade-out) only after window 'load' and bothShown === true
   - Uses SVG elements for crisp symbols and gradient fill (#goldGrad)
*/

(() => {
  const INTERVAL = 1600;        // interval between bursts (ms)
  const COUNT = 12;            // symbols per burst (spread equally)
  const MIN_DISTANCE = 110;    // px
  const MAX_DISTANCE = 250;    // px
  const MIN_DURATION = 1400;   // ms
  const MAX_DURATION = 2100;   // ms

  const loader = document.getElementById('loader');
  const fireContainer = document.getElementById('fire-container');

  let showMusical = false;
  let showDollar = false;
  let mode = 'notes'; // start with musical notes
  let intervalId = null;
  let pageLoaded = false;

  // create one burst of type: 'notes' or 'dollars'
  function createBurst(type) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // evenly distribute COUNT symbols around the circle
    for (let i = 0; i < COUNT; i++) {
      // base angle evenly spaced
      const baseAngle = (i / COUNT) * Math.PI * 2;
      // small jitter so identical spacing doesn't look mechanical
      const jitter = (Math.random() - 0.5) * (Math.PI / (COUNT * 0.2));
      const angle = baseAngle + jitter;

      const distance = MIN_DISTANCE + Math.random() * (MAX_DISTANCE - MIN_DISTANCE);
      const x = Math.cos(angle) * distance;
      const y = -Math.sin(angle) * distance; // negative so positive sin goes up visually

      const rot = (Math.random() - 0.5) * 40 + 'deg';

      // duration random
      const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);

      // make svg wrapper
      const svgWrap = document.createElement('div');
      svgWrap.className = 'fire-item ' + (type === 'notes' ? 'fire-note' : 'fire-dollar');

      // position wrapper at center (we use left/top and translate(-50%,-50%) in CSS)
      svgWrap.style.left = centerX + 'px';
      svgWrap.style.top = centerY + 'px';

      // CSS vars for animation target
      svgWrap.style.setProperty('--x', `${x}px`);
      svgWrap.style.setProperty('--y', `${y}px`);
      svgWrap.style.setProperty('--r', rot);

      // set animation
      svgWrap.style.animation = `fireMove ${duration}ms cubic-bezier(.12,.9,.25,1) forwards`;

      // create SVG symbol
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', '34');
      svg.setAttribute('height', '34');
      svg.setAttribute('aria-hidden', 'true');
      svg.style.display = 'block';

      // create shape depending on type
      if (type === 'notes') {
        // musical quaver/ note path (stylized)
        const path = document.createElementNS(ns, 'path');
        path.setAttribute('d', 'M17 3v10.55A4 4 0 1 0 15 17V7H9V5h8z'); // stylized note
        path.setAttribute('fill', 'url(#goldGrad)');
        svg.appendChild(path);

        // small circle (the note head) add for depth
        const circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('cx', '6');
        circle.setAttribute('cy', '17');
        circle.setAttribute('r', '2.3');
        circle.setAttribute('fill', 'url(#goldGrad)');
        svg.appendChild(circle);
      } else {
        // dollar sign: use text or path; we'll use path for crisp look
        const path = document.createElementNS(ns, 'path');
        // approximate dollar path
        path.setAttribute('d', 'M12 1c-1 0-2 .5-2 1.5S11 4 12 4c1 0 2 .5 2 1.5S13 7 12 7 10 7.5 10 8.5 11 10 12 10s2 .5 2 1.5S13 13 12 13c-1 0-2-.5-2-1.5');
        // Add vertical line
        const line = document.createElementNS(ns, 'path');
        line.setAttribute('d', 'M12 0v24');
        line.setAttribute('stroke', 'url(#goldGrad)');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-linecap', 'round');

        path.setAttribute('fill', 'url(#goldGrad)');
        svg.appendChild(path);
        svg.appendChild(line);
      }

      svgWrap.appendChild(svg);
      fireContainer.appendChild(svgWrap);

      // cleanup after animation ends
      const cleanup = () => {
        if (svgWrap && svgWrap.parentNode) svgWrap.parentNode.removeChild(svgWrap);
      };
      // use animationend listener
      svgWrap.addEventListener('animationend', cleanup, { once: true });
      // safety remove after duration + 300ms
      setTimeout(cleanup, duration + 400);
    }
  }

  // single alternation: call createBurst and flip mode
  function doAlternation() {
    if (mode === 'notes') {
      createBurst('notes');
      showMusical = true;
      mode = 'dollars';
    } else {
      createBurst('dollars');
      showDollar = true;
      mode = 'notes';
    }
  }

  // start alternation loop immediately
  function startLoop() {
    // immediate first burst
    doAlternation();
    // set repeating interval
    intervalId = setInterval(doAlternation, INTERVAL);
  }

  // stop loop
  function stopLoop() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // start right away
  startLoop();

  // page load handling: hide only after both types have shown
  window.addEventListener('load', () => {
    pageLoaded = true;
    // if both types already shown -> hide now
    if (showMusical && showDollar) {
      proceedToHide();
    } else {
      // otherwise wait until both become true; set up a watcher via setInterval small poll
      const waitCheck = setInterval(() => {
        if (showMusical && showDollar) {
          clearInterval(waitCheck);
          proceedToHide();
        }
      }, 120);
      // Safety: also do a hard timeout (in case something odd) to avoid loader stuck (10s)
      setTimeout(() => {
        if (!showMusical || !showDollar) {
          // ensure at least the missing burst(s) run
          if (!showMusical) createBurst('notes');
          if (!showDollar) createBurst('dollars');
          // hide after a small delay
          setTimeout(proceedToHide, 800);
        }
      }, 10000);
    }
  });

  function proceedToHide() {
    // give a tiny pause so last animation is visible, then fade
    stopLoop();
    setTimeout(() => {
      loader.classList.add('fade-out');
      // remove from DOM after fade
      setTimeout(() => {
        if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
      }, 800);
    }, 500);
  }

  // expose for debug/testing
  window.__fireworkLoader = {
    stop: stopLoop,
    start: startLoop,
    doAlternation,
  };
})();
