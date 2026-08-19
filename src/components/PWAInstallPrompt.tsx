"use client";

import { useEffect, useState } from "react";
import { Download, X, Smartphone, Monitor } from "lucide-react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running as PWA
    const isInStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isInStandaloneMode) {
      setIsInstalled(true);
      return;
    }

    // Check for iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Show prompt after 5 seconds if not installed
    const timer = setTimeout(() => {
      if (!isInStandaloneMode) {
        setShowPrompt(true);
      }
    }, 5000);

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for 7 days
    localStorage.setItem('pwa_prompt_dismissed', Date.now().toString());
  };

  // Check if previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa_prompt_dismissed');
    if (dismissed) {
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - parseInt(dismissed) < sevenDays) {
        setShowPrompt(false);
      }
    }
  }, []);

  if (!showPrompt || isInstalled) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[10000] animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-[#1a1a1f] to-[#0d0d10] border border-[#c8ff00]/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#c8ff00]/10 rounded-xl flex items-center justify-center border border-[#c8ff00]/30">
              {isIOS ? <Smartphone className="w-6 h-6 text-[#c8ff00]" /> : <Monitor className="w-6 h-6 text-[#c8ff00]" />}
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">
                {isIOS ? "Installer l'application" : "Installer Electro Bikes"}
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                {isIOS
                  ? "Ajoutez à l'écran d'accueil pour une expérience optimale"
                  : "Installez l'application pour un accès rapide"}
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isIOS ? (
          <div className="bg-[#0d0d10] rounded-lg p-3 mb-3 border border-gray-700">
            <p className="text-gray-300 text-xs leading-relaxed">
              <span className="text-[#c8ff00] font-semibold">1.</span> Appuyez sur le bouton "Partager" <span className="text-[#c8ff00]">⎵</span><br />
              <span className="text-[#c8ff00] font-semibold">2.</span> Sélectionnez "Sur l'écran d'accueil"<br />
              <span className="text-[#c8ff00] font-semibold">3.</span> Appuyez sur "Ajouter"
            </p>
          </div>
        ) : (
          <button
            onClick={handleInstall}
            className="w-full bg-gradient-to-r from-[#c8ff00] to-[#a0cc00] hover:from-[#a0cc00] hover:to-[#8bb800] text-black font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[#c8ff00]/20 hover:shadow-[#c8ff00]/30"
          >
            <Download className="w-4 h-4" />
            Installer maintenant
          </button>
        )}

        <p className="text-gray-500 text-xs text-center mt-3">
          Installation gratuite • Pas d'espace requis
        </p>
      </div>
    </div>
  );
}
