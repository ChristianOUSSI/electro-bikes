export type ProductType = "velo" | "moto";

export interface Product {
  id: string;
  nom: string;
  nom_en: string;
  description: string;
  description_en: string;
  prix: number;
  image_url: string;
  images: string[];
  autonomie_km: number;
  vitesse_max: number;
  stock: number;
  type: ProductType;
  moteur: string;
  batterie: string;
  poids_kg: number;
  temps_charge_h: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  nom: string;
  prix: number;
  quantite: number;
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
}

export interface Order {
  id: string;
  items: OrderItem[];
  sousTotal: number;
  livraison: number;
  tva: number;
  total: number;
  statut: OrderStatus;
  client: CustomerInfo;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantite: number;
}
