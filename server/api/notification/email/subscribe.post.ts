export default defineEventHandler(async (event) => {
  try {
    const emailStorage = useStorage<EmailSubscription>('data:subscription:email')

    const body = await readBody<EmailSubscription>(event)

    if (await emailStorage.getItem(body.email)) {
      return { success: true }
    }

    await emailStorage.setItem(body.email, body)

    return { success: true }
  } catch (error: unknown) {
    console.error('API notification/email/subscribe POST', error)

    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
