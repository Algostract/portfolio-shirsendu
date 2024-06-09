import fs from 'node:fs'
import path from 'node:path'
import { parseYAML } from 'confbox'

export interface Hackathon {
  name: string
  url: string
  project: string
  title: string
  startedAt: string
}

const config = useRuntimeConfig()

const filePath = path.join(process.cwd(), config.private.rootDir, 'hackathons.yml')
const fileContents = fs.readFileSync(filePath, 'utf8')
const hackathons = parseYAML<Hackathon[]>(fileContents)

export default defineEventHandler<Hackathon[]>(() => {
  try {
    return hackathons
  } catch (error: any) {
    console.error('API hackathon GET', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
