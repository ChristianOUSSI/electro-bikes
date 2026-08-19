"use client";

import { useEffect, useState } from "react";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye, 
  Download,
  Truck,
  CheckCircle,
  Clock,
  XCircle as XCircleIcon
} from "lucide-react";
import { getOrders } from "@/lib/orders";
import { Order } from "@/lib/types";
import AdminLayout from "@/components/AdminLayout";

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const loadOrders = () => {
    setOrders(getOrders());
  };

  const filterOrders = () => {
    let result = [...orders];

    if (statusFilter !== "all") {
      result = result.filter(order => order.statut === statusFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order =>
        order.id.toLowerCase().includes(term) ||
        order.client.prenom.toLowerCase().includes(term) ||
        order.client.nom.toLowerCase().includes(term) ||
        order.client.email.toLowerCase().includes(term)
      );
    }

    setFilteredOrders(result);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "shipped": return "bg-blue-500";
      case "delivered": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "shipped": return <Truck className="w-4 h-4" />;
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      default: return <XCircleIcon className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmée";
      case "pending": return "En attente";
      case "shipped": return "Expédiée";
      case "delivered": return "Livrée";
      default: return status;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Commandes</h1>
          <p className="text-gray-400 mt-1">Gestion des commandes clients</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une commande (ID, client, email...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmée</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Total commandes</p>
              <p className="text-xl font-bold text-white">{orders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-gray-400 text-sm">En attente</p>
              <p className="text-xl font-bold text-white">
                {orders.filter(o => o.statut === "pending").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Truck className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Expédiées</p>
              <p className="text-xl font-bold text-white">
                {orders.filter(o => o.statut === "shipped").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Livrées</p>
              <p className="text-xl font-bold text-white">
                {orders.filter(o => o.statut === "delivered").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Articles
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    Aucune commande trouvée
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{order.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">
                          {order.client.prenom} {order.client.nom}
                        </p>
                        <p className="text-gray-400 text-sm">{order.client.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white">{order.items.length} article(s)</p>
                      <p className="text-gray-400 text-sm">
                        {order.items.map(item => item.nom).join(", ")}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-bold">{order.total.toLocaleString()} €</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs ${getStatusColor(order.statut)}`}>
                        {getStatusIcon(order.statut)}
                        <span>{getStatusLabel(order.statut)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Détails de la commande {selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Client Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Informations client</h3>
                <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Nom</p>
                      <p className="text-white">{selectedOrder.client.prenom} {selectedOrder.client.nom}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">{selectedOrder.client.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Téléphone</p>
                      <p className="text-white">{selectedOrder.client.telephone}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Pays</p>
                      <p className="text-white">{selectedOrder.client.pays}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Adresse</p>
                    <p className="text-white">{selectedOrder.client.adresse}</p>
                    <p className="text-white">{selectedOrder.client.codePostal} {selectedOrder.client.ville}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Articles commandés</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{item.nom}</p>
                        <p className="text-gray-400 text-sm">Quantité: {item.quantite}</p>
                        {item.selectedOptions && (
                          <p className="text-gray-400 text-sm">
                            Options: {item.selectedOptions.join(", ")}
                          </p>
                        )}
                      </div>
                      <p className="text-white font-bold">
                        {((item.prix + (item.optionCost || 0)) * item.quantite).toLocaleString()} €
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Récapitulatif</h3>
                <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sous-total</span>
                    <span className="text-white">{selectedOrder.sousTotal.toLocaleString()} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bonus déduit</span>
                    <span className="text-white">-{selectedOrder.bonusDeducted.toLocaleString()} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Livraison</span>
                    <span className="text-white">{selectedOrder.livraison.toLocaleString()} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">TVA</span>
                    <span className="text-white">{selectedOrder.tva.toLocaleString()} €</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-600 pt-2">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-white font-bold text-xl">{selectedOrder.total.toLocaleString()} €</span>
                  </div>
                </div>
              </div>

              {/* Status Change */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Changer le statut</h3>
                <select
                  value={selectedOrder.statut}
                  onChange={(e) => {
                    // Here you would implement the status change logic
                    console.log("Change status to:", e.target.value);
                  }}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmée</option>
                  <option value="shipped">Expédiée</option>
                  <option value="delivered">Livrée</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}