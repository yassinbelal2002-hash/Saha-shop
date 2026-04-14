/* ============================================================
   SAHA — cart.js
   Cart state, drawer UI, add-to-cart logic
   No localStorage — all in-memory JS variable
   ============================================================ */

'use strict';

/* ── Product catalogue (shared across pages) ──────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: 'Nile Rose Radiance Serum',
    category: 'serums',
    price: 480,
    href: 'product.html',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfAkcQiCTyweJ4NrwA0C2I-lfVTGyxWjFg0UdLUYfu19YSA5pK1bRgsJtrAF2vo-GCwmoFbQbvFj4QC0rWM7VOXp38wpQYetRMyVQU2S_-7vmmDEgc-b6P0ci3vjhQ4Qhi0DN8vO5ZzESO_z1_7COR_TbsCBLrGa9lsyLZo62qajRdawtKKLnijOky9Cs19QjXr47OEtOzMtch33oa2-z17oi5GtUoivToy2H5IlHDFkJV9hgKx2he5d_Nrd45yDb_O7OHR58uIRhw',
  },
  {
    id: 2,
    name: 'Desert Dew Barrier Cream',
    category: 'moisturisers',
    price: 360,
    href: 'product.html',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8XGS7Mf3thqVLmtx0ukAxf99URr__G-hcfQAzjApuXHSkTociYpvdQfTnvddhMf48YOLVOYQ6HSq54iHUef2CyuE3rKDN-dh5twWKNpfWhKMBHFdY6oVUgYpDR05wpNFZQ5nJdPnhaPjnIc9B_hY-tgD6-vY162KJ-xvrPmPMA4wkZBkbeREmPyXyn-uWxt-38GPboC1VHOapoWexjhU6dyrtRVqMRGX6EwytqlOwPfiEeH1KE3_VL-gsyJ1i-Jh3eczy_5abTmZc',
  },
  {
    id: 3,
    name: 'Black Seed Foam Wash',
    category: 'cleansers',
    price: 290,
    href: 'product.html',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArj2AepnD00PjrT3-GOE4NsbK2J8qctsYCD2nhzZ7GtNYgDYloEBw1M5Z-bVI58_IPeyO5BuDoAUTwneDqk0uyniX--qoU4F82GyidCSj1ZCMJofKpONnJvq4ICV9WvcZnxwxScgcb7ckmddTUeJUxKTO6lrdQqTcyZqF7txpjLyL9KUL69uC6YbxyAdlOmRZH-GQIFaokwKUFOft09OoTXyc87TfCV-UuHPnm9XNJCNpOeD3xX5Khq0PAfwy_RHT2dB8gZSMhr-P3',
  },
  {
    id: 4,
    name: 'Khamsin Exfoliant Mask',
    category: 'treatments',
    price: 320,
    href: 'product.html',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAknEQcO3ZZHVJv7tZEb4SRIBExevNBtXt4GMEGd1o9BvC9oBfLUDFw5Dkl9IjE3GYDuQ8URYvLj1ipwXSPHabQgwW1gW1iGGt6ZHm_3cNniVLoz9HPhwQOtz6jVQKh9vnxtnnQQdJMvxVY7HGu7CMZayca_uZnVdQ6mphBmCrkAnPlxwFprrN7Znh4UitPfyqLCwtIAUJ3kMsz2R67LMpcO_FW76WIdGtNGsfU-AOP9yonO281LGAunk_H3aO7ng4Svd24wyqQpZO_',
  },
  {
    id: 5,
    name: 'Lotus Recovery Oil',
    category: 'treatments',
    price: 520,
    href: 'product.html',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRh5myh0bj2gP-jzR044bSoH1tU-CD0PQvM8313UlTUxDxwHoltRErOekgP5_wjzgtydNcY-oIawSGu-V9ocgYkorNDuS4PX1EfZgIaIDEzkU0ABTweP4s-_5t5bVEl0pv3oZBtyvvnUCx-OSVn2aMcNHXO4uYOWfXLaX_A4FfqxAi4G3cHMckSBaRVmFnLbd7NE0HHHwRWNhukCusf5_3Q0UoS-OEzSLVZIrJmbT4q7K_hWBAMzBo98BRUI_PN_F8V-xJE-JSFRst',
  },
  {
    id: 6,
    name: 'Calendula Eye Balm',
    category: 'treatments',
    price: 240,
    href: 'product.html',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS2CYi0-ahONS9-DDqPhOYWrrYpkZFf44esxNSrbYb_7JhBuOlRkxX1CmS_Dm5xPO0gOBYpj8hoY1do1fAnKxoUWLM-s27sktn8vyIoHzUoNwuaPYjX8uynj53_F2Ou1JIhAWSi7sreXZbbvGNljorO3BgdHFYTRDOdVm7ei0mA0aWqAil9qTfAb2PJsYrSxlvWzMTYhy04f_crNzhFjIPb24fHKgrqK42hsbI5Fo2Yu6j7bVcQrWBmL8NR8KyXgGMa8aE5gRz-CRA',
  },
];

/* ── Cart State ────────────────────────────────────────────── */
const cart = {
  items: [],        // [{ id, name, price, qty, size, img }]
  selectedSize: '30ml',

  /* Add or increment an item */
  addItem(productId, size) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const resolvedSize = size || this.selectedSize || '30ml';
    const key = `${productId}-${resolvedSize}`;
    const existing = this.items.find(i => i.key === key);

    if (existing) {
      existing.qty++;
    } else {
      this.items.push({
        key,
        id: product.id,
        name: product.name,
        price: product.price,
        size: resolvedSize,
        img: product.img,
        qty: 1,
      });
    }

    this._updateBadge();
    this.renderDrawer();
    this.openDrawer();
  },

  /* Remove a line item */
  removeItem(key) {
    this.items = this.items.filter(i => i.key !== key);
    this._updateBadge();
    this.renderDrawer();
  },

  /* Change quantity, remove if 0 */
  updateQty(key, delta) {
    const item = this.items.find(i => i.key === key);
    if (!item) return;
    item.qty = Math.max(0, item.qty + delta);
    if (item.qty === 0) this.items = this.items.filter(i => i.key !== key);
    this._updateBadge();
    this.renderDrawer();
  },

  /* Total item count */
  totalCount() {
    return this.items.reduce((s, i) => s + i.qty, 0);
  },

  /* Total price */
  getTotal() {
    return this.items.reduce((s, i) => s + i.price * i.qty, 0);
  },

  /* Open drawer */
  openDrawer() {
    const overlay = document.getElementById('cart-overlay');
    const drawer  = document.getElementById('cart-drawer');
    if (!overlay || !drawer) return;
    overlay.classList.add('is-open');
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  },

  /* Close drawer */
  closeDrawer() {
    const overlay = document.getElementById('cart-overlay');
    const drawer  = document.getElementById('cart-drawer');
    if (!overlay || !drawer) return;
    overlay.classList.remove('is-open');
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  },

  /* Update the nav badge */
  _updateBadge() {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    const count = this.totalCount();
    badge.textContent = count;
    badge.classList.toggle('is-visible', count > 0);
  },

  /* Render drawer items */
  renderDrawer() {
    const body = document.getElementById('cart-drawer-body');
    if (!body) return;

    if (this.items.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <p>Your bag is empty.<br>Discover the collection.</p>
        </div>`;
      document.getElementById('cart-total-amount').textContent = 'EGP 0';
      return;
    }

    body.innerHTML = this.items.map(item => `
      <div class="cart-item">
        <div class="cart-item__thumb">
          <img src="${item.img}" alt="${item.name}" loading="lazy">
        </div>
        <div>
          <p class="cart-item__name">${item.name}</p>
          <p class="cart-item__size">${item.size}</p>
          <div class="cart-item__row">
            <div class="qty-stepper">
              <button class="qty-stepper__btn" onclick="cart.updateQty('${item.key}', -1)" aria-label="Decrease quantity">−</button>
              <span class="qty-stepper__val">${item.qty}</span>
              <button class="qty-stepper__btn" onclick="cart.updateQty('${item.key}', 1)" aria-label="Increase quantity">+</button>
            </div>
            <span class="cart-item__price">EGP ${(item.price * item.qty).toLocaleString()}</span>
          </div>
          <button class="cart-item__remove" onclick="cart.removeItem('${item.key}')">Remove</button>
        </div>
      </div>`).join('');

    const total = document.getElementById('cart-total-amount');
    if (total) total.textContent = `EGP ${this.getTotal().toLocaleString()}`;
  },
};

/* ── DOM Setup (runs after DOMContentLoaded) ──────────────── */
function initCart() {
  /* Inject drawer + overlay HTML if not already present */
  if (!document.getElementById('cart-drawer')) {
    const markup = `
      <div class="cart-overlay" id="cart-overlay" onclick="cart.closeDrawer()"></div>
      <aside class="cart-drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping Cart">
        <div class="cart-drawer__header">
          <p class="cart-drawer__title">Your Bag</p>
          <button class="cart-drawer__close" onclick="cart.closeDrawer()" aria-label="Close cart">
            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="cart-drawer__body" id="cart-drawer-body"></div>
        <div class="cart-drawer__footer">
          <div class="cart-total-row">
            <span class="cart-total-label">Total</span>
            <span class="cart-total-amount" id="cart-total-amount">EGP 0</span>
          </div>
          <button class="btn btn--primary btn--full btn--lg">Checkout</button>
        </div>
      </aside>`;
    document.body.insertAdjacentHTML('beforeend', markup);
  }

  /* Render initial (empty) state */
  cart.renderDrawer();

  /* Wire nav cart button */
  const navCartBtn = document.getElementById('nav-cart-btn');
  if (navCartBtn) {
    navCartBtn.addEventListener('click', () => {
      if (cart.items.length > 0) {
        cart.openDrawer();
      } else {
        cart.openDrawer(); /* open even if empty to show message */
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initCart);
