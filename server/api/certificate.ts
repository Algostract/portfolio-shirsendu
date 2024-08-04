import type { Certificate } from '~/utils/types'

export default defineCachedEventHandler<Certificate[]>(
  () => {
    try {
      const certificates = readYamlFile<Certificate>('certificates.yml')

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
