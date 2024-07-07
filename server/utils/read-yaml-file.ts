import fs from 'node:fs'
import path from 'node:path'
import { parseYAML } from 'confbox'

const config = useRuntimeConfig()

export default function <T>(filename: string) {
  const filePath = path.join(process.cwd(), config.private.rootDir, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const parsedContent = parseYAML<T[]>(fileContents)

  return parsedContent
}
