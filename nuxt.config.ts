// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-gtag',
    'nuxt-icons'
  ],
  typescript: {
    shim: false,
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,300;0,400;0,500;1,400&display=swap',
        },
      ],
    },
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
  },
  gtag: {
    id: 'G-ZMR7H4LPSK'
  },
})
