import WAWebJS from 'whatsapp-web.js'

const whatsappClientSingleton = () => {
  const queryParams = new URLSearchParams({
    launch: JSON.stringify({ args: ['--user-data-dir=/usr/src/app/user-data-dir/whatsapp/session'] }),
  }).toString()

  return new WAWebJS.Client({
    authStrategy: new WAWebJS.LocalAuth({ dataPath: './.data/whatsapp' }),
    puppeteer:
      import.meta.env.NODE_ENV === 'production'
        ? {
            browserWSEndpoint: `${import.meta.env.BROWSER_ENDPOINT}?${queryParams}`,
            args: ['--no-sandbox', '--disable-dev-shm-usage'],
          }
        : {
            headless: true,
          },
  })
}

declare const globalThis: {
  whatsappGlobal: ReturnType<typeof whatsappClientSingleton>
} & typeof global

const whatsapp = globalThis.whatsappGlobal ?? whatsappClientSingleton()

export default whatsapp

if (import.meta.env.NODE_ENV !== 'production') globalThis.whatsappGlobal = whatsapp
