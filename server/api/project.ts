import fs from 'node:fs'
import path from 'node:path'
import { parseYAML } from 'confbox'

import type { BaseProject, Project, Technologies } from '~~/utils/models'

const config = useRuntimeConfig()

const filePath = path.join(process.cwd(), config.private.rootDir, 'projects.yml')
const fileContents = fs.readFileSync(filePath, 'utf8')
const projects = parseYAML<BaseProject[]>(fileContents)

interface GithubDetailsResponse {
  id: number
  name: string
  repo: string
  description: string
  createdAt: Date
  updatedAt: Date
  pushedAt: Date
  stars: number
  watchers: number
  forks: number
  defaultBranch: 'main'
}

interface GithubReleaseResponse {
  id: number
  tag: string
  author: string
  name: string
  draft: boolean
  prerelease: boolean
  createdAt: string
  publishedAt: string
  markdown: string
  html: string
}

export default defineEventHandler<Promise<Project[]>>(async (_event) => {
  try {
    const repos = (
      await Promise.all(
        projects.map(async ({ name, repo, createdAt, technologies, appURL, videoURL }): Promise<Project | null> => {
          if (repo == null) return null

          let details: GithubDetailsResponse | null = null
          let release: GithubReleaseResponse | null = null

          const [detailsResponse, releaseResponse] = await Promise.allSettled([
            $fetch<{ repo: GithubDetailsResponse }>(`/repos/${repo}`, {
              baseURL: 'https://ungh.cc',
            }),
            $fetch<{ release: GithubReleaseResponse }>(`/repos/${repo}/releases/latest`, {
              baseURL: 'https://ungh.cc',
            }),
          ])

          if (detailsResponse.status === 'fulfilled') details = detailsResponse.value.repo

          if (releaseResponse.status === 'fulfilled') release = releaseResponse.value.release

          const { frameworks, languages } = technologies

          return {
            name,
            repo,
            description: details?.description ?? '',
            version: release?.tag ?? 'v0.0.0',
            stars: details?.stars ?? 0,
            forks: details?.forks ?? 0,
            createdAt,
            updatedAt: details?.updatedAt ?? createdAt,
            technologies: [...frameworks, ...languages] as Technologies[],
            repoURL: `https://github.com/${repo}`,
            appURL,
            videoURL,
          }
        })
      )
    ).filter((value): value is Project => value !== null)

    return repos
  } catch (error: any) {
    console.error('API project GET', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
