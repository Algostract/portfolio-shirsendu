import { consola } from 'consola'

export const messageTemplates = {
  greet: `I am Shirsendu, How can I help you?
  \nwebsite: https://shirsendu-bairagi.dev`,
}

export default defineNitroPlugin(async () => {
  // eslint-disable-next-line no-constant-condition
  if (!(import.meta.env.NODE_ENV === 'production' && import.meta.env.PLATFORM_ENV !== 'native' && false)) return

  consola.info('Whatsapp Bot Initializing...')
  whatsapp.on('authenticated', () => {
    consola.success('Session restored successfully.')
  })
  whatsapp.on('auth_failure', (msg) => {
    consola.warn('Authentication failed:', msg)
  })
  whatsapp.on('disconnected', (reason) => {
    consola.warn('Client disconnected:', reason)
  })
  whatsapp.on('qr', (data) => consola.log(renderANSI(data, { border: 1 })))
  whatsapp.on('ready', () => consola.success('WhatsApp bot is live'))
  // Listening to all Incoming Admin Commends
  whatsapp.on('message', async (message) => {
    try {
      // consola.log('message.from', message.from)
      if (message.from !== '') return

      switch (message.body.toLowerCase().trim()) {
        case 'health':
          await message.reply('Status OK')
          break

        default:
          break
      }
    } catch (error) {
      consola.warn('Error in message', error)
    }
  })
  // Listening to all Outgoing Commends
  whatsapp.on('message_create', async (message) => {
    // consola.log('message.to', message.to)
    try {
      switch (message.body.toLowerCase().trim()) {
        case 'hi':
        case 'hey':
        case 'hello':
          await whatsapp.sendMessage(message.to, messageTemplates.greet)
          break
        default:
          break
      }
    } catch (error) {
      consola.warn('Error in message_create', error)
    }
  })
  await whatsapp.initialize()
  consola.info('WhatsApp bot setup completed...')
})
