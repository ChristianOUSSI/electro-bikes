const CACHE_NAME = 'electro-bikes-admin-v1';
const urlsToCache = [
  '/admin/login',
  '/admin/dashboard',
  '/admin/visitors',
  '/admin/products',
  '/admin/orders',
  '/admin/chat',
  '/admin/payments',
  '/admin/analytics',
  '/admin/settings',
  '/manifest-admin.json',
  '/icons/admin/icon-192x192.png',
  '/icons/admin/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});