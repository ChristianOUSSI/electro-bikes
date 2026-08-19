"use client";

import { useEffect, useState } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Upload,
  Image as ImageIcon,
  Save,
  X,
  Euro
} from "lucide-react";
import { products } from "@/lib/products";
import { Product } from "@/lib/types";
import AdminLayout from "@/components/AdminLayout";

export default function AdminProducts() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProductsList(products);
  };

  const filteredProducts = productsList.filter(product =>
    product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.nom_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingProduct(null);
    setFormData({
      type: "moto",
      license_category: "A",
      eco_bonus_eligible: true,
      max_eco_bonus: 1500,
      stock: 0,
      rating: 0,
      review_count: 0,
      featured: false,
      bestseller: false,
      is_new: false
    });
    setPreviewImages([]);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setPreviewImages(product.images || []);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

    try {
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadProducts();
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setPreviewImages([...previewImages, data.imageUrl]);
        setFormData({ ...formData, images: [...previewImages, data.imageUrl] });
      }
    } catch (error) {
      alert("Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        images: previewImages
      };

      const url = editingProduct ? "/api/admin/products" : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct ? { ...payload, id: editingProduct.id } : payload),
      });

      if (response.ok) {
        setShowModal(false);
        loadProducts();
      } else {
        alert("Erreur lors de la sauvegarde");
      }
    } catch (error) {
      alert("Erreur lors de la sauvegarde");
    }
  };

  const removeImage = (index: number) => {
    const newImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newImages);
    setFormData({ ...formData, images: newImages });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestion des Produits</h1>
          <p className="text-gray-400 mt-1">Ajoutez, modifiez ou supprimez des produits</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nouveau produit</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="relative h-48 bg-gray-700">
              <img
                src={product.image_url}
                alt={product.nom}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                {product.featured && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Featured</span>
                )}
                {product.bestseller && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Bestseller</span>
                )}
                {product.is_new && (
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">Nouveau</span>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold text-lg">{product.nom}</h3>
              <p className="text-gray-400 text-sm">{product.brand}</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-xl">
                    {product.prix_promo ? (
                      <>
                        <span className="text-gray-400 line-through text-sm mr-2">
                          {product.prix.toLocaleString()} €
                        </span>
                        {product.prix_promo.toLocaleString()} €
                      </>
                    ) : (
                      `${product.prix.toLocaleString()} €`
                    )}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${
                    product.stock > 0 ? "text-green-400" : "text-red-400"
                  }`}>
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Modifier</span>
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingProduct ? "Modifier le produit" : "Nouveau produit"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Images</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-gray-400">
                      {uploading ? "Upload en cours..." : "Cliquez pour uploader une image"}
                    </span>
                  </label>
                </div>
                {previewImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {previewImages.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img}
                          alt={`Preview ${index}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nom (FR)</label>
                  <input
                    type="text"
                    value={formData.nom || ""}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nom (EN)</label>
                  <input
                    type="text"
                    value={formData.nom_en || ""}
                    onChange={(e) => setFormData({ ...formData, nom_en: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Marque</label>
                  <input
                    type="text"
                    value={formData.brand || ""}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie (FR)</label>
                  <input
                    type="text"
                    value={formData.category_label || ""}
                    onChange={(e) => setFormData({ ...formData, category_label: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description (FR)</label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description (EN)</label>
                <textarea
                  value={formData.description_en || ""}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Prix (€)</label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      value={formData.prix || ""}
                      onChange={(e) => setFormData({ ...formData, prix: Number(e.target.value) })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Prix Promo (€)</label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      value={formData.prix_promo || ""}
                      onChange={(e) => setFormData({ ...formData, prix_promo: Number(e.target.value) })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Stock</label>
                  <input
                    type="number"
                    value={formData.stock || 0}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Autonomie (km)</label>
                  <input
                    type="number"
                    value={formData.autonomie_km || ""}
                    onChange={(e) => setFormData({ ...formData, autonomie_km: Number(e.target.value) })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Vitesse max (km/h)</label>
                  <input
                    type="number"
                    value={formData.vitesse_max || ""}
                    onChange={(e) => setFormData({ ...formData, vitesse_max: Number(e.target.value) })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Poids (kg)</label>
                  <input
                    type="number"
                    value={formData.poids_kg || ""}
                    onChange={(e) => setFormData({ ...formData, poids_kg: Number(e.target.value) })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Type & License */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select
                    value={formData.type || "moto"}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="velo">Vélo</option>
                    <option value="moto">Moto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Permis</label>
                  <select
                    value={formData.license_category || "A"}
                    onChange={(e) => setFormData({ ...formData, license_category: e.target.value as any })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">Sans permis</option>
                    <option value="speed_pedelec">Speed Pedelec</option>
                    <option value="AM">Permis AM</option>
                    <option value="A1_B">Permis A1/B</option>
                    <option value="A2">Permis A2</option>
                    <option value="A">Permis A</option>
                    <option value="offroad">Offroad</option>
                  </select>
                </div>
              </div>

              {/* Flags */}
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.eco_bonus_eligible || false}
                    onChange={(e) => setFormData({ ...formData, eco_bonus_eligible: e.target.checked })}
                    className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Éco-bonus éligible</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Featured</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.bestseller || false}
                    onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                    className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Bestseller</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.is_new || false}
                    onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                    className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Nouveau</span>
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Sauvegarder</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}