// Mobile menu
const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? 'Close' : 'Menu';
  });
}

// Footer year
document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Product filters (product.html)
const filterButtons = document.querySelectorAll('.filter');
const productCards = document.querySelectorAll('.product-card');

function applyFilter(category) {
  filterButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.filter === category));
  productCards.forEach((card) => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
});

// Links from the home page (product.html#durian etc.) open the matching filter
if (filterButtons.length && location.hash) {
  const wanted = location.hash.slice(1);
  if ([...filterButtons].some((btn) => btn.dataset.filter === wanted)) applyFilter(wanted);
}

// Photo lightbox (product.html)
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxImg = lightbox.querySelector('img');
  const closeLightbox = () => lightbox.classList.remove('open');

  document.querySelectorAll('.product-photo').forEach((btn) => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      lightboxImg.src = btn.dataset.full;
      lightboxImg.alt = img ? img.alt : '';
      lightbox.classList.add('open');
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}
