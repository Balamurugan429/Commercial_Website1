// ==========================================================================
// KICKSLAB STUDIO — CLIENT-SIDE E-COMMERCE ENGINE
// Polished Micro-Interactions, Cart State & Filter Architecture
// ==========================================================================

const state = {
  cart: JSON.parse(localStorage.getItem('kickslab_archive_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('kickslab_archive_wishlist')) || [],
  category: 'all',
  searchQuery: '',
  sort: 'featured',
  currency: 'USD',
  currencyRate: 1,
  discountPercent: 0,
  promoCode: '',
  activeProduct: null,
  selectedSize: null
};

// DOM Cache
const productsGrid = document.getElementById('productsGrid');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCountBadge = document.getElementById('cartCountBadge');
const wishlistCountBadge = document.getElementById('wishlistCountBadge');
const subtotalEl = document.getElementById('cartSubtotal');
const discountRow = document.getElementById('cartDiscountRow');
const discountVal = document.getElementById('cartDiscountVal');
const shippingVal = document.getElementById('cartShippingVal');
const totalVal = document.getElementById('cartTotalVal');
const shippingProgress = document.getElementById('shippingProgress');
const shippingNotice = document.getElementById('shippingNotice');
const quickModal = document.getElementById('quickModal');
const checkoutModal = document.getElementById('checkoutModal');
const toastContainer = document.getElementById('toastContainer');

// ==========================================================================
// INIT
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  setupListeners();
});

// ==========================================================================
// CURRENCY & FORMATTING
// ==========================================================================
function formatPrice(amount) {
  const converted = amount * state.currencyRate;
  if (state.currency === 'INR') {
    return '₹' + Math.round(converted).toLocaleString('en-IN');
  }
  return '$' + converted.toFixed(0);
}

// ==========================================================================
// PRODUCT CATALOG RENDERING
// ==========================================================================
function getFilteredList() {
  let list = [...PRODUCTS];

  if (state.category !== 'all') {
    list = list.filter(p => p.category === state.category);
  }

  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.edition.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (state.sort === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sort === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

function renderProducts() {
  const products = getFilteredList();

  if (products.length === 0) {
    productsGrid.innerHTML = `
      <div class="col-span-full py-24 text-center">
        <p class="font-mono text-xs uppercase tracking-widest text-neutral-500">// ARCHIVE QUERY: NULL</p>
        <h3 class="font-display font-semibold text-2xl text-white mt-2">No matching silhouettes located</h3>
        <p class="text-neutral-400 text-sm mt-1 max-w-sm mx-auto">Try adjusting your search criteria or category filter to inspect other models.</p>
        <button onclick="resetFilters()" class="mt-6 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition">
          Reset Filter Matrix
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  productsGrid.innerHTML = products.map(p => {
    const isSaved = state.wishlist.includes(p.id);

    return `
      <div class="product-card group" data-id="${p.id}">
        
        <!-- Top Status Bar & Wishlist -->
        <div class="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-wider uppercase backdrop-blur-md ${
            p.badgeType === 'accent' 
              ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' 
              : 'bg-black/60 text-neutral-300 border border-white/10'
          }">
            ${p.badge}
          </span>
          <button onclick="toggleWishlist('${p.id}')" 
                  aria-label="Save to Wishlist" 
                  class="pointer-events-auto w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-black/90 transition active:scale-90">
            <i data-lucide="bookmark" class="w-3.5 h-3.5 ${isSaved ? 'text-white fill-white' : ''}"></i>
          </button>
        </div>

        <!-- Footwear Photography with Dual-Angle Crossfade -->
        <div class="product-img-wrapper cursor-pointer" onclick="openQuickView('${p.id}')">
          <img src="${p.image}" alt="${p.name}" class="product-primary-img" loading="lazy">
          <img src="${p.hoverImage || p.image}" alt="${p.name} alternate angle" class="product-hover-img" loading="lazy">
          
          <!-- Bottom Quick View Trigger -->
          <div class="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span class="w-full py-2.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold tracking-wider uppercase text-center block shadow-lg">
              Inspect Specimen
            </span>
          </div>
        </div>

        <!-- Typography & Price Details -->
        <div class="p-5 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-[11px] font-mono text-neutral-500 tracking-wider uppercase">
              <span>${p.brand}</span>
              <span>${p.edition}</span>
            </div>

            <h3 class="font-display font-bold text-base text-white mt-1 group-hover:text-neutral-200 transition line-clamp-1 cursor-pointer" onclick="openQuickView('${p.id}')">
              ${p.name}
            </h3>
          </div>

          <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <div>
              <span class="font-mono font-bold text-base text-white">${formatPrice(p.price)}</span>
              ${p.originalPrice ? `<span class="font-mono text-xs text-neutral-500 line-through ml-2">${formatPrice(p.originalPrice)}</span>` : ''}
            </div>

            <button onclick="quickAdd('${p.id}')" 
                    class="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white text-neutral-300 hover:text-black border border-white/10 hover:border-white text-xs font-semibold tracking-wider uppercase transition active:scale-95">
              Acquire
            </button>
          </div>
        </div>

      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function resetFilters() {
  state.category = 'all';
  state.searchQuery = '';
  state.sort = 'featured';

  document.querySelectorAll('.editorial-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('[data-cat="all"]').classList.add('active');
  const searchInput = document.getElementById('catalogSearch');
  if (searchInput) searchInput.value = '';
  const sortSelect = document.getElementById('catalogSort');
  if (sortSelect) sortSelect.value = 'featured';

  renderProducts();
}

// ==========================================================================
// WISHLIST LOGIC
// ==========================================================================
function toggleWishlist(id) {
  const product = PRODUCTS.find(p => p.id === id);
  const index = state.wishlist.indexOf(id);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed from Archive: ${product ? product.name : 'Item'}`);
  } else {
    state.wishlist.push(id);
    showToast(`Archived Specimen: ${product ? product.name : 'Item'}`);
  }

  localStorage.setItem('kickslab_archive_wishlist', JSON.stringify(state.wishlist));
  updateWishlistUI();
  renderProducts();
}

function updateWishlistUI() {
  if (wishlistCountBadge) {
    wishlistCountBadge.textContent = state.wishlist.length;
    wishlistCountBadge.classList.toggle('hidden', state.wishlist.length === 0);
  }
}

// ==========================================================================
// CART & DRAWER
// ==========================================================================
function quickAdd(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  addToCart(product, product.sizes[2] || 9, 1);
}

function addToCart(product, size, qty = 1) {
  const existing = state.cart.find(item => item.id === product.id && item.size === size);

  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({
      id: product.id,
      brand: product.brand,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      qty: qty
    });
  }

  localStorage.setItem('kickslab_archive_cart', JSON.stringify(state.cart));
  updateCartUI();
  openCartDrawer();
  showToast(`Added to Selection: ${product.name} (US ${size})`);
}

function updateCartQty(idx, delta) {
  if (state.cart[idx]) {
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) {
      removeFromCart(idx);
      return;
    }
    localStorage.setItem('kickslab_archive_cart', JSON.stringify(state.cart));
    updateCartUI();
  }
}

function removeFromCart(idx) {
  const removed = state.cart.splice(idx, 1)[0];
  localStorage.setItem('kickslab_archive_cart', JSON.stringify(state.cart));
  updateCartUI();
  showToast(`Removed: ${removed ? removed.name : 'Item'}`);
}

function updateCartUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);

  if (cartCountBadge) {
    cartCountBadge.textContent = totalCount;
    cartCountBadge.classList.toggle('hidden', totalCount === 0);
  }

  // Render items inside drawer
  if (cartItemsContainer) {
    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="py-24 text-center">
          <p class="font-mono text-xs uppercase tracking-widest text-neutral-500">// SELECTION EMPTY</p>
          <h4 class="font-display font-semibold text-lg text-white mt-1">No silhouettes reserved</h4>
          <p class="text-neutral-400 text-xs mt-1">Explore our latest drops and archive collection.</p>
          <button onclick="closeCartDrawer()" class="mt-6 px-6 py-2 rounded-full border border-white/20 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition">
            Browse Archive
          </button>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = state.cart.map((item, idx) => `
        <div class="flex gap-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
          <div class="w-16 h-16 rounded-lg bg-[#0d0d10] p-1.5 flex items-center justify-center flex-shrink-0 border border-white/5">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover rounded">
          </div>
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start gap-2">
                <div>
                  <span class="block text-[10px] font-mono text-neutral-500 uppercase">${item.brand}</span>
                  <h5 class="text-white text-xs font-bold font-display line-clamp-1">${item.name}</h5>
                </div>
                <button onclick="removeFromCart(${idx})" class="text-neutral-500 hover:text-white transition p-1">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
              <span class="text-[11px] font-mono text-neutral-400 mt-1 block">SIZE: US ${item.size}</span>
            </div>

            <div class="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
              <span class="font-mono text-xs font-bold text-white">${formatPrice(item.price * item.qty)}</span>
              <div class="flex items-center rounded bg-black/40 border border-white/10">
                <button onclick="updateCartQty(${idx}, -1)" class="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white text-xs">-</button>
                <span class="w-6 text-center font-mono text-xs text-white">${item.qty}</span>
                <button onclick="updateCartQty(${idx}, 1)" class="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white text-xs">+</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // Calculations
  const subtotal = state.cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const discount = subtotal * (state.discountPercent / 100);
  const isFreeShip = subtotal >= 200 || subtotal === 0;
  const shipping = isFreeShip ? 0 : 20;
  const total = Math.max(0, subtotal - discount + shipping);

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (discountRow) {
    discountRow.classList.toggle('hidden', state.discountPercent === 0);
    if (discountVal) discountVal.textContent = `-${formatPrice(discount)} (${state.discountPercent}%)`;
  }
  if (shippingVal) shippingVal.textContent = isFreeShip ? 'Complimentary' : formatPrice(shipping);
  if (totalVal) totalVal.textContent = formatPrice(total);

  // Free shipping bar ($200 threshold)
  if (shippingProgress && shippingNotice) {
    if (subtotal >= 200) {
      shippingProgress.style.width = '100%';
      shippingNotice.innerHTML = `<span class="text-emerald-400 font-mono font-medium text-[11px]">✓ Complimentary express shipping unlocked</span>`;
    } else {
      const pct = Math.min(100, Math.round((subtotal / 200) * 100));
      shippingProgress.style.width = `${pct}%`;
      const rem = 200 - subtotal;
      shippingNotice.innerHTML = `<span class="text-neutral-400 text-[11px]">Add <strong class="text-white">${formatPrice(rem)}</strong> more to receive complimentary delivery</span>`;
    }
  }

  lucide.createIcons();
}

function openCartDrawer() {
  if (cartDrawer && cartBackdrop) {
    cartBackdrop.classList.remove('hidden');
    requestAnimationFrame(() => {
      cartBackdrop.classList.remove('opacity-0');
      cartDrawer.classList.add('drawer-enter');
    });
  }
}

function closeCartDrawer() {
  if (cartDrawer && cartBackdrop) {
    cartDrawer.classList.remove('drawer-enter');
    cartBackdrop.classList.add('opacity-0');
    setTimeout(() => {
      cartBackdrop.classList.add('hidden');
    }, 250);
  }
}

function applyPromo() {
  const input = document.getElementById('promoCodeInput');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (code === 'KICKS20' || code === 'ARCHIVE20') {
    state.discountPercent = 20;
    state.promoCode = code;
    showToast('Privilege Code applied: 20% savings');
  } else if (code === '') {
    showToast('Please enter an archive code');
  } else {
    showToast('Invalid archive code. Try "KICKS20"');
  }
  updateCartUI();
}

// ==========================================================================
// QUICK VIEW MODAL
// ==========================================================================
function openQuickView(id) {
  const p = PRODUCTS.find(item => item.id === id);
  if (!p) return;

  state.activeProduct = p;
  state.selectedSize = p.sizes[2] || 9;

  document.getElementById('modalBrand').textContent = p.brand;
  document.getElementById('modalTitle').textContent = p.name;
  document.getElementById('modalEdition').textContent = p.edition;
  document.getElementById('modalPrice').textContent = formatPrice(p.price);
  document.getElementById('modalDescription').textContent = p.description;
  document.getElementById('modalMainImage').src = p.image;

  // Specs List
  const specsList = document.getElementById('modalSpecs');
  if (specsList) {
    specsList.innerHTML = p.specs.map(spec => `
      <li class="flex items-start gap-2 text-xs text-neutral-300">
        <span class="text-neutral-500 font-mono select-none">—</span>
        <span>${spec}</span>
      </li>
    `).join('');
  }

  // Sizes Buttons
  const sizeGrid = document.getElementById('modalSizeGrid');
  if (sizeGrid) {
    sizeGrid.innerHTML = p.sizes.map(s => `
      <button onclick="setModalSize(${s}, this)" class="size-selector-btn ${s === state.selectedSize ? 'active' : ''}">
        US ${s}
      </button>
    `).join('');
  }

  quickModal.classList.remove('hidden');
  requestAnimationFrame(() => {
    quickModal.classList.remove('opacity-0');
    quickModal.querySelector('.modal-container').classList.add('modal-enter');
  });

  lucide.createIcons();
}

function closeQuickView() {
  if (quickModal) {
    quickModal.classList.add('opacity-0');
    quickModal.querySelector('.modal-container').classList.remove('modal-enter');
    setTimeout(() => {
      quickModal.classList.add('hidden');
    }, 250);
  }
}

function setModalSize(size, btn) {
  state.selectedSize = size;
  const grid = document.getElementById('modalSizeGrid');
  if (grid) {
    grid.querySelectorAll('.size-selector-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}

function addModalProductToCart() {
  if (!state.activeProduct) return;
  addToCart(state.activeProduct, state.selectedSize || 9, 1);
  closeQuickView();
}

// ==========================================================================
// CHECKOUT ENGINE
// ==========================================================================
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your reserve selection is empty.');
    return;
  }
  closeCartDrawer();

  const subtotal = state.cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const discount = subtotal * (state.discountPercent / 100);
  const shipping = subtotal >= 200 ? 0 : 20;
  const total = Math.max(0, subtotal - discount + shipping);

  document.getElementById('checkoutTotalDisplay').textContent = formatPrice(total);

  checkoutModal.classList.remove('hidden');
  requestAnimationFrame(() => {
    checkoutModal.classList.remove('opacity-0');
    checkoutModal.querySelector('.modal-container').classList.add('modal-enter');
  });
}

function closeCheckoutModal() {
  if (checkoutModal) {
    checkoutModal.classList.add('opacity-0');
    checkoutModal.querySelector('.modal-container').classList.remove('modal-enter');
    setTimeout(() => {
      checkoutModal.classList.add('hidden');
    }, 250);
  }
}

function submitCheckout(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = `<span class="font-mono text-xs tracking-wider uppercase">Securing Archive Dispatch...</span>`;

  setTimeout(() => {
    const orderRef = 'KL-' + Math.floor(100000 + Math.random() * 900000);
    state.cart = [];
    localStorage.removeItem('kickslab_archive_cart');
    updateCartUI();

    const area = checkoutModal.querySelector('.checkout-content-area');
    area.innerHTML = `
      <div class="py-12 text-center">
        <span class="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          DISPATCH RECORD CONFIRMED
        </span>
        <h3 class="font-display font-bold text-2xl text-white mt-3">Specimen Reserved</h3>
        <p class="font-mono text-xs text-neutral-400 mt-2">
          MANIFEST IDENTIFIER: <strong class="text-white">#${orderRef}</strong>
        </p>
        <p class="text-neutral-400 text-xs mt-3 max-w-xs mx-auto leading-relaxed">
          Your allocation has been secured at the fulfillment studio. A digital tracking dispatch note has been sent.
        </p>

        <button onclick="closeCheckoutModal(); window.location.reload();" class="mt-8 px-8 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition">
          Return to Studio
        </button>
      </div>
    `;
    lucide.createIcons();
  }, 1600);
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(msg) {
  if (!toastContainer) return;

  const t = document.createElement('div');
  t.className = 'px-4 py-3 rounded-xl bg-neutral-900/95 border border-white/15 text-white text-xs font-mono tracking-wide shadow-2xl flex items-center gap-2.5 toast-slide-up pointer-events-auto backdrop-blur-md';
  t.innerHTML = `
    <span class="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"></span>
    <span>${msg}</span>
  `;

  toastContainer.appendChild(t);

  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(10px)';
    t.style.transition = 'all 0.2s ease';
    setTimeout(() => t.remove(), 200);
  }, 3200);
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================
function setupListeners() {
  // Category tabs
  document.querySelectorAll('.editorial-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.editorial-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.category = tab.dataset.cat;
      renderProducts();
    });
  });

  // Search
  const search = document.getElementById('catalogSearch');
  if (search) {
    search.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort
  const sort = document.getElementById('catalogSort');
  if (sort) {
    sort.addEventListener('change', (e) => {
      state.sort = e.target.value;
      renderProducts();
    });
  }

  // Currency
  const curr = document.getElementById('currencySelector');
  if (curr) {
    curr.addEventListener('change', (e) => {
      state.currency = e.target.value;
      state.currencyRate = (state.currency === 'INR') ? 83 : 1;
      renderProducts();
      updateCartUI();
    });
  }
}
