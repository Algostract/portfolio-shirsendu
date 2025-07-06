export interface NotificationSubscription {
  endpoint: string
  expirationTime: null
  keys: {
    p256dh: string
    auth: string
  }
}

export default defineEventHandler(async (event) => {
  try {
    const notificationStorage = useStorage<NotificationSubscription>('data:subscription:notification')

    const body = await readBody<NotificationSubscription>(event)

    if (await notificationStorage.getItem(body.keys.auth)) {
      return { success: true }
    }

    await notificationStorage.setItem(body.keys.auth, body)

    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    console.error('API notification/push/subscribe POST', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
