import { Client as NotionClient } from '@notionhq/client'

const config = useRuntimeConfig()
const notion = new NotionClient({
  auth: config.private.notionKey,
})

export default defineEventHandler<Promise<{ subscribed: boolean }>>(async (event) => {
  try {
    const body = await readBody<Newsletter>(event)

    await notion.pages.create({
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

    return { subscribed: true }
  } catch (error: any) {
    console.error('API newsletter POST', error)

    if (error.statusMessage) throw error

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
