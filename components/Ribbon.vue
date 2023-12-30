<script setup lang="ts">
import banner from '~~/assets/images/banner.svg?raw';

const props = defineProps<{ title: string }>();
</script>

<template>
  <div class="flex justify-center text-white font-body text-xs fill-primary-500">
    <div v-html="banner" class="relative top-[2px] scale-110" />
    <span class="mb-2 rounded-[4px] px-2 pt-[2px] pb-1 -translate-x-1 leading-[16px] bg-primary-500">
      {{ title }}
    </span>
  </div>
</template>