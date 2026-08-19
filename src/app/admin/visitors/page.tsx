"use client";

import { useEffect, useState } from "react";
import { Users, MapPin, Clock, Monitor, Smartphone, Tablet } from "lucide-react";
import { getVisitors } from "@/lib/analytics";
import AdminLayout from "@/components/AdminLayout";

export default function AdminVisitors() {
  const [visitors, setVisitors] = useState<any[]>([]);
  const [filter, setFilter] = useState("today");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadVisitors();
    // Refresh data every 30 seconds
    const interval = setInterval(loadVisitors, 30000);
    return () => clearInterval(interval);
  }, [filter]);

  const loadVisitors = () => {
    setVisitors(getVisitors({ period: filter }));
  };

  const filteredVisitors = visitors.filter(visitor => 
    visitor.device.os.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.device.browser.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.location?.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "mobile": return <Smartphone className="w-4 h-4" />;
      case "tablet": return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Visiteurs</h1>
          <p className="text-gray-400 mt-1">Suivi des visiteurs en temps réel</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher un visiteur (OS, navigateur, ville...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Total visiteurs</p>
              <p className="text-xl font-bold text-white">{visitors.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Monitor className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Desktop</p>
              <p className="text-xl font-bold text-white">
                {visitors.filter(v => v.device.type === "desktop").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Mobile</p>
              <p className="text-xl font-bold text-white">
                {visitors.filter(v => v.device.type === "mobile").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-orange-400" />
            <div>
              <p className="text-gray-400 text-sm">Durée moyenne</p>
              <p className="text-xl font-bold text-white">
                {visitors.length > 0 
                  ? Math.round(visitors.reduce((acc, v) => acc + v.duration, 0) / visitors.length / 60) + "m"
                  : "0m"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visitors Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Appareil
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Localisation
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Pages visitées
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Dernière activité
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Source
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredVisitors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    Aucun visiteur trouvé
                  </td>
                </tr>
              ) : (
                filteredVisitors.map((visitor) => (
                  <tr key={visitor.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-gray-400">
                          {getDeviceIcon(visitor.device.type)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{visitor.device.os}</p>
                          <p className="text-gray-400 text-sm">{visitor.device.browser}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-white">{visitor.location?.city || "Inconnue"}</p>
                          <p className="text-gray-400 text-sm">{visitor.location?.country || "-"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{visitor.pagesVisited.length}</span>
                        <span className="text-gray-400 text-sm">pages</span>
                      </div>
                      <p className="text-gray-400 text-xs truncate max-w-[200px]">
                        {visitor.currentPage || visitor.landingPage}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-white">
                          {Math.floor(visitor.duration / 60)}m {visitor.duration % 60}s
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white">
                        {new Date(visitor.lastActivity).toLocaleTimeString()}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(visitor.lastActivity).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white text-sm truncate max-w-[150px]">
                        {visitor.referer || "Direct"}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}