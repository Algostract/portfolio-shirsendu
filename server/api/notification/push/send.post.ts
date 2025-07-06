import type { NotificationSubscription } from './subscribe.post'
import { sendPushNotification } from './[id]/send.post'

interface PushNotification {
  title: string
  body: string
  url: string
  icon?: string
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<PushNotification>(event)
    const notificationStorage = useStorage<NotificationSubscription>('data:subscription:notification')

    const subscriptions = (await notificationStorage.getItems(await notificationStorage.getKeys())).flatMap(({ value }) => value)
    await sendPushNotification(body, subscriptions)

    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    console.error('API notification/push/send POST', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
