<script setup lang="ts">
const emit = defineEmits<{ (event: 'subscribe', email: string): void }>()

const email = ref<string>()
</script>

<template>
  <div
    class="flex justify-between mx-auto rounded-full pl-6 pr-[6px] py-[6px] w-full max-w-[328px] sm:max-w-[400px] md:max-w-[472px] align-middle bg-light-400 dark:bg-dark-400 focus-within:outline outline-offset-2 outline-2 outline-light-400 dark:outline-dark-400 transition-[outline] duration-300 shadow-[2px_2px_6px_0px_rgba(0,0,0,0.38)]">
    <input type="text" placeholder="Email address" class="w-full mr-2 bg-transparent outline-none" v-model="email">
    <button type="submit" class="justify-self-end rounded-full p-2 bg-primary-400 hover:bg-primary-300 transition-colors"
      @click="email && emit('subscribe', email)">
      <NuxtIcon name="paper-plane" class="text-[24px] text-light-400 dark:text-dark-400" />
    </button>
  </div>
</template>