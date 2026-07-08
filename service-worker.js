const CACHE_NAME = 'diesel-command-v9';
const ASSETS = [
  './',
  './index.html',
  './command.html',
  './crew.html',
  './missions.html',
  './archive.html',
  './messages.html',
  './alerts.html',
  './map.html',
  './settings.html',
  './wallet.html',
  './offline.html',
  './css/style.css',
  './js/matrix.js',
  './js/state.js',
  './js/sound.js',
  './js/theme.js',
  './js/ui.js',
  './js/missions-data.js',
  './js/achievements-data.js',
  './js/firebase-config.js',
  './js/cloud-sync.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// ---- DIESEL CLOUD: background push notifications (Firebase Cloud Messaging) ----
// Runs in the same service worker so there's only ever one SW registration for this scope.
// If Firebase isn't configured yet (see js/firebase-config.js), this whole block quietly no-ops
// and the cache-only PWA behavior above is unaffected.
try {
  importScripts(
    'https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js',
    './js/firebase-config.js'
  );
  if (typeof DIESEL_FIREBASE_CONFIG !== 'undefined' &&
      DIESEL_FIREBASE_CONFIG.apiKey &&
      !DIESEL_FIREBASE_CONFIG.apiKey.startsWith('PASTE_')) {
    firebase.initializeApp(DIESEL_FIREBASE_CONFIG);
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage((payload) => {
      const title = (payload.notification && payload.notification.title) || 'DIESEL ALERT';
      const body = (payload.notification && payload.notification.body) || '';
      const url = (payload.fcmOptions && payload.fcmOptions.link) || './alerts.html';
      self.registration.showNotification(title, {
        body,
        icon: './icons/icon-192.png',
        badge: './icons/icon-192.png',
        data: { url }
      });
    });
  }
} catch (e) { /* offline install, or a browser without network access to gstatic — cache still works */ }

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || './alerts.html';
  event.waitUntil(clients.openWindow(url));
});

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => {
        if(event.request.mode === 'navigate') return caches.match('./offline.html');
        return cached;
      });
    })
  );
});
