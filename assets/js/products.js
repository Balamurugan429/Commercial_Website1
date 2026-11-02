const PRODUCTS = [
  {
    id: 'kicks-01',
    name: 'AERO VELOCITY NITRO X',
    tagline: 'Ultralight Kinetic Energy Return Runner',
    category: 'running',
    price: 185,
    originalPrice: 220,
    rating: 4.9,
    reviewsCount: 342,
    badge: 'BEST SELLER',
    badgeColor: 'amber',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Crimson Volt', hex: '#ef4444', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Stealth Cyan', hex: '#06b6d4', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Midnight Onyx', hex: '#0f172a', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80' }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'Engineered with dual-density nitrogen-infused foam, the Velocity Nitro X delivers explosive propulsion and featherlight cloud-like cushioning across any terrain.',
    features: [
      'Nitrogen-infused dynamic AeroFoam™ midsole',
      'Engineered jacquard breathable airflow mesh',
      'Carbon-fiber composite propulsion shank',
      'High-abrasion gripped traction lugs'
    ],
    isFeatured: true,
    isNew: false,
    stock: 8
  },
  {
    id: 'kicks-02',
    name: 'RETRO HIGH CYBER 85',
    tagline: 'Heritage Silhouette Meets Cyberpunk Tech',
    category: 'sneakers',
    price: 210,
    originalPrice: 250,
    rating: 5.0,
    reviewsCount: 518,
    badge: 'LIMITED DROP',
    badgeColor: 'rose',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Fire & Shadow', hex: '#b91c1c', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Monochrome Core', hex: '#18181b', image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 11, 12],
    description: 'A relentless tribute to 80s basketball culture elevated by premium full-grain tumbled leather and an encapsulated air-pocket unit for all-day streetwear dominance.',
    features: [
      'Hand-stitched premium tumbled leather panels',
      'Encapsulated heel Air-Sole unit for impact absorption',
      'Perforated toe-box for thermal ventilation',
      'Solid rubber cupsole with pivot circle grip'
    ],
    isFeatured: true,
    isNew: true,
    stock: 4
  },
  {
    id: 'kicks-03',
    name: 'QUANTUM DRIFT MINIMALIST',
    tagline: 'Clean Architectural Cleanliness for the Modern Urbanite',
    category: 'sneakers',
    price: 145,
    originalPrice: 170,
    rating: 4.8,
    reviewsCount: 194,
    badge: 'TRENDING',
    badgeColor: 'emerald',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pure Chalk', hex: '#f8fafc', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Bone Taupe', hex: '#d6d3d1', image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80' }
    ],
    sizes: [7, 8, 9, 10, 11],
    description: 'Sculpted with minimalist lines and subtle tonal contrast, the Quantum Drift is the essential foundation for smart-casual tailoring and effortless daily street fashion.',
    features: [
      'Butter-soft calfskin leather and suede overlays',
      'Memory foam antimicrobial arch-support footbed',
      'Low-profile vulcanized rubber midsole',
      'Reflective micro-piping on collar'
    ],
    isFeatured: true,
    isNew: false,
    stock: 12
  },
  {
    id: 'kicks-04',
    name: 'TITAN COURT DUNK PRO',
    tagline: 'Uncompromising Ankle Lock & Court Dominance',
    category: 'basketball',
    price: 195,
    originalPrice: 230,
    rating: 4.9,
    reviewsCount: 260,
    badge: 'NEW RELEASE',
    badgeColor: 'indigo',
    image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Electric Royal', hex: '#2563eb', image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Onyx Red', hex: '#dc2626', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    description: 'Constructed for explosive vertical leap and lateral lockdown. Features TPU side-wings that prevent rollover and high-response rebound pods under the forefoot.',
    features: [
      'Reinforced TPU lateral stabilizing outrigger',
      'Zoom-tuned high-impact forefoot pods',
      'Padded anatomical high collar for Achilles support',
      'Herringbone multi-directional grip tread'
    ],
    isFeatured: false,
    isNew: true,
    stock: 6
  },
  {
    id: 'kicks-05',
    name: 'VORTEX TRAILBLAZER GTX',
    tagline: 'All-Weather Waterproof All-Terrain Grip',
    category: 'running',
    price: 175,
    originalPrice: 210,
    rating: 4.7,
    reviewsCount: 182,
    badge: 'ALL-WEATHER',
    badgeColor: 'emerald',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Olive Tactical', hex: '#4d7c0f', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Charcoal Black', hex: '#1e293b', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80' }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'Mud, rain, and jagged mountain trails are no match. GORE-TEX membrane keeps water out while allowing sweat vapor to escape effortlessly.',
    features: [
      '100% GORE-TEX waterproof & breathable membrane',
      'Vibram Megagrip lugged rubber sole',
      'Quick-lace ballistic speed system with lace garage',
      'Reinforced rock-shield toe cap'
    ],
    isFeatured: false,
    isNew: false,
    stock: 15
  },
  {
    id: 'kicks-06',
    name: 'NOMAD CHELSEA NOIR',
    tagline: 'Hand-Waxed Italian Leather Chelsea Boot',
    category: 'boots',
    price: 240,
    originalPrice: 290,
    rating: 4.9,
    reviewsCount: 147,
    badge: 'HANDCRAFTED',
    badgeColor: 'amber',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Ebony Gloss', hex: '#0a0a0a', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Cognac Saddle', hex: '#78350f', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 11, 12],
    description: 'Constructed by master bootmakers with Goodyear welted construction, water-resistant waxed leather, and flexible elastic gussets for instant comfort.',
    features: [
      'Full-grain Italian waxed pull-up leather',
      'Goodyear 360° storm welt construction (resoleable)',
      'Natural stacked leather heel with rubber tap',
      'Dual heavy-duty pull tabs for seamless entry'
    ],
    isFeatured: true,
    isNew: false,
    stock: 5
  },
  {
    id: 'kicks-07',
    name: 'HYPERGLIDE CHUNKY 90s',
    tagline: 'Sculpted Volume with Ultra-Light Cloud Platform',
    category: 'sneakers',
    price: 160,
    originalPrice: 195,
    rating: 4.8,
    reviewsCount: 312,
    badge: 'HOT',
    badgeColor: 'rose',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cream Peach', hex: '#fed7aa', image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Pastel Mint', hex: '#a7f3d0', image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80' }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 10],
    description: '90s nostalgia reimagined for the catwalk. Dramatically flared chunky sole crafted from ultra-lightweight blown EVA that feels weightless on foot.',
    features: [
      'Ultra-light 48mm sculpted EVA platform',
      'Layered breathable mesh and vegan suede panels',
      'Ergonomic padded collar and gusseted tongue',
      'Durable non-marking gum outsole'
    ],
    isFeatured: false,
    isNew: true,
    stock: 9
  },
  {
    id: 'kicks-08',
    name: 'METEOR SPEED MARATHON',
    tagline: 'Sub-2 Hour Marathon Racing Shoe',
    category: 'running',
    price: 235,
    originalPrice: 275,
    rating: 5.0,
    reviewsCount: 165,
    badge: 'PRO RACER',
    badgeColor: 'indigo',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Solar Lime', hex: '#84cc16', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Bright Ember', hex: '#f97316', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80' }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    description: 'Calibrated for competitive race day. Full-length curved carbon-fiber spoon plate snaps forward with each stride to reduce metabolic expenditure.',
    features: [
      'Super-critical PEBA energy return foam (88% rebound)',
      'Full-length curved carbon propulsion plate',
      'AtomKnit ultra-breathable single-layer upper',
      'Weighs only 185g (Men’s US 9)'
    ],
    isFeatured: false,
    isNew: false,
    stock: 3
  },
  {
    id: 'kicks-09',
    name: 'OXFORD GRAND SOVEREIGN',
    tagline: 'Artisanal Burnished Full-Grain Leather Dress Shoe',
    category: 'boots',
    price: 260,
    originalPrice: 320,
    rating: 4.9,
    reviewsCount: 89,
    badge: 'EXECUTIVE',
    badgeColor: 'amber',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Oxblood Brown', hex: '#581c1c', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Onyx Polish', hex: '#0f172a', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'Hand-patinated by European artisans with closed-channel leather stitching. The definitive cap-toe Oxford for formal evenings and executive boardroom meetings.',
    features: [
      'Grade-A French calfskin leather with hand-burnished toe',
      'Vegetable-tanned leather insole that molds to foot',
      'Closed-channel channeled leather outsole',
      'Goodyear welted durability for decades of wear'
    ],
    isFeatured: false,
    isNew: false,
    stock: 7
  },
  {
    id: 'kicks-10',
    name: 'SKATE LOW VINTAGE 77',
    tagline: 'Classic Board Feel & Reinforced Ollie Durability',
    category: 'sneakers',
    price: 110,
    originalPrice: 130,
    rating: 4.8,
    reviewsCount: 421,
    badge: 'STREET ICON',
    badgeColor: 'indigo',
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Vintage Washed Black', hex: '#27272a', image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Checkerboard Off-White', hex: '#fafafa', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80' }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'Tested and approved by city skaters. Double-stitched suede flick zones, impact-dampening gel insole, and raw waffle grip for maximum board control.',
    features: [
      'Heavyweight 12oz canvas and durable suede combo',
      'Impact-absorbing PopCush™ insole technology',
      'Vulcanized sticky waffle rubber grip',
      'DURACAP™ reinforced underlays in high-wear areas'
    ],
    isFeatured: false,
    isNew: false,
    stock: 22
  }
];
