import { z } from 'zod'
import type { H3Event, EventHandler } from 'h3'

export function getFile(folder: string): EventHandler {
  return async (event: H3Event) => {
    const { name: encodedName } = await getValidatedRouterParams(
      event,
      z.object({
        name: z.string().min(1),
      }).parse
    )
    const name = decodeURIComponent(encodedName)
    const file = await useStorage('fs').getItemRaw(`${folder}/${name}`)

    if (!file) throw createError({ statusCode: 404, statusMessage: `${folder}/${name} not found` })

    setResponseHeaders(event, {
      'Content-Type': 'application/pdf',
      'Cache-Control': 'public, max-age=31552767',
      'X-Robots-Tag': 'index, follow',
    })

    return file
  }
}

export default defineEventHandler(getFile('certificates'))
