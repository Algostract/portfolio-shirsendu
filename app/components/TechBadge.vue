<script setup lang="ts">
defineProps<{ tech: Technologies }>()

const techs = {
  angular: {
    name: 'Angular',
    website: 'https://angular.io',
  },
  react: {
    name: 'React',
    website: 'https://react.dev',
  },
  nextjs: {
    name: 'Next.js',
    website: 'https://nextjs.org',
  },
  vue: {
    name: 'Vue',
    website: 'https://vuejs.org',
  },
  nuxt: {
    name: 'Nuxt',
    website: 'https://nuxt.com',
  },
  astro: {
    name: 'Astro',
    website: 'https://astro.build',
  },
  tailwindcss: {
    name: 'Tailwind CSS',
    website: 'https://tailwindcss.com',
  },
  nitro: {
    name: 'Nitro',
    website: 'https://nitro.build/',
  },
  citty: {
    name: 'Citty',
    website: 'https://unjs.io/packages/citty',
  },
  unbuild: {
    name: 'Unbuild',
    website: 'https://unjs.io/packages/unbuild',
  },
  pixijs: {
    name: 'PixiJS',
    website: 'https://pixijs.com',
  },
  tensorflowjs: {
    name: 'TensorFlow.js',
    website: 'https://www.tensorflow.org/js',
  },
  typescript: {
    name: 'Typescript',
    website: 'https://typescriptlang.org',
  },
  python: {
    name: 'Python',
    website: 'https://python.org',
  },
  fastapi: {
    name: 'FastAPI',
    website: 'https://fastapi.tiangolo.com',
  },
  tensorflow: {
    name: 'TensorFlow',
    website: 'https://www.tensorflow.org',
  },
  rust: {
    name: 'Rust',
    website: 'https://www.rust-lang.org/',
  },
  tauri: {
    name: 'Tauri',
    website: 'https://tauri.app/',
  },
  bun: {
    name: 'Bun',
    website: 'https://bun.sh/',
  },
  docker: {
    name: 'Docker',
    website: 'https://www.docker.com/',
  },
  godot: {
    name: 'Godot',
    website: 'https://godotengine.org/',
  },
}
</script>

<template>
  <NuxtLink
    :to="techs[tech]?.website"
    :external="true"
    target="_blank"
    class="flex shrink-0 cursor-pointer items-center gap-1 rounded-full bg-light-600 py-1 pl-2 pr-3 outline-primary-400 transition-colors duration-150 ease-in hover:bg-light-400 hover:outline dark:bg-dark-500 dark:hover:bg-dark-400">
    <NuxtIcon :name="`local:tech-${tech}`" class="size-[20px]" mode="css" />
    <span class="whitespace-nowrap text-xs">{{ techs[tech]?.name ?? tech }}</span>
  </NuxtLink>
</template>
