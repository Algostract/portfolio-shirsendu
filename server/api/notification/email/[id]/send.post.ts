import { render } from '@vue-email/render'
import emailTemplate from '~~/server/emails'
import type { EmailTemplateData } from '~~/server/emails'

interface TransactionalEmail<T extends keyof EmailTemplateData> {
  template: T
  data: EmailTemplateData[T]
}

export async function sendEmail<T extends keyof EmailTemplateData>(template: T, payload: EmailTemplateData[T][]) {
  const module = emailTemplate[template] as {
    data(arg: EmailTemplateData[T]): Promise<{
      [key: string]: string
    }>
  }

  let isSuccessful = true
  await Promise.allSettled(
    payload.map(async (item) => {
      try {
        const finalData = await module.data(item)

        const html = await render(emailTemplate[template].template, finalData)
        const text = await render(emailTemplate[template].template, finalData, { plainText: true })

        const { transport } = useNodeMailer()

        await transport.verify()

        await transport.sendMail({
          from: `"${finalData.fromCompanyName}" <${finalData.fromEmail}>`,
          to: finalData.toEmail,
          subject: finalData.emailSubject,
          html,
          text,
        })
      } catch (error) {
        console.error('function sendEmail', error)
        isSuccessful = false
      }
    })
  )

  return isSuccessful
}

export default defineEventHandler<Promise<{ success: boolean }>>(async (event) => {
  try {
    // const { id } = getRouterParams(event)
    const body = await readBody<TransactionalEmail<keyof EmailTemplateData>>(event)
    await sendEmail(body.template, [body.data])

    return { success: true }
  } catch (error: unknown) {
    const { code: errorCode } = error as { code?: string }
    if (errorCode === 'ESOCKET' || errorCode === 'ECONNECTION') {
      throw createError({ statusCode: 500, statusMessage: 'Failed to establish secure SMTP connection. Please check SSL/TLS settings.' })
    }

    console.error('API notification/email/[id]/send POST', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
