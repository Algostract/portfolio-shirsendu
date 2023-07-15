<script setup lang="ts">
const emit = defineEmits<{ (event: 'contact'): void }>()
</script>

<template>
  <ul class="flex items-center gap-7 mb-4 w-full">
    <li><a href="#project">Projects</a></li>
    <li><a href="#hackathon">Hackathons</a></li>
    <li class="ml-auto">
      <button class="rounded-full px-9 pt-[6px] pb-2 text-white bg-primary-400 active:bg-primary-300 transition-colors"
        @click="emit('contact')">
        Contact
      </button>
    </li>
  </ul>
</template>