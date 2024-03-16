import fs from "node:fs";
import path from "node:path";
import yaml from "yaml";

import { ofetch } from "ofetch";
import { Project, Technologies } from "~~/utils/models"

const config = useRuntimeConfig()

const filePath = path.join(process.cwd(), config.private.rootDir, 'projects.yml')
const fileContents = fs.readFileSync(filePath, "utf8");
const projects: {
  name: string;
  repo: string;
  technologies: {
    languages: string[];
    frameworks: string[];
  };
  createdAt: string;
  appURL: string | null;
  videoURL: string | null;
}[] = yaml.parse(fileContents);

export default defineEventHandler<Promise<Project[]>>(async (_event) => {
  try {
    const repos = (await Promise.all(projects.map(async ({ name, repo, createdAt, technologies, appURL, videoURL }): Promise<Project | null> => {
      if (repo == null)
        return null

      let info: any;

      try {
        const { repo: details } = await ofetch(`/repos/${repo}`, { baseURL: "https://ungh.cc" })
        info = { ...info, details }

        const { release } = await ofetch(`/repos/${repo}/releases/latest`, { baseURL: "https://ungh.cc" })
        info = { ...info, release }
      }
      catch (error) {
      }
      const { details, release } = info
      const { frameworks, languages } = technologies

      return {
        name,
        repo,
        description: details.description,
        version: release?.tag ?? 'v0.0.0',
        stars: details.stars,
        forks: details.forks,
        createdAt,
        updatedAt: release?.updatedAt ?? details.pushedAt,
        technologies: [...frameworks, ...languages] as Technologies[],
        repoURL: `https://github.com/${repo}`,
        appURL,
        videoURL,
      }
    }))).filter((value): value is Project => value !== null);

    return repos
  } catch (error: any) {
    console.error("API project GET", error)

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})
