import readYamlFile from '~~/server/utils/read-yaml-file'

export default defineCachedEventHandler<Promise<Hackathon[]>>(
  async () => {
    try {
      const hackathons = await readYamlFile<Hackathon>('hackathons.yml')

      if (!hackathons) throw createError({ statusCode: 500, statusMessage: 'hackathons is undefined' })

      return hackathons.toSorted((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    } catch (error: unknown) {
      console.error('API hackathon GET', error)

      throw createError({
        statusCode: 500,
        statusMessage: 'Some Unknown Error Found',
      })
    }
  },
  { maxAge: 60 * 60 }
)
