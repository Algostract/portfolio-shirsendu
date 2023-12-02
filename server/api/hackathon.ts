import fs from "node:fs";
import path from "node:path";
import yaml from "yaml";

export interface Hackathon {
  name: string;
  url: string;
  project: string;
  title: string | null;
  startedAt: string;
}

export default defineEventHandler<Hackathon[]>((event) => {
  const config = useRuntimeConfig()

  try {
    const filePath = path.join(process.cwd(), config.private.rootDir, 'hackathons.yml')
    const fileContents = fs.readFileSync(filePath, "utf8");
    const hackathons: Hackathon[] = yaml.parse(fileContents);

    return hackathons
  } catch (error: any) {
    console.error("API hackathon GET", error)

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})