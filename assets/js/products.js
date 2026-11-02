// ==========================================================================
// KICKSLAB STUDIO — ARCHIVE & CURATED FOOTWEAR CATALOG
// High-Fashion Editorial Curation (Nike Lab, Salomon, New Balance, Jordan)
// ==========================================================================

const PRODUCTS = [
  {
    id: 'arch-01',
    brand: 'SALOMON ADVANCED',
    name: 'XT-6 GORE-TEX PHANTOM',
    edition: 'Lab Series // Edition 04',
    category: 'trail',
    price: 220,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 184,
    badge: 'ADVANCED LAB',
    badgeType: 'mono',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
    colors: [
      { name: 'Phantom Black', hex: '#18181b', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Lunar Slate', hex: '#64748b', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'First launched in 2013, the XT-6 is the preferred footwear of ultra-distance athletes under the most demanding conditions. Re-engineered with ePE Gore-Tex waterproof membrane and Agile Chassis™ System.',
    specs: [
      'GORE-TEX PFC-free waterproof membrane',
      'Agile Chassis™ System (ACS) stability cradle',
      'Quicklace™ minimalist one-pull tightening',
      'Mud Contagrip® deep geometric lugs'
    ],
    colorwaysCount: 2,
    stock: 6
  },
  {
    id: 'arch-02',
    brand: 'JORDAN BRAND',
    name: 'AIR JORDAN 1 RETRO HIGH OG',
    edition: 'Heritage Archive 1985',
    category: 'streetwear',
    price: 190,
    originalPrice: 220,
    rating: 5.0,
    reviewsCount: 429,
    badge: 'ARCHIVE VAULT',
    badgeType: 'accent',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85',
    colors: [
      { name: 'Chicago Red', hex: '#b91c1c', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Shadow Black', hex: '#0f172a', image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'The defining silhouette that sparked the modern footwear movement. Faithful 1985 specifications featuring full-grain tumbled leather, encapsulated heel Air-Sole unit, and signature embossed Wings insignia.',
    specs: [
      'Full-grain tumbled European cowhide upper',
      'Encapsulated Air-Sole heel damping unit',
      'High-traction solid rubber cupsole with pivot circle',
      'Perforated toe-vane ventilation matrix'
    ],
    colorwaysCount: 2,
    stock: 4
  },
  {
    id: 'arch-03',
    brand: 'NEW BALANCE',
    name: '990v6 MADE IN USA',
    edition: 'Grey Day Studio Edition',
    category: 'lifestyle',
    price: 210,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 312,
    badge: 'MADE IN USA',
    badgeType: 'mono',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85',
    colors: [
      { name: 'Castlerock Grey', hex: '#71717a', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Alabaster Chalk', hex: '#e4e4e7', image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'The pinnacle of domestic American craft. Designed without compromise, integrating FuelCell midsole foam for high rebound velocity and premium pigskin suede overlays.',
    specs: [
      'FuelCell foam delivers dynamic propulsion',
      'Premium pigskin suede and mesh upper composition',
      'ENCAP midsole cushioning with durable polyurethane rim',
      'Reflective 3M Scotchlite™ collar accents'
    ],
    colorwaysCount: 2,
    stock: 8
  },
  {
    id: 'arch-04',
    brand: 'NIKE RUNNING',
    name: 'ZOOMX VAPORFLY NEXT% 3',
    edition: 'Marathon Race Specification',
    category: 'performance',
    price: 260,
    originalPrice: 285,
    rating: 5.0,
    reviewsCount: 227,
    badge: 'WORLD ATHLETICS CERTIFIED',
    badgeType: 'accent',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85',
    colors: [
      { name: 'Hyper Orange', hex: '#ea580c', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Volt Lime', hex: '#84cc16', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    description: 'Engineered for distance runners chasing records. Full-length carbon fiber Flyplate coupled with responsive ZoomX foam reduces metabolic effort by 4.2% across 42.195 km.',
    specs: [
      'Nike ZoomX super-critical responsive foam',
      'Full-length rigid carbon fiber Flyplate',
      'Flyknit engineered breathable single-layer upper',
      'Waffle-grooved forefoot traction pods'
    ],
    colorwaysCount: 2,
    stock: 3
  },
  {
    id: 'arch-05',
    brand: 'OFFICINE CREATIVE',
    name: 'ANATOMIA LEATHER CHELSEA',
    edition: 'Italian Workshop Edition',
    category: 'boots',
    price: 340,
    originalPrice: 395,
    rating: 4.9,
    reviewsCount: 92,
    badge: 'HAND-PATINATED',
    badgeType: 'mono',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=85',
    colors: [
      { name: 'Washed Nero', hex: '#0a0a0a', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Castagno Brown', hex: '#451a03', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 11, 12],
    description: 'Handcrafted in Montegranaro, Italy. Made from vegetable-tanned horsehide washed in stone barrels for a tactile, worn-in drape. Blake-rapid stitched to a stacked leather sole with Vibram rubber inserts.',
    specs: [
      'Full-grain Italian horsehide leather with stone-wash wash',
      'Blake-rapid artisan sole construction (resoleable)',
      'Reinforced lateral elastic side gussets',
      'Stacked leather heel with inset rubber traction top-piece'
    ],
    colorwaysCount: 2,
    stock: 5
  },
  {
    id: 'arch-06',
    brand: 'ADIDAS ORIGINALS',
    name: 'SAMBA DECON LEATHER',
    edition: 'Archive Low Profile',
    category: 'streetwear',
    price: 150,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 512,
    badge: 'ICONIC SILHOUETTE',
    badgeType: 'mono',
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85',
    colors: [
      { name: 'Core Black / White', hex: '#18181b', image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Cloud White', hex: '#fafafa', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'A completely deconstructed take on the 1950 indoor soccer icon. Features an ultra-supple unlined leather upper that packs flat and conforms organically to the natural shape of your foot.',
    specs: [
      'Unlined collapsible full-grain leather upper',
      'Low-profile gum rubber outsole with suction tread',
      'Debossed gold foil archive lettering',
      'Reinforced suede T-toe abrasion overlay'
    ],
    colorwaysCount: 2,
    stock: 12
  },
  {
    id: 'arch-07',
    brand: 'ON RUNNING',
    name: 'CLOUDMONSTER HYPER',
    edition: 'Maximal Cushion Energy Unit',
    category: 'performance',
    price: 220,
    originalPrice: 245,
    rating: 4.9,
    reviewsCount: 168,
    badge: 'LAB TESTED',
    badgeType: 'accent',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
    colors: [
      { name: 'Glacier / Flame', hex: '#06b6d4', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'Devised in Zurich for extreme training mileage without fatigue. Features a dual-foam setup combining Helion™ HF hyper foam and CloudTec® monster elements for softest impact absorption.',
    specs: [
      'Helion™ HF hyper foam Pebax-derived formulation',
      'Extreme CloudTec® oversized hollow pods',
      'High-friction rubber compound for asphalt cornering',
      'Engineered mesh upper with high-tensile microfiber tape'
    ],
    colorwaysCount: 1,
    stock: 7
  },
  {
    id: 'arch-08',
    brand: 'MARSELL',
    name: 'ZUCCA DERBY CHUNKY',
    edition: 'Milan Atelier Series',
    category: 'boots',
    price: 380,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 64,
    badge: 'ATELIER SPECIAL',
    badgeType: 'mono',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1200&q=85',
    colors: [
      { name: 'Matte Nero', hex: '#0f172a', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11],
    description: 'Sculptural post-industrial silhouette crafted from thick matte calf leather with an exaggerated reverse-welt rounded toe and micro-cellular foam platform sole.',
    specs: [
      'Matte reverse calfskin leather upper',
      'Exaggerated architectural 38mm welted platform',
      'Calfskin lined interior with anatomical cushioned insole',
      'Handmade in Veneto, Italy'
    ],
    colorwaysCount: 1,
    stock: 4
  }
];
