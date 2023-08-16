// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-gtag',
    'nuxt-icons',
    'nuxt-schema-org'
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
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  supabase: {
    client: {
      auth: {
        persistSession: false //or true
      }
    }
  },
  pwa: {
    /* your pwa options */
  },
  gtag: {
    id: 'G-ZMR7H4LPSK'
  },

})
