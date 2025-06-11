import { z } from 'zod'
import webpush from 'web-push'
import type { NotificationSubscription } from '../notification.post'

const pushNotificationSchema = z.object({
  title: z.string(),
  body: z.string(),
  url: z.string(),
  icon: z.string().optional(),
})

export type PushNotification = z.infer<typeof pushNotificationSchema>

export async function sendPushNotification(payload: PushNotification, subscriptions: NotificationSubscription[]) {
  try {
    const config = useRuntimeConfig()

    webpush.setVapidDetails(config.private.vapidSubject, config.public.vapidKey, config.private.vapidKey)

    await Promise.allSettled(subscriptions.map((sub) => webpush.sendNotification(sub, JSON.stringify(payload))))

    return true
  } catch (error) {
    console.error('function sendPushNotification', error)
    return false
  }
}

export default defineEventHandler(async (event) => {
  try {
    const notificationStorage = useStorage<NotificationSubscription>('data:subscription:notification')
    const body = await readValidatedBody(event, pushNotificationSchema.parse)

    const subscriptions = (await notificationStorage.getItems(await notificationStorage.getKeys())).flatMap(({ value }) => value)
    await sendPushNotification(body, subscriptions)

    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    console.error('API subscription/[id]/notification POST', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
