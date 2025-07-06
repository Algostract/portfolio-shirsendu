export function onPush(event: PushEvent) {
  if (!self.Notification || Notification.permission !== 'granted') return

  let payload: { title: string; icon?: string; body: string; url?: string }
  try {
    payload = event.data!.json()
  } catch {
    payload = { title: 'New notification', body: 'You have a message.' }
  }

  const options = {
    body: payload.body,
    icon: payload.icon || '/pwa/icon-512.png',
    data: { url: payload.url || '/' },
  }

  event.waitUntil((self as unknown as ServiceWorkerGlobalScope).registration.showNotification(payload.title, options))
}

export function onNotificationClick(event: NotificationEvent) {
  event.notification.close()
  const target = event.notification.data.url
  event.waitUntil((self as unknown as ServiceWorkerGlobalScope).clients.openWindow(target))
}
