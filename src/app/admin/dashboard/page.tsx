"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Eye,
  Clock,
  TrendingUp,
  ShoppingCart,
  CreditCard,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { getVisitors, getAnalyticsData } from "@/lib/analytics";
import { getAdminNotifications } from "@/lib/admin";
import { getOrders } from "@/lib/orders";
import AdminLayout from "@/components/AdminLayout";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [recentVisitors, setRecentVisitors] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    setAnalytics(getAnalyticsData("today"));
    setRecentVisitors(getVisitors({ period: "today" }).slice(0, 10));
    setNotifications(getAdminNotifications().slice(0, 5));
    setOrders(getOrders());
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Chargement...</div>
      </div>
    );
  }

  const stats = [
    {
      name: "Visiteurs actifs",
      value: analytics?.visitors?.active || 0,
      change: "En direct",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      name: "Visiteurs aujourd'hui",
      value: analytics?.visitors?.total || 0,
      change: "+12%",
      icon: Eye,
      color: "bg-green-500"
    },
    {
      name: "Pages vues",
      value: analytics?.pageViews || 0,
      change: "+8%",
      icon: Eye,
      color: "bg-teal-500"
    },
    {
      name: "Durée moyenne",
      value: `${Math.round(analytics?.avgSessionDuration / 60)}m`,
      change: "+15%",
      icon: Clock,
      color: "bg-purple-500"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Vue d'ensemble de votre activité</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <p className="text-green-400 text-sm mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Visitors */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Visiteurs récents</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentVisitors.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Aucun visiteur aujourd'hui</p>
              ) : (
                recentVisitors.map((visitor) => (
                  <div key={visitor.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {visitor.device.type === "mobile" ? "📱" : visitor.device.type === "tablet" ? "📱" : "💻"}
                      </div>
                      <div>
                        <p className="text-white font-medium">{visitor.device.os}</p>
                        <p className="text-gray-400 text-sm">{visitor.device.browser}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm">{visitor.pagesVisited.length} pages</p>
                      <p className="text-gray-400 text-xs">
                        {new Date(visitor.lastActivity).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Commandes récentes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Aucune commande</p>
              ) : (
                orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{order.id}</p>
                        <p className="text-gray-400 text-sm">{order.client.prenom} {order.client.nom}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{order.total.toLocaleString()} €</p>
                      <p className={`text-sm ${
                        order.statut === "confirmed" ? "text-green-400" : 
                        order.statut === "pending" ? "text-yellow-400" : "text-blue-400"
                      }`}>
                        {order.statut}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Notifications</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Aucune notification</p>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className={`flex items-start space-x-3 p-4 rounded-lg ${
                  notification.read ? "bg-gray-700/30" : "bg-gray-700/70"
                }`}>
                  <div className={`p-2 rounded-lg ${
                    notification.priority === "urgent" ? "bg-red-500/20 text-red-400" :
                    notification.priority === "high" ? "bg-orange-500/20 text-orange-400" :
                    notification.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{notification.title}</p>
                    <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Traffic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Pages les plus visitées</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {analytics?.topPages?.slice(0, 5).map((page: any, index: number) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 text-sm w-6">{index + 1}</span>
                    <p className="text-white text-sm truncate max-w-[150px]">{page.page}</p>
                  </div>
                  <span className="text-gray-400 text-sm">{page.views} vues</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Sources de trafic</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {analytics?.trafficSources?.slice(0, 5).map((source: any) => (
                <div key={source.source} className="flex items-center justify-between">
                  <p className="text-white text-sm">{source.source}</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm">{source.percentage.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Devices */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Appareils</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {analytics?.devices?.map((device: any) => (
                <div key={device.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {device.type === "desktop" && <span>💻</span>}
                    {device.type === "mobile" && <span>📱</span>}
                    {device.type === "tablet" && <span>📱</span>}
                    <p className="text-white text-sm capitalize">{device.type}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm">{device.percentage.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}