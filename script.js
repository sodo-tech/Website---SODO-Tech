// ——— CUSTOM CURSOR ———
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
const enableCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches && cursor && ring;

if (enableCursor) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      ring.style.width = '60px';
      ring.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      ring.style.width = '40px';
      ring.style.height = '40px';
    });
  });
}

// ——— SCROLL REVEAL for service cards ———
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.service-card').forEach(el => observer.observe(el));

// CTA reveal
const ctaObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.2 });
document.querySelectorAll('.cta-inner').forEach(el => ctaObserver.observe(el));

// ——— SCROLLYTELLING: Process section ———
const steps = document.querySelectorAll('.process-step');
const bigNum = document.getElementById('bigNum');
const bigNumLabel = document.getElementById('bigNumLabel');

const colors = [
  'linear-gradient(135deg,#FF3CAC,#784BA0)',
  'linear-gradient(135deg,#00F5D4,#2B86C5)',
  'linear-gradient(135deg,#FFDE59,#FF6B35)',
  'linear-gradient(135deg,#FF6B35,#FF3CAC)'
];

if (steps.length && bigNum && bigNumLabel) {
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && e.intersectionRatio > 0.5) {
        steps.forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');
        const num = e.target.dataset.num;
        const label = e.target.dataset.label;
        const idx = Array.from(steps).indexOf(e.target);

        bigNum.style.transition = 'all 0.4s cubic-bezier(0.16,1,0.3,1)';
        bigNum.style.transform = 'scale(0.8)';
        bigNum.style.opacity = '0';
        setTimeout(() => {
          bigNum.textContent = num;
          bigNum.style.background = colors[idx] || colors[0];
          bigNum.style.webkitBackgroundClip = 'text';
          bigNum.style.webkitTextFillColor = 'transparent';
          bigNum.style.backgroundClip = 'text';
          bigNum.style.transform = 'scale(1)';
          bigNum.style.opacity = '1';
          bigNumLabel.textContent = label;
        }, 200);
      }
    });
  }, { threshold: 0.5 });

  steps.forEach(s => stepObserver.observe(s));
}

// ——— PARALLAX on hero blobs ———
const blobs = document.querySelectorAll('.blob');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  blobs.forEach((b, i) => {
    const speed = [0.3, 0.2, 0.1][i] || 0.15;
    b.style.transform = `translateY(${y * speed}px)`;
  });
});

// ——— Submit form feedback + privacy checkbox ———
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = contactForm.querySelector('.btn-submit');
  const privacyConsent = document.getElementById('privacyConsent');
  const privacyConsentError = document.getElementById('privacyConsentError');

  contactForm.addEventListener('submit', (e) => {
    if (privacyConsentError) privacyConsentError.textContent = '';

    if (!privacyConsent || !privacyConsent.checked) {
      e.preventDefault();
      if (privacyConsentError) {
        privacyConsentError.textContent = 'Per continuare devi confermare di aver letto la Privacy Policy.';
      }
      if (privacyConsent) privacyConsent.focus();
      return;
    }

    if (!contactForm.checkValidity()) {
      e.preventDefault();
      contactForm.reportValidity();
      return;
    }

    e.preventDefault();
    if (submitBtn) {
      submitBtn.textContent = '✓ Inviato!';
      submitBtn.style.background = 'var(--c5)';
      setTimeout(() => {
        submitBtn.textContent = 'Scrivici';
        submitBtn.style.background = 'var(--c4)';
        contactForm.reset();
      }, 2500);
    }
  });
}

// ——— MOBILE MENU ———
const toggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

// ——— Reveal animazione pagina servizi ———
document.querySelectorAll('.service-detail').forEach(el => observer.observe(el));

// Disattiva scrollytelling su mobile
if (window.innerWidth < 900) {
  const bigNum = document.getElementById('bigNum');
  const bigNumLabel = document.getElementById('bigNumLabel');
  if (bigNum && bigNumLabel) {
    bigNum.style.display = "none";
    bigNumLabel.style.display = "none";
  }
}
