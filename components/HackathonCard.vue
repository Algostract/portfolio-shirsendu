<script setup lang="ts">
import type { Hackathon } from '~/utils/types'

/* interface Hackathon {
  name: string
  url: string
  project: string
  position: string
  startedAt: string
  image: {
    id: string
    title: string
  }
} */

defineProps<Hackathon>()
</script>

<template>
  <NuxtLink :to="url" target="_blank"
    class="grid-cols-[repeat(auto, 2)] grid aspect-[202/82] w-[256px] grid-rows-2 items-center justify-start gap-2 rounded-[0.875rem] bg-light-500 p-4 dark:bg-dark-500">
    <NuxtImg provider="uploadcare" :src="image.id" :alt="image.title" loading="lazy" :width="96" :height="96"
      class="col-start-1 row-span-2 aspect-square h-full w-full rounded-full bg-white dark:bg-black" />
    <span class="col-start-2 self-end text-sm">{{ name }}</span>
    <div class="col-start-2 self-start text-sm opacity-60">
      <span>{{ project }}</span>
      &bull;
      <span>{{ position }}</span>
    </div>
  </NuxtLink>
</template>
