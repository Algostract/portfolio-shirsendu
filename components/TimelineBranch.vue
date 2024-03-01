<script setup lang="ts">
import branchHead from "~/assets/images/branch-head.svg?raw";

const { side = 'left' } = defineProps<{
  side?: 'left' | 'right',
  date: string,
  company: string,
}>()

function capitalize(str: string) {
  return str.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")
}
</script>

<template>
  <div class="relative w-[102%]" :class="side === 'left' ? 'left-2' : 'right-2'">
    <div class="relative flex justify-center items-center" :class="{ 'rotate-180': side !== 'left' }">
      <span v-html="branchHead" class="fill-light-500 dark:fill-dark-500" />
      <div class="flex-1 w-full h-1 bg-light-500 dark:bg-dark-500" />
      <span
        class="relative w-7 aspect-square rounded-full bg-light-500 dark:bg-dark-500 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-4 after:aspect-square after:rounded-full after:bg-light-400 after:dark:bg-dark-400" />
    </div>
    <NuxtLink :aria-label="company" :to="`https://www.linkedin.com/company/${company}`" target="_blank">
      <img :src="`/companies/${company}.jpg`" :alt="company" loading="lazy"
        class="absolute top-1/2 -translate-y-1/2 rounded-full w-20 aspect-square object-contain"
        :class="side === 'left' ? '-left-0' : '-right-0'" />
    </NuxtLink>
    <!-- -->
    <time :datetime="date" class="absolute top-6 sm:top-4 text-sm sm:text-lg"
      :class="side === 'left' ? 'right-4 sm:right-1/2 -translate-x-1/2 sm:translate-x-1/2' : 'left-4 sm:left-1/2 translate-x-1/2 sm:-translate-x-1/2'">{{
    date }}</time>
    <span class="absolute" :class="side === 'left' ? 'left-0' : 'right-0'">
      {{ capitalize(company.split("-").join(" ")) }}
    </span>
  </div>
</template>