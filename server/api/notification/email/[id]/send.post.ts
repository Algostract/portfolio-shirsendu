import { render } from '@vue-email/render'
import type { Component } from 'vue'
import emailTemplate from '~~/server/emails'
import type { EmailMetaData, EmailTemplateData } from '~~/server/emails'

export async function sendEmail<T extends keyof EmailTemplateData>(template: T, payload: EmailTemplateData[T][]) {
  let isSuccessful = true
  const config = useRuntimeConfig()
  const metaData = config.private.emailMetaData as unknown as EmailMetaData

  await Promise.allSettled(
    payload.map(async (payloadData) => {
      try {
        const allData = { ...metaData, ...emailTemplate[template].data, ...payloadData }

        const html = await render(emailTemplate[template].template as Component, allData)
        const text = await render(emailTemplate[template].template as Component, allData, { plainText: true })

        const { transport } = useNodeMailer()

        await transport.verify()

        await transport.sendMail({
          from: `"${allData.fromCompanyName}" <${allData.fromEmail}>`,
          to: allData.toEmail,
          subject: allData.emailSubject,
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
    const config = useRuntimeConfig()
    const body = await readBody<TransactionalEmail<keyof EmailTemplateData>>(event)

    return {
      success: await sendEmail(body.template, [
        {
          toCompanyName: body.data.toCompanyName,
          toEmail: body.data.toEmail,
          ...(body.data.fromFeaturedProjects && {
            fromFeaturedProjects: await Promise.all(
              body.data.fromFeaturedProjects.map(async (key) => {
                try {
                  const data = await $fetch(`/api/project/${(key as unknown as string).toLowerCase()}`, {
                    baseURL: config.public.siteUrl,
                  })
                  if (Array.isArray(data)) throw new Error('Unexpected array response')
                  return { id: data.images[0].id, name: data.name, description: data.description, url: data.url }
                } catch {
                  return null
                }
              })
            ).then((photos) => photos.filter((photo) => photo !== null)),
          }),
        },
      ]),
    }
  } catch (error: unknown) {
    console.error('API notification/email/[id]/send POST', error)

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
