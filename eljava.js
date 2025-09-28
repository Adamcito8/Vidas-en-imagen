/* -----------------------
   TYPING EFFECT (eslogan en index)
-------------------------- */
(function(){
  const el = document.getElementById('slogan');
  if(!el) return;
  const text = el.dataset.text || el.textContent;
  el.textContent = '';
  let i = 0;
  const speed = 45;
  function type() {
    if(i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(type, speed);
    }
  }
  setTimeout(type, 500);
})();

/* -----------------------
   FADE-IN / REVEAL ON SCROLL
-------------------------- */
(function(){
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('active');
      });
    }, {threshold: 0.15});
    reveals.forEach(r => obs.observe(r));
  } else {
    // fallback
    window.addEventListener('scroll', () => {
      reveals.forEach(r => {
        const top = r.getBoundingClientRect().top;
        if(top < window.innerHeight - 100) r.classList.add('active');
      });
    });
    // trigger once
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 200);
  }
})();

/* -----------------------
   FORM: RESERVAR (mostrar mensaje bonito)
-------------------------- */
(function(){
  const form = document.getElementById('reserveForm');
  if(!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Mensaje visual en el formulario
    let msg = form.querySelector('.form-msg');
    if(!msg){
      msg = document.createElement('div');
      msg.className = 'form-msg';
      msg.style.padding = '8px';
      msg.style.marginTop = '8px';
      msg.style.borderRadius = '8px';
      msg.style.background = '#e6f7ea';
      msg.style.color = '#1e6b3a';
      msg.style.fontWeight = '700';
      form.appendChild(msg);
    }
    msg.textContent = '¡Datos enviados!';

    setTimeout(() => {
      msg.remove();
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar reserva';
    }, 1800);
  });
})();

/* -----------------------
   LIGHTBOX / MODAL PARA GALERÍA
-------------------------- */
(function(){
  const galleryImgs = document.querySelectorAll('.gallery-row img');
  if(!galleryImgs || galleryImgs.length === 0) return;

  // Crear modal (una sola vez)
  let modal = document.createElement('div');
  modal.className = 'lightbox';
  modal.style.display = 'none';
  modal.innerHTML = '<button class="close-btn">Cerrar ✕</button><img src="" alt="Ampliada">';
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('img');
  const closeBtn = modal.querySelector('.close-btn');

  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', (e) => {
    if(e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
})();