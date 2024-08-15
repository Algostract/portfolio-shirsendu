import { parseYAML } from 'confbox'

export default async function <T>(filename: string) {
  console.log('Reading File', filename)

  const fileContents = await useStorage('assets:static').getItem(`data/${filename}`)
  const parsedContent = fileContents ? parseYAML<T[]>(fileContents.toString()) : undefined

  return parsedContent
}
