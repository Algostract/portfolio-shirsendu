<script setup lang="ts">
const { name, active = false } = defineProps<{
  active?: boolean,
  name: string,
  link: string,
  date: string
}>()

const emit = defineEmits<{
  (event: 'slide', dir: 'left' | 'right'): void
}>()
</script>

<template>
  <div class="relative rounded-xl"
    :class="{ 'z-10 shadow-[0_4px_8px_4px_rgba(0,0,0,0.32)]': active, 'scale-90': !active }">
    <div v-if="active" class="absolute top-0 left-0 right-0 bottom-0 z-10">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-between w-[110%]">
        <button
          class="rounded-2xl px-3 py-2 w-fit h-fit bg-light-600 dark:bg-dark-600 hover:!bg-primary-500 hover:text-white transition-colors"
          @click="emit('slide', 'left')">
          <NuxtIcon name="chevron-bold" class="text-[16px]" />
        </button>
        <button
          class="rounded-2xl px-3 py-2 w-fit h-fit bg-light-600 dark:bg-dark-600 hover:!bg-primary-500 hover:text-white transition-colors rotate-180"
          @click="emit('slide', 'right')">
          <NuxtIcon name="chevron-bold" class="text-[16px]" />
        </button>
      </div>
      <div class="absolute bottom-2 right-2 flex gap-2">
        <NuxtLink :to="`/certificates/${name}.pdf`" target="_blank"
          class="rounded-2xl px-3 py-1 w-fit h-fit bg-light-600 dark:bg-dark-600 hover:!bg-primary-500 hover:text-white transition-colors">
          <NuxtIcon name="certificate" class="text-[16px]" />
        </NuxtLink>
        <NuxtLink :to="link" target="_blank"
          class="rounded-2xl px-3 py-1 w-fit h-fit bg-light-600 dark:bg-dark-600 hover:!bg-primary-500 hover:text-white transition-colors ">
          <NuxtIcon name="web" class="text-[16px]" />
        </NuxtLink>
      </div>
    </div>
    <div class="rounded-xl w-[18rem] md:w-[28rem] aspect-[3/2] bg-light-500 dark:bg-dark-500 overflow-hidden">
      <NuxtImg :src="`/certificates/${name}.webp`" placeholder loading="lazy"
        class="w-full h-full object-cover scale-100 hover:scale-110 transition-transform" />
    </div>
  </div>
</template>