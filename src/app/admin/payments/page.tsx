"use client";

import { useEffect, useState } from "react";
import { 
  CreditCard, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle as XCircleIcon,
  AlertTriangle,
  Euro,
  Calendar,
  User,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";
import { getPaymentNotifications, updatePaymentStatus } from "@/lib/admin";
import AdminLayout from "@/components/AdminLayout";

export default function AdminPayments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  useEffect(() => {
    loadPayments();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [payments, searchTerm, statusFilter, typeFilter]);

  const loadPayments = () => {
    setPayments(getPaymentNotifications());
  };

  const filterPayments = () => {
    let result = [...payments];

    if (statusFilter !== "all") {
      result = result.filter(payment => payment.status === statusFilter);
    }

    if (typeFilter !== "all") {
      result = result.filter(payment => payment.type === typeFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(payment =>
        payment.id.toLowerCase().includes(term) ||
        payment.orderId.toLowerCase().includes(term) ||
        payment.customerInfo.name.toLowerCase().includes(term) ||
        payment.customerInfo.email.toLowerCase().includes(term) ||
        payment.transactionId?.toLowerCase().includes(term)
      );
    }

    setFilteredPayments(result);
  };

  const handleStatusUpdate = async (paymentId: string, newStatus: "pending" | "completed" | "failed") => {
    await updatePaymentStatus(paymentId, newStatus, new Date().toISOString());
    loadPayments();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "failed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "failed": return <XCircleIcon className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "Complété";
      case "pending": return "En attente";
      case "failed": return "Échoué";
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "full_payment": return <ArrowDownLeft className="w-4 h-4" />;
      case "partial_payment": return <ArrowUpRight className="w-4 h-4" />;
      case "refund": return <ArrowUpRight className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "full_payment": return "Paiement complet";
      case "partial_payment": return "Acompte";
      case "refund": return "Remboursement";
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "full_payment": return "text-green-400";
      case "partial_payment": return "text-blue-400";
      case "refund": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Paiements</h1>
          <p className="text-gray-400 mt-1">Suivi des paiements et acomptes</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un paiement (ID, commande, client...)"
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
            <option value="completed">Complété</option>
            <option value="pending">En attente</option>
            <option value="failed">Échoué</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les types</option>
            <option value="full_payment">Paiement complet</option>
            <option value="partial_payment">Acompte</option>
            <option value="refund">Remboursement</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Total paiements</p>
              <p className="text-xl font-bold text-white">{payments.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Complétés</p>
              <p className="text-xl font-bold text-white">
                {payments.filter(p => p.status === "completed").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-gray-400 text-sm">En attente</p>
              <p className="text-xl font-bold text-white">
                {payments.filter(p => p.status === "pending").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Euro className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Volume total</p>
              <p className="text-xl font-bold text-white">
                {payments
                  .filter(p => p.status === "completed")
                  .reduce((acc, p) => acc + p.amount, 0)
                  .toLocaleString()} €
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Paiement
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Montant
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
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                    Aucun paiement trouvé
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <p className="text-white font-medium">{payment.id}</p>
                      </div>
                      {payment.transactionId && (
                        <p className="text-gray-400 text-sm">{payment.transactionId}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{payment.orderId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-white">{payment.customerInfo.name}</p>
                          <p className="text-gray-400 text-sm">{payment.customerInfo.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(payment.type)}
                        <span className={`text-sm ${getTypeColor(payment.type)}`}>
                          {getTypeLabel(payment.type)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-bold">{payment.amount.toLocaleString()} €</p>
                      <p className="text-gray-400 text-sm">{payment.currency}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        <span>{getStatusLabel(payment.status)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-white">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {new Date(payment.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {payment.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(payment.id, "completed")}
                              className="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
                              title="Marquer comme complété"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(payment.id, "failed")}
                              className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                              title="Marquer comme échoué"
                            >
                              <XCircleIcon className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors"
                        >
                          <Filter className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Détails du paiement {selectedPayment.id}</h2>
              <button
                onClick={() => setSelectedPayment(null)}
                className="text-gray-400 hover:text-white"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Payment Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Informations de paiement</h3>
                <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">ID de transaction</p>
                      <p className="text-white">{selectedPayment.transactionId || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Méthode de paiement</p>
                      <p className="text-white">{selectedPayment.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Montant</p>
                      <p className="text-white font-bold">{selectedPayment.amount.toLocaleString()} {selectedPayment.currency}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Type</p>
                      <p className="text-white">{getTypeLabel(selectedPayment.type)}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Date de création</p>
                      <p className="text-white">{new Date(selectedPayment.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Date de traitement</p>
                      <p className="text-white">
                        {selectedPayment.processedAt 
                          ? new Date(selectedPayment.processedAt).toLocaleString() 
                          : "Non traité"}
                      </p>
                    </div>
                  </div>
                  {selectedPayment.notes && (
                    <div>
                      <p className="text-gray-400 text-sm">Notes</p>
                      <p className="text-white">{selectedPayment.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Informations client</h3>
                <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Nom</p>
                      <p className="text-white">{selectedPayment.customerInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">{selectedPayment.customerInfo.email}</p>
                    </div>
                    {selectedPayment.customerInfo.phone && (
                      <div>
                        <p className="text-gray-400 text-sm">Téléphone</p>
                        <p className="text-white">{selectedPayment.customerInfo.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Reference */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Référence de commande</h3>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-white font-medium">{selectedPayment.orderId}</p>
                </div>
              </div>

              {/* Status Change */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Changer le statut</h3>
                <div className="flex space-x-3">
                  {selectedPayment.status === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedPayment.id, "completed");
                          setSelectedPayment(null);
                        }}
                        className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Marquer comme complété</span>
                      </button>
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedPayment.id, "failed");
                          setSelectedPayment(null);
                        }}
                        className="flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors"
                      >
                        <XCircleIcon className="w-4 h-4" />
                        <span>Marquer comme échoué</span>
                      </button>
                    </>
                  )}
                  {selectedPayment.status === "completed" && (
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedPayment.id, "pending");
                        setSelectedPayment(null);
                      }}
                      className="flex-1 flex items-center justify-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition-colors"
                    >
                      <Clock className="w-4 h-4" />
                      <span>Remettre en attente</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}