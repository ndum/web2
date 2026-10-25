// The service worker of the catalog. It keeps the app shell in a cache, answers files of the app
// from the cache and pages from the network, and falls back to the cache when the network is gone.
// Paths are relative to this file, so the app also works below a base path.

// Every app of the same origin shares the caches, the prefix marks the ones of this app
const PREFIX = 'catalog-'
const CACHE = `${PREFIX}v1`
const SHELL = ['./', './index.html', './manifest.webmanifest']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)))
})

// A new version removes the old caches of this app and leaves those of other apps alone
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith(PREFIX) && key !== CACHE).map((key) => caches.delete(key)))),
  )
})

// Network first, the last copy from the cache when offline
async function networkFirst(request, fallback = request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(CACHE)
      await cache.put(request, response.clone())
    }
    return response
  } catch {
    return (await caches.match(fallback)) ?? Response.error()
  }
}

// Cache first, the network only for files that are not stored yet
async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached !== undefined) return cached
  const response = await fetch(request)
  if (response.ok) {
    const cache = await caches.open(CACHE)
    await cache.put(request, response.clone())
  }
  return response
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return

  // Every address of the SPA is answered by index.html, offline from the cache
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, './index.html'))
  } else if (new URL(request.url).pathname.includes('/api/')) {
    event.respondWith(networkFirst(request))
  } else {
    event.respondWith(cacheFirst(request))
  }
})
