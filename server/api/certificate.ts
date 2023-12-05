import fs from "node:fs";
import path from "node:path";
import yaml from "yaml";

export interface Certificate {
  name: string
  link: string
  date: string
}

export default defineEventHandler<Certificate[]>(() => {
  const config = useRuntimeConfig()

  try {
    const filePath = path.join(process.cwd(), config.private.rootDir, 'certificates.yml')
    const fileContents = fs.readFileSync(filePath, "utf8");
    const certificates: Certificate[] = yaml.parse(fileContents);

    return certificates
  } catch (error: any) {
    console.error("API certificate GET", error)

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})