import type { SitemapUrlInput } from '#sitemap/types'

export default defineSitemapEventHandler(async () => {
  const settled = await Promise.allSettled([].map((url) => $fetch<{ url: string }[]>(url)))

  return settled.flatMap((res) => {
    if (res.status === 'fulfilled') {
      return res.value.map((item) => ({ loc: item.url, _sitemap: 'sitemap' }) satisfies SitemapUrlInput)
    } else {
      console.warn('Failed to fetch sitemap entries')
      return []
    }
  })
})
