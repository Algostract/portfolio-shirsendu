import fs from 'fs';
import yaml from 'yaml';

import { ofetch } from "ofetch";
import { Project } from "~~/utils/models"

export default defineEventHandler<Project[]>(async (event) => {
  try {
    const fileContents = fs.readFileSync('projects.yml', 'utf8');
    const projects: {
      name: string;
      repo: string;
      createdAt: string;
      videoURL: string;
    }[] = yaml.parse(fileContents);

    const repos = (await Promise.all(projects.map(async ({ name, repo, createdAt, videoURL }): Promise<Project | null> => {
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
          updatedAt: details.updatedAt,
          videoURL,
        }
      } catch (error) {
        return null
      }
    }))).filter((value): value is Project => value !== null);

    // console.log({ repos });
    return repos
  } catch (error: any) {
    console.error("API project GET", error)

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
