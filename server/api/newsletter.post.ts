import { Client } from '@notionhq/client'

interface Newsletter {
  email: string
  subscribed: boolean
}

const config = useRuntimeConfig()
const notion = new Client({
  auth: config.private.notionKey,
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<Newsletter>(event)

    const result = await notion.pages.create({
      parent: {
        database_id: config.private.notionDBId,
      },
      properties: {
        Email: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: body.email,
              },
            },
          ],
        },
        Subscribed: {
          checkbox: true,
        },
      },
    })

    return result
  } catch (error: any) {
    console.error('API newsletter POST', error)

    if (error.statusMessage) throw error

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
