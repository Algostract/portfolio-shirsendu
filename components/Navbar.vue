<script setup lang="ts">
const emit = defineEmits<{ (event: 'contact'): void }>()
</script>

<template>
  <ul class="flex items-center justify-between w-full">
    <li class="flex gap-7">
      <a href="#project">Projects</a>
      <a href="#hackathon">Hackathons</a>
    </li>
    <li class="relative hidden sm:inline">
      <NuxtIcon name="logo" class="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 text-[56px] md:text-[64px]"
        filled />
    </li>
    <li class="flex gap-2">
      <ColorModeButton />
      <button class="rounded-full px-9 pt-[6px] pb-2 text-white bg-primary-400 active:bg-primary-300 transition-colors"
        @click="emit('contact')">
        Contact
      </button>
    </li>
  </ul>
</template>