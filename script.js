const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

const tabs = [...document.querySelectorAll('.screen-tab')];
const preview = document.querySelector('#iphone-preview');
const previewWords = document.querySelector('#preview-words');
const screenLabel = document.querySelector('#screen-label');
const screenCopy = document.querySelector('#screen-copy');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('active')) return;

    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });

    preview.classList.add('changing');
    const apply = () => {
      preview.src = tab.dataset.image;
      preview.alt = tab.dataset.alt;
      screenLabel.textContent = tab.dataset.label;
      screenCopy.textContent = tab.dataset.copy;
      previewWords.classList.toggle('hidden', tab.dataset.words !== 'true');
      preview.classList.remove('changing');
    };

    if (reduceMotion) apply();
    else window.setTimeout(apply, 160);
  });
});

const revealItems = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  revealItems.forEach((item) => observer.observe(item));
}

document.querySelector('#year').textContent = new Date().getFullYear();
