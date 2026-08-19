import type { Metadata } from "next";
import "../globals.css";
import Script from "next/script";
import AdminPWAInstallPrompt from "@/components/AdminPWAInstallPrompt";

export const metadata: Metadata = {
  title: "Admin Panel - Electro Bikes",
  description: "Panel d'administration pour Electro Bikes",
  manifest: "/manifest-admin.json",
  icons: {
    icon: [
      { url: "/icons/admin/icon-72x72.svg", sizes: "72x72", type: "image/svg+xml" },
      { url: "/icons/admin/icon-96x96.svg", sizes: "96x96", type: "image/svg+xml" },
      { url: "/icons/admin/icon-128x128.svg", sizes: "128x128", type: "image/svg+xml" },
      { url: "/icons/admin/icon-144x144.svg", sizes: "144x144", type: "image/svg+xml" },
      { url: "/icons/admin/icon-152x152.svg", sizes: "152x152", type: "image/svg+xml" },
      { url: "/icons/admin/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icons/admin/icon-384x384.svg", sizes: "384x384", type: "image/svg+xml" },
      { url: "/icons/admin/icon-512x512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icons/admin/icon-152x152.svg", sizes: "152x152", type: "image/svg+xml" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Electro Bikes Admin",
  },
  mobileWebApp: {
    capable: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <AdminPWAInstallPrompt />
        <Script
          id="register-admin-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw-admin.js').then(function(registration) {
                    console.log('Admin Service Worker registered with scope:', registration.scope);
                  }, function(err) {
                    console.log('Admin Service Worker registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}