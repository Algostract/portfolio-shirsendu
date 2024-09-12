export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const $fetchAPI = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    onRequest({}) {},
    onResponse() {},
    onResponseError() {},
  })
  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      fetchAPI: $fetchAPI,
    },
  }
})
