import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'
import { onNotificationClick, onPush } from './sw-push'

declare let self: ServiceWorkerGlobalScope & { __WB_MANIFEST: unknown[] }

const entries = self.__WB_MANIFEST

// During development, also cache “/” so you can test offline:
if (import.meta.env.DEV) {
  entries.push({ url: '/', revision: Math.random().toString() })
}

// 1) Precache all injected files (including index.html)
precacheAndRoute(entries)

// 2) Clean up old caches
cleanupOutdatedCaches()

// 3) For navigation requests, always serve the cached SPA shell:
// 1) HTML navigations
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'html-cache',
    networkTimeoutSeconds: 3,
  })
)

// 2) JSON API
registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [],
  })
)

// 3) Static assets
registerRoute(
  ({ request }) => ['style', 'script', 'image', 'font'].includes(request.destination),
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [],
  })
)

// 4) Register event listeners
self.addEventListener('push', onPush)
self.addEventListener('notificationclick', onNotificationClick)
