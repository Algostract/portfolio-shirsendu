import type { EmailTemplateData } from '~~/server/emails'
import { sendEmail } from './[id]/send.post'

export default defineEventHandler<Promise<{ success: boolean }>>(async (event) => {
  try {
    const body = await readBody<TransactionalEmail<keyof EmailTemplateData>>(event)

    return { success: await sendEmail(body.template, [body.data]) }
  } catch (error: unknown) {
    const { code: errorCode } = error as { code?: string }
    if (errorCode === 'ESOCKET' || errorCode === 'ECONNECTION') {
      throw createError({ statusCode: 500, statusMessage: 'Failed to establish secure SMTP connection. Please check SSL/TLS settings.' })
    }

    console.error('API notification/email/send POST', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
