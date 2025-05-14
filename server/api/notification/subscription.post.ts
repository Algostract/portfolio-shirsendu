interface PushSubscription {
  endpoint: string
  expirationTime: null
  keys: {
    p256dh: string
    auth: string
  }
}

export default defineEventHandler(async (event) => {
  try {
    const notificationStorage = useStorage('data:notification:subscription')

    const body = await readBody<PushSubscription>(event)

    if (await notificationStorage.getItem(body.keys.auth)) {
      return { success: true }
    }

    await notificationStorage.setItem(body.keys.auth, body)

    return { success: true }
  } catch (error: unknown) {
    console.error('API notification/subscription POST', error)

    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
