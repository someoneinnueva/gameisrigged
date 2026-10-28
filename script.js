// Mobile menu
const nav = document.querySelector('nav');
const toggle = document.querySelector('.nav-toggle');
if (nav && toggle) {
  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('.nav-links a').forEach((a) =>
    a.addEventListener('click', () => setOpen(false))
  );
}

// Light / dark toggle (the saved choice is applied in each page's <head>)
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
if (themeBtn) {
  const isLight = () => root.getAttribute('data-theme') === 'light';
  const syncLabel = () =>
    themeBtn.setAttribute('aria-label', isLight() ? 'Switch to dark mode' : 'Switch to light mode');
  syncLabel();
  themeBtn.addEventListener('click', () => {
    const next = isLight() ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncLabel();
  });
}

// Fade-up on scroll
const fadeEls = document.querySelectorAll('.fade-up');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { threshold: 0.1 }
  );
  fadeEls.forEach((el) => observer.observe(el));
} else {
  fadeEls.forEach((el) => el.classList.add('visible'));
}
