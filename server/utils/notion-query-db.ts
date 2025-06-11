import type { Client } from '@notionhq/client'

export default async function <T>(notion: Client, dbId: string) {
  const content: T[] = []
  let cursor = undefined

  do {
    const response = await notion.databases.query({
      database_id: dbId,
      page_size: 100,
      start_cursor: cursor,
    })

    content.push(...(response.results as unknown as T[]))
    cursor = response.has_more ? response.next_cursor : undefined
  } while (cursor)

  return content
}
