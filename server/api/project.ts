import { Client } from '@notionhq/client'
import type { Technologies } from '~~/shared/types'

let notion: Client

type NotionMediaAsset =
  | {
      type: 'file'
      file: {
        url: string
        expiry_time: string
      }
    }
  | {
      type: 'external'
      external: {
        url: string
      }
    }
  | null

export interface NotionProject {
  object: string
  id: string
  cover: NotionMediaAsset
  icon: NotionMediaAsset
  properties: {
    Name: {
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
    Type: {
      type: string
      multi_select: { id: string; name: string; color: string }[]
    }
    Stack: {
      type: string
      multi_select: { id: string; name: string; color: string }[]
    }
    Priority: {
      type: string
      select: {
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
    Period: {
      type: string
      date: {
        start: string
        end: null
      }
    }

    Postman: {
      url: string
    }
    Github: {
      url: string
    }

    App: {
      url: string
    }
    'Better Stack': {
      url: string
    }
    Asset: { type: 'relation'; relation: { id: string }[]; has_more: boolean }
    Video: {
      url: string
    }
  }
}

export interface NotionProjectAsset {
  id: string
  created_time: string
  last_edited_time: string
  created_by: {
    object: string
    id: string
  }
  last_edited_by: {
    object: string
    id: string
  }
  cover: NotionMediaAsset
  icon: NotionMediaAsset
  properties: {
    Project: {
      type: string
      relation: { id: string }[]
      has_more: boolean
    }
    Name: {
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

    Description: {
      id: string
      type: string
      rich_text: { plain_text: string }[]
    }
    Status: {
      type: string
      status: {
        name: string
        color: string
      }
    }
    'Aspect ratio': {
      id: string
      type: string
      select: {
        name: string
        color: string
      }[]
    }
    Gallery: {
      id: string
      type: string
      number: number
    }
    Resolution: {
      id: string
      type: string
      select: {
        name: string
        color: string
      }[]
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

      const notionDbId = config.private.notionDbId as unknown as NotionDB

      notion = notion ?? new Client({ auth: config.private.notionApiKey })

      const notionProjects = (await notion.databases.query({ database_id: notionDbId.project })).results as unknown as NotionProject[]
      const notionProjectAssets = (await notion.databases.query({ database_id: notionDbId.asset })).results as unknown as NotionProjectAsset[]

      const projects = (
        await Promise.all(
          notionProjects.map(async ({ id, properties }): Promise<Project> => {
            const name = notionTextStringify(properties.Name.title)

            return {
              id,
              name,
              repo: properties.Github.url?.replace('https://github.com/', ''),
              type: properties.Type.multi_select.map(({ name }) => name as ProjectType),
              technologies: properties.Stack.multi_select.map(({ name }) => name as Technologies),
              createdAt: properties.Period.date?.start,
              appURL: properties.App.url,
              videoURL: properties.Video.url,
              stage: properties.Stage.status.name as ProjectStage,
              images: notionProjectAssets
                .filter((asset) => properties.Asset.relation.map(({ id }) => id).includes(asset.id) && asset.properties.Status.status.name === 'Release')
                .toSorted((a, b) => b.properties.Gallery.number - a.properties.Gallery.number)
                .map(({ cover, properties }) => ({
                  id: cover?.type === 'external' ? cover.external.url.split('/')[3]! : '',
                  title: notionTextStringify(properties.Name.title),
                })),
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
