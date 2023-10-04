import fs from "fs";
import path from "path";
import yaml from "yaml";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()

  try {
    const filePath = path.join(process.cwd(), config.private.rootDir, 'hackathons.yml')
    const fileContents = fs.readFileSync(filePath, "utf8");
    const hackathons: {
      name: string;
      url: string;
      project: string;
      title: string | null;
      startedAt: string;
    }[] = yaml.parse(fileContents);

    return hackathons
  } catch (error: any) {
    console.error("API hackathon GET", error)

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})