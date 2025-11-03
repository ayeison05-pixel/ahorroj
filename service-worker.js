const CACHE_NAME = 'ahorroj-v1';
const urlsToCache = [
  '/ahorroj/',
  '/ahorroj/index.html',
  '/ahorroj/manifest.json',
  '/ahorroj/service-worker.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Solo cachéamos recursos estáticos; los datos (localStorage) ya son persistentes
  if (event.request.destination === 'document' || 
      event.request.destination === 'script' || 
      event.request.destination === 'style') {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  }
  // Para otros recursos (como imágenes futuras), pasan directo
});