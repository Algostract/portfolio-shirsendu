export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event)
    const emailStorage = useStorage<EmailSubscription>('data:subscription:email')

    const result = await emailStorage.removeItem(id)

    return { success: result }
  } catch (error: unknown) {
    console.error('API notification/email/[id]/unsubscribe DELETE', error)

    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
