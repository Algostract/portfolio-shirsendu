import vue from '@vitejs/plugin-vue'

const isNative = process.env.PLATFORM_ENV === 'native'

const nativeConfig = isNative
  ? {
      ssr: false,
      devServer: { host: process.env.TAURI_DEV_HOST || '0.0.0.0' },
      vite: {
        clearScreen: false,
        envPrefix: ['VITE_', 'TAURI_'],
        server: {
          strictPort: true,
        },
      },
    }
  : {}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-04',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint', // '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    'nuxt-icons',
    'nuxt-splide',
    'nuxt-time',
  ],
  nitro: {
    compressPublicAssets: true,
    storage: {
      fs: {
        driver: 'fs',
        base: './static',
      },
    },
    rollupConfig: {
      // @ts-expect-error Type instantiation is excessively deep and possibly infinite.
      plugins: [vue()],
    },
    experimental: {
      openAPI: {
        ui: {
          scalar: {
            theme: 'blue',
          },
        },
      },
    },
  },
  routeRules: {
    '/': { isr: 3600 },
    '/_ipx/**': { headers: { 'cache-control': 'max-age=31536000' } },
    '/images/**': { headers: { 'cache-control': 'max-age=31536000' } },
    '/fonts/**': { headers: { 'cache-control': 'max-age=31536000' } },
    '/api/**': { cors: true },
  },
  runtimeConfig: {
    app: {
      version: '',
    },
    public: {
      apiBaseUrl: '',
      scripts: {
        googleAnalytics: {
          id: '',
        },
        /* googleTagManager: {
          id: '',
        }, */
      },
    },
    private: {
      gmail: '',
      emailUsername: '',
      emailPassword: '',
      notionKey: '',
      notionDBId: '',
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  /*  icon: {
     customCollections: [
       {
         prefix: 'icons',
         dir: './assets/icons',
       },
     ],
   }, */
  image: {
    uploadcare: {
      cdnURL: 'https://ucarecdn.com',
      quality: 'smart',
      format: 'auto',
    },
  },
  scripts: {
    registry: {
      googleAnalytics: true,
      // googleTagManager: true,
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  robots: {
    disallow: ['/_nuxt/'],
  },
  site: {
    url: 'https://shirsendu-bairagi.dev',
    name: 'Shirsendu Bairagi',
  },
  pwa: {
    scope: '/',
    base: '/',
    injectRegister: 'auto',
    registerType: 'autoUpdate',
    manifest: {
      name: 'Shirsendu Bairagi',
      short_name: 'Shirsendu Bairagi',
      description: 'Shirsendu Bairagi is a Fullstack Developer',
      theme_color: '#0593FA',
      background_color: '#0593FA',
      orientation: 'portrait',
      shortcuts: [
        {
          name: 'Contact Me',
          short_name: 'Contact',
          description: 'Contact with me via mail',
          url: '/?contact',
          icons: [
            {
              src: '/pwa/email.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa/email-maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      ],
      icons: [
        {
          src: '/pwa/icon-48.png',
          sizes: '48x48',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-72.png',
          sizes: '72x72',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-96.png',
          sizes: '96x96',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-128.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-384.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-maskable-48.png',
          sizes: '48x48',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/pwa/icon-maskable-72.png',
          sizes: '72x72',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/pwa/icon-maskable-96.png',
          sizes: '96x96',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/pwa/icon-maskable-128.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/pwa/icon-maskable-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/pwa/icon-maskable-384.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/pwa/icon-maskable-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      screenshots: [
        {
          src: '/pwa/screenshot-desktop-1.webp',
          sizes: '1024x576',
          type: 'image/webp',
          form_factor: 'wide',
          label: 'Screenshot 1',
        },
        {
          src: '/pwa/screenshot-desktop-2.webp',
          sizes: '1024x576',
          type: 'image/webp',
          form_factor: 'wide',
          label: 'Screenshot 2',
        },
        {
          src: '/pwa/screenshot-desktop-3.webp',
          sizes: '1024x576',
          type: 'image/webp',
          form_factor: 'wide',
          label: 'Screenshot 3',
        },
        {
          src: '/pwa/screenshot-mobile-1.webp',
          sizes: '576x1024',
          type: 'image/webp',
          form_factor: 'narrow',
          label: 'Screenshot 1',
        },
        {
          src: '/pwa/screenshot-mobile-2.webp',
          sizes: '576x1024',
          type: 'image/webp',
          form_factor: 'narrow',
          label: 'Screenshot 2',
        },
        {
          src: '/pwa/screenshot-mobile-3.webp',
          sizes: '576x1024',
          type: 'image/webp',
          form_factor: 'narrow',
          label: 'Screenshot 3',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{html,css,js,jpg,png,svg,webp,ico}'],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'NetworkFirst',
        },
      ],
      navigateFallback: undefined,
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      type: 'module',
      enabled: false,
      suppressWarnings: false,
      navigateFallback: undefined,
    },
  },
  splide: {
    theme: 'core',
  },
  ...nativeConfig,
})
