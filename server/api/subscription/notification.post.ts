import { z } from 'zod'

const notificationSubscriptionSchema = z.object({
  endpoint: z.string(),
  expirationTime: z.null(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
})

export type NotificationSubscription = z.infer<typeof notificationSubscriptionSchema>

export default defineEventHandler(async (event) => {
  try {
    const notificationStorage = useStorage<NotificationSubscription>('data:subscription:notification')
    const body = await readValidatedBody(event, notificationSubscriptionSchema.parse)

    if (await notificationStorage.getItem(body.keys.auth)) {
      return { success: true }
    }

    await notificationStorage.setItem(body.keys.auth, body)

    return { success: true }
  } catch (error: unknown) {
    console.error('API subscription/notification POST', error)

    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
