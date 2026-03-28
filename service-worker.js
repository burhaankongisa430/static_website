// service-worker.js
const CACHE_NAME = "hyperiondev-cart-cache-v1";

// Cache images + (optional) other static assets.
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./AshwagandhaCapsules.webp",
  "./SleepyCaps.webp",
  "./TongatAli.png",
  "./WhiteKratomCapsules.webp",
  "./usn-creatine-3-in-1.webp",
  "./usn-hydrotech-whey.webp",
  "./usn-pure-collagen.webp",
  "./usn-vo2-max.webp",
  "./usn-winners-energy.webp",
  "./usn-cramp-block.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  // Cache-first for same-origin assets
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});