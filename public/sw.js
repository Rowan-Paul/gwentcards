const CACHE_NAME = "gwentcards-v1"
const STATIC_CACHE_NAME = "gwentcards-static-v1"
const DYNAMIC_CACHE_NAME = "gwentcards-dynamic-v1"

// Assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/icon.png",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/apple-touch-icon.png",
  "/blood-and-wine.png",
  "/hearts-of-stone.png",
  "/open.svg",
]

// Card data files to cache
const CARD_DATA_FILES = [
  "/monsters.json",
  "/neutral.json",
  "/nilfgaard.json",
  "/northern-realms.json",
  "/scoiatael.json",
  "/skellige.json",
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...")
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log("Caching static assets...")
        return cache.addAll(STATIC_ASSETS)
      }),
      caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
        console.log("Caching card data...")
        return cache.addAll(CARD_DATA_FILES)
      }),
    ]),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            console.log("Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle navigation requests
  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("/").then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        return fetch(request).catch(() => {
          return caches.match("/")
        })
      }),
    )
    return
  }

  // Handle API requests and static assets
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version and update in background
          fetch(request)
            .then((fetchResponse) => {
              if (fetchResponse.ok) {
                const responseClone = fetchResponse.clone()
                caches.open(getDynamicCacheName(request)).then((cache) => {
                  cache.put(request, responseClone)
                })
              }
            })
            .catch(() => {
              // Network failed, but we have cached version
            })
          return cachedResponse
        }

        // Not in cache, fetch from network
        return fetch(request)
          .then((fetchResponse) => {
            if (!fetchResponse.ok) {
              throw new Error("Network response was not ok")
            }

            const responseClone = fetchResponse.clone()
            caches.open(getDynamicCacheName(request)).then((cache) => {
              cache.put(request, responseClone)
            })

            return fetchResponse
          })
          .catch((error) => {
            console.log("Fetch failed:", error)
            // Return offline fallback if available
            if (request.destination === "image") {
              return caches.match("/icon-192x192.png")
            }
            throw error
          })
      }),
    )
  }
})

// Helper function to determine cache name
function getDynamicCacheName(request) {
  const url = new URL(request.url)
  if (url.pathname.endsWith(".json")) {
    return DYNAMIC_CACHE_NAME
  }
  return STATIC_CACHE_NAME
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Handle any background sync tasks here
      console.log("Background sync triggered"),
    )
  }
})

// Push notification handling
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: "/icon-192x192.png",
      badge: "/icon-96x96.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey || 1,
      },
      actions: [
        {
          action: "explore",
          title: "View Cards",
          icon: "/icon-96x96.png",
        },
        {
          action: "close",
          title: "Close",
          icon: "/icon-96x96.png",
        },
      ],
    }

    event.waitUntil(self.registration.showNotification(data.title || "GWENTcards", options))
  }
})

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"))
  } else if (event.action === "close") {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(clients.openWindow("/"))
  }
})
