import type { Client } from '@notionhq/client'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

export default async function <T>(notion: Client, dbId: string, queryOptions?: Omit<QueryDatabaseParameters, 'database_id'>): Promise<T[]> {
  const content: T[] = []
  let cursor: string | undefined = undefined

  do {
    const response = await notion.databases.query({
      database_id: dbId,
      page_size: 100,
      start_cursor: cursor,
      ...queryOptions,
    })

    content.push(...(response.results as unknown as T[]))
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return content
}
