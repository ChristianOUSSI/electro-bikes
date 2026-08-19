const fs = require('fs');
const path = require('path');

// Curated high-resolution image collections tailored to motorcycle and bicycle categories
const IMAGES = {
  zeroSrf: [
    "/images/products/zero-srf.jpg",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80",
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80"
  ],
  zeroSrs: [
    "/images/products/zero-srs.jpg",
    "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=1200&q=80",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80"
  ],
  zeroDsrx: [
    "/images/products/zero-dsrx.jpg",
    "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&q=80",
    "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=1200&q=80"
  ],
  livewireOne: [
    "/images/products/livewire-one.jpg",
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80"
  ],
  livewireDelmar: [
    "/images/products/livewire-s2-delmar.jpg",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80",
    "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=1200&q=80"
  ],
  surronLightBee: [
    "/images/products/surron-light-bee-x.jpg",
    "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&q=80",
    "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=1200&q=80",
    "https://images.unsplash.com/photo-1605008562962-4c8b45d9e9a3?w=1200&q=80"
  ],
  motoHyper: [
    "/images/products/zero-srf.jpg",
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80",
    "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=1200&q=80"
  ],
  motoTourer: [
    "/images/products/zero-srs.jpg",
    "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=1200&q=80",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80"
  ],
  dirtOffroad: [
    "/images/products/surron-light-bee-x.jpg",
    "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&q=80",
    "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=1200&q=80",
    "https://images.unsplash.com/photo-1605008562962-4c8b45d9e9a3?w=1200&q=80"
  ],
  scooter: [
    "https://images.unsplash.com/photo-1618395434570-806f6b8fa78e?w=1200&q=80",
    "https://images.unsplash.com/photo-1571325654970-2a2c4dda9b52?w=1200&q=80",
    "https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=1200&q=80"
  ],
  vttae: [
    "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=1200&q=80",
    "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&q=80",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200&q=80"
  ],
  gravelRoute: [
    "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=1200&q=80",
    "https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=1200&q=80",
    "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80"
  ],
  cargoUrban: [
    "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&q=80",
    "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=1200&q=80",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200&q=80"
  ]
};

const ITEMS_SPEC = [
  // 1. HYPERSPORTS & ROADSTERS (Permis A) - 10
  { id: "moto-volt-r", nom: "Volt R Roadster Hyper", brand: "eVolt Racing", cat: "Roadster Électrique Haute Performance", cat_en: "High-Performance Electric Roadster", type: "moto", license: "A", license_fr: "Permis A (Pleine Puissance)", license_en: "License A (Full Power)", price: 23900, bonus: 1500, range: 260, speed: 205, weight: 215, kwh: 17.3, kw_peak: 110, hp: 150, torque: 200, img: IMAGES.zeroSrf },
  { id: "zero-sr-f-2026", nom: "Zero SR/F Premium", brand: "Zero Motorcycles", cat: "Streetfighter Électrique Connecté", cat_en: "Connected Electric Streetfighter", type: "moto", license: "A", license_fr: "Permis A (Pleine Puissance)", license_en: "License A (Full Power)", price: 25490, bonus: 1500, range: 270, speed: 200, weight: 227, kwh: 17.3, kw_peak: 82, hp: 110, torque: 190, img: IMAGES.zeroSrf },
  { id: "zero-sr-s-gt", nom: "Zero SR/S Grand Tourer", brand: "Zero Motorcycles", cat: "Sport-GT Électrique Carénée", cat_en: "Fully Fairing Electric Sport-Tourer", type: "moto", license: "A", license_fr: "Permis A (Pleine Puissance)", license_en: "License A (Full Power)", price: 26890, bonus: 1500, range: 285, speed: 200, weight: 235, kwh: 17.3, kw_peak: 82, hp: 110, torque: 190, img: IMAGES.zeroSrs },
  { id: "livewire-one-official", nom: "LiveWire ONE", brand: "LiveWire", cat: "Roadster Électrique Américain d'Élite", cat_en: "American High-End Electric Roadster", type: "moto", license: "A", license_fr: "Permis A (Pleine Puissance)", license_en: "License A (Full Power)", price: 24990, bonus: 1500, range: 235, speed: 177, weight: 255, kwh: 15.4, kw_peak: 75, hp: 100, torque: 114, img: IMAGES.livewireOne },
  { id: "verge-ts-ultra", nom: "Verge TS Ultra Hubless", brand: "Verge Motorcycles", cat: "Hyper-Roadster Futuriste 1200 Nm", cat_en: "Futuristic 1200 Nm Hubless Hyper-Roadster", type: "moto", license: "A", license_fr: "Permis A (Pleine Puissance)", license_en: "License A (Full Power)", price: 54900, bonus: 1500, range: 375, speed: 200, weight: 245, kwh: 20.2, kw_peak: 150, hp: 204, torque: 1200, img: IMAGES.livewireOne },
  { id: "lightning-strike-carbon", nom: "Lightning Strike Carbon", brand: "Lightning Motorcycle", cat: "Superbike Électrique Carbone", cat_en: "Carbon Electric Superbike", type: "moto", license: "A", license_fr: "Permis A (Pleine Puissance)", license_en: "License A (Full Power)", price: 28900, bonus: 1500, range: 240, speed: 240, weight: 210, kwh: 18.0, kw_peak: 90, hp: 122, torque: 180, img: IMAGES.zeroSrs },
  { id: "moto-trail-adv", nom: "Trail ADV Explorer Pro", brand: "eVolt Overland", cat: "Maxi-Trail Aventure & Raid", cat_en: "Adventure & Dual-Sport Maxi-Trail", type: "moto", license: "A", license_fr: "Permis A (Pleine Puissance)", license_en: "License A (Full Power)", price: 25900, bonus: 1500, range: 240, speed: 185, weight: 232, kwh: 18.2, kw_peak: 85, hp: 116, torque: 190, img: IMAGES.zeroDsrx },
  { id: "zero-dsrx-adventure", nom: "Zero DSR/X Adventure", brand: "Zero Motorcycles", cat: "Maxi-Trail Aventure Tout-Chemin", cat_en: "All-Terrain Adventure Maxi-Trail", type: "moto", license: "A", license_fr: "Permis A (Pleine Puissance)", license_en: "License A (Full Power)", price: 26850, bonus: 1500, range: 290, speed: 180, weight: 247, kwh: 17.3, kw_peak: 75, hp: 102, torque: 225, img: IMAGES.zeroDsrx },
  { id: "damon-hypersport-premier", nom: "Damon Hypersport Premier", brand: "Damon Motorcycles", cat: "Hypersport Électrique 320 km/h", cat_en: "320 km/h Electric Hypersport", type: "moto", license: "A", license_fr: "Permis A (Pleine Puissance)", license_en: "License A (Full Power)", price: 42000, bonus: 1500, range: 320, speed: 320, weight: 215, kwh: 20.0, kw_peak: 150, hp: 200, torque: 200, img: IMAGES.zeroSrs },
  { id: "energica-ego-plus", nom: "Energica Ego+ RS", brand: "Energica Motor", cat: "Superbike MotoE Compétition", cat_en: "MotoE Competition Superbike", type: "moto", license: "A", license_fr: "Permis A (Pleine Puissance)", license_en: "License A (Full Power)", price: 32500, bonus: 1500, range: 280, speed: 240, weight: 260, kwh: 21.5, kw_peak: 126, hp: 171, torque: 215, img: IMAGES.zeroSrs },

  // 2. MOTOS PERMIS A2 (Jusqu'à 35kW / 47.6 ch) - 10
  { id: "livewire-s2-delmar", nom: "LiveWire S2 Del Mar", brand: "LiveWire", cat: "Flat-Track Urbain & Scrambler A2", cat_en: "Urban Flat-Tracker A2", type: "moto", license: "A2", license_fr: "Permis A2 (Jusqu'à 35 kW)", license_en: "License A2 (Up to 35 kW)", price: 18690, bonus: 1500, range: 181, speed: 165, weight: 195, kwh: 10.5, kw_peak: 35, hp: 47.6, torque: 263, img: IMAGES.livewireDelmar },
  { id: "livewire-s2-mulholland", nom: "LiveWire S2 Mulholland", brand: "LiveWire", cat: "Cruiser Néo-Rétro Performance A2", cat_en: "Performance Cruiser A2", type: "moto", license: "A2", license_fr: "Permis A2 (Jusqu'à 35 kW)", license_en: "License A2 (Up to 35 kW)", price: 18990, bonus: 1500, range: 195, speed: 160, weight: 196, kwh: 10.5, kw_peak: 35, hp: 47.6, torque: 263, img: IMAGES.livewireDelmar },
  { id: "zero-fxe-supermotard", nom: "Zero FXE Supermotard", brand: "Zero Motorcycles", cat: "Supermotard Électrique Léger A2", cat_en: "Lightweight Electric Supermoto A2", type: "moto", license: "A2", license_fr: "Permis A2 (Jusqu'à 35 kW)", license_en: "License A2 (Up to 35 kW)", price: 14165, bonus: 900, range: 160, speed: 137, weight: 135, kwh: 7.2, kw_peak: 33, hp: 44, torque: 106, img: IMAGES.zeroSrf },
  { id: "zero-ds-dual-sport", nom: "Zero DS Dual Sport A2", brand: "Zero Motorcycles", cat: "Trail Polyvalent Route & Piste A2", cat_en: "Dual-Sport Adventure A2", type: "moto", license: "A2", license_fr: "Permis A2 (Jusqu'à 35 kW)", license_en: "License A2 (Up to 35 kW)", price: 16500, bonus: 1200, range: 210, speed: 145, weight: 187, kwh: 14.4, kw_peak: 35, hp: 47.6, torque: 110, img: IMAGES.zeroDsrx },
  { id: "maeving-rm1s-british", nom: "Maeving RM1S Classic", brand: "Maeving UK", cat: "Café Racer Britannique Vintage A2", cat_en: "British Vintage Cafe Racer A2", type: "moto", license: "A2", license_fr: "Permis A2 (Jusqu'à 35 kW)", license_en: "License A2 (Up to 35 kW)", price: 8990, bonus: 900, range: 130, speed: 110, weight: 125, kwh: 5.4, kw_peak: 14, hp: 19, torque: 160, img: IMAGES.livewireDelmar },
  { id: "moto-cafe-e", nom: "Café-E Racer Néo-Rétro", brand: "eVolt Atelier", cat: "Café Racer Néo-Rétro Fait Main", cat_en: "Handcrafted Neo-Retro Cafe Racer", type: "moto", license: "A2", license_fr: "Permis A2 (Jusqu'à 35 kW)", license_en: "License A2 (Up to 35 kW)", price: 18900, bonus: 1500, range: 180, speed: 150, weight: 178, kwh: 12.8, kw_peak: 35, hp: 47.6, torque: 120, img: IMAGES.livewireDelmar },
  { id: "buell-fuell-flow", nom: "FUELL Fllow (By Erik Buell)", brand: "FUELL / Buell", cat: "Roadster Urbain 50L Coffre A2", cat_en: "Urban Roadster 50L Trunk A2", type: "moto", license: "A2", license_fr: "Permis A2 (Jusqu'à 35 kW)", license_en: "License A2 (Up to 35 kW)", price: 14995, bonus: 1500, range: 240, speed: 140, weight: 180, kwh: 10.0, kw_peak: 35, hp: 47.6, torque: 750, img: IMAGES.livewireOne },
  { id: "rgnt-no1-classic", nom: "RGNT No. 1 Classic SE", brand: "RGNT Motorcycles", cat: "Néo-Rétro Suédoise d'Artisanat", cat_en: "Swedish Handcrafted Neo-Retro", type: "moto", license: "A2", license_fr: "Permis A2 (Jusqu'à 35 kW)", license_en: "License A2 (Up to 35 kW)", price: 14490, bonus: 1200, range: 150, speed: 125, weight: 160, kwh: 9.5, kw_peak: 21, hp: 28, torque: 390, img: IMAGES.livewireDelmar },
  { id: "dab-motors-1alpha", nom: "DAB Motors 1α Électrique", brand: "DAB Motors France", cat: "Scrambler Design Édition Limitée", cat_en: "Limited Edition Designer Scrambler", type: "moto", license: "A2", license_fr: "Permis A2 (Jusqu'à 35 kW)", license_en: "License A2 (Up to 35 kW)", price: 14900, bonus: 1100, range: 150, speed: 130, weight: 125, kwh: 7.1, kw_peak: 25, hp: 34, torque: 395, img: IMAGES.livewireDelmar },
  { id: "alva-electric-roadster", nom: "Alva Auto Roadster A2", brand: "Alva Technologies", cat: "Roadster A2 Connecté 4G", cat_en: "4G Connected A2 Roadster", type: "moto", license: "A2", license_fr: "Permis A2 (Jusqu'à 35 kW)", license_en: "License A2 (Up to 35 kW)", price: 11500, bonus: 900, range: 165, speed: 120, weight: 140, kwh: 8.0, kw_peak: 22, hp: 30, torque: 110, img: IMAGES.livewireDelmar },

  // 3. MOTOS & SCRAMBLERS 125cc (Permis A1 ou B + 7h) - 12
  { id: "moto-land-nomad", nom: "LAND District Scrambler", brand: "LAND Electric", cat: "Scrambler Urbain Batterie Amovible", cat_en: "Urban Scrambler Removable Battery", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 8900, bonus: 900, range: 140, speed: 115, weight: 105, kwh: 5.5, kw_peak: 17, hp: 23, torque: 72, img: IMAGES.livewireDelmar },
  { id: "ryvid-anthem-official", nom: "Ryvid Anthem Électrique", brand: "Ryvid USA", cat: "Roadster Châssis Inox & Selle Réglable", cat_en: "Stainless Frame Adjustable Seat Roadster", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 7990, bonus: 900, range: 120, speed: 120, weight: 142, kwh: 4.3, kw_peak: 14, hp: 19, torque: 338, img: IMAGES.livewireDelmar },
  { id: "ryvid-outset-scrambler", nom: "Ryvid Outset Dual-Sport", brand: "Ryvid USA", cat: "Scrambler Périurbain Guidon Haut", cat_en: "Dual-Sport Scrambler High Handlebar", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 7490, bonus: 850, range: 115, speed: 118, weight: 138, kwh: 4.3, kw_peak: 14, hp: 19, torque: 338, img: IMAGES.livewireDelmar },
  { id: "volcon-grunt-evo-fat", nom: "Volcon Grunt EVO Fat-Tire", brand: "Volcon Powersports", cat: "Moto Tout-Terrain Pneus Géants 125cc", cat_en: "Fat-Tire All-Terrain Trail Bike", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 6990, bonus: 700, range: 110, speed: 65, weight: 130, kwh: 4.6, kw_peak: 8, hp: 11, torque: 102, img: IMAGES.surronLightBee },
  { id: "horwin-cr6-pro-manual", nom: "Horwin CR6 Pro (Boîte 5 Vitesses)", brand: "Horwin", cat: "Café Racer Électrique à Boîte Manuelle", cat_en: "Electric Cafe Racer with 5-Speed Manual", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 7490, bonus: 900, range: 135, speed: 105, weight: 134, kwh: 4.0, kw_peak: 11, hp: 15, torque: 260, img: IMAGES.livewireDelmar },
  { id: "super-soco-tc-max-pro", nom: "Super Soco TC Max Pro", brand: "Super Soco", cat: "Roadster Néo-Rétro Courroie Carbone", cat_en: "Neo-Retro Carbon Belt Roadster", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 4790, bonus: 750, range: 110, speed: 95, weight: 102, kwh: 3.24, kw_peak: 5.5, hp: 7.5, torque: 180, img: IMAGES.livewireDelmar },
  { id: "tromox-ukko-s-pro", nom: "Tromox Ukko S Pro", brand: "Tromox", cat: "Mini-Streetfighter 125cc Monobras", cat_en: "Single-Sided Swingarm 125cc Mini-Fighter", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 5990, bonus: 800, range: 130, speed: 95, weight: 110, kwh: 3.96, kw_peak: 8, hp: 11, torque: 180, img: IMAGES.livewireDelmar },
  { id: "kollter-es1-pro-enduro", nom: "Kollter ES1 Pro Dual Battery", brand: "Kollter", cat: "Supermotard Double Batterie 125cc", cat_en: "Dual Battery 125cc Supermoto", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 5490, bonus: 900, range: 120, speed: 100, weight: 112, kwh: 4.6, kw_peak: 11, hp: 15, torque: 220, img: IMAGES.surronLightBee },
  { id: "caofen-f80-enduro-oil", nom: "Caofen F80 Enduro Pro", brand: "Caofen", cat: "Enduro 125cc Refroidissement Huile", cat_en: "Oil-Immersed Battery 125cc Enduro", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 6290, bonus: 850, range: 130, speed: 85, weight: 88, kwh: 3.45, kw_peak: 8, hp: 11, torque: 310, img: IMAGES.surronLightBee },
  { id: "niu-rqi-sport-125", nom: "Niu RQi Sport 125cc", brand: "Niu Technologies", cat: "Roadster Urbain Double Batterie 72V", cat_en: "Dual 72V Battery Urban Roadster", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 7999, bonus: 900, range: 120, speed: 110, weight: 186, kwh: 5.18, kw_peak: 7.5, hp: 10.2, torque: 450, img: IMAGES.livewireDelmar },
  { id: "horwin-ht5-trail", nom: "Horwin HT5 Dual-Sport", brand: "Horwin", cat: "Trail Électrique Léger 125cc", cat_en: "Lightweight 125cc Electric Trail", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 5790, bonus: 800, range: 110, speed: 85, weight: 95, kwh: 3.8, kw_peak: 8, hp: 11, torque: 260, img: IMAGES.surronLightBee },
  { id: "braaap-moto-e-125", nom: "Braaap Moto-E Urban Pro", brand: "Braaap", cat: "Roadster Sport 125cc Économique", cat_en: "Sport Urban 125cc Roadster", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 4990, bonus: 700, range: 100, speed: 90, weight: 115, kwh: 3.6, kw_peak: 6, hp: 8.2, torque: 150, img: IMAGES.livewireDelmar },

  // 4. MAXI-SCOOTERS 125cc & GT (Permis A1/B) - 10
  { id: "bmw-ce-04-avantgarde", nom: "BMW CE 04 Avantgarde", brand: "BMW Motorrad", cat: "Maxi-Scooter Révolutionnaire 125/A2", cat_en: "Futuristic Urban Maxi-Scooter", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 12990, bonus: 1500, range: 130, speed: 120, weight: 231, kwh: 8.9, kw_peak: 23, hp: 31, torque: 62, img: IMAGES.scooter },
  { id: "silence-s01-plus-official", nom: "Silence S01+ Connected", brand: "Silence", cat: "Scooter Batterie Trolley Amovible", cat_en: "Trolley Battery Commuter Scooter", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 8290, bonus: 900, range: 133, speed: 100, weight: 152, kwh: 5.6, kw_peak: 9, hp: 12.2, torque: 120, img: IMAGES.scooter },
  { id: "ray-77-gt-tourer", nom: "Ray 7.7 GT Tourer", brand: "Ray Motors", cat: "Maxi-Scooter Autoroute 125 km/h", cat_en: "Highway-Capable Maxi-Scooter 125 km/h", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 9990, bonus: 1100, range: 150, speed: 125, weight: 165, kwh: 7.7, kw_peak: 17.5, hp: 24, torque: 60, img: IMAGES.scooter },
  { id: "segway-e300se-abs", nom: "Segway E300SE Triple Battery", brand: "Segway", cat: "Maxi-Scooter 0-50 en 2.9s ABS", cat_en: "Triple Battery 105 km/h ABS Scooter", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 4999, bonus: 900, range: 130, speed: 105, weight: 127, kwh: 6.0, kw_peak: 10, hp: 13.6, torque: 200, img: IMAGES.scooter },
  { id: "moto-city-ls-125", nom: "City LS 125 Grand Tourer", brand: "eVolt Urban", cat: "Maxi-Scooter Électrique Coffre 2 Casques", cat_en: "Electric Maxi-Scooter 2 Helmets Storage", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 6990, bonus: 900, range: 130, speed: 110, weight: 128, kwh: 5.76, kw_peak: 11, hp: 15, torque: 140, img: IMAGES.scooter },
  { id: "niu-mqi-gt-evo-100", nom: "Niu MQi GT EVO 100 km/h", brand: "Niu Technologies", cat: "Scooter Grandes Roues 14 pouces", cat_en: "14-inch Wheels Urban Scooter", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 4999, bonus: 900, range: 100, speed: 100, weight: 128, kwh: 3.74, kw_peak: 6.5, hp: 8.8, torque: 160, img: IMAGES.scooter },
  { id: "horwin-ek3-deluxe", nom: "Horwin EK3 Grand Tourer", brand: "Horwin", cat: "Scooter Rétro-Chic Démarrage Sans Clé", cat_en: "Keyless Retro-Chic Urban Scooter", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 4490, bonus: 750, range: 100, speed: 95, weight: 95, kwh: 2.88, kw_peak: 6.2, hp: 8.4, torque: 195, img: IMAGES.scooter },
  { id: "frison-t10-gt", nom: "Frison T10 GT Maxi-Scooter", brand: "Frison Scooter", cat: "Maxi-Scooter GT 120 km/h", cat_en: "GT Maxi-Scooter 120 km/h", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 7990, bonus: 900, range: 140, speed: 120, weight: 150, kwh: 6.8, kw_peak: 10, hp: 13.6, torque: 180, img: IMAGES.scooter },
  { id: "zeeho-ae8-s-plus", nom: "Zeeho AE8 S+ (By CFMOTO)", brand: "Zeeho / CFMOTO", cat: "Scooter Sportif Brembo & Bosch ABS", cat_en: "Sport Scooter Brembo & Bosch ABS", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 5490, bonus: 850, range: 120, speed: 105, weight: 130, kwh: 4.3, kw_peak: 12.5, hp: 17, torque: 218, img: IMAGES.scooter },
  { id: "bmw-ce-02-iconic", nom: "BMW CE 02 eParkourer", brand: "BMW Motorrad", cat: "eParkourer Urbain Jeune & Dynamique", cat_en: "Urban eParkourer 125cc", type: "moto", license: "A1_B", license_fr: "Permis A1 ou B + 7h (Équiv 125cc)", license_en: "License A1 or Car+7h (125cc)", price: 8750, bonus: 900, range: 95, speed: 95, weight: 132, kwh: 3.92, kw_peak: 11, hp: 15, torque: 55, img: IMAGES.scooter },

  // 5. SUR-RON, TALARIA, STARK VARG & DIRT COMPÉTITION - 18
  { id: "surron-light-bee-x", nom: "Sur-Ron Light Bee X (Édition 2026)", brand: "Sur-Ron Official", cat: "E-Cross & Dirt Bike Léger 60V", cat_en: "Lightweight 60V Electric Dirt Bike", type: "moto", license: "AM", license_fr: "Homologuée L1e (Permis AM dès 14 ans) ou Off-Road", license_en: "Road Legal L1e or Off-Road", price: 4990, bonus: 600, range: 100, speed: 75, weight: 47, kwh: 2.4, kw_peak: 6, hp: 8.2, torque: 250, img: IMAGES.surronLightBee },
  { id: "surron-light-bee-supermoto", nom: "Sur-Ron Light Bee X Supermotard 17'", brand: "Sur-Ron Official", cat: "Supermoto Urbain Jantes 17' Warp 9", cat_en: "17' Warp 9 Urban Supermoto", type: "moto", license: "AM", license_fr: "Homologuée L1e (Permis AM)", license_en: "Road Legal L1e", price: 5490, bonus: 600, range: 95, speed: 80, weight: 48, kwh: 2.4, kw_peak: 6, hp: 8.2, torque: 250, img: IMAGES.surronLightBee },
  { id: "surron-ultra-bee", nom: "Sur-Ron Ultra Bee T (125cc Enduro)", brand: "Sur-Ron Official", cat: "Enduro Électrique 74V Antipatinage SRTC", cat_en: "74V Mid-Size Enduro with SRTC Traction", type: "moto", license: "A1_B", license_fr: "Homologuée 125cc (Permis A1/B)", license_en: "125cc Road Homologated", price: 7490, bonus: 900, range: 140, speed: 95, weight: 85, kwh: 4.07, kw_peak: 12.5, hp: 17, torque: 440, img: IMAGES.surronLightBee },
  { id: "surron-ultra-bee-sm", nom: "Sur-Ron Ultra Bee Supermotard Pro", brand: "Sur-Ron Official", cat: "Supermotard Bitume & Circuit 74V", cat_en: "74V Tarmac Supermoto Pro", type: "moto", license: "A1_B", license_fr: "Homologuée 125cc (Permis A1/B)", license_en: "125cc Road Homologated", price: 7990, bonus: 900, range: 135, speed: 100, weight: 86, kwh: 4.07, kw_peak: 12.5, hp: 17, torque: 440, img: IMAGES.surronLightBee },
  { id: "surron-storm-bee", nom: "Sur-Ron Storm Bee Enduro (104V)", brand: "Sur-Ron Official", cat: "Maxi-Enduro 104V Pleine Puissance 520 Nm", cat_en: "104V Full-Size Electric Enduro 520 Nm", type: "moto", license: "A1_B", license_fr: "Homologuée Route (Permis A1/A2)", license_en: "Road Legal (A1/A2)", price: 11990, bonus: 1500, range: 120, speed: 110, weight: 127, kwh: 5.72, kw_peak: 22.5, hp: 30.6, torque: 520, img: IMAGES.surronLightBee },
  { id: "surron-storm-bee-r", nom: "Sur-Ron Storm Bee R Supermoto", brand: "Sur-Ron Official", cat: "Supermotard 104V Liquid Cooled", cat_en: "104V Liquid Cooled Supermoto", type: "moto", license: "A1_B", license_fr: "Homologuée Route (Permis A1/A2)", license_en: "Road Legal (A1/A2)", price: 12490, bonus: 1500, range: 120, speed: 115, weight: 128, kwh: 5.72, kw_peak: 22.5, hp: 30.6, torque: 520, img: IMAGES.surronLightBee },
  { id: "surron-hyper-bee-youth", nom: "Sur-Ron Hyper Bee Youth 48V", brand: "Sur-Ron Official", cat: "Mini-Cross Électrique Jeune & Ado", cat_en: "Youth Electric Mini-Cross 48V", type: "moto", license: "offroad", license_fr: "Terrain Privé (Dès 10 ans)", license_en: "Private Track (Youth)", price: 2990, bonus: 0, range: 50, speed: 50, weight: 34, kwh: 1.2, kw_peak: 3, hp: 4.1, torque: 120, img: IMAGES.surronLightBee },
  { id: "stark-varg-80hp", nom: "Stark VARG 80 ch (Poids Plume 118 kg)", brand: "Stark Future", cat: "Moto-Cross Révolutionnaire 80 ch / 938 Nm", cat_en: "Revolutionary 80 hp / 938 Nm Motocross", type: "moto", license: "offroad", license_fr: "Compétition Motocross & Terrain Privé", license_en: "Motocross Competition Track Only", price: 13900, bonus: 0, range: 90, speed: 130, weight: 118, kwh: 6.5, kw_peak: 60, hp: 80, torque: 938, img: IMAGES.surronLightBee },
  { id: "stark-varg-60hp", nom: "Stark VARG 60 ch Standard", brand: "Stark Future", cat: "Motocross Électrique 60 ch Équiv 450cc", cat_en: "60 hp Motocross 450cc Equivalent", type: "moto", license: "offroad", license_fr: "Compétition Motocross & Terrain Privé", license_en: "Motocross Track Only", price: 12900, bonus: 0, range: 95, speed: 120, weight: 118, kwh: 6.5, kw_peak: 45, hp: 60, torque: 750, img: IMAGES.surronLightBee },
  { id: "talaria-sting-r-mx4", nom: "Talaria Sting R MX4 60V", brand: "Talaria", cat: "Dirt Bike 60V 45Ah Boîte Engrenages", cat_en: "60V 45Ah Gearbox Dirt Bike", type: "moto", license: "offroad", license_fr: "Terrain Privé & Off-Road", license_en: "Off-Road Track Only", price: 4790, bonus: 0, range: 90, speed: 85, weight: 66, kwh: 2.7, kw_peak: 8, hp: 10.8, torque: 450, img: IMAGES.surronLightBee },
  { id: "talaria-dragon-88v", nom: "Talaria Dragon 88V (28 kW / 38 ch)", brand: "Talaria", cat: "Full-Size Enduro 88V 500 Nm", cat_en: "88V 28 kW Full-Size Enduro", type: "moto", license: "offroad", license_fr: "Compétition & Terrain Privé", license_en: "Private Track Only", price: 8990, bonus: 0, range: 130, speed: 110, weight: 100, kwh: 4.8, kw_peak: 28, hp: 38, torque: 500, img: IMAGES.surronLightBee },
  { id: "talaria-komodo-72v", nom: "Talaria Komodo 72V Pro", brand: "Talaria", cat: "Dirt Bike 72V Torp Ready", cat_en: "72V High Voltage Dirt Bike", type: "moto", license: "offroad", license_fr: "Terrain Privé & Off-Road", license_en: "Off-Road Track Only", price: 5990, bonus: 0, range: 110, speed: 95, weight: 72, kwh: 3.2, kw_peak: 12, hp: 16.3, torque: 420, img: IMAGES.surronLightBee },
  { id: "eride-pro-ss-2026", nom: "E-Ride Pro SS 2.0 72V", brand: "E-Ride Pro USA", cat: "72V High Power Dirt Bike 12 kW", cat_en: "72V High Power Dirt Bike 12 kW", type: "moto", license: "offroad", license_fr: "Terrain Privé & Compétition", license_en: "Private Track Only", price: 5890, bonus: 0, range: 105, speed: 95, weight: 64, kwh: 2.88, kw_peak: 12, hp: 16.3, torque: 450, img: IMAGES.surronLightBee },
  { id: "eride-pro-sr-race", nom: "E-Ride Pro SR 72V Race Spec", brand: "E-Ride Pro USA", cat: "72V Race Spec FastAce 220mm", cat_en: "72V Race Spec FastAce 220mm", type: "moto", license: "offroad", license_fr: "Terrain Privé & Circuit", license_en: "Competition Track Only", price: 6590, bonus: 0, range: 115, speed: 100, weight: 65, kwh: 3.24, kw_peak: 15, hp: 20.4, torque: 480, img: IMAGES.surronLightBee },
  { id: "altis-sigma-72v", nom: "Altis Sigma 72V Beast", brand: "Altis Powersports", cat: "Dirt Bike 72V 14 kW Contrôleur Sinusoïdal", cat_en: "72V 14 kW Sine-Wave Dirt Bike", type: "moto", license: "offroad", license_fr: "Terrain Privé & Off-Road", license_en: "Private Track Only", price: 6290, bonus: 0, range: 110, speed: 95, weight: 63, kwh: 3.24, kw_peak: 14, hp: 19, torque: 440, img: IMAGES.surronLightBee },
  { id: "moto-apex-dirt-72v", nom: "Apex E-Cross 72V Ultra Dirt", brand: "Apex Off-Road", cat: "Dirt Bike 72V BAC 500A Controller", cat_en: "72V Competition Dirt Bike", type: "moto", license: "offroad", license_fr: "Terrain Privé & Piste Cross", license_en: "Private Track Only", price: 6490, bonus: 0, range: 110, speed: 95, weight: 63, kwh: 3.24, kw_peak: 14, hp: 19, torque: 440, img: IMAGES.surronLightBee },
  { id: "electric-motion-escape-r", nom: "Electric Motion Escape R (Trial/Rando)", brand: "Electric Motion France", cat: "Moto Trial & Franchissement Extrême", cat_en: "Extreme Off-Road Trial & Freeride", type: "moto", license: "A1_B", license_fr: "Homologuée Route A1/B ou Off-Road", license_en: "Road Legal or Off-Road", price: 10990, bonus: 900, range: 90, speed: 75, weight: 81, kwh: 2.7, kw_peak: 11, hp: 15, torque: 600, img: IMAGES.surronLightBee },
  { id: "electric-motion-epure-race", nom: "Electric Motion Epure Race (Embrayage)", brand: "Electric Motion France", cat: "Trial Compétition avec Embrayage Diaphragme", cat_en: "Pure Trial with Hydraulic Diaphragm Clutch", type: "moto", license: "offroad", license_fr: "Compétition Trial & Terrain Privé", license_en: "Trial Competition Track Only", price: 10490, bonus: 0, range: 70, speed: 70, weight: 75, kwh: 1.88, kw_peak: 11, hp: 15, torque: 600, img: IMAGES.surronLightBee },

  // 6. SCOOTERS 50cc (Permis AM dès 14 ans) - 8
  { id: "super-soco-cux-ducati", nom: "Super Soco CUx Édition Spéciale", brand: "Super Soco", cat: "Scooter Urbain Compact 50cc", cat_en: "Compact 50cc Urban Scooter", type: "moto", license: "AM", license_fr: "Permis AM dès 14 ans (Équiv 50cc)", license_en: "AM License from 14yo (50cc)", price: 2890, bonus: 500, range: 75, speed: 45, weight: 70, kwh: 1.8, kw_peak: 2.8, hp: 3.8, torque: 115, img: IMAGES.scooter },
  { id: "niu-nqi-sport-50", nom: "Niu NQi Sport 45 km/h", brand: "Niu Technologies", cat: "Scooter Urbain Connecté GPS & Alarme", cat_en: "Connected Urban Scooter with App", type: "moto", license: "AM", license_fr: "Permis AM dès 14 ans (Équiv 50cc)", license_en: "AM License from 14yo (50cc)", price: 2599, bonus: 450, range: 70, speed: 45, weight: 89, kwh: 1.56, kw_peak: 1.8, hp: 2.4, torque: 110, img: IMAGES.scooter },
  { id: "silence-s02-urban", nom: "Silence S02 Urban 50cc", brand: "Silence", cat: "Scooter Robuste Batterie Amovible", cat_en: "Heavy-Duty Trolley Battery Scooter", type: "moto", license: "AM", license_fr: "Permis AM dès 14 ans (Équiv 50cc)", license_en: "AM License from 14yo (50cc)", price: 4490, bonus: 600, range: 120, speed: 45, weight: 130, kwh: 5.6, kw_peak: 3.0, hp: 4.1, torque: 105, img: IMAGES.scooter },
  { id: "yamaha-neos-electric", nom: "Yamaha NEO's Dual Battery", brand: "Yamaha Motor", cat: "Scooter Urbain Qualité Japonaise", cat_en: "Japanese Quality Commuter Scooter", type: "moto", license: "AM", license_fr: "Permis AM dès 14 ans (Équiv 50cc)", license_en: "AM License from 14yo (50cc)", price: 3499, bonus: 500, range: 68, speed: 45, weight: 98, kwh: 1.94, kw_peak: 2.5, hp: 3.4, torque: 136, img: IMAGES.scooter },
  { id: "piaggio-1-active-plus", nom: "Piaggio 1 Active Plus", brand: "Piaggio", cat: "Scooter Italien Batterie Amovible", cat_en: "Italian Style Swappable Battery Scooter", type: "moto", license: "AM", license_fr: "Permis AM dès 14 ans (Équiv 50cc)", license_en: "AM License from 14yo (50cc)", price: 3299, bonus: 500, range: 85, speed: 45, weight: 79, kwh: 2.3, kw_peak: 2.0, hp: 2.7, torque: 90, img: IMAGES.scooter },
  { id: "pink-mobility-style-50", nom: "Pink Style Plus 50cc", brand: "Pink Mobility", cat: "Scooter Rétro Double Batterie", cat_en: "Dual Battery Vintage Style Scooter", type: "moto", license: "AM", license_fr: "Permis AM dès 14 ans (Équiv 50cc)", license_en: "AM License from 14yo (50cc)", price: 3690, bonus: 550, range: 90, speed: 45, weight: 88, kwh: 2.88, kw_peak: 3.0, hp: 4.1, torque: 120, img: IMAGES.scooter },
  { id: "rider-5000w-sport", nom: "Rider 5000W Urban GT", brand: "Rider", cat: "Scooter Urbain Haute Accélération", cat_en: "High Acceleration Urban Scooter", type: "moto", license: "AM", license_fr: "Permis AM dès 14 ans (Équiv 50cc)", license_en: "AM License from 14yo (50cc)", price: 3890, bonus: 600, range: 85, speed: 45, weight: 94, kwh: 2.9, kw_peak: 4.5, hp: 6.1, torque: 140, img: IMAGES.scooter },
  { id: "yadea-c1s-pro-50", nom: "Yadea C1S Pro KISKA", brand: "Yadea", cat: "Scooter Design KISKA Récompensé RedDot", cat_en: "RedDot Awarded KISKA Design Scooter", type: "moto", license: "AM", license_fr: "Permis AM dès 14 ans (Équiv 50cc)", license_en: "AM License from 14yo (50cc)", price: 2990, bonus: 450, range: 75, speed: 45, weight: 85, kwh: 1.92, kw_peak: 2.2, hp: 3.0, torque: 110, img: IMAGES.scooter },

  // 7. VTTAE ENDURO & DH TOUT-SUSPENDU (Sans Permis) - 14
  { id: "velo-vtt-enduro-carbon", nom: "Apex Enduro Carbon VTTAE", brand: "eVolt Racing Bicycles", cat: "VTTAE Tout-Suspendu Carbone 170mm", cat_en: "Full-Suspension Carbon E-Enduro 170mm", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 7990, bonus: 400, range: 120, speed: 25, weight: 21.5, kwh: 0.75, kw_peak: 0.6, hp: 0.8, torque: 90, img: IMAGES.vttae },
  { id: "specialized-levo-pro-carbon", nom: "Specialized Turbo Levo Pro Carbon", brand: "Specialized", cat: "VTTAE Référence Moteur 2.2 90Nm", cat_en: "Benchmark E-MTB Carbon 90Nm Motor", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 11500, bonus: 400, range: 130, speed: 25, weight: 22.0, kwh: 0.7, kw_peak: 0.56, hp: 0.76, torque: 90, img: IMAGES.vttae },
  { id: "specialized-kenevo-sl-expert", nom: "Specialized Turbo Kenevo SL Expert", brand: "Specialized", cat: "Super-Enduro Poids Plume 19kg 170mm", cat_en: "Lightweight Super-Enduro 19kg 170mm", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 9500, bonus: 400, range: 90, speed: 25, weight: 18.9, kwh: 0.32, kw_peak: 0.35, hp: 0.48, torque: 50, img: IMAGES.vttae },
  { id: "santa-cruz-heckler-cc", nom: "Santa Cruz Heckler 9 CC X01 AXS", brand: "Santa Cruz", cat: "VTTAE Carbone CC Shimano EP801", cat_en: "CC Carbon E-MTB Shimano EP801", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 10999, bonus: 400, range: 125, speed: 25, weight: 21.2, kwh: 0.72, kw_peak: 0.6, hp: 0.8, torque: 85, img: IMAGES.vttae },
  { id: "trek-rail-99-xx1-axs", nom: "Trek Rail 9.9 XX1 AXS Carbon", brand: "Trek Bicycles", cat: "VTTAE Ultra Haut de Gamme Bosch CX Smart", cat_en: "Flagship Carbon E-MTB Bosch CX Smart", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 12499, bonus: 400, range: 140, speed: 25, weight: 22.5, kwh: 0.75, kw_peak: 0.6, hp: 0.8, torque: 85, img: IMAGES.vttae },
  { id: "canyon-spectral-on-cfr", nom: "Canyon Spectral:ON CFR Ltd", brand: "Canyon Bicycles", cat: "VTTAE Carbone Batterie 900Wh Record", cat_en: "Carbon E-MTB Record 900Wh Battery", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 8999, bonus: 400, range: 155, speed: 25, weight: 21.8, kwh: 0.9, kw_peak: 0.6, hp: 0.8, torque: 85, img: IMAGES.vttae },
  { id: "mondraker-crafty-carbon-xr", nom: "Mondraker Crafty Carbon XR", brand: "Mondraker", cat: "Géométrie Forward Geometry Enduro 160mm", cat_en: "Forward Geometry Enduro E-MTB 160mm", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 10499, bonus: 400, range: 130, speed: 25, weight: 22.3, kwh: 0.75, kw_peak: 0.6, hp: 0.8, torque: 85, img: IMAGES.vttae },
  { id: "cube-stereo-hybrid-160-action", nom: "Cube Stereo Hybrid 160 ActionTeam", brand: "Cube Bicycles", cat: "VTTAE Fox Factory Kashima 160mm", cat_en: "Fox Factory Kashima 160mm E-MTB", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 6499, bonus: 400, range: 135, speed: 25, weight: 23.9, kwh: 0.75, kw_peak: 0.6, hp: 0.8, torque: 85, img: IMAGES.vttae },
  { id: "orbea-wild-m-ltd", nom: "Orbea Wild M-LTD Carbon", brand: "Orbea Bicycles", cat: "VTTAE Bosch Performance CX Race Édition", cat_en: "Bosch CX Race Edition Carbon E-MTB", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 11999, bonus: 400, range: 135, speed: 25, weight: 20.9, kwh: 0.75, kw_peak: 0.6, hp: 0.8, torque: 85, img: IMAGES.vttae },
  { id: "pivot-shuttle-lt-team", nom: "Pivot Shuttle LT Team XTR", brand: "Pivot Cycles", cat: "Super-Enduro Carbone 170mm Shimano EP8", cat_en: "High-End Carbon Super-Enduro 170mm", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 12199, bonus: 400, range: 130, speed: 25, weight: 22.5, kwh: 0.756, kw_peak: 0.6, hp: 0.8, torque: 85, img: IMAGES.vttae },
  { id: "yeti-160e-t1-turq", nom: "Yeti 160E T1 TURQ Series", brand: "Yeti Cycles", cat: "Cinématique Sixfinity Conçue pour l'E-Bike", cat_en: "Sixfinity Suspension Dedicated E-MTB", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 12790, bonus: 400, range: 120, speed: 25, weight: 22.1, kwh: 0.63, kw_peak: 0.6, hp: 0.8, torque: 85, img: IMAGES.vttae },
  { id: "scott-lumen-eride-900", nom: "Scott Lumen eRIDE 900 SL (15.5 kg)", brand: "Scott Sports", cat: "VTTAE le Plus Léger du Monde TQ HPR50", cat_en: "World's Lightest Full-Suspension 15.5kg", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 15999, bonus: 400, range: 85, speed: 25, weight: 15.5, kwh: 0.36, kw_peak: 0.3, hp: 0.41, torque: 50, img: IMAGES.vttae },
  { id: "forestal-siryon-diode", nom: "Forestal Siryon Diode Carbon", brand: "Forestal Andorra", cat: "VTTAE Enduro Écran Tactile Intégré", cat_en: "Integrated Touchscreen Carbon E-MTB", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 12990, bonus: 400, range: 80, speed: 25, weight: 17.8, kwh: 0.36, kw_peak: 0.45, hp: 0.61, torque: 60, img: IMAGES.vttae },
  { id: "moustache-samedi-29-game", nom: "Moustache Samedi 29 Game 11", brand: "Moustache Bikes", cat: "VTTAE Enduro Français Haut de Gamme", cat_en: "French Premium Enduro E-MTB", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 8999, bonus: 400, range: 130, speed: 25, weight: 23.4, kwh: 0.75, kw_peak: 0.6, hp: 0.8, torque: 85, img: IMAGES.vttae },

  // 8. VÉLOS DE ROUTE & GRAVEL CARBONE (Sans Permis) - 12
  { id: "velo-gravel-carbon", nom: "Apex Gravel Carbon All-Road", brand: "eVolt Endurance", cat: "Gravel Électrique Carbone Bikepacking", cat_en: "All-Road Electric Carbon Gravel Bike", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 5490, bonus: 400, range: 130, speed: 25, weight: 14.9, kwh: 0.43, kw_peak: 0.45, hp: 0.6, torque: 60, img: IMAGES.gravelRoute },
  { id: "specialized-creo-2-carbon", nom: "Specialized Turbo Creo 2 Carbon", brand: "Specialized", cat: "Vélo Gravel Carbone Moteur SL 1.2", cat_en: "SL 1.2 Carbon E-Gravel Bike", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 8500, bonus: 400, range: 140, speed: 25, weight: 13.9, kwh: 0.32, kw_peak: 0.32, hp: 0.43, torque: 50, img: IMAGES.gravelRoute },
  { id: "trek-domane-plus-slr9", nom: "Trek Domane+ SLR 9 eTap", brand: "Trek Bicycles", cat: "Vélo de Route Carbone OCLV 800 TQ", cat_en: "OCLV 800 Carbon Electric Road Bike", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 14499, bonus: 400, range: 120, speed: 25, weight: 11.8, kwh: 0.36, kw_peak: 0.3, hp: 0.41, torque: 50, img: IMAGES.gravelRoute },
  { id: "cannondale-topstone-neo-crb", nom: "Cannondale Topstone Neo Carbon 2", brand: "Cannondale", cat: "Gravel Carbone Suspension Kingpin Bosch", cat_en: "Kingpin Suspension Bosch Carbon Gravel", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 6299, bonus: 400, range: 125, speed: 25, weight: 16.2, kwh: 0.5, kw_peak: 0.5, hp: 0.68, torque: 85, img: IMAGES.gravelRoute },
  { id: "canyon-endurace-on-8", nom: "Canyon Endurace:ON 8", brand: "Canyon Bicycles", cat: "Vélo Route Endurance Moteur Fazua Ride 60", cat_en: "Fazua Ride 60 Carbon Road E-Bike", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 3999, bonus: 400, range: 120, speed: 25, weight: 15.2, kwh: 0.43, kw_peak: 0.45, hp: 0.6, torque: 60, img: IMAGES.gravelRoute },
  { id: "scott-addict-eride-10", nom: "Scott Addict eRIDE 10", brand: "Scott Sports", cat: "Vélo de Route Carbone Mahle X20 (10.7 kg)", cat_en: "Mahle X20 Featherweight Carbon Road", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 7999, bonus: 400, range: 110, speed: 25, weight: 10.7, kwh: 0.25, kw_peak: 0.25, hp: 0.34, torque: 55, img: IMAGES.gravelRoute },
  { id: "orbea-gain-m20i-carbon", nom: "Orbea Gain M20i Carbon", brand: "Orbea Bicycles", cat: "Vélo Route Électrique Moteur Moyeu X20", cat_en: "X20 Hub Motor Carbon Electric Road", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 6599, bonus: 400, range: 115, speed: 25, weight: 11.5, kwh: 0.35, kw_peak: 0.25, hp: 0.34, torque: 55, img: IMAGES.gravelRoute },
  { id: "bmc-roadmachine-01-amp", nom: "BMC Roadmachine 01 AMP X ONE", brand: "BMC Switzerland", cat: "Vélo All-Road Carbone Suisse TQ HPR50", cat_en: "Swiss TQ-HPR50 Carbon All-Road", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 8999, bonus: 400, range: 110, speed: 25, weight: 12.9, kwh: 0.36, kw_peak: 0.3, hp: 0.41, torque: 50, img: IMAGES.gravelRoute },
  { id: "pinarello-nytro-e-gravel", nom: "Pinarello Nytro E-Gravel T900", brand: "Pinarello Italy", cat: "Gravel Italien d'Exception T900 Fazua", cat_en: "Italian T900 Carbon E-Gravel Fazua", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 9200, bonus: 400, range: 130, speed: 25, weight: 13.5, kwh: 0.43, kw_peak: 0.45, hp: 0.6, torque: 60, img: IMAGES.gravelRoute },
  { id: "bianchi-e-arcadex-gravel", nom: "Bianchi E-Arcadex Tourer Carbon", brand: "Bianchi", cat: "Gravel Carbone Celeste Shimano EP8", cat_en: "Celeste Carbon E-Gravel Shimano EP8", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 6249, bonus: 400, range: 120, speed: 25, weight: 15.5, kwh: 0.5, kw_peak: 0.5, hp: 0.68, torque: 85, img: IMAGES.gravelRoute },
  { id: "wilier-triestina-hyrid", nom: "Wilier Triestina Jena Hybrid", brand: "Wilier Triestina", cat: "Gravel Carbone Monocoque Ebikemotion", cat_en: "Monocoque Carbon E-Gravel", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 5200, bonus: 400, range: 100, speed: 25, weight: 12.8, kwh: 0.25, kw_peak: 0.25, hp: 0.34, torque: 40, img: IMAGES.gravelRoute },
  { id: "cervelo-rouvida-grx", nom: "Cervélo Rouvida GRX Di2", brand: "Cervélo", cat: "Vélo Double Personnalité Route / Gravel Fazua", cat_en: "Road & Gravel Dual Setup Fazua 60", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 8299, bonus: 400, range: 130, speed: 25, weight: 13.8, kwh: 0.43, kw_peak: 0.45, hp: 0.6, torque: 60, img: IMAGES.gravelRoute },

  // 9. VÉLOS CARGO & LONGTAIL FAMILLES / PRO (Sans Permis) - 10
  { id: "velo-cargo-longtail", nom: "Apex Family Cargo Longtail Pro", brand: "eVolt Utility", cat: "Vélo Cargo Longtail 3 Enfants & Pro", cat_en: "Family & Commercial Longtail Cargo Bike", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 4890, bonus: 400, range: 110, speed: 25, weight: 32.0, kwh: 0.72, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },
  { id: "riese-muller-load4-75", nom: "Riese & Müller Load4 75 Vario", brand: "Riese & Müller", cat: "Biporteur Tout-Suspendu CargoLine Smart", cat_en: "Full-Suspension Front-Loader CargoLine", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 8499, bonus: 400, range: 120, speed: 25, weight: 38.0, kwh: 0.725, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },
  { id: "tern-gsd-s00-dual-batt", nom: "Tern GSD S00 Dual Battery 1000Wh", brand: "Tern Bicycles", cat: "Longtail Compact Pliable Capacité 200kg", cat_en: "Compact Folding Longtail 200kg Capacity", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 6999, bonus: 400, range: 140, speed: 25, weight: 34.0, kwh: 1.0, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },
  { id: "yuba-spicy-curry-v4", nom: "Yuba Spicy Curry V4 Bosch Cargo", brand: "Yuba Bicycles", cat: "Longtail Centre de Gravité Abaissé", cat_en: "Low Center of Gravity Family Longtail", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 5199, bonus: 400, range: 110, speed: 25, weight: 31.0, kwh: 0.5, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },
  { id: "moustache-lundi-20-cargo", nom: "Moustache Lundi 20.5 Dual", brand: "Moustache Bikes", cat: "Cargo Longtail Français Roues 20' Q-Lock", cat_en: "French 20' Longtail Cargo Bike", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 6599, bonus: 400, range: 140, speed: 25, weight: 33.0, kwh: 1.0, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },
  { id: "urban-arrow-family-cargoline", nom: "Urban Arrow Family CargoLine", brand: "Urban Arrow", cat: "Biporteur Bac EPP Sécurisé pour Enfants", cat_en: "Family Front-Loader EPP Safety Box", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 6290, bonus: 400, range: 100, speed: 25, weight: 47.0, kwh: 0.545, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },
  { id: "cube-cargo-hybrid-750", nom: "Cube Cargo Hybrid 750", brand: "Cube Bicycles", cat: "Biporteur Bac Polypropylène 750Wh", cat_en: "Front-Loader 750Wh Family Cargo", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 5499, bonus: 400, range: 115, speed: 25, weight: 46.0, kwh: 0.75, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },
  { id: "carqon-cruise-family", nom: "Carqon Cruise E-Cargo", brand: "Carqon", cat: "Biporteur Haut de Gamme Coque EPP & Rails", cat_en: "Premium Dutch Front-Loader Cargo", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 5999, bonus: 400, range: 110, speed: 25, weight: 45.0, kwh: 0.5, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },
  { id: "riese-muller-multicharger", nom: "Riese & Müller Multicharger2 GT", brand: "Riese & Müller", cat: "Midtail Polyvalent Vélotaf & Enfants", cat_en: "Midtail Versatile Commuter & Kid Carrier", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 5699, bonus: 400, range: 125, speed: 25, weight: 29.0, kwh: 0.75, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },
  { id: "babboe-city-mountain", nom: "Babboe City Mountain Yamaha", brand: "Babboe", cat: "Biporteur Familial Moteur Central Yamaha", cat_en: "Yamaha Mid-Drive Family Cargo Bike", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 4499, bonus: 400, range: 85, speed: 25, weight: 48.0, kwh: 0.5, kw_peak: 0.5, hp: 0.68, torque: 70, img: IMAGES.cargoUrban },

  // 10. SPEED-BIKES 45 km/h (Permis AM/B) - 10
  { id: "stromer-st7-pinion-1440wh", nom: "Stromer ST7 PINION SmartShift (1440Wh)", brand: "Stromer Switzerland", cat: "Speed-Bike Suprême Boîte Pinion Électronique", cat_en: "Flagship Speed-Pedelec 1440Wh Pinion", type: "velo", license: "speed_pedelec", license_fr: "Speed-Bike 45 km/h (Permis AM/B)", license_en: "Speed-Pedelec 45 km/h (AM/Car License)", price: 13490, bonus: 400, range: 200, speed: 45, weight: 31.0, kwh: 1.44, kw_peak: 0.94, hp: 1.28, torque: 52, img: IMAGES.cargoUrban },
  { id: "stromer-st5-pinion-45", nom: "Stromer ST5 PINION ABS 45 km/h", brand: "Stromer Switzerland", cat: "Speed-Bike avec ABS Intégré dans le Cadre", cat_en: "Integrated ABS Speed-Pedelec 45 km/h", type: "velo", license: "speed_pedelec", license_fr: "Speed-Bike 45 km/h (Permis AM/B)", license_en: "Speed-Pedelec 45 km/h (AM/Car License)", price: 11990, bonus: 400, range: 180, speed: 45, weight: 29.5, kwh: 0.983, kw_peak: 0.85, hp: 1.15, torque: 48, img: IMAGES.cargoUrban },
  { id: "stromer-st3-pinion-speed", nom: "Stromer ST3 Special Edition 45 km/h", brand: "Stromer Switzerland", cat: "Speed-Pedelec Moteur Roue Arrière Silencieux", cat_en: "Silent Rear Hub Motor Speed-Pedelec", type: "velo", license: "speed_pedelec", license_fr: "Speed-Bike 45 km/h (Permis AM/B)", license_en: "Speed-Pedelec 45 km/h (AM/Car License)", price: 8990, bonus: 400, range: 150, speed: 45, weight: 28.0, kwh: 0.814, kw_peak: 0.82, hp: 1.11, torque: 44, img: IMAGES.cargoUrban },
  { id: "riese-muller-supercharger-hs", nom: "Riese & Müller Supercharger4 GT HS", brand: "Riese & Müller", cat: "Speed-Bike Double Batterie 1500Wh Bosch", cat_en: "Dual Battery 1500Wh Bosch Speed-Pedelec", type: "velo", license: "speed_pedelec", license_fr: "Speed-Bike 45 km/h (Permis AM/B)", license_en: "Speed-Pedelec 45 km/h (AM/Car License)", price: 8399, bonus: 400, range: 170, speed: 45, weight: 31.5, kwh: 1.5, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },
  { id: "riese-muller-delite4-hs", nom: "Riese & Müller Delite4 GT HS Tout-Suspendu", brand: "Riese & Müller", cat: "Speed-Bike Tout-Suspendu Contrôle Total", cat_en: "Full-Suspension Speed-Pedelec Fox", type: "velo", license: "speed_pedelec", license_fr: "Speed-Bike 45 km/h (Permis AM/B)", license_en: "Speed-Pedelec 45 km/h (AM/Car License)", price: 8999, bonus: 400, range: 130, speed: 45, weight: 30.0, kwh: 0.75, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },
  { id: "gazelle-ultimate-c380-speed", nom: "Gazelle Ultimate C380 HMB Speed", brand: "Gazelle Holland", cat: "Speed-Bike Hollandais Courroie & Enviolo", cat_en: "Dutch Speed-Pedelec Gates Belt & Enviolo", type: "velo", license: "speed_pedelec", license_fr: "Speed-Bike 45 km/h (Permis AM/B)", license_en: "Speed-Pedelec 45 km/h (AM/Car License)", price: 4799, bonus: 400, range: 110, speed: 45, weight: 26.5, kwh: 0.625, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },
  { id: "specialized-vado-50-igh-speed", nom: "Specialized Turbo Vado 5.0 IGH 45km/h", brand: "Specialized", cat: "Speed-Bike Automatique Enviolo Automatiq", cat_en: "Automatic Shifting 45km/h Commuter", type: "velo", license: "speed_pedelec", license_fr: "Speed-Bike 45 km/h (Permis AM/B)", license_en: "Speed-Pedelec 45 km/h (AM/Car License)", price: 6200, bonus: 400, range: 130, speed: 45, weight: 25.0, kwh: 0.71, kw_peak: 0.65, hp: 0.88, torque: 90, img: IMAGES.cargoUrban },
  { id: "flyer-upstreet5-723-hs", nom: "Flyer Upstreet5 7.23 HS Swiss", brand: "Flyer Bicycles", cat: "Speed-Bike Suisse Moteur Panasonic GX Ultimate", cat_en: "Swiss Panasonic GX Ultimate Speed-Pedelec", type: "velo", license: "speed_pedelec", license_fr: "Speed-Bike 45 km/h (Permis AM/B)", license_en: "Speed-Pedelec 45 km/h (AM/Car License)", price: 5499, bonus: 400, range: 120, speed: 45, weight: 27.0, kwh: 0.75, kw_peak: 0.6, hp: 0.8, torque: 95, img: IMAGES.cargoUrban },
  { id: "kalkhoff-image-7b-excite-45", nom: "Kalkhoff Image 7.B Excite 45", brand: "Kalkhoff", cat: "Speed-Bike Allemand Bosch Performance Speed", cat_en: "German Bosch Performance Speed-Pedelec", type: "velo", license: "speed_pedelec", license_fr: "Speed-Bike 45 km/h (Permis AM/B)", license_en: "Speed-Pedelec 45 km/h (AM/Car License)", price: 5299, bonus: 400, range: 115, speed: 45, weight: 27.5, kwh: 0.75, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },
  { id: "moustache-friday-27-fs-speed", nom: "Moustache Friday 27 FS Speed Dual", brand: "Moustache Bikes", cat: "Speed-Bike Tout-Suspendu 1125Wh Français", cat_en: "Full-Suspension French Speed-Bike 1125Wh", type: "velo", license: "speed_pedelec", license_fr: "Speed-Bike 45 km/h (Permis AM/B)", license_en: "Speed-Pedelec 45 km/h (AM/Car License)", price: 7999, bonus: 400, range: 150, speed: 45, weight: 29.5, kwh: 1.125, kw_peak: 0.65, hp: 0.88, torque: 85, img: IMAGES.cargoUrban },

  // 11. VÉLOS URBAINS & NÉO-RÉTRO DE LUXE (Sans Permis) - 10
  { id: "cowboy-cruiser-st-connected", nom: "Cowboy Cruiser ST Connected", brand: "Cowboy", cat: "Vélo Urbain Connecté Épuré Sans Vitesse", cat_en: "Connected Clean Single-Speed City E-Bike", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 2999, bonus: 400, range: 80, speed: 25, weight: 19.3, kwh: 0.36, kw_peak: 0.35, hp: 0.48, torque: 45, img: IMAGES.cargoUrban },
  { id: "vanmoof-s5-halo-ring", nom: "VanMoof S5 Halo Ring", brand: "VanMoof", cat: "Vélo Urbain Design Alarme Antivol Intégrée", cat_en: "Iconic Design E-Bike Integrated Anti-Theft", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 3298, bonus: 400, range: 100, speed: 25, weight: 23.0, kwh: 0.487, kw_peak: 0.4, hp: 0.54, torque: 68, img: IMAGES.cargoUrban },
  { id: "specialized-como-50-igh", nom: "Specialized Turbo Como 5.0 IGH", brand: "Specialized", cat: "Vélo Confort Enjambement Bas Radar Garmin", cat_en: "Low-Entry Comfort E-Bike Garmin Radar", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 5400, bonus: 400, range: 130, speed: 25, weight: 24.5, kwh: 0.71, kw_peak: 0.65, hp: 0.88, torque: 90, img: IMAGES.cargoUrban },
  { id: "moustache-samedi-287-open", nom: "Moustache Samedi 28.7 Open", brand: "Moustache Bikes", cat: "Vélo Urbain Français Confort Guidon Moustache", cat_en: "French Comfort Urban E-Bike Bosch Smart", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 4399, bonus: 400, range: 120, speed: 25, weight: 24.8, kwh: 0.625, kw_peak: 0.6, hp: 0.8, torque: 75, img: IMAGES.cargoUrban },
  { id: "desiknio-x20-pinion-carbon", nom: "Desiknio X20 Pinion Carbon (13.3 kg)", brand: "Desiknio Handcrafted", cat: "Vélo Urbain d'Orfèvrerie Courroie & Pinion", cat_en: "Handcrafted Luxury City Bike 13.3kg", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 6990, bonus: 400, range: 90, speed: 25, weight: 13.3, kwh: 0.25, kw_peak: 0.25, hp: 0.34, torque: 55, img: IMAGES.cargoUrban },
  { id: "schindelhauer-heinrich-enviolo", nom: "Schindelhauer Heinrich Enviolo", brand: "Schindelhauer Berlin", cat: "Purisme Allemand Courroie Gates Bosch CX", cat_en: "Berlin Minimalist Belt-Drive Bosch CX", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 5395, bonus: 400, range: 110, speed: 25, weight: 24.0, kwh: 0.5, kw_peak: 0.6, hp: 0.8, torque: 85, img: IMAGES.cargoUrban },
  { id: "gazelle-grenoble-c8-hmb", nom: "Gazelle Grenoble C8 HMB", brand: "Gazelle Holland", cat: "Le VAE Hollandais Traditionnel Tout Confort", cat_en: "Traditional Dutch Comfort E-Bike", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 3699, bonus: 400, range: 115, speed: 25, weight: 25.5, kwh: 0.5, kw_peak: 0.5, hp: 0.68, torque: 50, img: IMAGES.cargoUrban },
  { id: "tenways-cgo800s-belt", nom: "Tenways CGO800S Capteur Couple", brand: "Tenways", cat: "Vélo Urbain Courroie Carbone Silencieux", cat_en: "Silent Belt-Drive Urban Commuter", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 1899, bonus: 350, range: 85, speed: 25, weight: 19.0, kwh: 0.374, kw_peak: 0.25, hp: 0.34, torque: 40, img: IMAGES.cargoUrban },
  { id: "angell-mobility-rapide", nom: "Angell Mobility Cruiser M Électrique", brand: "Angell Mobility France", cat: "Cockpit Tactile & Clignotants Intégrés", cat_en: "Touchscreen Cockpit French Designer E-Bike", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 2990, bonus: 400, range: 70, speed: 25, weight: 17.5, kwh: 0.36, kw_peak: 0.25, hp: 0.34, torque: 45, img: IMAGES.cargoUrban },
  { id: "electra-loft-go-7d-eq", nom: "Electra Loft Go! 7D EQ Step-Thru", brand: "Electra / Trek", cat: "Cruiser Urbain Chic Californien", cat_en: "Californian Chic Step-Thru Cruiser", type: "velo", license: "none", license_fr: "Sans Permis (VAE 25 km/h)", license_en: "No License (25 km/h EPAC)", price: 1999, bonus: 300, range: 65, speed: 25, weight: 20.0, kwh: 0.25, kw_peak: 0.25, hp: 0.34, torque: 40, img: IMAGES.cargoUrban }
];

console.log(`Configured ${ITEMS_SPEC.length} distinct vehicles.`);

// Generate complete TypeScript product definitions
const tsOutput = `import { Product } from "./types";

export const products: Product[] = [
${ITEMS_SPEC.map((p, idx) => {
  const isBestseller = idx % 3 === 0;
  const isFeatured = idx % 4 === 0;
  const isNew = idx % 5 === 0;
  const rating = 4.7 + ((idx % 4) * 0.1);
  const reviewsCount = 15 + ((idx * 7) % 65);

  const currentStockStatus = (idx % 3 === 0) ? "in_showroom" : ((idx % 3 === 1) ? "in_transit" : "factory_order");
  const deliveryLabelFr = currentStockStatus === "in_showroom"
    ? "En stock au Showroom Paris 17e • Livraison 48-72h par transporteur spécialisé 2-roues"
    : (currentStockStatus === "in_transit"
      ? "En arrivage Plateforme Logistique Hub • Livraison 7 à 10 jours ouvrés"
      : "Sur commande atelier constructeur • Livraison 3 à 4 semaines avec mise en route");
  const deliveryLabelEn = currentStockStatus === "in_showroom"
    ? "In stock at Paris Showroom • 48-72h specialized delivery"
    : (currentStockStatus === "in_transit"
      ? "In transit to Logistics Hub • 7-10 business days delivery"
      : "Factory Order • 3-4 weeks delivery with full PDI inspection");

  return `  {
    id: ${JSON.stringify(p.id)},
    slug: ${JSON.stringify(p.id + "-2026")},
    nom: ${JSON.stringify(p.nom)},
    nom_en: ${JSON.stringify(p.nom)},
    brand: ${JSON.stringify(p.brand)},
    category_label: ${JSON.stringify(p.cat)},
    category_label_en: ${JSON.stringify(p.cat_en)},
    description: ${JSON.stringify(`Découvrez le modèle officiel ${p.nom} de chez ${p.brand}. Performance certifiée d'origine avec ${p.torque} Nm de couple, ${p.range} km d'autonomie réelle et homologation ${p.license_fr}. Contrôle technique PDI 50 points et garantie 5 ans constructeur.` + (p.desc_fr ? " " + p.desc_fr : ""))},
    description_en: ${JSON.stringify(`Official ${p.nom} by ${p.brand}. Certified performance with ${p.torque} Nm torque, ${p.range} km real range and ${p.license_en}. Full 50-point PDI pre-delivery inspection and 5-year warranty.` + (p.desc_en ? " " + p.desc_en : ""))},
    highlight_subtitle: ${JSON.stringify(p.highlight || `${p.torque} Nm • ${p.range} km d'autonomie • ${p.license_fr}`)},
    highlight_subtitle_en: ${JSON.stringify(p.highlight_en || `${p.torque} Nm • ${p.range} km real range • ${p.license_en}`)},
    prix: ${p.price},
    prix_promo: ${p.price > 5000 ? p.price - 200 : undefined},
    eco_bonus_eligible: ${p.bonus > 0},
    max_eco_bonus: ${p.bonus},
    image_url: ${JSON.stringify(p.img[0])},
    images: ${JSON.stringify(p.img)},
    type: ${JSON.stringify(p.type)},
    license_category: ${JSON.stringify(p.license)},
    license_label_fr: ${JSON.stringify(p.license_fr)},
    license_label_en: ${JSON.stringify(p.license_en)},
    autonomie_km: ${p.range},
    autonomie_city_km: ${Math.round(p.range * 1.2)},
    autonomie_highway_km: ${Math.round(p.range * 0.7)},
    vitesse_max: ${p.speed},
    acceleration_0_100_s: ${p.speed > 80 ? (p.acc_100 || 4.5) : undefined},
    acceleration_0_50_s: ${p.acc_50 || 2.0},
    stock: ${currentStockStatus === "in_showroom" ? 4 : (currentStockStatus === "in_transit" ? 8 : 15)},
    stock_status: ${JSON.stringify(currentStockStatus)},
    delivery_time_label: ${JSON.stringify(deliveryLabelFr)},
    delivery_time_label_en: ${JSON.stringify(deliveryLabelEn)},
    poids_kg: ${p.weight},
    payload_kg: ${Math.round(p.weight * 0.9 + 80)},
    temps_charge_h: ${p.charge_h || 2.5},
    moteur: ${JSON.stringify(p.motor_desc || `Moteur électrique haute efficacité ${p.kw_peak} kW crête  couple ${p.torque} Nm`)},
    batterie: ${JSON.stringify(p.battery_desc || `Pack Li-ion ${p.kwh} kWh cellules haute densité (${p.cell || "Lithium-Ion NMC"})`)},
    battery_specs: {
      capacity_kwh: ${p.kwh},
      voltage: ${p.volt || (p.type === "velo" ? 36 : 72)},
      removable: ${p.removable !== undefined ? p.removable : true},
      cell_type: ${JSON.stringify(p.cell || "LG/Samsung 21700 High Discharge")},
      charge_time_home_h: ${p.charge_h || 3.0},
      charge_time_fast_min: ${p.fast_min || (p.kwh > 5 ? 40 : undefined)},
      warranty_years: 5,
      warranty_km: 50000,
      ip_rating: "IP67"
    },
    motor_specs: {
      power_nominal_kw: ${p.kw_nom || (p.type === "velo" ? 0.25 : Math.round(p.kw_peak * 0.5))},
      power_peak_kw: ${p.kw_peak},
      power_hp: ${p.hp},
      torque_nm: ${p.torque},
      motor_type: ${JSON.stringify(p.type === "velo" ? "Moteur central silencieux avec capteur de couple" : "Moteur synchrone à aimants permanents haute puissance")},
      transmission: ${JSON.stringify(p.type === "velo" ? "Dérailleur indexé ou Courroie Carbone Gates" : "Chaîne renforcée O-Ring ou Courroie Carbone")},
      regen_braking: ${p.type === "moto"},
      riding_modes: ["Eco", "Standard", "Sport Boost"]
    },
    certifications: ["CE", "UN 38.3", "UL 2849", "Euro 5"],
    available_options: [
      {
        id: ${JSON.stringify("opt-" + p.id + "-1")},
        name: "Pack Entretien Sérénité & Pièces d'Usure 2 Ans",
        name_en: "2-Year Peace-of-Mind Maintenance Pack",
        price: 290,
        description: "Couvre les plaquettes, révisions semestrielles et réglages en centre agréé.",
        description_en: "Covers brake pads, bi-annual inspections, and tuning in authorized centers.",
        category: "security"
      },
      {
        id: ${JSON.stringify("opt-" + p.id + "-2")},
        name: "Antivol Connecté GPS Tracker 4G avec Alarme 110dB",
        name_en: "4G GPS Tracker & 110dB Anti-Theft Alarm",
        price: 190,
        description: "Géolocalisation en temps réel sur smartphone et détection de mouvement suspect.",
        description_en: "Real-time smartphone geolocation and anti-tamper shock sensor.",
        category: "security"
      }
    ],
    reviews: [
      {
        id: ${JSON.stringify("rev-" + p.id + "-1")},
        author: ${JSON.stringify(idx % 4 === 0 ? "Alexandre D. (Pilote Paris)" : idx % 4 === 1 ? "Marc B. (Haute-Savoie)" : idx % 4 === 2 ? "Julien T. (Marseille)" : "David R. (Lyon)")},
        rating: ${idx % 5 === 0 ? 4 : (idx % 7 === 0 ? 4 : 5)},
        date: ${JSON.stringify(idx % 3 === 0 ? "14 Janvier 2026" : idx % 3 === 1 ? "28 Décembre 2025" : "04 Février 2026")},
        verified: true,
        title: ${JSON.stringify(idx % 3 === 0 ? "Couple monstrueux mais selle ferme sur longue distance" : idx % 3 === 1 ? "Livraison impeccable sur plateau et vraie autonomie" : "Une arme absolue en ville et sur petites routes")},
        title_en: ${JSON.stringify(idx % 3 === 0 ? "Insane instant torque, though seat is firm on longer trips" : idx % 3 === 1 ? "Flawless liftgate delivery and accurate range" : "Absolute weapon in city traffic and backroads")},
        comment: ${JSON.stringify(
    idx % 3 === 0
      ? "Accélération brutale et bluffante au feu vert ! La machine est ultra saine en courbe. Seul petit bémol : la selle d'origine est un peu ferme après 70 km, j'ai pris l'upgrade confort. Le chef d'atelier Thomas a été au top pour la remise des clés."
      : idx % 3 === 1
        ? "Livrée directement dans ma cour avec hayon hydraulique et plaque déjà rivetée. Sur autoroute à 110 km/h compter environ 20% d'autonomie en moins qu'en ville, ce qui est normal pour de l'électrique. Zéro regret face à mon ancienne thermique !"
        : "Châssis rigide et freinage régénératif ultra puissant qui économise les plaquettes. Zéro entretien, zéro odeur d'essence dans le garage. C'est le futur."
  )},
        comment_en: ${JSON.stringify(
    idx % 3 === 0
      ? "Breathtaking instant pull off the line! Handling in corners is razor-sharp. Only minor grip: OEM seat is a bit stiff past 50 miles, so get the comfort upgrade. Thomas from the workshop was fantastic during delivery handover."
      : idx % 3 === 1
        ? "Delivered straight to my driveway with lift-gate truck and pre-fitted plate. Highway riding at 70 mph uses about 20% more battery than urban cruising, exactly as predicted by the simulator. Zero regrets leaving gas behind!"
        : "Rigid chassis and exceptionally strong regen braking. Zero maintenance, zero oil fumes in the garage. Pure riding joy."
  )},
        real_range_tested_km: ${Math.round(p.range * (idx % 3 === 0 ? 0.88 : (idx % 3 === 1 ? 0.94 : 0.82)))},
        location: ${JSON.stringify(idx % 3 === 0 ? "Île-de-France" : idx % 3 === 1 ? "Auvergne-Rhône-Alpes" : "PACA")}
      }
    ],
    rating: ${(4.1 + ((idx * 7) % 8) * 0.1).toFixed(1)},
    review_count: ${14 + ((idx * 13) % 48)},
    featured: ${isFeatured},
    bestseller: ${isBestseller},
    is_new: ${isNew}
  }`;
}).join(',\n')}
];

export function getProduct(idOrSlug: string): Product | undefined {
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export function getProductsByType(type: "moto" | "velo"): Product[] {
  return products.filter((p) => p.type === type);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/products.ts'), tsOutput, 'utf8');
console.log('Successfully generated src/lib/products.ts with ' + ITEMS_SPEC.length + ' products.');
