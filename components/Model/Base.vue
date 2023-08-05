<script setup lang="ts">
const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{
  (event: 'close'): void,
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 flex items-center bg-black/50 z-50 overflow-y-auto">
      <dialog open class="relative max-w-[700px] h-min rounded-xl text-black dark:text-white bg-white dark:bg-dark-400"
        v-bind="$attrs">
        <button class="absolute top-2 right-2" @click="emit('close')">
          <NuxtIcon name="cross" class="text-[24px]" />
        </button>
        <slot />
      </dialog>
    </div>
  </Teleport>
</template>