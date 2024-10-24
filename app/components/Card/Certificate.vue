<script setup lang="ts">
// TODO: Refactor props type when supported
// import type { Certificate } from '~/utils/types'

interface Certificate {
  name: string
  link: string
  date: string
  image: {
    id: string
    title: string
  }
}

withDefaults(defineProps<Certificate & { active?: boolean }>(), {
  active: false,
})
</script>

<template>
  <div :key="name" class="relative rounded-xl duration-300" :class="{ 'z-10 scale-110 shadow-[0_4px_8px_4px_rgba(0,0,0,0.32)]': active }">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-show="active" class="absolute bottom-2 right-2 z-10 flex gap-2">
        <NuxtLink
          :to="`/certificates/${slugify(name)}.pdf`"
          :external="true"
          aria-label="certificate"
          target="_blank"
          class="h-fit w-fit rounded-2xl bg-light-600 px-3 py-1 transition-colors hover:bg-primary-500 hover:text-white dark:bg-dark-600 dark:hover:bg-primary-500">
          <NuxtIcon name="certificate" class="text-[16px]" />
        </NuxtLink>
        <NuxtLink
          :to="link"
          :external="true"
          target="_blank"
          aria-label="link"
          class="h-fit w-fit rounded-2xl bg-light-600 px-3 py-1 transition-colors hover:bg-primary-500 hover:text-white dark:bg-dark-600 dark:hover:bg-primary-500">
          <NuxtIcon name="web" class="text-[16px]" />
        </NuxtLink>
      </div>
    </Transition>
    <div class="overflow-hidden rounded-xl bg-light-500 dark:bg-dark-500">
      <!-- <NuxtImg provider="uploadcare" :src="image.id" :alt="image.title" :width="512" :height="288" loading="lazy" fit="contain" class="size-full transition-transform hover:scale-110" /> -->
      <img :data-splide-lazy="`https://ucarecdn.com/${image.id}/-/resize/896x598/-/stretch/off/`" :alt="image.title" :width="896" :height="598" class="size-full duration-300 hover:scale-110" />
    </div>
  </div>
</template>
