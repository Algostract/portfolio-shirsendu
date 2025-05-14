self.addEventListener('push', (event) => {
  if (!self.Notification || Notification.permission !== 'granted') return

  let payload = {}
  try {
    payload = event.data.json()
  } catch {
    payload = { title: 'New notification', body: 'You have a message.' }
  }

  const options = {
    body: payload.body,
    icon: payload.icon || '/pwa/icon-512.png',
    data: { url: payload.url || '/' },
  }

  event.waitUntil(self.registration.showNotification(payload.title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const target = event.notification.data.url
  event.waitUntil(clients.openWindow(target))
})
