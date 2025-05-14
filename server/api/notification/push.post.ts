import webpush from 'web-push'

interface PushNotification {
  title: string
  body: string
  url: string
  icon?: string
}

export async function pushNotification(payload: PushNotification, subscriptions: PushSubscription[]) {
  try {
    const config = useRuntimeConfig()

    webpush.setVapidDetails(config.private.vapidSubject, config.public.vapidKey, config.private.vapidKey)

    await Promise.allSettled(subscriptions.map((sub) => webpush.sendNotification(sub, JSON.stringify(payload))))

    return true
  } catch (error) {
    console.error('function pushNotification', error)
    return false
  }
}

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const authHeader = getRequestHeader(event, 'authorization')

    if (extractBearerToken(authHeader) !== config.private.serverValidationKey) {
      throw createError({
        statusCode: 400,
        statusMessage: "Server Validation Key does't match",
      })
    }

    const body = await readBody<PushNotification>(event)
    const notificationStorage = useStorage<PushSubscription>('data:notification:subscription')

    const subscriptions = (await notificationStorage.getItems(await notificationStorage.getKeys())).flatMap(({ value }) => value)
    await pushNotification(body, subscriptions)

    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    console.error('API notification/push GET', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
