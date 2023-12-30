import { useCompiler } from '#vue-email'
import nodemailer from 'nodemailer';

interface TransactionalEmail {
  name: string;
  email: string;
  message: string;
}

const config = useRuntimeConfig()

const transporter = nodemailer.createTransport({
  // host: "sandbox.smtp.mailtrap.io",
  // port: 2525,
  service: 'gmail',
  auth: {
    user: config.private.emailUsername,
    pass: config.private.emailPassword
  },
  tls: {
    rejectUnauthorized: false
  }
});

export default defineEventHandler<{ user: boolean, admin: boolean }>(async (event) => {
  try {
    const body = await readBody<TransactionalEmail>(event)

    // Mail Send to User
    const userTemplate = await useCompiler('UserTemplate.vue', {
      props: {
        url: 'https://shirsendu-bairagi.dev'
      }
    })

    await transporter.sendMail({
      from: `"Shirsendu Bairagi" <${config.private.emailUsername}>`,
      to: body.email,
      subject: "Shirsendu Got your Email",
      html: userTemplate.html,
    });

    // Mail Send to Admin
    const adminTemplate = await useCompiler('AdminTemplate.vue', {
      props: { ...body }
    })

    await transporter.sendMail({
      from: `"${body.name}" <${body.email}>`,
      to: config.private.gmail,
      subject: `Devfolio Mail from ${body.name}`,
      html: adminTemplate.html,
    });

    return { user: true, admin: true }
  } catch (error: any) {
    console.error("API contact POST", error)

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})