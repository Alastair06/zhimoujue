// 《吞食三国传》100% 离线 PWA 缓存引擎 (Service Worker)
const CACHE_NAME = 'tunshi-sanguo-v1.0.0';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/main.js',
  './js/game-engine.js',
  './js/story.js',
  './js/generals-data.js',
  './js/campaigns-data.js',
  './js/synergy.js',
  './js/hero-ultimates.js',
  './js/equipment.js',
  './js/gacha.js',
  './js/audio.js',
  './js/character-renderer.js',
  './assets/ui/pwa-icon-192.png',
  './assets/ui/pwa-icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] 预缓存核心演义战阵资源...');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[ServiceWorker] 清理陈旧战报缓存:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  
  // 只拦截同源 GET 请求
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        // 缓存命中直接返回，并在后台静默更新
        fetch(req).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, networkResponse));
          }
        }).catch(() => {
          // 离线无网时静默忽略
        });
        return cachedResponse;
      }

      // 未命中缓存，发起网络请求并动态存入缓存
      return fetch(req).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // 纯离线时如果是导航页面则回退到 index.html
        if (req.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
