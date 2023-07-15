<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean,
}>()
const emit = defineEmits<{
  (event: 'close'): void,
}>()

</script>

<template>
  <ModelBase :is-open="isOpen" @close="emit('close')" class="p-8 w-3/4 h-[30rem]">
    This is a Contact model
  </ModelBase>
</template>