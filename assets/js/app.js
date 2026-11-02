// ==========================================================================
// SOLEVAULT / KICKSLAB - E-COMMERCE CORE APPLICATION
// ==========================================================================

let state = {
  cart: JSON.parse(localStorage.getItem('solevault_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('solevault_wishlist')) || [],
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  currency: 'USD',
  currencyRate: 1, // Base is USD. For INR: 83
  currencySymbol: '$',
  promoCode: '',
  discountPercent: 0,
  activeQuickProduct: null,
  selectedSize: null,
  selectedColorIndex: 0
};

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartBadge = document.getElementById('cartBadge');
const wishlistBadge = document.getElementById('wishlistBadge');
const subtotalEl = document.getElementById('cartSubtotal');
const discountEl = document.getElementById('cartDiscount');
const shippingEl = document.getElementById('cartShipping');
const totalEl = document.getElementById('cartTotal');
const shippingProgress = document.getElementById('shippingProgress');
const shippingNotice = document.getElementById('shippingNotice');
const quickModal = document.getElementById('quickModal');
const checkoutModal = document.getElementById('checkoutModal');
const toastContainer = document.getElementById('toastContainer');

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();
  setupHeroInteractivity();
});

// ==========================================================================
// FORMATTING UTILITIES
// ==========================================================================
function formatPrice(amount) {
  const converted = amount * state.currencyRate;
  if (state.currency === 'INR') {
    return '₹' + Math.round(converted).toLocaleString('en-IN');
  }
  return '$' + converted.toFixed(2);
}

// ==========================================================================
// PRODUCTS RENDERING & FILTERING
// ==========================================================================
function getFilteredProducts() {
  let list = [...PRODUCTS];

  // Category filter
  if (state.activeCategory !== 'all') {
    list = list.filter(p => p.category === state.activeCategory);
  }

  // Search filter
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // Sort
  if (state.sortBy === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

function renderProducts() {
  const products = getFilteredProducts();

  if (products.length === 0) {
    productsGrid.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
          <i data-lucide="package-search" class="w-10 h-10"></i>
        </div>
        <h3 class="text-xl font-bold font-display text-white">No footwear found</h3>
        <p class="text-gray-400 mt-2 text-sm">Try clearing your search query or choosing another category.</p>
        <button onclick="resetFilters()" class="mt-5 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition">
          Reset All Filters
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  productsGrid.innerHTML = products.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    const badgeColorMap = {
      rose: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
    };
    const badgeClass = badgeColorMap[product.badgeColor] || 'bg-orange-500/20 text-orange-400 border-orange-500/30';

    return `
      <div class="glass-card rounded-2xl overflow-hidden group flex flex-col relative" data-id="${product.id}">
        <!-- Top Badges & Actions -->
        <div class="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span class="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full border backdrop-blur-md ${badgeClass}">
            ${product.badge}
          </span>
          <button onclick="toggleWishlist('${product.id}')" 
                  aria-label="Wishlist" 
                  class="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-300 hover:text-rose-500 hover:bg-black/80 transition transform active:scale-90">
            <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'heart-active' : ''}"></i>
          </button>
        </div>

        <!-- Product Image Preview -->
        <div class="h-64 sm:h-72 p-6 flex items-center justify-center relative bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden cursor-pointer" onclick="openQuickView('${product.id}')">
          <div class="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <img src="${product.image}" 
               alt="${product.name}" 
               class="product-card-img max-h-full max-w-full object-contain filter drop-shadow-xl" 
               loading="lazy" 
               onerror="this.src='assets/images/hero-sneaker.png'">
          
          <!-- Hover Quick View Pill -->
          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span class="px-4 py-1.5 rounded-full bg-white/90 text-black text-xs font-bold tracking-wide shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i> Quick View
            </span>
          </div>
        </div>

        <!-- Card Details -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <!-- Category & Rating -->
            <div class="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span class="uppercase font-semibold tracking-wider text-orange-400">${product.category}</span>
              <div class="flex items-center gap-1">
                <i data-lucide="star" class="w-3.5 h-3.5 text-amber-400 fill-amber-400"></i>
                <span class="font-bold text-white">${product.rating}</span>
                <span class="text-gray-500">(${product.reviewsCount})</span>
              </div>
            </div>

            <!-- Name & Tagline -->
            <h3 class="font-display font-bold text-lg text-white group-hover:text-orange-400 transition-colors line-clamp-1 cursor-pointer" onclick="openQuickView('${product.id}')">
              ${product.name}
            </h3>
            <p class="text-gray-400 text-xs mt-1 line-clamp-1">
              ${product.tagline}
            </p>

            <!-- Color Swatches -->
            <div class="flex items-center gap-1.5 mt-3">
              ${product.colors.map((c, i) => `
                <button onclick="changeProductColor('${product.id}', ${i}, this)" 
                        title="${c.name}" 
                        style="background-color: ${c.hex};" 
                        class="w-4 h-4 rounded-full border border-white/20 transition-transform hover:scale-125 focus:ring-2 focus:ring-orange-500">
                </button>
              `).join('')}
              <span class="text-[11px] text-gray-500 ml-1">+${product.colors.length} colors</span>
            </div>
          </div>

          <!-- Price & Add to Cart -->
          <div class="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <div class="flex items-baseline gap-2">
                <span class="text-xl font-bold font-display text-white">${formatPrice(product.price)}</span>
                ${product.originalPrice ? `<span class="text-xs text-gray-500 line-through">${formatPrice(product.originalPrice)}</span>` : ''}
              </div>
              <span class="text-[10px] text-emerald-400 font-semibold tracking-wide flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> In Stock (${product.stock})
              </span>
            </div>

            <button onclick="quickAddToCart('${product.id}')" 
                    class="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white transition transform active:scale-95 shadow-lg shadow-orange-600/30 flex items-center justify-center" 
                    title="Add to Cart">
              <i data-lucide="plus" class="w-5 h-5"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function resetFilters() {
  state.activeCategory = 'all';
  state.searchQuery = '';
  state.sortBy = 'featured';

  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('[data-category="all"]').classList.add('active');
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'featured';

  renderProducts();
}

function changeProductColor(productId, colorIndex, btnEl) {
  const card = document.querySelector(`[data-id="${productId}"]`);
  const product = PRODUCTS.find(p => p.id === productId);
  if (!card || !product) return;

  const color = product.colors[colorIndex];
  if (color && color.image) {
    const imgEl = card.querySelector('.product-card-img');
    if (imgEl) imgEl.src = color.image;
  }
}

// ==========================================================================
// WISHLIST LOGIC
// ==========================================================================
function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  const product = PRODUCTS.find(p => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed ${product ? product.name : 'item'} from Wishlist`, 'info');
  } else {
    state.wishlist.push(productId);
    showToast(`Added ${product ? product.name : 'item'} to Wishlist!`, 'success');
  }

  localStorage.setItem('solevault_wishlist', JSON.stringify(state.wishlist));
  updateWishlistUI();
  renderProducts();
}

function updateWishlistUI() {
  if (wishlistBadge) {
    wishlistBadge.textContent = state.wishlist.length;
    wishlistBadge.classList.toggle('hidden', state.wishlist.length === 0);
  }
}

// ==========================================================================
// CART LOGIC
// ==========================================================================
function quickAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  addToCart(product, product.sizes[2] || 9, product.colors[0], 1);
}

function addToCart(product, size, color, quantity = 1) {
  const existingIndex = state.cart.findIndex(
    item => item.id === product.id && item.size === size && item.color.name === color.name
  );

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      tagline: product.tagline,
      category: product.category,
      price: product.price,
      image: color.image || product.image,
      size: size,
      color: color,
      quantity: quantity
    });
  }

  localStorage.setItem('solevault_cart', JSON.stringify(state.cart));
  updateCartUI();
  openCartDrawer();
  showToast(`Added ${product.name} (Size US ${size}) to cart!`, 'success');
}

function updateCartQuantity(index, delta) {
  if (state.cart[index]) {
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      removeFromCart(index);
      return;
    }
    localStorage.setItem('solevault_cart', JSON.stringify(state.cart));
    updateCartUI();
  }
}

function removeFromCart(index) {
  const item = state.cart[index];
  state.cart.splice(index, 1);
  localStorage.setItem('solevault_cart', JSON.stringify(state.cart));
  updateCartUI();
  showToast(`Removed ${item ? item.name : 'item'} from cart`, 'info');
}

function updateCartUI() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.classList.toggle('hidden', totalItems === 0);
  }

  // Render items inside drawer
  if (cartItemsContainer) {
    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="py-16 text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
            <i data-lucide="shopping-bag" class="w-8 h-8"></i>
          </div>
          <h4 class="font-display font-bold text-white text-lg">Your cart is empty</h4>
          <p class="text-gray-400 text-xs mt-1">Looks like you haven't snagged any fresh kicks yet.</p>
          <button onclick="closeCartDrawer()" class="mt-6 px-6 py-2.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold tracking-wider uppercase transition shadow-lg shadow-orange-600/30">
            Explore Drops
          </button>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = state.cart.map((item, idx) => `
        <div class="flex gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 relative group">
          <div class="w-20 h-20 rounded-lg bg-black/40 p-2 flex items-center justify-center flex-shrink-0 border border-white/5">
            <img src="${item.image}" alt="${item.name}" class="max-h-full max-w-full object-contain filter drop-shadow">
          </div>
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start gap-2">
                <h5 class="text-white text-sm font-bold font-display line-clamp-1">${item.name}</h5>
                <button onclick="removeFromCart(${idx})" class="text-gray-500 hover:text-rose-400 transition" title="Remove">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>
              <p class="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                <span>Size: <strong class="text-white">US ${item.size}</strong></span>
                <span>•</span>
                <span class="flex items-center gap-1">
                  <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${item.color.hex};"></span>
                  ${item.color.name}
                </span>
              </p>
            </div>
            
            <div class="flex items-center justify-between mt-3">
              <span class="text-sm font-bold text-white font-display">${formatPrice(item.price * item.quantity)}</span>
              <div class="flex items-center rounded-lg bg-black/50 border border-white/10 overflow-hidden">
                <button onclick="updateCartQuantity(${idx}, -1)" class="w-7 h-7 flex items-center justify-center text-gray-300 hover:bg-white/10 text-xs">-</button>
                <span class="w-7 text-center text-xs font-bold text-white">${item.quantity}</span>
                <button onclick="updateCartQuantity(${idx}, 1)" class="w-7 h-7 flex items-center justify-center text-gray-300 hover:bg-white/10 text-xs">+</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // Calculate Totals
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal * (state.discountPercent / 100);
  const freeShippingThreshold = 150;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shipping = isFreeShipping ? 0 : 15;
  const total = Math.max(0, subtotal - discount + shipping);

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (discountEl) discountEl.textContent = state.discountPercent > 0 ? `-${formatPrice(discount)} (${state.discountPercent}%)` : '$0.00';
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
  if (totalEl) totalEl.textContent = formatPrice(total);

  // Free shipping progress bar
  if (shippingProgress && shippingNotice) {
    if (subtotal >= freeShippingThreshold) {
      shippingProgress.style.width = '100%';
      shippingProgress.className = 'h-full bg-emerald-500 rounded-full transition-all duration-500';
      shippingNotice.innerHTML = `🎉 <span class="text-emerald-400 font-bold">Awesome! You unlocked FREE Global Shipping</span>`;
    } else {
      const percent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
      shippingProgress.style.width = `${percent}%`;
      shippingProgress.className = 'h-full bg-orange-500 rounded-full transition-all duration-500';
      const remaining = freeShippingThreshold - subtotal;
      shippingNotice.innerHTML = `Add <strong class="text-white">${formatPrice(remaining)}</strong> more to get <strong>FREE Shipping</strong>!`;
    }
  }

  lucide.createIcons();
}

function openCartDrawer() {
  if (cartDrawer && cartBackdrop) {
    cartBackdrop.classList.remove('hidden');
    setTimeout(() => {
      cartBackdrop.classList.remove('opacity-0');
      cartDrawer.classList.remove('translate-x-full');
    }, 10);
  }
}

function closeCartDrawer() {
  if (cartDrawer && cartBackdrop) {
    cartDrawer.classList.add('translate-x-full');
    cartBackdrop.classList.add('opacity-0');
    setTimeout(() => {
      cartBackdrop.classList.add('hidden');
    }, 300);
  }
}

function applyPromoCode() {
  const input = document.getElementById('promoInput');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (code === 'KICKS20' || code === 'SAVE20') {
    state.discountPercent = 20;
    state.promoCode = code;
    showToast('Promo code applied: 20% OFF!', 'success');
  } else if (code === 'KICKS10') {
    state.discountPercent = 10;
    state.promoCode = code;
    showToast('Promo code applied: 10% OFF!', 'success');
  } else if (code === '') {
    showToast('Please enter a coupon code', 'info');
  } else {
    showToast('Invalid promo code. Try "KICKS20"', 'error');
  }
  updateCartUI();
}

// ==========================================================================
// QUICK VIEW MODAL
// ==========================================================================
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.activeQuickProduct = product;
  state.selectedSize = product.sizes[2] || 9;
  state.selectedColorIndex = 0;

  document.getElementById('quickTitle').textContent = product.name;
  document.getElementById('quickTagline').textContent = product.tagline;
  document.getElementById('quickPrice').textContent = formatPrice(product.price);
  if (product.originalPrice) {
    document.getElementById('quickOrigPrice').textContent = formatPrice(product.originalPrice);
    document.getElementById('quickOrigPrice').classList.remove('hidden');
  } else {
    document.getElementById('quickOrigPrice').classList.add('hidden');
  }
  document.getElementById('quickDescription').textContent = product.description;
  document.getElementById('quickImage').src = product.image;
  document.getElementById('quickRating').textContent = product.rating;
  document.getElementById('quickReviews').textContent = `(${product.reviewsCount} reviews)`;

  // Thumbnails Gallery
  const galleryContainer = document.getElementById('quickGallery');
  if (galleryContainer) {
    galleryContainer.innerHTML = product.gallery.map((img, idx) => `
      <button onclick="setQuickViewImage('${img}', this)" class="w-14 h-14 rounded-lg bg-black/40 border ${idx === 0 ? 'border-orange-500' : 'border-white/10'} p-1.5 overflow-hidden transition hover:border-white/40">
        <img src="${img}" alt="angle view" class="w-full h-full object-contain">
      </button>
    `).join('');
  }

  // Size Options
  const sizeContainer = document.getElementById('quickSizes');
  if (sizeContainer) {
    sizeContainer.innerHTML = product.sizes.map(size => `
      <button onclick="selectQuickSize(${size}, this)" class="size-btn px-3 py-2 rounded-lg text-xs font-bold border border-white/15 bg-white/5 hover:border-orange-500 transition ${size === state.selectedSize ? 'active' : ''}">
        US ${size}
      </button>
    `).join('');
  }

  // Color Options
  const colorContainer = document.getElementById('quickColors');
  if (colorContainer) {
    colorContainer.innerHTML = product.colors.map((c, idx) => `
      <button onclick="selectQuickColor(${idx}, this)" title="${c.name}" class="w-7 h-7 rounded-full border-2 ${idx === 0 ? 'border-orange-500 ring-2 ring-orange-500/30' : 'border-white/20'} transition transform hover:scale-110" style="background-color: ${c.hex};">
      </button>
    `).join('');
  }

  // Features List
  const featuresContainer = document.getElementById('quickFeatures');
  if (featuresContainer) {
    featuresContainer.innerHTML = product.features.map(f => `
      <li class="flex items-center gap-2 text-xs text-gray-300">
        <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 flex-shrink-0"></i>
        <span>${f}</span>
      </li>
    `).join('');
  }

  quickModal.classList.remove('hidden');
  setTimeout(() => {
    quickModal.classList.remove('opacity-0');
    quickModal.querySelector('.modal-body').classList.remove('scale-95');
  }, 10);

  lucide.createIcons();
}

function closeQuickModal() {
  if (quickModal) {
    quickModal.classList.add('opacity-0');
    quickModal.querySelector('.modal-body').classList.add('scale-95');
    setTimeout(() => {
      quickModal.classList.add('hidden');
    }, 250);
  }
}

function setQuickViewImage(imgUrl, btn) {
  document.getElementById('quickImage').src = imgUrl;
  const container = document.getElementById('quickGallery');
  if (container) {
    container.querySelectorAll('button').forEach(b => b.classList.replace('border-orange-500', 'border-white/10'));
    btn.classList.replace('border-white/10', 'border-orange-500');
  }
}

function selectQuickSize(size, btn) {
  state.selectedSize = size;
  const container = document.getElementById('quickSizes');
  if (container) {
    container.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}

function selectQuickColor(idx, btn) {
  state.selectedColorIndex = idx;
  const product = state.activeQuickProduct;
  if (product && product.colors[idx]) {
    document.getElementById('quickImage').src = product.colors[idx].image;
    const container = document.getElementById('quickColors');
    if (container) {
      container.querySelectorAll('button').forEach(b => {
        b.className = 'w-7 h-7 rounded-full border-2 border-white/20 transition transform hover:scale-110';
      });
      btn.className = 'w-7 h-7 rounded-full border-2 border-orange-500 ring-2 ring-orange-500/30 transition transform hover:scale-110';
    }
  }
}

function addActiveProductToCart() {
  if (!state.activeQuickProduct) return;
  const color = state.activeQuickProduct.colors[state.selectedColorIndex] || state.activeQuickProduct.colors[0];
  const size = state.selectedSize || 9;
  const qty = parseInt(document.getElementById('quickQty').value) || 1;

  addToCart(state.activeQuickProduct, size, color, qty);
  closeQuickModal();
}

// ==========================================================================
// CHECKOUT & ORDER SIMULATOR
// ==========================================================================
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty. Add shoes first!', 'info');
    return;
  }
  closeCartDrawer();

  // Populate checkout summary
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal * (state.discountPercent / 100);
  const shipping = subtotal >= 150 ? 0 : 15;
  const total = Math.max(0, subtotal - discount + shipping);

  document.getElementById('checkoutSummaryTotal').textContent = formatPrice(total);
  document.getElementById('checkoutItemCount').textContent = `${state.cart.reduce((s, i) => s + i.quantity, 0)} items`;

  checkoutModal.classList.remove('hidden');
  setTimeout(() => {
    checkoutModal.classList.remove('opacity-0');
    checkoutModal.querySelector('.modal-body').classList.remove('scale-95');
  }, 10);
}

function closeCheckoutModal() {
  if (checkoutModal) {
    checkoutModal.classList.add('opacity-0');
    checkoutModal.querySelector('.modal-body').classList.add('scale-95');
    setTimeout(() => {
      checkoutModal.classList.add('hidden');
    }, 250);
  }
}

function processCheckout(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <span class="inline-block animate-spin mr-2">⟳</span> Authorizing Payment...
  `;

  setTimeout(() => {
    const orderNumber = 'SK-' + Math.floor(100000 + Math.random() * 900000);
    
    // Clear cart
    state.cart = [];
    localStorage.removeItem('solevault_cart');
    updateCartUI();

    // Show success view
    const body = checkoutModal.querySelector('.modal-content-area');
    body.innerHTML = `
      <div class="py-12 text-center">
        <div class="w-20 h-20 mx-auto mb-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <i data-lucide="check" class="w-10 h-10"></i>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 uppercase tracking-wider">Order Confirmed</span>
        <h3 class="font-display font-extrabold text-2xl text-white mt-3">Welcome to the Club!</h3>
        <p class="text-gray-400 text-sm mt-2 max-w-sm mx-auto">
          Your order <strong class="text-white">#${orderNumber}</strong> has been secured and dispatched for delivery. Tracking details sent to your email.
        </p>

        <div class="mt-8 p-4 rounded-xl bg-white/[0.03] border border-white/5 text-left max-w-sm mx-auto">
          <div class="flex justify-between text-xs text-gray-400 mb-1">
            <span>Estimated Delivery:</span>
            <strong class="text-white">2 - 3 Business Days</strong>
          </div>
          <div class="flex justify-between text-xs text-gray-400">
            <span>Status:</span>
            <span class="text-emerald-400 font-semibold flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Preparing Shipment
            </span>
          </div>
        </div>

        <button onclick="closeCheckoutModal(); window.location.reload();" class="mt-8 px-8 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-orange-600/30">
          Back to Store
        </button>
      </div>
    `;
    lucide.createIcons();
  }, 1800);
}

// ==========================================================================
// TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(message, type = 'success') {
  if (!toastContainer) return;

  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200',
    error: 'bg-rose-950/90 border-rose-500/40 text-rose-200',
    info: 'bg-blue-950/90 border-blue-500/40 text-blue-200'
  };
  const icons = {
    success: 'check-circle-2',
    error: 'alert-circle',
    info: 'info'
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl text-xs font-semibold toast-enter pointer-events-auto ${bgColors[type] || bgColors.success}`;
  toast.innerHTML = `
    <i data-lucide="${icons[type] || 'check-circle-2'}" class="w-4 h-4 flex-shrink-0"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================================================
// EVENT LISTENERS & UI WIRING
// ==========================================================================
function setupEventListeners() {
  // Category tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeCategory = tab.dataset.category;
      renderProducts();
    });
  });

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Currency toggle
  const currencySelect = document.getElementById('currencySelect');
  if (currencySelect) {
    currencySelect.addEventListener('change', (e) => {
      state.currency = e.target.value;
      if (state.currency === 'INR') {
        state.currencyRate = 83;
        state.currencySymbol = '₹';
      } else {
        state.currencyRate = 1;
        state.currencySymbol = '$';
      }
      renderProducts();
      updateCartUI();
    });
  }

  // Newsletter subscription
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`VIP Access granted for ${input.value}! Check your inbox for 15% off code.`, 'success');
        input.value = '';
      }
    });
  }
}

function setupHeroInteractivity() {
  const heroCard = document.getElementById('heroCard');
  if (!heroCard) return;

  heroCard.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;
    heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}
