import fs from "fs";
import path from "path";
import yaml from "yaml";

import { ofetch } from "ofetch";
import { Project } from "~~/utils/models"

export default defineEventHandler<Promise<Project[]>>(async (_event) => {
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

      let info: any;

      try {
        const [{ repo: details }] = await Promise.all([
          ofetch(`/repos/${repo}`, { baseURL: "https://ungh.cc" }),
        ]);

        info = { ...info, details }
      } catch (error) {

      }
      try {
        const [{ release }] = await Promise.all([
          ofetch(`/repos/${repo}/releases/latest`, { baseURL: "https://ungh.cc" }),
        ]);

        info = { ...info, release }
      } catch (error) {

      }
      const { details, release } = info

      return {
        name,
        repo,
        description: details.description,
        version: release?.tag ?? 'v0.0.0',
        stars: details.stars,
        forks: details.forks,
        createdAt,
        updatedAt: release?.updatedAt ?? details.pushedAt,
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
