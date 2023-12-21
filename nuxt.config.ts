// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  /* routeRules: {
    '/': { prerender: true },
  }, */
  modules: [
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxtseo/module',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    'nuxt-gtag',
    'nuxt-icons',
    'nuxt-vitest',
  ],
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    private: {
      rootDir: '',
      gmail: '',
      emailUsername: '',
      emailPassword: '',
      supabaseUrl: '',
      supabaseKey: '',
    },
  },
  image: {
    format: ['avif', 'webp'],
    width: 1920,
    quality: 80,
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  site: {
    url: 'https://shirsendu-bairagi.dev'
  },
  gtag: {
    id: 'G-ZMR7H4LPSK'
  },
})