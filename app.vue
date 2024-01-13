<script setup lang="ts">
const title = `Shirsendu Bairagi | Fullstack Developer in Kolkata`
const description = `Shirsendu Bairagi is Fullstack Developer with more then 3 years of experience.
He had done more then a dozens production grade cutting edge projects standalone. 
He curiosity leads him to explore many aspects of tech like web, app, iot and ml.
He primarily serves his neighborhood Rajpur, Sonarpur, Baruipur, Subhasgram, Harinavi & Narendrapur Area.`

useHead({
  title: title,
  meta: [
    { name: 'description', content: description }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://shirsendu-bairagi.dev',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,300;0,400;0,500;1,400&display=swap',
    },
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  ogType: "profile",
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: "https://shirsendu-bairagi.dev/previews/landing.jpg",
  ogImageWidth: 1280,
  ogImageHeight: 640,
  ogUrl: 'https://shirsendu-bairagi.dev',
  fbAppId: 966242223397117,
  twitterCard: "summary_large_image",
})

useSchemaOrg([
  definePerson({
    name: "Shirsendu Bairagi",
    description: "He is a Fullstack Developer",
    image: "https://shirsendu-bairagi.dev/logo.png",
    sameAs: [
      "https://codedamn.com/user/shba007",
      "https://leetcode.com/shba007",
      "https://devpost.com/shba007",
      "https://github.com/shba007",
      "https://x.com/shirsendu_baira",
      "https://linkedin.com/in/shirsendu-bairagi",
      "https://youtube.com/@shirsendu_bairagi",
      "https://instagram.com/shirsendu_bairagi"
    ],
  }),
  defineWebSite({
    name: title,
    description: description,
  }),
  defineWebPage({
    datePublished: new Date(2023, 5, 14).toISOString(),
    dateModified: new Date(2023, 12, 26).toISOString(),
    author: "Shirsendu Bairagi",
  }),
])
</script>

<template>
  <NuxtPwaManifest />
  <!-- <NuxtLoadingIndicator /> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  scrollbar-width: 6px
}

*::-webkit-scrollbar {
  @apply block w-[6px] bg-light-400 dark:bg-dark-400;
}

*::-webkit-scrollbar-thumb {
  @apply rounded-md bg-light-600 dark:bg-dark-600;
}

html {
  @apply relative scroll-smooth overflow-x-hidden;
}

body {
  @apply relative min-h-screen font-body text-black dark:text-white bg-light-400 dark:bg-dark-400 overflow-x-hidden;
  @apply bg-[url('@/assets/images/dot-light.svg')] dark:bg-[url('@/assets/images/dot-dark.svg')] bg-left-top bg-repeat bg-auto;
}

.nuxt-icon>svg {
  @apply !m-0;
}

.scrollbar-hidden {
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}
</style>