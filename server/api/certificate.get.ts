import readYamlFile from '~~/server/utils/read-yaml-file'

export default defineCachedEventHandler<Promise<Certificate[]>>(
  async () => {
    try {
      const certificates = await readYamlFile<Certificate>('certificates.yml')

      if (!certificates) throw createError({ statusCode: 500, statusMessage: 'certificates is undefined' })

      return certificates.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (error: unknown) {
      console.error('API certificate GET', error)

      throw createError({
        statusCode: 500,
        statusMessage: 'Some Unknown Error Found',
      })
    }
  },
  { maxAge: 60 * 60 }
)
