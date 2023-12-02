<script setup lang="ts">
useHead({
  title: "Shirsendu's Portfolio",
  link: [
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

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://shirsendu-bairagi.dev',
    },
  ],
})

useSeoMeta({
  ogType: "profile",
  title: "Shirsendu's Portfolio",
  ogTitle: "Shirsendu's Portfolio",
  description: "I am a Web Developer and an AI Enthusiast, this is my developer's portfolio showcasing my skills, projects, and expertise in a visually appealing manner",
  ogDescription: "I am a Web Developer and an AI Enthusiast, this is my developer's portfolio showcasing my skills, projects, and expertise in a visually appealing manner",
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
    description: "I am a Web Developer and an AI Enthusiast",
    image: "https://shirsendu-bairagi.dev/logo.png",
    sameAs: [
      "https://github.com/shba007",
      "https://www.linkedin.com/in/shirsendu-bairagi-28b4b1213",
      "https://www.youtube.com/@shirsendu_bairagi",
      "https://twitter.com/shirsendu_2001",
      "https://www.instagram.com/shirsendu_bairagi",
      "https://www.facebook.com/shirsendu.bairagi.1"
    ],
  }),
  defineWebSite({
    name: "Shirsendu's Portfolio",
    description: `I am a Web Developer and an AI Enthusiast, this is my 
    developer's portfolio showcasing my skills, projects,
    and expertise in a visually appealing manner`,
  }),
  defineWebPage({
    datePublished: new Date(2023, 5, 14).toISOString(),
    dateModified: new Date(2023, 5, 20).toISOString(),
    author: "Shirsendu Bairagi",
  }),
])
</script>

<template>
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

body {
  @apply min-h-screen font-body text-black dark:text-white bg-light-400 dark:bg-dark-400 overflow-x-hidden;
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