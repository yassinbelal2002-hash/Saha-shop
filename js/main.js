/* ============================================================
   SAHA — main.js
   Scroll animations · Mobile nav · Shop filter · Accordions
   Product page: size selector, qty stepper, gallery
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initMobileNav();
  initShopFilter();
  initAccordions();
  initProductPage();
  initStickyNav();
});

/* ── Intersection Observer Scroll Animations ──────────────── */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); /* fire once */
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

/* ── Sticky Nav Scroll Behaviour ──────────────────────────── */
function initStickyNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastY = window.scrollY;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    /* Slightly deepen the backdrop on scroll */
    if (y > 60) {
      nav.style.background = 'rgba(247, 244, 239, 0.96)';
    } else {
      nav.style.background = 'rgba(247, 244, 239, 0.82)';
    }
    lastY = y;
  }, { passive: true });
}

/* ── Mobile Nav Toggle ────────────────────────────────────── */
function initMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const nav       = document.querySelector('.nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
    const expanded = nav.classList.contains('nav--open');
    hamburger.setAttribute('aria-expanded', expanded);
  });

  /* Close on menu link click */
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
    });
  });
}

/* ── Shop Page Filter ─────────────────────────────────────── */
function initShopFilter() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.product-card[data-category]');
  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      /* update active pill */
      pills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');

      const filter = pill.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
}

/* ── Accordion Sections ───────────────────────────────────── */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion');
  if (!accordions.length) return;

  accordions.forEach(acc => {
    const trigger = acc.querySelector('.accordion__trigger');
    const body    = acc.querySelector('.accordion__body');
    if (!trigger || !body) return;

    /* Open first accordion by default on product page */
    if (acc.dataset.defaultOpen) {
      acc.classList.add('is-open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }

    trigger.addEventListener('click', () => {
      const isOpen = acc.classList.contains('is-open');

      /* Close all others in the group */
      const group = acc.closest('.accordion-group');
      if (group) {
        group.querySelectorAll('.accordion.is-open').forEach(other => {
          if (other !== acc) {
            other.classList.remove('is-open');
            other.querySelector('.accordion__body').style.maxHeight = '0';
          }
        });
      }

      /* Toggle this one */
      if (isOpen) {
        acc.classList.remove('is-open');
        body.style.maxHeight = '0';
      } else {
        acc.classList.add('is-open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ── Product Page Logic ───────────────────────────────────── */
function initProductPage() {
  initSizeSelector();
  initQtyStepper();
  initProductGallery();
  initAddToCart();
}

/* Size selector */
function initSizeSelector() {
  const btns = document.querySelectorAll('.size-btn');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      if (typeof cart !== 'undefined') {
        cart.selectedSize = btn.dataset.size;
      }
    });
  });
}

/* Quantity stepper */
function initQtyStepper() {
  const display = document.getElementById('product-qty-val');
  const minusBtn = document.getElementById('product-qty-minus');
  const plusBtn  = document.getElementById('product-qty-plus');
  if (!display) return;

  let qty = 1;

  function update() {
    display.textContent = qty;
    if (minusBtn) minusBtn.disabled = qty <= 1;
  }

  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      if (qty > 1) { qty--; update(); }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      qty++;
      update();
    });
  }

  update();

  /* Expose for add-to-cart */
  window._productQty = () => qty;
}

/* Gallery thumbnail switcher */
function initProductGallery() {
  const thumbs  = document.querySelectorAll('.product-gallery__thumb');
  const mainImg = document.getElementById('product-main-img');
  if (!thumbs.length || !mainImg) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
      mainImg.src = thumb.querySelector('img').src;
    });
  });
}

/* Add to cart (product page) */
function initAddToCart() {
  const addBtn = document.getElementById('add-to-cart-btn');
  if (!addBtn) return;

  addBtn.addEventListener('click', () => {
    const activeSize = document.querySelector('.size-btn.is-active');
    const size = activeSize ? activeSize.dataset.size : '30ml';
    const qty  = window._productQty ? window._productQty() : 1;

    /* Product page is always product id 1 (Nile Rose Radiance Serum) */
    for (let i = 0; i < qty; i++) {
      cart.addItem(1, size);
    }

    /* Visual feedback */
    const original = addBtn.textContent;
    addBtn.textContent = '✓ Added to Bag';
    addBtn.style.background = '#4a7c59';
    setTimeout(() => {
      addBtn.textContent = original;
      addBtn.style.background = '';
    }, 1800);
  });
}
