<script setup lang="ts">
const props = defineProps<{
  name: string,
  url: string,
  project: string,
  title: string
  startedAt: string
}>()
</script>

<template>
  <NuxtLink :href="url" target="_blank"
    class="grid grid-rows-2 grid-cols-[repeat(auto, 2)] justify-start items-center gap-2 rounded-[0.875rem] p-4 w-[256px] bg-light-500 dark:bg-dark-500 aspect-[202/82] ">
    <NuxtImg class="row-span-2 col-start-1 rounded-full h-full bg-white dark:bg-black aspect-square"
      :src="`/hackathons/${name}.webp`" :alt="name" />
    <span class="col-start-2 self-end text-sm">{{ name }}</span>
    <div class="col-start-2 self-start text-sm opacity-60">
      <span>{{ project }}</span>
      &bull;
      <span>{{ title }}</span>
    </div>
  </NuxtLink>
</template>