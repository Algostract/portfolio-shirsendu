import type { Experience } from '~/utils/types'

const experiences = readYamlFile<Experience>('experiences.yml')

export default defineEventHandler<Experience[]>(() => {
  try {
    return experiences
  } catch (error: any) {
    console.error('API experience GET', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
