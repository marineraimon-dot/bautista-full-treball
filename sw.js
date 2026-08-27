const CACHE = 'bautista-v2';
const STATIC = ['./manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // llistes.json: xarxa primer, i es desa sense la cadena ?v=... perquè
  // el cau el pugui retrobar quan el treballador es queda sense cobertura.
  if (url.pathname.endsWith('llistes.json')) {
    const clau = new Request(url.origin + url.pathname);
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .then(r => {
          if (r && r.ok) {
            const copia = r.clone();
            caches.open(CACHE).then(c => c.put(clau, copia));
          }
          return r;
        })
        .catch(() => caches.match(clau))
    );
    return;
  }

  // HTML sempre de la xarxa -> el mòbil carrega sempre la versió actual
  if (e.request.destination === 'document'
      || url.pathname.endsWith('.html')
      || url.pathname.endsWith('/')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  e.respondWith(caches.match(e.request).then(c => c || fetch(e.request)));
});
