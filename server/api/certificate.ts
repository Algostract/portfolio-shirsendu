import type { Certificate } from '~/utils/types'

export default defineCachedEventHandler<Promise<Certificate[]>>(
  async () => {
    try {
      const certificates = await readYamlFile<Certificate>('certificates.yml')

      if (!certificates) throw createError({ statusCode: 500, statusMessage: 'certificates is undefined' })

      return certificates
    } catch (error: any) {
      console.error('API certificate GET', error)

      throw createError({
        statusCode: 500,
        statusMessage: 'Some Unknown Error Found',
      })
    }
  },
  { maxAge: 60 * 60 }
)
