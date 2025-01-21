import { parseYAML } from 'confbox'

export default async function <T>(filename: string) {
  console.log('Reading File', filename)
  const storage = useStorage('fs')

  const fileContents = await storage.getItem(`data/${filename}`)
  const parsedContent = fileContents ? parseYAML<T[]>(fileContents.toString()) : undefined

  // console.log({ parsedContent })

  return parsedContent
}
