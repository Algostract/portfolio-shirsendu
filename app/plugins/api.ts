export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.siteUrl,
  })

  return {
    provide: {
      api,
    },
  }
})
