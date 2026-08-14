  const slides = document.querySelectorAll('.slide');
   const progressEl = document.getElementById('progress');
  const total  = slides.length;
  let i = 0;

  function show(n) {
    slides[i].classList.remove('active');
    i = (n + total) % total;
    slides[i].classList.add('active');
    document.getElementById('counter').textContent  = (i + 1) + ' / ' + total;
    
    // Avoid inline style writes (element.style.width) so the page works
    // under a strict CSP (style-src 'self') with no 'unsafe-inline'.
    for (let step = 1; step <= total; step++) {
      progressEl.classList.remove('progress-step-' + step);
    }
    progressEl.classList.add('progress-step-' + (i + 1));
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') show(i + 1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   show(i - 1);
  });

  let _tx = 0;
  document.addEventListener('touchstart', e => { _tx = e.touches[0].clientX; }, {passive:true});
  document.addEventListener('touchend',   e => {
    const dx = _tx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 48) dx > 0 ? show(i + 1) : show(i - 1);
  }, {passive:true});
  document.getElementById('prevBtn').addEventListener('click', () => show(i - 1));
  document.getElementById('nextBtn').addEventListener('click', () => show(i + 1));

  show(0);