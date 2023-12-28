<script setup lang="ts">
const emit = defineEmits<{ (event: 'contact'): void }>()
</script>

<template>
  <nav class="flex items-center justify-between">
    <ul class="hidden md:flex gap-7">
      <li><NuxtLink to="#project">Projects</NuxtLink></li>
      <li><NuxtLink to="#hackathon">Hackathons</NuxtLink></li>
      <li><NuxtLink to="#experience">Experiences</NuxtLink></li>
      <li><NuxtLink to="#certificate">Certificates</NuxtLink></li>
      <li><NuxtLink to="#about">About Me</NuxtLink></li>
    </ul>
      <div class="flex gap-2 items-center ml-auto">
        <ColorModeButton />
        <button class="rounded-full px-9 pt-[6px] pb-2 text-white bg-primary-400 active:bg-primary-300 transition-colors"
          @click="emit('contact')">
          Contact
        </button>
      </div>
  </nav>
</template>