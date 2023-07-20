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

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<TransactionalEmail>(event)

    // Mail to the user
    await transporter.sendMail({
      from: `"Shirsendu Bairagi" <${config.private.emailUsername}>`,
      to: body.email,
      subject: "Shirsendu Got your Email",
      html: `Hi, I am Eluna, Shirsendu's AI Assistant,<br/><br/> 
      I am informing you that your mail has reached to him,<br/>
      I will notify him as soon as soon as he become online.<br/><br/>
      Thank you for being patient,<br/>Have a good day`,
    });

    // Mail send to me
    await transporter.sendMail({
      from: `"${body.name}" <${body.email}>`,
      to: config.private.gmail,
      subject: `Dev Portfolio Mail from ${body.name}`,
      html: `${body.message}, <br/><br/> Contact Me at ${body.email}`,
    });

  } catch (error: any) {
    console.error("API contact POST", error)

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})
