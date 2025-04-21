import { Client } from '@notionhq/client'
import readYamlFile from '~~/server/utils/read-yaml-file'

let notion: Client

export interface NotionProject {
  object: string
  id: string
  cover: null
  icon: {
    external: {
      url: string
    }
  }
  properties: {
    Github: {
      url: string
    }
    Type: {
      type: string
      multi_select: { id: string; name: string; color: string }[]
    }
    Postman: {
      url: string
    }
    'Better Stack': {
      url: string
    }
    App: {
      url: string
    }
    Video: {
      url: string
    }
    'Project name': {
      type: string
      title: {
        type: string
        text: {
          content: string
          link: null
        }
        plain_text: string
        href: null
      }[]
    }
    Stage: {
      type: string
      status: {
        name: string
        color: string
      }
    }
    Completion: {
      type: string
      rollup: {
        type: string
        number: null
        function: string
      }
    }
    Priority: {
      type: string
      select: {
        name: string
        color: string
      }
    }
    Period: {
      type: string
      date: {
        start: string
        end: null
      }
    }
  }
}

export default defineCachedEventHandler<Promise<Project[]>>(
  async () => {
    try {
      const config = useRuntimeConfig()

      if (!config.private.notionApiKey) {
        throw new Error('Notion API Key Not Found')
      }

      const notionDbId = config.private.notionDbId

      notion = notion ?? new Client({ auth: config.private.notionApiKey })
      const data = await notion.databases.query({ database_id: notionDbId })

      const notionProjects = data.results as unknown as NotionProject[]

      const fileProjects = await readYamlFile<BaseProject>('projects.yml')

      if (!fileProjects) throw createError({ statusCode: 500, statusMessage: 'projects file is undefined' })

      const projects = (
        await Promise.all(
          notionProjects.map(async ({ id, properties }): Promise<Project> => {
            const name = properties['Project name'].title.map(({ plain_text }) => plain_text ?? '').join('') as string

            const fileProject = fileProjects.find((project) => project.name === name)

            return {
              id,
              name,
              repo: properties.Github.url?.replace('https://github.com/', ''),
              type: properties.Type.multi_select.map(({ name }) => name),
              technologies: fileProject?.technologies ? ([...fileProject.technologies.frameworks, ...fileProject.technologies.languages] as Technologies[]) : [],
              createdAt: properties.Period.date?.start,
              appURL: properties.App.url,
              videoURL: properties.Video.url,
              stage: properties.Stage.status.name,
              images: fileProject?.images ?? [],
            }
          })
        )
      ).filter(({ stage, images }) => (stage === 'Development' || stage === 'Stable' || stage === 'Maintenance') && images.length > 0)

      const githubProjects = (
        await Promise.all(
          projects.map(async ({ name, repo, createdAt, technologies, appURL, videoURL, images }): Promise<Project | null> => {
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

            return {
              name,
              description: details?.description ?? '',
              version: release?.tag ?? 'v0.0.0',
              stars: details?.stars ?? 0,
              forks: details?.forks ?? 0,
              createdAt,
              updatedAt: details?.updatedAt ?? createdAt,
              technologies,
              repoURL: `https://github.com/${repo}`,
              appURL,
              videoURL,
              images,
            }
          })
        )
      ).filter((value): value is Project => value !== null)

      return githubProjects.toSorted((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    } catch (error: unknown) {
      console.error('API project GET', error)

      throw createError({
        statusCode: 500,
        statusMessage: 'Some Unknown Error Found',
      })
    }
  },
  { maxAge: 60 * 60 }
)
