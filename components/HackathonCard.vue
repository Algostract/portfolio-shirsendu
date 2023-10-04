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
  <div
    class="grid grid-rows-2 grid-cols-[repeat(auto, 2)] justify-start items-center gap-2 rounded-[0.875rem] p-4 w-[256px] aspect-[202/82] bg-dark-500">
    <img class="row-span-2 col-start-1 rounded-full h-full bg-black aspect-square" :src="`/hackathons/${name}.png`" />
    <span class="col-start-2 self-end text-sm">{{ name }}</span>
    <div class="col-start-2 self-start text-sm opacity-60">
      <span>{{ project }}</span>
      &bull;
      <span>{{ title }}</span>
    </div>
  </div>
</template>