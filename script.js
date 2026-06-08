// SPLASH
const splashEl = document.getElementById('splash');
if (splashEl) {
  setTimeout(() => {
    splashEl.classList.add('hide');
    setTimeout(() => {
      splashEl.style.display = 'none';
    }, 800);
  }, 3500);
}

/* ── COUNTDOWN ── */
function updateCountdown() {
  const target = new Date('2026-08-21T00:00:00');
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    ['days','hours','mins','secs'].forEach(k => document.getElementById('cd-'+k).textContent = '00');
    return;
  }
  document.getElementById('cd-days').textContent  = String(Math.floor(diff / 86400000)).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0');
  document.getElementById('cd-mins').textContent  = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
  document.getElementById('cd-secs').textContent  = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  
});

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── ACTIVE NAV ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
sections.forEach(s => sectionObserver.observe(s));

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - navbar.offsetHeight - 10, behavior: 'smooth' });
  });
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.07) + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── TOAST ── */
function showToast(msg, color = '#3d8b2a') {
  const toast = document.createElement('div');
  toast.textContent = msg;
  Object.assign(toast.style, {
    position:'fixed', bottom:'28px', right:'28px', background: color, color:'white',
    padding:'14px 24px', borderRadius:'10px', fontSize:'14px', fontWeight:'700',
    zIndex:'9999', boxShadow:'0 8px 30px rgba(0,0,0,0.3)',
    opacity:'0', transform:'translateY(16px)', transition:'all 0.35s ease',
    fontFamily:"'DM Sans', sans-serif"
  });
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity='1'; toast.style.transform='translateY(0)'; }, 10);
  setTimeout(() => { toast.style.opacity='0'; toast.style.transform='translateY(16px)'; setTimeout(() => toast.remove(), 350); }, 2800);
}

/* ── INSCRIPTION ── */
document.getElementById('inscBtn')?.addEventListener('click', function() {
  this.textContent = '✅ Inscription confirmée !';
  this.style.background = '#3d8b2a';
  showToast('Inscription enregistrée — À bientôt au FEMAN !');
  setTimeout(() => { this.textContent = "S'inscrire gratuitement"; this.style.background = ''; }, 3000);
});

/* ── CONTACT FORM ── */
document.getElementById('contactBtn')?.addEventListener('click', function() {
  const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
  let valid = true;
  inputs.forEach(input => {
    input.style.borderColor = input.value.trim() ? '#3d8b2a' : '#e55a00';
    if (!input.value.trim()) valid = false;
  });
  if (valid) {
    this.textContent = '✅ Message envoyé !';
    this.style.background = '#3d8b2a';
    inputs.forEach(input => { input.value = ''; input.style.borderColor = ''; });
    showToast('Message envoyé — Merci pour votre message !');
    setTimeout(() => { this.textContent = 'Envoyer le message'; this.style.background = ''; }, 3000);
  }
});
/* GALERIE */
document.getElementById('block-photos').addEventListener('click', () => {
  document.getElementById('page-photos').classList.add('open');
  document.body.style.overflow = 'hidden';
});

document.getElementById('block-videos').addEventListener('click', () => {
  document.getElementById('page-videos').classList.add('open');
  document.body.style.overflow = 'hidden';
});

document.getElementById('block-direction').addEventListener('click', () => {
  document.getElementById('page-direction').classList.add('open');
  document.body.style.overflow = 'hidden';
});

document.querySelectorAll('.galerie-back').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.galerie-page').forEach(p => p.classList.remove('open'));
    document.body.style.overflow = '';
  });
});
/* PHOTO FULLSCREEN LIGHTBOX */
function openLightbox(photos, index) {
  const fs = document.createElement('div');
  fs.className = 'photo-fullscreen';
  fs.innerHTML = `
    <button class="lb-prev">&#8249;</button>
    <img src="${photos[index]}" alt="photo">
    <button class="lb-next">&#8250;</button>
    <button class="lb-close">✕</button>
  `;
  
  let current = index;
  
  fs.querySelector('.lb-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    current = (current - 1 + photos.length) % photos.length;
    fs.querySelector('img').src = photos[current];
  });
  
  fs.querySelector('.lb-next').addEventListener('click', (e) => {
    e.stopPropagation();
    current = (current + 1) % photos.length;
    fs.querySelector('img').src = photos[current];
  });
  
  fs.querySelector('.lb-close').addEventListener('click', () => fs.remove());
  fs.addEventListener('click', (e) => {
    if (e.target === fs) fs.remove();
  });
  
  document.body.appendChild(fs);
}

document.querySelectorAll('.galerie-placeholder').forEach((el, i, all) => {
  el.addEventListener('click', () => {
    const photos = [...all]
      .map(p => p.style.backgroundImage.replace(/url\(['"]?/, '').replace(/['"]?\)/, ''))
      .filter(url => url && url !== '');
    const index = photos.indexOf(
      el.style.backgroundImage.replace(/url\(['"]?/, '').replace(/['"]?\)/, '')
    );
    if (photos.length === 0) return;
    openLightbox(photos, index >= 0 ? index : 0);
  });
});
/* VIDEO FULLSCREEN */
document.getElementById('video-1').addEventListener('click', () => {
  const fs = document.createElement('div');
  fs.style.cssText = 'position:fixed;inset:0;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;cursor:pointer;';
  fs.innerHTML = `
    <iframe 
      src="https://www.youtube.com/embed/O7gmpGDD_Rg?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0" 
      style="width:90vw;height:80vh;border:none;border-radius:8px;" 
      allow="autoplay;fullscreen">
    </iframe>
    <button style="position:absolute;top:20px;right:24px;background:transparent;border:none;color:white;font-size:28px;cursor:pointer;" onclick="this.parentElement.remove()">✕</button>
  `;
  fs.addEventListener('click', (e) => { if(e.target === fs) fs.remove(); });
  document.body.appendChild(fs);
});
document.getElementById('video-2').addEventListener('click', () => {
  const fs = document.createElement('div');
  fs.style.cssText = 'position:fixed;inset:0;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;cursor:pointer;';
  fs.innerHTML = `
    <iframe 
      src="https://www.youtube.com/embed/TQszswcED1k?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0" 
      style="width:90vw;height:80vh;border:none;border-radius:8px;" 
      allow="autoplay;fullscreen">
    </iframe>
    <button style="position:absolute;top:20px;right:24px;background:transparent;border:none;color:white;font-size:28px;cursor:pointer;" onclick="this.parentElement.remove()">✕</button>
  `;
  fs.addEventListener('click', (e) => { if(e.target === fs) fs.remove(); });
  document.body.appendChild(fs);
});