import nodemailer from 'nodemailer'
import { render } from '@vue-email/render'
// import { UserTemplate, AdminTemplate } from "~/emails";
import UserTemplate from '~/emails/UserTemplate.vue'
import AdminTemplate from '~/emails/AdminTemplate.vue'

interface TransactionalEmail {
  name: string
  email: string
  message: string
}

const config = useRuntimeConfig()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.private.emailUsername,
    pass: config.private.emailPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

export default defineEventHandler<Promise<{ user: boolean; admin: boolean }>>(async (event) => {
  try {
    const body = await readBody<TransactionalEmail>(event)
    const [firstName, ...restName] = body.name.split(' ')
    const lastName = restName.join('')
    const config = useRuntimeConfig()

    // Mail Send to User
    const userTemplate = await render(UserTemplate, {
      firstName,
      lastName,
    })

    await transporter.sendMail({
      from: `"Shirsendu Bairagi" <${config.private.emailUsername}>`,
      to: body.email,
      subject: 'Shirsendu Got your Email',
      html: userTemplate,
    })

    // Mail Send to Admin
    const adminTemplate = await render(AdminTemplate, {
      ...body,
    })

    await transporter.sendMail({
      from: `"${body.name}" <${body.email}>`,
      to: config.private.gmail,
      subject: `Devfolio Mail from ${body.name}`,
      html: adminTemplate,
    })

    return { user: true, admin: true }
  } catch (error: any) {
    console.error('API contact POST', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
