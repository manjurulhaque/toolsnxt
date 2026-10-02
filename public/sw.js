/**
 * ToolsNxt Offline Service Worker
 * 100% In-Browser PWA Offline Engine
 */

const CACHE_VERSION = 'v1.0.1';
const STATIC_CACHE = `webtools-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `webtools-runtime-${CACHE_VERSION}`;

// Core static assets and documents precached on install
const PRECACHE_CORE = [
  '/',
  '/offline',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/icon.svg',
  '/apple-icon.png',
  '/pdf.worker.min.mjs',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png',
  '/icons/icon.svg',
  '/about',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/cookies',
  '/contact'
];

// All 52 In-Browser Tools Precached for 100% Offline Access
const PRECACHE_TOOLS = [
  '/image-to-pdf',
  '/pdf-merge',
  '/pdf-split',
  '/pdf-compress',
  '/pdf-to-images',
  '/image-converter',
  '/image-resizer',
  '/image-to-favicon',
  '/image-to-ascii-art',
  '/qr-code-generator',
  '/barcode-generator',
  '/gradient-generator',
  '/color-converter',
  '/svg-optimizer',
  '/password-generator',
  '/hash-generator',
  '/json-formatter',
  '/yaml-json-converter',
  '/html-css-js-minifier',
  '/csv-to-json',
  '/regex-tester',
  '/url-encoder-decoder',
  '/base64-encoder-decoder',
  '/jwt-decoder',
  '/uuid-generator',
  '/json-to-typescript',
  '/cron-expression-builder',
  '/markdown-previewer',
  '/text-diff-checker',
  '/lorem-ipsum-generator',
  '/word-character-counter',
  '/typing-speed-test',
  '/scientific-calculator',
  '/percentage-calculator',
  '/loan-calculator',
  '/unit-converter',
  '/timezone-converter',
  '/age-calculator',
  '/bmi-calculator',
  '/body-weight-calculator',
  '/creatinine-clearance-calculator',
  '/case-converter',
  '/html-to-markdown',
  '/xml-sitemap-generator',
  '/meta-tag-generator',
  '/robots-txt-generator',
  '/screen-reader-simulator',
  '/countdown-timer',
  '/stopwatch',
  '/interval-timer',
  '/sleep-time-calculator',
  '/pomodoro-timer'
];

const ALL_PRECACHE_URLS = [...PRECACHE_CORE, ...PRECACHE_TOOLS];

// Installation: Precache core shell and tools
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      // Use Promise.allSettled so an individual asset failure doesn't abort SW installation
      const results = await Promise.allSettled(
        ALL_PRECACHE_URLS.map((url) =>
          fetch(url, { cache: 'reload' })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url} - Status ${response.status}`);
              }
              return cache.put(url, response);
            })
            .catch((err) => {
              // Silently ignore during build/dev environments if a specific url is slow
              console.warn('[PWA SW] Precache skipped for:', url, err.message);
            })
        )
      );
      return results;
    }).then(() => self.skipWaiting())
  );
});

// Activation: Clean up stale caches and claim clients immediately
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !currentCaches.includes(name))
          .map((name) => {
            console.log('[PWA SW] Removing outdated cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper: Check if request is an external analytics/telemetry call
function isAnalyticsOrTelemetry(url) {
  return (
    url.hostname.includes('vercel') ||
    url.pathname.includes('/_vercel/') ||
    url.hostname.includes('google-analytics') ||
    url.hostname.includes('googletagmanager') ||
    url.hostname.includes('analytics')
  );
}

// Fetch handler with tailored caching strategies
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // 1. Only handle GET requests with HTTP/HTTPS
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // 2. Bypass service worker completely on local development hosts (localhost / 127.0.0.1)
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    return;
  }

  // 3. Bypass telemetry / analytics when offline or online
  if (isAnalyticsOrTelemetry(url)) {
    event.respondWith(
      fetch(request).catch(() => new Response('', { status: 204, statusText: 'Offline No-Op' }))
    );
    return;
  }

  // 4. Navigation Requests (HTML Documents: user visiting a page)
  // Strategy: Network-First with Timeout -> Fallback to Cache -> Fallback to /offline
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Attempt network fetch with a 2.5 second timeout to prevent slow offline hangs
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2500);

          const networkResponse = await fetch(request, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (networkResponse && networkResponse.ok) {
            // Update runtime cache with the latest copy
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
            return networkResponse;
          }
        } catch {
          // Network failed, timed out, or user is offline
        }

        // Try exact URL in cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // Try matching pathname without search params or trailing slash
        const normalizedPath = url.pathname.replace(/\/$/, '') || '/';
        const normalizedMatch = await caches.match(normalizedPath);
        if (normalizedMatch) {
          return normalizedMatch;
        }

        // Fallback to offline page or home directory
        const offlineFallback = await caches.match('/offline');
        if (offlineFallback) {
          return offlineFallback;
        }

        const homeFallback = await caches.match('/');
        if (homeFallback) {
          return homeFallback;
        }

        return new Response(
          '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Offline</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h1>You are offline</h1><p>Please check your connection and reload.</p></body></html>',
          { headers: { 'Content-Type': 'text/html' }, status: 503 }
        );
      })()
    );
    return;
  }

  // 4. Static Next.js Bundles, Fonts, Web Workers, CSS, and Images
  // Strategy: Cache-First with Background Stale-While-Revalidate
  const isStaticAsset =
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/fonts/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.mjs') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.woff2');

  if (isStaticAsset) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) {
          return cached;
        }

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          return cached || new Response('Asset unavailable offline', { status: 408 });
        }
      })()
    );
    return;
  }

  // 5. Default Runtime Requests (Next.js Data / JSON / RSC)
  // Strategy: Network-First with Cache Fallback
  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        }
      } catch {
        // Fall back to cache
      }

      const cached = await caches.match(request);
      if (cached) {
        return cached;
      }

      return new Response(JSON.stringify({ error: 'Offline', offline: true }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      });
    })()
  );
});

// Handle messages from the client (e.g. skipWaiting)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
