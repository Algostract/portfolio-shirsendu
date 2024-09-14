export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    onRequest() {},
    onResponse() {},
    onResponseError() {},
  })
  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      api,
    },
  }
})
