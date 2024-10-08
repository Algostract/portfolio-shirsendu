<script setup lang="ts">
import type { Technologies } from '~/utils/types'

import iconAngular from '~/assets/icons/tech-angular.svg'
import iconReact from '~/assets/icons/tech-react.svg'
import iconNext from '~/assets/icons/tech-nextjs.svg'
import iconVue from '~/assets/icons/tech-vue.svg'
import iconNuxt from '~/assets/icons/tech-nuxt.svg'
import iconAstro from '~/assets/icons/tech-astro.svg'
import iconTailwind from '~/assets/icons/tech-tailwindcss.svg'
import iconTensorflowJS from '~/assets/icons/tech-tensorflowjs.svg'
import iconTensorflow from '~/assets/icons/tech-tensorflow.svg'
import iconTypescript from '~/assets/icons/tech-typescript.svg'
import iconPython from '~/assets/icons/tech-python.svg'
import iconFastApi from '~/assets/icons/tech-fastapi.svg'
import iconCitty from '~/assets/icons/tech-citty.svg'
import iconUnbuild from '~/assets/icons/tech-unbuild.svg'

defineProps<{ tech: Technologies }>()

const techs = {
  angular: {
    name: 'Angular',
    website: 'https://angular.io',
    icon: iconAngular,
  },
  react: {
    name: 'React',
    website: 'https://react.dev',
    icon: iconReact,
  },
  nextjs: {
    name: 'Next.js',
    website: 'https://nextjs.org',
    icon: iconNext,
  },
  vue: {
    name: 'Vue',
    website: 'https://vuejs.org',
    icon: iconVue,
  },
  nuxt: {
    name: 'Nuxt',
    website: 'https://nuxt.com',
    icon: iconNuxt,
  },
  astro: {
    name: 'Astro',
    website: 'https://astro.build',
    icon: iconAstro,
  },
  tailwindcss: {
    name: 'Tailwind CSS',
    website: 'https://tailwindcss.com',
    icon: iconTailwind,
  },
  tensorflowjs: {
    name: 'TensorFlow.js',
    website: 'https://www.tensorflow.org/js',
    icon: iconTensorflowJS,
  },
  typescript: {
    name: 'Typescript',
    website: 'https://typescriptlang.org',
    icon: iconTypescript,
  },
  python: {
    name: 'Python',
    website: 'https://python.org',
    icon: iconPython,
  },
  fastapi: {
    name: 'FastAPI',
    website: 'https://fastapi.tiangolo.com',
    icon: iconFastApi,
  },
  tensorflow: {
    name: 'TensorFlow',
    website: 'https://www.tensorflow.org',
    icon: iconTensorflow,
  },
  citty: {
    name: 'Citty',
    website: 'https://unjs.io/packages/citty',
    icon: iconCitty,
  },
  unbuild: {
    name: 'Unbuild',
    website: 'https://unjs.io/packages/unbuild',
    icon: iconUnbuild,
  },
}
</script>

<template>
  <NuxtLink
    :to="techs[tech].website"
    :external="true"
    target="_blank"
    class="flex shrink-0 cursor-pointer items-center gap-1 rounded-full bg-light-600 py-1 pl-2 pr-3 outline-primary-400 transition-colors duration-150 ease-in hover:bg-light-400 hover:outline dark:bg-dark-500 dark:hover:bg-dark-400">
    <img :src="techs[tech].icon" :alt="`logo-${techs[tech].name}`" :width="20" :height="20" />
    <span class="whitespace-nowrap text-xs">{{ techs[tech].name }}</span>
  </NuxtLink>
</template>
