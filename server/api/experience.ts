import fs from 'node:fs'
import path from 'node:path'
import { parseYAML } from 'confbox'

export interface Experience {
  company: string
  date: string
}

const config = useRuntimeConfig()

const filePath = path.join(process.cwd(), config.private.rootDir, 'experiences.yml')
const fileContents = fs.readFileSync(filePath, 'utf8')
const experiences = parseYAML<Experience[]>(fileContents)

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
