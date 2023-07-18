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
  @apply font-body text-black dark:text-white bg-light-400 dark:bg-dark-400 overflow-x-hidden;
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