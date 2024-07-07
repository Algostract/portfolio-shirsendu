import type { Hackathon } from '~/utils/types'

const hackathons = readYamlFile<Hackathon>('hackathons.yml')

export default defineEventHandler<Hackathon[]>(() => {
  try {
    return hackathons
  } catch (error: any) {
    console.error('API hackathon GET', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
