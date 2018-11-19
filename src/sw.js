const cacheName = 'quotespwa'
const staticAssets = [
    '/icon.png',
    '/app.js',
    '/app.css',
    '/index.html'
]

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName)
    await cache.addAll(staticAssets)
    return self.skipWaiting()
})

self.addEventListener('activate', e => {
    self.clients.claim()
})

self.addEventListener('fetch', async e => {
    const req = e.request
    const url = new URL(req.url)
    if(url.origin === location.origin) {
        e.respondWith(cacheFirst(req))
    } else {
        e.respondWith(networkAndCache(req))
    }
})

async function cacheFirst(req) {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)
    return cached || fetch(req)
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName)
    try {
        const freshResponse = await fetch(req)
        await cache.put(req, freshResponse.clone())
        return freshResponse
    } catch (e) {
        const cached = await cache.match(req)
        return cached
    }
}
