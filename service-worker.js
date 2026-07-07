const CACHE_NAME = 'diesel-command-v7';
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
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

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
