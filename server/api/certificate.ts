import fs from 'node:fs'
import path from 'node:path'
import { parseYAML } from 'confbox'
import type { Certificate } from '~/utils/types'

const config = useRuntimeConfig()

const filePath = path.join(process.cwd(), config.private.rootDir, 'certificates.yml')
const fileContents = fs.readFileSync(filePath, 'utf8')
const certificates = parseYAML<Certificate[]>(fileContents)

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
