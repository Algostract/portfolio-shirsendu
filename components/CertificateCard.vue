<script setup lang="ts">
const { name, active = false } = defineProps<{
  active?: boolean
  name: string
  link: string
  date: string
}>()

const emit = defineEmits<{
  (event: 'slide', dir: 'left' | 'right'): void
}>()
</script>

<template>
  <div
    class="relative rounded-xl"
    :class="{
      'z-10 shadow-[0_4px_8px_4px_rgba(0,0,0,0.32)]': active,
      'scale-90': !active,
    }">
    <div v-if="active" class="absolute bottom-0 left-0 right-0 top-0 z-10">
      <div class="absolute left-1/2 top-1/2 flex w-[110%] -translate-x-1/2 -translate-y-1/2 justify-between">
        <button aria-label="left" class="h-fit w-fit rounded-2xl bg-light-600 px-3 py-2 transition-colors hover:!bg-primary-500 hover:text-white dark:bg-dark-600" @click="emit('slide', 'left')">
          <NuxtIcon name="chevron-bold" class="text-[16px]" />
        </button>
        <button
          aria-label="right"
          class="h-fit w-fit rotate-180 rounded-2xl bg-light-600 px-3 py-2 transition-colors hover:!bg-primary-500 hover:text-white dark:bg-dark-600"
          @click="emit('slide', 'right')">
          <NuxtIcon name="chevron-bold" class="text-[16px]" />
        </button>
      </div>
      <div class="absolute bottom-2 right-2 flex gap-2">
        <NuxtLink
          aria-label="certificate"
          :to="`/certificates/${name}.pdf`"
          target="_blank"
          class="h-fit w-fit rounded-2xl bg-light-600 px-3 py-1 transition-colors hover:!bg-primary-500 hover:text-white dark:bg-dark-600">
          <NuxtIcon name="certificate" class="text-[16px]" />
        </NuxtLink>
        <NuxtLink aria-label="link" :to="link" target="_blank" class="h-fit w-fit rounded-2xl bg-light-600 px-3 py-1 transition-colors hover:!bg-primary-500 hover:text-white dark:bg-dark-600">
          <NuxtIcon name="web" class="text-[16px]" />
        </NuxtLink>
      </div>
    </div>
    <div class="aspect-[3/2] w-[18rem] overflow-hidden rounded-xl bg-light-500 dark:bg-dark-500 md:w-[28rem]">
      <NuxtImg :src="`/certificates/${name}.webp`" :alt="name" loading="lazy" class="h-full w-full scale-100 object-cover transition-transform hover:scale-110" />
    </div>
  </div>
</template>
