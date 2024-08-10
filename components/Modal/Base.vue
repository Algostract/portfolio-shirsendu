<script setup lang="ts">
defineProps<{ isOpen: boolean; innerClass: string }>()
const emit = defineEmits<{
  (event: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center overflow-y-auto bg-black/50" @click.self="emit('close')">
        <dialog open class="relative mx-4 h-min w-full max-w-[700px] rounded-xl bg-white text-black dark:bg-dark-400 dark:text-white md:mx-auto" :class="innerClass">
          <button aria-label="close" class="absolute right-2 top-2" @click="emit('close')">
            <NuxtIcon name="cross" class="text-[24px] transition-colors hover:text-alert-500" />
          </button>
          <slot />
        </dialog>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  @apply transition-opacity;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}
</style>
