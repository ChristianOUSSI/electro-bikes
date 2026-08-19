"use client";

import { useEffect, useState } from "react";
import { Download, X, Smartphone, Monitor } from "lucide-react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

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

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
      // Show prompt immediately when event fires
      setShowPrompt(true);
    };

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // For non-iOS devices, show prompt after 5 seconds if install prompt hasn't fired
    if (!isIOSDevice) {
      const timer = setTimeout(() => {
        if (!canInstall && !isInStandaloneMode) {
          setShowPrompt(true);
        }
      }, 5000);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    } else {
      // For iOS, show prompt after 5 seconds
      const timer = setTimeout(() => {
        if (!isInStandaloneMode) {
          setShowPrompt(true);
        }
      }, 5000);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    }
  }, [canInstall]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    } else if (!isIOS) {
      // If no deferred prompt, try to trigger install
      alert("L'installation n'est pas disponible actuellement. Assurez-vous que vous êtes sur un navigateur compatible (Chrome, Edge, Samsung Internet).");
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
                  : canInstall
                  ? "Installez l'application pour un accès rapide"
                  : "PWA disponible pour installation"}
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
            disabled={!canInstall}
            className={`w-full py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              canInstall
                ? "bg-gradient-to-r from-[#c8ff00] to-[#a0cc00] hover:from-[#a0cc00] hover:to-[#8bb800] text-black font-semibold shadow-[#c8ff00]/20 hover:shadow-[#c8ff00]/30"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Download className="w-4 h-4" />
            {canInstall ? "Installer maintenant" : "Installation non disponible"}
          </button>
        )}

        <p className="text-gray-500 text-xs text-center mt-3">
          Installation gratuite • Pas d'espace requis
        </p>
      </div>
    </div>
  );
}
