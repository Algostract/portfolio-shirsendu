export default defineCachedEventHandler<Promise<Project[]>>(
  async () => {
    try {
      const config = useRuntimeConfig()
      const notionDbId = config.private.notionDbId as unknown as NotionDB

      const notionProjects = await notionQueryDb<NotionProject>(notion, notionDbId.project)
      const notionProjectAssets = await notionQueryDb<NotionProjectAsset>(notion, notionDbId.asset)

      const projects = (
        await Promise.all(
          notionProjects.map(async ({ properties }): Promise<BaseProject> => {
            const name = notionTextStringify(properties.Name.title)
            const slug = slugify(name)

            return {
              id: slug,
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
                .toSorted((a, b) => a.properties.Gallery.number - b.properties.Gallery.number)
                .map(({ cover, properties }) => ({
                  id: cover?.type === 'external' ? cover.external.url.split('/')[3]! : '',
                  title: notionTextStringify(properties.Name.title),
                })),
              url: `/project/${slug}`,
            }
          })
        )
      ).filter(({ stage, images }) => (stage === 'Development' || stage === 'Stable' || stage === 'Maintenance') && images.length > 0)

      const githubProjects = (
        await Promise.all(
          projects.map(async ({ id, name, repo, createdAt, technologies, appURL, videoURL, images, url }): Promise<Project | null> => {
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
              id,
              name,
              description: details?.description ?? '',
              version: release?.tag ?? 'v0.0.0',
              stars: details?.stars ?? 0,
              forks: details?.forks ?? 0,
              createdAt,
              updatedAt: release?.publishedAt ?? createdAt,
              technologies,
              repo: `https://github.com/${repo}`,
              appURL,
              videoURL,
              images,
              url,
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
  { maxAge: 60 * 1 }
)
