import { render } from '@vue-email/render'
import emailTemplate from '~~/server/emails'

export default defineEventHandler<Promise<{ success: boolean }>>(async (event) => {
  try {
    const config = useRuntimeConfig()

    const body = await readBody<TransactionalEmail>(event)
    const [firstName, ...restName] = body.name.split(' ')
    const lastName = restName.join('')

    const { transport } = useNodeMailer()

    await transport.verify()

    // Mail Send to User
    await transport.sendMail({
      from: `"Shirsendu Bairagi" <${config.private.dmail}>`,
      to: body.email,
      subject: 'Shirsendu Got your Email',
      html: await render(emailTemplate.contact.template, {
        firstName,
        lastName,
      }),
    })

    return { success: true }
  } catch (error: unknown) {
    console.error('API contact POST', error)

    const { code: errorCode } = error as { code?: string }
    if (errorCode === 'ESOCKET' || errorCode === 'ECONNECTION') {
      throw createError({ statusCode: 500, statusMessage: 'Failed to establish secure SMTP connection. Please check SSL/TLS settings.' })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
