import type { Metadata } from "next";
import "../globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Admin Panel - Electro Bikes",
  description: "Panel d'administration pour Electro Bikes",
  manifest: "/manifest-admin.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Electro Bikes Admin",
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