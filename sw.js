// Lutèce Studio — cache hors ligne
// Change VERSION à chaque mise en ligne pour forcer la mise à jour des fichiers.
const VERSION = "ls-10";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/manifest.json",
  "assets/backgrounds/jaune.jpg",
  "assets/backgrounds/vert.jpg",
  "assets/backgrounds/violet.jpg",
  "assets/elements/signature.png",
  "assets/elements/stelly-attention.png",
  "assets/elements/stelly-bras-croises.png",
  "assets/elements/stelly-coup-droit.png",
  "assets/elements/stelly-court.png",
  "assets/elements/stelly-mains-jointes.png",
  "assets/elements/stelly-revers.png",
  "assets/elements/stelly-sky.png",
  "fonts/archivo-black-latin-400-normal.woff2",
  "fonts/barlow-condensed-latin-600-normal.woff2",
  "fonts/barlow-condensed-latin-800-italic.woff2",
  "fonts/barlow-condensed-latin-800-normal.woff2",
  "fonts/bebas-neue-latin-400-normal.woff2",
  "fonts/inter-latin-500-normal.woff2",
  "fonts/inter-latin-600-normal.woff2",
  "fonts/inter-latin-700-normal.woff2",
  "fonts/inter-latin-800-normal.woff2",
  "fonts/permanent-marker-latin-400-normal.woff2",
  "fonts/sofia-pro-comp-black.woff2",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Page et bibliothèque : réseau d'abord (pour voir tout de suite les nouveautés), cache si hors ligne.
// Images et polices : cache d'abord.
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const fresh = req.mode === "navigate" || /\.(html|json|webmanifest)$/.test(new URL(req.url).pathname);
  if(fresh){
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
  } else {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(VERSION).then(c => c.put(req, cp)); return res; })));
  }
});
