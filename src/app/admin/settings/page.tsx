"use client";

import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Save, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Database,
  Mail,
  Lock,
  User,
  Building,
  ShoppingCart,
  CreditCard,
  AlertTriangle,
  MessageSquare
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General
    siteName: "Electro Bikes",
    siteEmail: "contact@electrobikes.com",
    sitePhone: "+33 1 23 45 67 89",
    currency: "EUR",
    language: "fr",
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    orderAlerts: true,
    paymentAlerts: true,
    lowStockAlerts: true,
    chatAlerts: true,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: 30,
    ipWhitelist: "",
    
    // Appearance
    theme: "dark",
    primaryColor: "#3B82F6",
    compactMode: false,
    
    // Business
    companyName: "Electro Bikes France",
    vatNumber: "FR12345678901",
    address: "123 Rue de la République",
    city: "Paris",
    postalCode: "75001",
    country: "France"
  });

  const tabs = [
    { id: "general", label: "Général", icon: SettingsIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Sécurité", icon: Shield },
    { id: "appearance", label: "Apparence", icon: Palette },
    { id: "business", label: "Entreprise", icon: Building },
  ];

  const handleSave = () => {
    // Here you would save the settings to your backend
    console.log("Saving settings:", settings);
    alert("Paramètres sauvegardés avec succès !");
  };

  const handleChange = (section: string, key: string, value: any) => {
    setSettings({
      ...settings,
      [section]: {
        ...(settings[section as keyof typeof settings] || {}),
        [key]: value
      }
    });
  };

  const handleDirectChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Paramètres</h1>
          <p className="text-gray-400 mt-1">Configurez votre administration</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Sauvegarder</span>
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 rounded-xl border border-gray-700 p-4 h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-gray-800 rounded-xl border border-gray-700 p-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <SettingsIcon className="w-5 h-5" />
                <span>Paramètres généraux</span>
              </h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nom du site</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleDirectChange("siteName", e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email de contact</label>
                  <input
                    type="email"
                    value={settings.siteEmail}
                    onChange={(e) => handleDirectChange("siteEmail", e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={settings.sitePhone}
                    onChange={(e) => handleDirectChange("sitePhone", e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Devise</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleDirectChange("currency", e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Langue par défaut</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleDirectChange("language", e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Préférences de notification</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Notifications par email</p>
                      <p className="text-gray-400 text-sm">Recevoir les alertes par email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleDirectChange("emailNotifications", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Notifications push</p>
                      <p className="text-gray-400 text-sm">Notifications dans le navigateur</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleDirectChange("pushNotifications", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ShoppingCart className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Alertes de commandes</p>
                      <p className="text-gray-400 text-sm">Nouvelles commandes clients</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.orderAlerts}
                      onChange={(e) => handleDirectChange("orderAlerts", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Alertes de paiements</p>
                      <p className="text-gray-400 text-sm">Notifications de paiements reçus</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.paymentAlerts}
                      onChange={(e) => handleDirectChange("paymentAlerts", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Alertes de stock faible</p>
                      <p className="text-gray-400 text-sm">Produits avec stock bas</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.lowStockAlerts}
                      onChange={(e) => handleDirectChange("lowStockAlerts", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Alertes de chat</p>
                      <p className="text-gray-400 text-sm">Nouveaux messages clients</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.chatAlerts}
                      onChange={(e) => handleDirectChange("chatAlerts", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Paramètres de sécurité</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Authentification à deux facteurs</p>
                      <p className="text-gray-400 text-sm">Sécurité supplémentaire pour votre compte</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleDirectChange("twoFactorAuth", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Délai d'expiration de session (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleDirectChange("sessionTimeout", Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-gray-400 text-sm mt-1">Déconnexion automatique après inactivité</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
 Liste blanche d'IP (séparées par des virgules)
                  </label>
                  <textarea
                    value={settings.ipWhitelist}
                    onChange={(e) => handleDirectChange("ipWhitelist", e.target.value)}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="192.168.1.1, 10.0.0.1"
                  />
                  <p className="text-gray-400 text-sm mt-1">IPs autorisées à accéder au panel admin</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Apparence</span>
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Thème</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleDirectChange("theme", e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="dark">Sombre</option>
                    <option value="light">Clair</option>
                    <option value="auto">Automatique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Couleur principale</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleDirectChange("primaryColor", e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) => handleDirectChange("primaryColor", e.target.value)}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Palette className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Mode compact</p>
                      <p className="text-gray-400 text-sm">Interface plus compacte</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.compactMode}
                      onChange={(e) => handleDirectChange("compactMode", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "business" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Building className="w-5 h-5" />
                <span>Informations entreprise</span>
              </h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nom de l'entreprise</label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => handleDirectChange("companyName", e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Numéro TVA</label>
                  <input
                    type="text"
                    value={settings.vatNumber}
                    onChange={(e) => handleDirectChange("vatNumber", e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Adresse</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => handleDirectChange("address", e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ville</label>
                  <input
                    type="text"
                    value={settings.city}
                    onChange={(e) => handleDirectChange("city", e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Code postal</label>
                  <input
                    type="text"
                    value={settings.postalCode}
                    onChange={(e) => handleDirectChange("postalCode", e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Pays</label>
                  <input
                    type="text"
                    value={settings.country}
                    onChange={(e) => handleDirectChange("country", e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}