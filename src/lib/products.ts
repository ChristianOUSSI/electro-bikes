import { Product } from "./types";

export const products: Product[] = [
  {
    id: "velo-aero-x1",
    nom: "Aero X1 Carbone",
    nom_en: "Aero X1 Carbon",
    description:
      "Vélo électrique route en carbone haut de gamme, conçu pour la performance et l'élégance. Cadre monocoque, assistance intelligente et finitions premium.",
    description_en:
      "High-end carbon road e-bike, built for performance and elegance. Monocoque frame, smart assistance and premium finishes.",
    prix: 6490,
    image_url:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200&q=80",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=1200&q=80",
    ],
    autonomie_km: 120,
    vitesse_max: 25,
    stock: 8,
    type: "velo",
    moteur: "Moyeu arrière 250W — couple 45 Nm",
    batterie: "Li-ion 504 Wh amovible",
    poids_kg: 14.5,
    temps_charge_h: 3.5,
  },
  {
    id: "velo-urban-s",
    nom: "Urban S Édition Ville",
    nom_en: "Urban S City Edition",
    description:
      "Le compagnon urbain ultime : léger, connecté, avec antivol intégré et éclairage automatique. Parfait pour les trajets quotidiens avec style.",
    description_en:
      "The ultimate urban companion: lightweight, connected, with integrated lock and automatic lighting. Perfect for stylish daily commutes.",
    prix: 3290,
    image_url:
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=1200&q=80",
      "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=1200&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80",
    ],
    autonomie_km: 80,
    vitesse_max: 25,
    stock: 15,
    type: "velo",
    moteur: "Moteur central 250W — couple 65 Nm",
    batterie: "Li-ion 400 Wh intégrée au cadre",
    poids_kg: 17.2,
    temps_charge_h: 3,
  },
  {
    id: "velo-trail-pro",
    nom: "Trail Pro VTT",
    nom_en: "Trail Pro MTB",
    description:
      "VTT électrique tout-suspendu pour les sentiers les plus exigeants. Débattement 160 mm, moteur puissant et batterie longue durée.",
    description_en:
      "Full-suspension electric MTB for the most demanding trails. 160 mm travel, powerful motor and long-lasting battery.",
    prix: 7890,
    image_url:
      "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&q=80",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=1200&q=80",
      "https://images.unsplash.com/photo-1605008562962-4c8b45d9e9a3?w=1200&q=80",
    ],
    autonomie_km: 150,
    vitesse_max: 25,
    stock: 5,
    type: "velo",
    moteur: "Moteur central 250W — couple 85 Nm",
    batterie: "Li-ion 750 Wh amovible",
    poids_kg: 23.8,
    temps_charge_h: 4.5,
  },
  {
    id: "velo-gravel-gt",
    nom: "Gravel GT Explorer",
    nom_en: "Gravel GT Explorer",
    description:
      "Vélo gravel électrique polyvalent pour l'aventure sans limites. Pneus mixtes, géométrie endurance et autonomie exceptionnelle.",
    description_en:
      "Versatile electric gravel bike for limitless adventure. Mixed tires, endurance geometry and exceptional range.",
    prix: 5490,
    image_url:
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=1200&q=80",
      "https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=1200&q=80",
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80",
    ],
    autonomie_km: 130,
    vitesse_max: 25,
    stock: 10,
    type: "velo",
    moteur: "Moyeu arrière 250W — couple 50 Nm",
    batterie: "Li-ion 540 Wh + extender 210 Wh",
    poids_kg: 15.9,
    temps_charge_h: 3.5,
  },
  {
    id: "velo-cargo-family",
    nom: "Cargo Family Longtail",
    nom_en: "Cargo Family Longtail",
    description:
      "Vélo cargo électrique longtail pour transporter enfants et courses en toute sécurité. Charge utile 200 kg, double batterie disponible.",
    description_en:
      "Electric longtail cargo bike to safely carry kids and groceries. 200 kg payload, dual battery available.",
    prix: 4990,
    image_url:
      "https://images.unsplash.com/photo-1558978806-7d3c34d0d05c?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1558978806-7d3c34d0d05c?w=1200&q=80",
      "https://images.unsplash.com/photo-1560329072-17f59dcd30a4?w=1200&q=80",
      "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?w=1200&q=80",
    ],
    autonomie_km: 90,
    vitesse_max: 25,
    stock: 7,
    type: "velo",
    moteur: "Moteur central 250W — couple 85 Nm",
    batterie: "Li-ion 545 Wh (double batterie en option)",
    poids_kg: 33.5,
    temps_charge_h: 4,
  },
  {
    id: "velo-speed-45",
    nom: "Speed 45 Pendulaire",
    nom_en: "Speed 45 Commuter",
    description:
      "Speed bike 45 km/h homologué pour avaler les kilomètres. Freins hydrauliques, suspension avant et position confortable.",
    description_en:
      "Certified 45 km/h speed bike to eat up the miles. Hydraulic brakes, front suspension and comfortable riding position.",
    prix: 5990,
    image_url:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200&q=80",
      "https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?w=1200&q=80",
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1200&q=80",
    ],
    autonomie_km: 100,
    vitesse_max: 45,
    stock: 6,
    type: "velo",
    moteur: "Moteur central 500W — couple 90 Nm",
    batterie: "Li-ion 625 Wh amovible",
    poids_kg: 26.4,
    temps_charge_h: 4,
  },
  {
    id: "moto-volt-r",
    nom: "Volt R Roadster",
    nom_en: "Volt R Roadster",
    description:
      "Moto électrique roadster au couple instantané saisissant. 0 à 100 km/h en 3,2 s, châssis treillis et électronique de pointe.",
    description_en:
      "Electric roadster with breathtaking instant torque. 0 to 100 km/h in 3.2 s, trellis frame and cutting-edge electronics.",
    prix: 24900,
    image_url:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80",
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=1200&q=80",
    ],
    autonomie_km: 260,
    vitesse_max: 200,
    stock: 3,
    type: "moto",
    moteur: "Moteur synchrone 110 kW — couple 200 Nm",
    batterie: "Li-ion 17,3 kWh refroidie par liquide",
    poids_kg: 220,
    temps_charge_h: 1.5,
  },
  {
    id: "moto-city-ls",
    nom: "City LS Scooter",
    nom_en: "City LS Scooter",
    description:
      "Scooter électrique premium équivalent 125cc. Silencieux, connecté, avec deux batteries amovibles et grand coffre sous la selle.",
    description_en:
      "Premium electric scooter, 125cc equivalent. Silent, connected, with two removable batteries and large under-seat storage.",
    prix: 7490,
    image_url:
      "https://images.unsplash.com/photo-1618395434570-806f6b8fa78e?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1618395434570-806f6b8fa78e?w=1200&q=80",
      "https://images.unsplash.com/photo-1571325654970-2a2c4dda9b52?w=1200&q=80",
      "https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=1200&q=80",
    ],
    autonomie_km: 130,
    vitesse_max: 105,
    stock: 12,
    type: "moto",
    moteur: "Moteur roue 11 kW",
    batterie: "2 × Li-ion 2,8 kWh amovibles",
    poids_kg: 130,
    temps_charge_h: 3,
  },
  {
    id: "moto-trail-adv",
    nom: "Trail ADV Aventure",
    nom_en: "Trail ADV Adventure",
    description:
      "Trail électrique taillé pour l'aventure : suspensions longs débattements, modes de conduite off-road et recharge rapide DC.",
    description_en:
      "Electric adventure bike built for exploring: long-travel suspension, off-road riding modes and DC fast charging.",
    prix: 26900,
    image_url:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80",
      "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=1200&q=80",
      "https://images.unsplash.com/photo-1517846875602-2377bd76ca29?w=1200&q=80",
    ],
    autonomie_km: 230,
    vitesse_max: 180,
    stock: 4,
    type: "moto",
    moteur: "Moteur synchrone 80 kW — couple 190 Nm",
    batterie: "Li-ion 15,5 kWh — charge rapide DC 45 min",
    poids_kg: 235,
    temps_charge_h: 0.75,
  },
  {
    id: "moto-cafe-e",
    nom: "Café-E Racer",
    nom_en: "Cafe-E Racer",
    description:
      "Café racer électrique néo-rétro fabriquée à la main. Selle cuir, réservoir aluminium brossé et sonorité électrique caractéristique.",
    description_en:
      "Handcrafted neo-retro electric cafe racer. Leather saddle, brushed aluminium tank and a distinctive electric sound.",
    prix: 19900,
    image_url:
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=1200&q=80",
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1200&q=80",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80",
    ],
    autonomie_km: 180,
    vitesse_max: 145,
    stock: 2,
    type: "moto",
    moteur: "Moteur brushless 45 kW — couple 120 Nm",
    batterie: "Li-ion 12,5 kWh",
    poids_kg: 185,
    temps_charge_h: 2.5,
  },
  {
    id: "moto-sport-gp",
    nom: "Sport GP Ultima",
    nom_en: "Sport GP Ultima",
    description:
      "Sportive électrique d'exception dérivée de la compétition. Aérodynamique active, freinage carbone-céramique et 0-100 en 2,9 s.",
    description_en:
      "Exceptional race-derived electric sportbike. Active aerodynamics, carbon-ceramic brakes and 0-100 in 2.9 s.",
    prix: 34900,
    image_url:
      "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=1200&q=80",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80",
    ],
    autonomie_km: 240,
    vitesse_max: 240,
    stock: 2,
    type: "moto",
    moteur: "Moteur synchrone 130 kW — couple 225 Nm",
    batterie: "Li-ion 21 kWh refroidie par liquide",
    poids_kg: 225,
    temps_charge_h: 1.2,
  },
  {
    id: "moto-mini-cub",
    nom: "Mini Cub Électrique",
    nom_en: "Mini Cub Electric",
    description:
      "Mini-moto électrique urbaine légère et ludique. Idéale pour les déplacements courts, pliable et transportable partout.",
    description_en:
      "Light and fun urban electric mini-bike. Ideal for short trips, foldable and easy to carry anywhere.",
    prix: 4290,
    image_url:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1200&q=80",
      "https://images.unsplash.com/photo-1517846875602-2377bd76ca29?w=1200&q=80",
      "https://images.unsplash.com/photo-1571325654970-2a2c4dda9b52?w=1200&q=80",
    ],
    autonomie_km: 75,
    vitesse_max: 45,
    stock: 20,
    type: "moto",
    moteur: "Moteur roue 3 kW",
    batterie: "Li-ion 1,8 kWh amovible",
    poids_kg: 55,
    temps_charge_h: 2.5,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
