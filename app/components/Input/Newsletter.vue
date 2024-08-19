<script setup lang="ts">
const emit = defineEmits<{ (event: 'subscribe', email: string): void }>()

const email = ref<string>()
</script>

<template>
  <div
    class="mx-auto flex h-fit w-full max-w-[328px] justify-between rounded-full bg-light-500 py-[6px] pl-6 pr-[6px] align-middle shadow-[2px_2px_6px_0px_rgba(0,0,0,0.38)] outline-2 outline-offset-2 outline-primary-500 transition-[outline] duration-300 focus-within:outline dark:bg-dark-500 sm:max-w-[400px] md:max-w-[472px]">
    <input v-model="email" type="email" placeholder="Email address" class="mr-2 w-full bg-transparent outline-none" />
    <button type="submit" aria-label="subscribe" class="justify-self-end rounded-full bg-primary-500 p-2 transition-colors hover:bg-primary-400" @click="email && emit('subscribe', email)">
      <NuxtIcon name="paper-plane" class="text-[24px] text-light-400 dark:text-dark-400" />
    </button>
  </div>
</template>
