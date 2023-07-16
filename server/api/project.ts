import fs from "fs";
import path from "path";
import yaml from "yaml";

import { ofetch } from "ofetch";
import { Project } from "~~/utils/models"

export default defineEventHandler<Project[]>(async (event) => {
  const config = useRuntimeConfig()

  try {
    const filePath = path.join(process.cwd(), config.private.rootDir, 'projects.yml')
    const fileContents = fs.readFileSync(filePath, "utf8");
    const projects: {
      name: string;
      repo: string;
      createdAt: string;
      appURL: string | null;
      videoURL: string | null;
    }[] = yaml.parse(fileContents);

    const repos = (await Promise.all(projects.map(async ({ name, repo, createdAt, appURL, videoURL }): Promise<Project | null> => {
      if (repo == null)
        return null

      try {
        const { repo: details } = await ofetch(`/repos/${repo}`, { baseURL: "https://ungh.cc" })

        return {
          name,
          repo,
          description: details.description,
          version: "0.0.0",
          stars: details.stars,
          forks: details.forks,
          createdAt,
          updatedAt: details.pushedAt,
          appURL,
          videoURL,
        }
      } catch (error) {
        return null
      }
    }))).filter((value): value is Project => value !== null);

    return repos
  } catch (error: any) {
    console.error("API project GET", error)

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})
