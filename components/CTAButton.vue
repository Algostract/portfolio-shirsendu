<script setup lang="ts">
const { primary } = withDefaults(defineProps<{ primary?: boolean }>(), { primary: true })
</script>

<template>
  <button class="mx-auto md:mx-0 my-2 px-5 w-fit text-white bg-primary-500 hover:bg-primary-400 transition-colors"
    :class="primary ? 'rounded-lg rounded-tl-3xl rounded-br-3xl pt-2 pb-3 text-lg' : 'rounded-full pt-1.5 pb-2'">
    Contact with Me
  </button>
</template>