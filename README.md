# Ex.02 Case Study — Commercial Website using Flexbox

## 🎯 Aim & Objective

To design and develop a responsive, full-featured commercial website for an enterprise footwear store (**KICKSLAB Studio**) by implementing modern **CSS3 Flexible Box (Flexbox)** layout techniques for fluid responsiveness across desktop, tablet, and mobile displays.

---

## 📐 CSS Flexbox Concepts & Properties Implemented

The application prominently demonstrates the following core Flexbox properties across its stylesheet (`assets/css/style.css`):

| Flexbox Property | Value(s) Used | Location in Architecture |
| :--- | :--- | :--- |
| `display: flex` | `flex` | Navigation bar, Hero layout, Product catalog, Cards, Footer |
| `flex-direction` | `row`, `column` | Horizontal header bar & vertical card internal hierarchy |
| `justify-content` | `space-between`, `center`, `flex-start` | Distributing navigation items, price/cart buttons, and cards |
| `align-items` | `center`, `flex-start`, `stretch` | Vertical alignment of logos, search bars, and card containers |
| `flex-wrap` | `wrap`, `nowrap` | Dynamic multi-row wrapping of catalog cards and filter tabs |
| `flex-basis` | `calc(25% - 1.125rem)`, `calc(50% - 0.75rem)`, `100%` | Precise responsive columns (Desktop 4-col, Tablet 2-col, Mobile 1-col) |
| `gap` | `0.5rem`, `1rem`, `1.5rem`, `2.5rem` | Fluid spacing between flex items without negative margins |

---

## 🏛️ Flexbox Architectural Structure

```
Commercial_Website1/
├── index.html                   # Semantic markup structured with CSS Flexbox containers
├── README.md                    # Lab Manual Case Study & Technical Documentation
└── assets/
    ├── css/
    │   └── style.css            # Explicit CSS Flexbox module rules & micro-interactions
    ├── js/
    │   ├── products.js          # Footwear specimen dataset (Salomon, Jordan, New Balance)
    │   └── app.js               # Client-side cart, wishlist, quick view, and checkout engine
    └── images/
        └── hero-sneaker.png      # High-resolution flagship asset
```

### 1. Navigation Header Flexbox (`.flex-header-bar`)
- `display: flex; align-items: center; justify-content: space-between;`
- Left: Logo monogram flex item.
- Center: Navigation links with `display: flex; gap: 1.75rem;`.
- Right: Currency switcher, wishlist counter, and cart trigger with `display: flex; gap: 0.75rem;`.

### 2. Hero Section Flexbox (`.flex-hero-wrapper`)
- `display: flex; flex-direction: row; align-items: center; justify-content: space-between;`
- Left: Editorial copy flex container (`.flex-hero-content` with `flex: 1 1 55%`).
- Right: Double-bezel 3D visual card (`.flex-hero-media` with `flex: 1 1 45%`).
- CTA Row: `.flex-hero-ctas` with `display: flex; flex-wrap: wrap; gap: 1rem;`.

### 3. Responsive Product Catalog (`.flex-catalog-container`)
- `display: flex; flex-direction: row; flex-wrap: wrap; gap: 1.5rem;`
- Desktop: `.flex-product-card-col` uses `flex: 0 0 calc(25% - 1.125rem);` (4 cards per row).
- Tablet (`@media max-width: 1024px`): uses `flex: 0 0 calc(50% - 0.75rem);` (2 cards per row).
- Mobile (`@media max-width: 640px`): uses `flex: 0 0 100%;` (1 card per row).

### 4. Product Card Internal Vertical Flexbox (`.product-card`)
- `display: flex; flex-direction: column; justify-content: space-between;`
- Ensures card titles, tags, and bottom purchase bars align consistently regardless of variable description lengths.

### 5. Multi-Column Footer Flexbox (`.flex-footer-columns`)
- `display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; gap: 2.5rem;`
- Automatically reflows across smaller screens.

---

## ⚡ E-Commerce Features

1. **Curated Footwear Catalog**: Authentic silhouettes from Salomon Advanced, Jordan Brand, New Balance Made in USA, Nike Running, and Officine Creative.
2. **Dual-Angle Image Crossfade**: Hovering any card smoothly crossfades between primary studio profile and alternate angle.
3. **Slide-Out Cart Drawer**:
   - Real-time subtotal, shipping threshold ($200 complimentary delivery progress bar).
   - Coupon engine: code `KICKS20` for 20% discount.
4. **Currency Converter**: Dynamic conversion between USD (`$`) and INR (`₹`).
5. **Specimen Quick View Modal**: Technical dossier specifications, US size matrix (US 7 to 12).
6. **Simulated Dispatch Checkout**: Address form, payment selector (Card, UPI, COD), and manifest confirmation.

---

## OUTPUT


<img width="1915" height="993" alt="image" src="https://github.com/user-attachments/assets/3e64dc7d-963f-48f5-98ac-1b25b6a3dac0" />
<img width="1916" height="986" alt="image" src="https://github.com/user-attachments/assets/54790e21-07df-469f-9756-bbc9ecc761c1" />

<img width="1917" height="989" alt="image" src="https://github.com/user-attachments/assets/97d7e4b1-c00c-4f8e-bffd-bed48fa39969" />






---

##  Result

The case study for **Ex.02: Commercial Website using Flexbox** was successfully designed, implemented, and verified. The website demonstrates high visual aesthetics, full mobile responsiveness, and clean CSS3 Flexbox layout architecture.
