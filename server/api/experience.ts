import type { Experience } from '~/utils/types'

export default defineCachedEventHandler<Experience[]>(
  () => {
    try {
      const experiences = readYamlFile<Experience>('experiences.yml')

      return experiences
    } catch (error: any) {
      console.error('API experience GET', error)

      throw createError({
        statusCode: 500,
        statusMessage: 'Some Unknown Error Found',
      })
    }
  },
  { maxAge: 60 * 60 }
)
