<script setup lang="ts">
const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{
  (event: 'close'): void,
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 flex items-center bg-black/50 z-50 overflow-y-auto">
      <dialog open
        class="relative max-w-[700px] h-min rounded-xl text-black dark:text-white bg-light-400 dark:bg-dark-500"
        v-bind="$attrs">
        <button class="absolute top-4 right-4" @click="emit('close')">
          <NuxtIcon name="cross" class="text-[24px]" />
        </button>
        <slot />
      </dialog>
    </div>
  </Teleport>
</template>