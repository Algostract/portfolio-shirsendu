export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const $fetchAPI = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    onRequest({ request, options, error }) {},
    onResponse({ response }) {},
    onResponseError({ response }) {},
  })
  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      fetchAPI: $fetchAPI,
    },
  }
})
