// Empossible — main.js

// Scroll reveal
const revealEls = document.querySelectorAll('.scroll-reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// Mobile menu
const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
}

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card[data-cat]');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Custom package builder price estimate
const packageItems = document.querySelectorAll('.pkg-item input[type=checkbox], .pkg-item select');
const estimateDisplay = document.getElementById('pkg-estimate');
if (packageItems.length && estimateDisplay) {
  const updateEstimate = () => {
    let total = 0;
    packageItems.forEach(input => {
      if (input.type === 'checkbox' && input.checked) {
        total += parseFloat(input.dataset.price || 0);
      } else if (input.tagName === 'SELECT') {
        total += parseFloat(input.value || 0);
      }
    });
    estimateDisplay.textContent = '$' + total.toLocaleString();
  };
  packageItems.forEach(input => input.addEventListener('change', updateEstimate));
  updateEstimate();
}
