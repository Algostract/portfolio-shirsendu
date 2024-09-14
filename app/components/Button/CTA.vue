<script setup lang="ts">
const { primary = true } = defineProps<{ primary?: boolean }>()
</script>

<template>
  <button
    class="my-2 w-fit bg-primary-500 px-5 text-white transition-colors hover:bg-primary-400 md:mx-0"
    :class="primary ? 'rounded-lg rounded-br-3xl rounded-tl-3xl pb-3 pt-2 text-lg' : 'rounded-full pb-2 pt-1.5'">
    Contact with Me
  </button>
</template>
