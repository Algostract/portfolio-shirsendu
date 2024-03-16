<script setup lang="ts">
import type { Technologies } from '~/utils/models';

const db = {
  angular: {
    name: 'Angular',
    website: 'https://angular.io'
  },
  react: {
    name: 'React',
    website: 'https://react.dev'
  },
  nextjs: {
    name: 'Next.js',
    website: 'https://nextjs.org'
  },
  vue: {
    name: 'Vue',
    website: 'https://vuejs.org'
  },
  nuxt: {
    name: 'Nuxt',
    website: 'https://nuxt.com'
  },
  astro: {
    name: 'Astro',
    website: 'https://astro.build'
  },
  tailwindcss: {
    name: 'Tailwind CSS',
    website: 'https://tailwindcss.com'
  },
  tensorflowjs: {
    name: 'TensorFlow.js',
    website: 'https://www.tensorflow.org/js'
  },
  typescript: {
    name: 'Typescript',
    website: 'https://typescriptlang.org'
  },
  python: {
    name: 'Python',
    website: 'https://python.org'
  },
  fastapi: {
    name: 'FastAPI',
    website: 'https://fastapi.tiangolo.com'
  },
  tensorflow: {
    name: 'TensorFlow',
    website: 'https://www.tensorflow.org'
  },
}

const props = defineProps<{ tech: Technologies }>()
</script>

<template>
  <NuxtLink :to="db[tech].website" target="_blank"
    class="flex gap-1 items-center rounded-full pl-2 pr-3 py-1 bg-light-600 hover:bg-light-400 dark:bg-dark-500 dark:hover:bg-dark-400 cursor-pointer hover:outline outline-primary-400 transition-colors duration-150 ease-in">
    <NuxtIcon :name="`tech-${tech}`" class="text-[20px] overflow-hidden" filled />
    <span class="text-xs whitespace-nowrap">{{ db[tech].name }}</span>
  </NuxtLink>
</template>