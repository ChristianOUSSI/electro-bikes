export type ProductType = "velo" | "moto";

export type LicenseCategory =
  | "none" // VAE 250W 25km/h (Sans permis)
  | "speed_pedelec" // Speed bike 45km/h (Permis AM/B)
  | "AM" // Équiv 50cc (Permis AM dès 14 ans)
  | "A1_B" // Équiv 125cc (Permis A1 ou Permis B + formation 7h)
  | "A2" // Moto A2 (Jusqu'à 35 kW / 47 ch)
  | "A" // Permis A Toutes puissances
  | "offroad"; // Non homologué route - Terrain privé uniquement

export interface ProductSpecBattery {
  capacity_kwh: number; // ex: 17.3
  capacity_wh?: number; // ex: 750
  voltage: number; // ex: 72V, 102V
  removable: boolean;
  cell_type: string; // ex: "LG 21700 High Density", "CATL LFP"
  charge_time_home_h: number; // Domestic 230V 10A socket
  charge_time_wallbox_h?: number; // Type 2 3.7/7.4kW
  charge_time_fast_min?: number; // DC Fast Charge 20-80%
  warranty_years: number; // ex: 5
  warranty_km: number; // ex: 50000
  ip_rating: string; // ex: "IP67"
}

export interface ProductSpecMotor {
  power_nominal_kw: number; // ex: 11
  power_peak_kw: number; // ex: 80
  power_hp: number; // ex: 108
  torque_nm: number; // ex: 190
  motor_type: string; // ex: "Synchrone à aimants permanents IPM"
  transmission: string; // ex: "Courroie carbone Gates Carbon Drive", "Chaîne renforcée O-Ring"
  regen_braking: boolean;
  riding_modes: string[]; // ex: ["Eco", "Street", "Sport", "Custom", "Rain"]
}

export interface ProductOption {
  id: string;
  name: string;
  name_en: string;
  price: number;
  description: string;
  description_en: string;
  image?: string;
  category: "wheels" | "battery" | "charger" | "luggage" | "security" | "power";
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  title_en: string;
  comment: string;
  comment_en: string;
  real_range_tested_km: number;
  location: string;
}

export type StockStatus = "in_showroom" | "in_transit" | "factory_order";

export interface Product {
  id: string;
  slug: string;
  nom: string;
  nom_en: string;
  brand: string;
  category_label: string;
  category_label_en: string;
  description: string;
  description_en: string;
  highlight_subtitle: string;
  highlight_subtitle_en: string;
  prix: number;
  prix_promo?: number;
  eco_bonus_eligible: boolean;
  max_eco_bonus: number; // Montant max d'aide déductible en €
  image_url: string;
  images: string[];
  type: ProductType;
  license_category: LicenseCategory;
  license_label_fr: string;
  license_label_en: string;
  autonomie_km: number; // Range mixte constructeur
  autonomie_city_km: number;
  autonomie_highway_km: number;
  vitesse_max: number; // km/h
  acceleration_0_100_s?: number;
  acceleration_0_50_s?: number;
  stock: number;
  stock_status?: StockStatus;
  delivery_time_label?: string;
  delivery_time_label_en?: string;
  poids_kg: number;
  payload_kg: number; // Charge utile max
  temps_charge_h: number; // Legacy shortcut
  moteur: string; // Description rapide
  batterie: string; // Description rapide
  battery_specs: ProductSpecBattery;
  motor_specs: ProductSpecMotor;
  dimensions_mm?: { length: number; width: number; height: number; seat_height: number };
  certifications: string[]; // ["CE", "UL 2849", "UN 38.3", "Euro 5 L3e"]
  available_options: ProductOption[];
  reviews: ProductReview[];
  rating: number;
  review_count: number;
  featured?: boolean;
  bestseller?: boolean;
  is_new?: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  nom: string;
  prix: number;
  quantite: number;
  selectedOptions?: string[];
  optionCost?: number;
}

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered";

export interface CustomerInfo {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;
  pays: string;
  region?: string;
  licenseNumber?: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  sousTotal: number;
  bonusDeducted: number;
  livraison: number;
  tva: number;
  immatriculation: number;
  total: number;
  statut: OrderStatus;
  client: CustomerInfo;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantite: number;
  selectedOptions?: string[];
}

// Admin Types
export interface AdminUser {
  id: string;
  email: string;
  password: string; // En production, devrait être hashé
  name: string;
  role: "admin" | "superadmin";
  createdAt: string;
  lastLogin?: string;
}

export interface Visitor {
  id: string;
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  referer?: string;
  landingPage: string;
  currentPage?: string;
  pagesVisited: string[];
  duration: number; // en secondes
  createdAt: string;
  lastActivity: string;
  location?: {
    country: string;
    city: string;
    region: string;
  };
  device: {
    type: "desktop" | "mobile" | "tablet";
    os: string;
    browser: string;
  };
}

export interface ChatMessage {
  id: string;
  visitorId: string;
  visitorName?: string;
  visitorEmail?: string;
  message: string;
  isAdmin: boolean;
  timestamp: string;
  read: boolean;
}

export interface ChatSession {
  id: string;
  visitorId: string;
  visitorName?: string;
  visitorEmail?: string;
  status: "active" | "closed" | "pending";
  messages: ChatMessage[];
  createdAt: string;
  lastMessageAt: string;
  assignedTo?: string; // admin ID
}

export interface PaymentNotification {
  id: string;
  orderId: string;
  type: "full_payment" | "partial_payment" | "refund";
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  paymentMethod: string;
  transactionId?: string;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  createdAt: string;
  processedAt?: string;
  notes?: string;
}

export interface AnalyticsData {
  period: string; // "today", "week", "month", "year"
  visitors: {
    total: number;
    unique: number;
    returning: number;
  };
  pageViews: number;
  avgSessionDuration: number; // en secondes
  bounceRate: number; // pourcentage
  topPages: Array<{
    page: string;
    views: number;
    uniqueVisitors: number;
  }>;
  trafficSources: Array<{
    source: string;
    visitors: number;
    percentage: number;
  }>;
  devices: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  conversions: {
    orders: number;
    revenue: number;
    conversionRate: number;
  };
}

export interface AdminNotification {
  id: string;
  type: "new_order" | "payment" | "chat" | "low_stock" | "system";
  title: string;
  message: string;
  priority: "low" | "medium" | "high" | "urgent";
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}
