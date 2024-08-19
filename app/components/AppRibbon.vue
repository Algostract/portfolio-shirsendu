<script setup lang="ts">
import banner from '~/assets/images/banner.svg?raw'

defineProps<{ title: string }>()
</script>

<template>
  <div class="flex justify-center fill-primary-500 font-body text-xs text-white drop-shadow-md">
    <div class="relative top-[2px] scale-110" v-html="banner" />
    <span class="mb-2 -translate-x-1 rounded-[4px] bg-primary-500 px-2 pb-1 pt-[2px] leading-[16px]">
      {{ title }}
    </span>
  </div>
</template>
