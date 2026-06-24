/* ==============================
   CURSOR GLOW
============================== */
const glow = document.getElementById('cursorGlow');
if (glow) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ==============================
   NAV — SCROLL SHADOW & ACTIVE LINK
============================== */
const nav     = document.getElementById('mainNav');
const sections = document.querySelectorAll('section[id]');
const navAs   = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  /* Add shadow when scrolled */
  nav.classList.toggle('scrolled', window.scrollY > 40);

  /* Highlight active section in desktop nav */
  let cur = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) cur = sec.id;
  });
  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

/* ==============================
   SCROLL REVEAL (re-triggers every time)
============================== */
const revealEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    } else {
      // Remove class when element leaves viewport so it animates again on re-entry
      entry.target.classList.remove('in');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revObs.observe(el));

/* ==============================
   DESKTOP NAV — ACTIVE ON CLICK
============================== */
navAs.forEach(a => {
  a.addEventListener('click', () => {
    navAs.forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  });
});

/* ==============================
   HAMBURGER MENU (MOBILE)
============================== */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('a');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
});

/* Close drawer on link click */
mobileLinks.forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileLinks.forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  });
});

/* Sync mobile active link with scroll */
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) cur = sec.id;
  });
  mobileLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

