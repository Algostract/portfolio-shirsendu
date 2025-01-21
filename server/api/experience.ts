import readYamlFile from '~~/server/utils/read-yaml-file'

export default defineCachedEventHandler<Promise<Experience[]>>(
  async () => {
    try {
      const experiences = await readYamlFile<Experience>('experiences.yml')

      if (!experiences) throw createError({ statusCode: 500, statusMessage: 'experiences is undefined' })

      return experiences
    } catch (error: unknown) {
      console.error('API experience GET', error)

      throw createError({
        statusCode: 500,
        statusMessage: 'Some Unknown Error Found',
      })
    }
  },
  { maxAge: 60 * 60 }
)
