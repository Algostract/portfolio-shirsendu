import type { Certificate } from '~/utils/types'

const certificates = readYamlFile<Certificate>('certificates.yml')

export default defineEventHandler<Certificate[]>(() => {
  try {
    return certificates
  } catch (error: any) {
    console.error('API certificate GET', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
