<script setup lang="ts">
const title = `Fullstack Developer in Kolkata`
const description = `Shirsendu Bairagi is Fullstack Developer with more then 3 years of experience.
He had done more then a dozens production grade cutting edge projects in web, app, iot and ml.
He primarily serves his neighborhood Rajpur, Sonarpur, Baruipur, Subhasgram, Harinavi & Narendrapur Area.`
const url = 'https://shirsendu-bairagi.dev'

useSeoMeta({
  ogType: 'profile',
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: url + '/previews/landing.webp',
  ogImageWidth: 1280,
  ogImageHeight: 640,
  ogUrl: url,
  fbAppId: 966242223397117,
  twitterCard: 'summary_large_image',
  colorScheme: 'dark light',
})

useSchemaOrg([
  definePerson({
    name: 'Shirsendu Bairagi',
    description: 'He is a Fullstack Developer',
    image: url + '/logo.png',
    sameAs: [
      'https://codedamn.com/user/shba007',
      'https://leetcode.com/shba007',
      'https://devpost.com/shba007',
      'https://github.com/shba007',
      'https://x.com/shirsendu_baira',
      'https://linkedin.com/in/shirsendu-bairagi',
      'https://youtube.com/@shirsendu_bairagi',
      'https://instagram.com/shirsendu_bairagi',
    ],
  }),
  defineLocalBusiness({
    name: 'Shirsendu Bairagi',
    address: {
      streetAddress: 'RN Bhattacharya Road, Kumorpara 2nd Lane',
      addressLocality: 'Kolkata',
      addressRegion: 'WB',
      postalCode: '700146',
      addressCountry: 'IN',
    },
    image: url + '/logo.png',
  }),
  defineWebPage({
    datePublished: new Date(2023, 5, 14).toISOString(),
    dateModified: new Date(2023, 12, 26).toISOString(),
    author: 'Shirsendu Bairagi',
  }),
  defineWebSite({
    url: url,
    name: title,
    description: description,
  }),
])
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtPwaManifest />
  <NuxtPwaAssets />
  <!-- <NuxtLoadingIndicator /> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppInstallPrompt />
</template>

<style>
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  scrollbar-width: 6px;
}

*::-webkit-scrollbar {
  @apply block size-[6px] bg-light-400 dark:bg-dark-400;
}

*::-webkit-scrollbar-thumb {
  @apply rounded-md bg-light-600 dark:bg-dark-600;
}

html {
  @apply relative overflow-x-hidden scroll-smooth;
}

body {
  @apply relative min-h-screen overflow-x-hidden bg-light-400 font-body text-black dark:bg-dark-400 dark:text-white;
  @apply bg-[url("@/assets/images/dot-light.svg")] bg-auto bg-left-top bg-repeat dark:bg-[url("@/assets/images/dot-dark.svg")];
}

.nuxt-icon > svg {
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
