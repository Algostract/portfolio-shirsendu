export default defineCachedEventHandler<Promise<Project>>(
  async (event) => {
    try {
      const config = useRuntimeConfig()
      const notionDbId = config.private.notionDbId as unknown as NotionDB

      const slug = getRouterParam(event, 'slug')!.toString().replace(/,$/, '')

      const notionProjects = await notionQueryDb<NotionProject>(notion, notionDbId.project)
      const notionProjectAssets = await notionQueryDb<NotionProjectAsset>(notion, notionDbId.asset)

      const projects = await Promise.all(
        notionProjects.filter(({ properties }) => properties.Stage.status.name === 'Development' || properties.Stage.status.name === 'Stable' || properties.Stage.status.name === 'Maintenance')
      ) //&& images.length > 0

      const project = projects.find(({ properties }) => slugify(notionTextStringify(properties.Name.title)) === slug)

      if (!project) {
        throw createError({ statusCode: 404, statusMessage: `project ${slug} not found` })
      }

      const repo = project.properties.Github.url?.replace('https://github.com/', '')

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
        id: slug,
        name: notionTextStringify(project.properties.Name.title),
        description: details?.description ?? '',
        version: release?.tag ?? 'v0.0.0',
        stars: details?.stars ?? 0,
        forks: details?.forks ?? 0,
        createdAt: project.properties.Period.date?.start,
        updatedAt: release?.publishedAt ?? project.properties.Period.date?.start,
        technologies: project.properties.Stack.multi_select.map(({ name }) => name as Technologies),
        repo: project.properties.Github.url,
        appURL: project.properties.App.url,
        videoURL: project.properties.Video.url,
        images: notionProjectAssets
          .filter((asset) => project.properties.Asset.relation.map(({ id }) => id).includes(asset.id) && asset.properties.Status.status.name === 'Release')
          .toSorted((a, b) => a.properties.Gallery.number - b.properties.Gallery.number)
          .map(({ cover, properties }) => ({
            id: cover?.type === 'external' ? cover.external.url.split('/')[3]! : '',
            title: notionTextStringify(properties.Name.title),
          })),
        url: `/project/${slug}`,
      }
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
