<script setup lang="ts">
import branchHead from '~/assets/images/branch-head.svg?raw'

const { side = 'left' } = defineProps<{
  side?: 'left' | 'right'
  date: string
  company: string
}>()

function capitalize(str: string) {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<template>
  <div class="relative w-[102%]" :class="side === 'left' ? 'left-2' : 'right-2'">
    <div class="relative flex items-center justify-center" :class="{ 'rotate-180': side !== 'left' }">
      <span class="fill-light-500 dark:fill-dark-500" v-html="branchHead" />
      <div class="h-1 w-full flex-1 bg-light-500 dark:bg-dark-500" />
      <span
        class="relative aspect-square w-7 rounded-full bg-light-500 after:absolute after:left-1/2 after:top-1/2 after:aspect-square after:w-4 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-light-400 after:content-[''] dark:bg-dark-500 after:dark:bg-dark-400" />
    </div>
    <NuxtLink :aria-label="company" :to="`https://www.linkedin.com/company/${company}`" target="_blank">
      <NuxtImg
        :src="`/companies/${company}.jpg`"
        :alt="company"
        loading="lazy"
        class="absolute top-1/2 aspect-square w-20 -translate-y-1/2 rounded-full object-contain"
        :class="side === 'left' ? '-left-0' : '-right-0'" />
    </NuxtLink>
    <!-- -->
    <time
      :datetime="date"
      class="absolute top-6 text-sm sm:top-4 sm:text-lg"
      :class="side === 'left' ? 'right-4 -translate-x-1/2 sm:right-1/2 sm:translate-x-1/2' : 'left-4 translate-x-1/2 sm:left-1/2 sm:-translate-x-1/2'"
      >{{ date }}</time
    >
    <span class="absolute" :class="side === 'left' ? 'left-0' : 'right-0'">
      {{ capitalize(company.split('-').join(' ')) }}
    </span>
  </div>
</template>
