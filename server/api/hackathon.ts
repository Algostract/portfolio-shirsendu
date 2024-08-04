import type { Hackathon } from '~/utils/types'

export default defineCachedEventHandler<Hackathon[]>(
  () => {
    try {
      const hackathons = readYamlFile<Hackathon>('hackathons.yml')

      return hackathons
    } catch (error: any) {
      console.error('API hackathon GET', error)

      throw createError({
        statusCode: 500,
        statusMessage: 'Some Unknown Error Found',
      })
    }
  },
  { maxAge: 60 * 60 }
)
