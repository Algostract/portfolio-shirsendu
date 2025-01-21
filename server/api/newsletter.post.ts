import { Client as NotionClient } from '@notionhq/client'

let notion: NotionClient | null

export default defineEventHandler<Promise<{ subscribed: boolean }>>(async (event) => {
  try {
    const config = useRuntimeConfig()

    const body = await readBody<Newsletter>(event)

    notion =
      notion ??
      new NotionClient({
        auth: config.private.notionKey,
      })

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
  } catch (error: unknown) {
    console.error('API newsletter POST', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
