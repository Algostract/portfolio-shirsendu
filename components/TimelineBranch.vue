<script setup lang="ts">
import branch from "~~/assets/images/branch.svg?raw";

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
  <div class="relative" :class="side === 'left' ? 'left-2' : 'right-2'">
    <div v-html="branch" :class="{ 'rotate-180': side !== 'left' }" />
    <NuxtLink :to="`https://www.linkedin.com/company/${company}`" target="_blank">
      <NuxtImg :src="`/companies/${company}.jpg`" :alt="company" loading="lazy"
        class="absolute top-1/2 -translate-y-1/2 rounded-full w-20 aspect-square object-contain"
        :class="side === 'left' ? 'left-1' : 'right-1'" />
    </NuxtLink>
    <time :datetime="date" class="absolute top-4 left-1/2 -translate-x-1/2 text-lg">{{ date }}</time>
    <span class="absolute" :class="side === 'left' ? 'left-0' : 'right-0'">
      {{ capitalize(company.split("-").join(" ")) }}
    </span>
  </div>
</template>