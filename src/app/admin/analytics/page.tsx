"use client";

import { useEffect, useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";
import { getAnalyticsData } from "@/lib/admin";
import AdminLayout from "@/components/AdminLayout";

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [period, setPeriod] = useState("today");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  const loadAnalytics = () => {
    setLoading(true);
    setAnalytics(getAnalyticsData(period));
    setLoading(false);
  };

  const periods = [
    { value: "today", label: "Aujourd'hui" },
    { value: "week", label: "Cette semaine" },
    { value: "month", label: "Ce mois" },
    { value: "year", label: "Cette année" }
  ];

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Chargement...</div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 mt-1">Statistiques détaillées de votre site</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="text-gray-400 w-5 h-5" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periods.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={loadAnalytics}
            disabled={loading}
            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Actualiser</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+12%</span>
          </div>
          <p className="text-gray-400 text-sm">Visiteurs uniques</p>
          <p className="text-2xl font-bold text-white mt-1">{analytics.visitors.unique}</p>
          <p className="text-gray-500 text-xs mt-2">{analytics.visitors.total} visites totales</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Eye className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+8%</span>
          </div>
          <p className="text-gray-400 text-sm">Pages vues</p>
          <p className="text-2xl font-bold text-white mt-1">{analytics.pageViews}</p>
          <p className="text-gray-500 text-xs mt-2">
            {analytics.visitors.unique > 0 
              ? (analytics.pageViews / analytics.visitors.unique).toFixed(1) 
              : 0} pages/visiteur
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+15%</span>
          </div>
          <p className="text-gray-400 text-sm">Durée moyenne</p>
          <p className="text-2xl font-bold text-white mt-1">
            {Math.floor(analytics.avgSessionDuration / 60)}m {Math.round(analytics.avgSessionDuration % 60)}s
          </p>
          <p className="text-gray-500 text-xs mt-2">Temps passé sur le site</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
            <span className="text-red-400 text-sm font-medium">-3%</span>
          </div>
          <p className="text-gray-400 text-sm">Taux de rebond</p>
          <p className="text-2xl font-bold text-white mt-1">{analytics.bounceRate.toFixed(1)}%</p>
          <p className="text-gray-500 text-xs mt-2">Visiteurs d'une page</p>
        </div>
      </div>

      {/* Conversions */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Conversions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Commandes</p>
            <p className="text-2xl font-bold text-white mt-1">{analytics.conversions.orders}</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Revenu</p>
            <p className="text-2xl font-bold text-white mt-1">{analytics.conversions.revenue.toLocaleString()} €</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Taux de conversion</p>
            <p className="text-2xl font-bold text-white mt-1">{analytics.conversions.conversionRate.toFixed(2)}%</p>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Pages les plus visitées</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.topPages.map((page: any, index: number) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index === 0 ? "bg-yellow-500 text-white" :
                      index === 1 ? "bg-gray-400 text-white" :
                      index === 2 ? "bg-orange-600 text-white" :
                      "bg-gray-700 text-gray-400"
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-white font-medium truncate max-w-[200px]">{page.page}</p>
                      <p className="text-gray-400 text-sm">{page.uniqueVisitors} visiteurs uniques</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{page.views}</p>
                    <p className="text-gray-400 text-sm">vues</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Sources de trafic</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.trafficSources.map((source: any) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium">{source.source}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">{source.visitors} visiteurs</span>
                      <span className="text-white font-bold">{source.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all" 
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Devices */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Appareils utilisés</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.devices.map((device: any) => (
                <div key={device.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {device.type === "desktop" && <span className="text-xl">💻</span>}
                      {device.type === "mobile" && <span className="text-xl">📱</span>}
                      {device.type === "tablet" && <span className="text-xl">📱</span>}
                      <p className="text-white font-medium capitalize">{device.type}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">{device.count} appareils</span>
                      <span className="text-white font-bold">{device.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all" 
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visitor Overview */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Aperçu des visiteurs</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Nouveaux visiteurs</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {analytics.visitors.unique - analytics.visitors.returning}
                </p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Visiteurs récurrents</p>
                <p className="text-2xl font-bold text-white mt-1">{analytics.visitors.returning}</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Pages/visite</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {analytics.visitors.unique > 0 
                    ? (analytics.pageViews / analytics.visitors.unique).toFixed(1) 
                    : 0}
                </p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Temps moyen</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {Math.floor(analytics.avgSessionDuration / 60)}m
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}