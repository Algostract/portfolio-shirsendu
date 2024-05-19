<template>
  <div v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
    class="fixed bottom-0 left-1/2 -translate-x-1/2" role="alert">
    <!-- <button
      class="flex gap-2 justify-center items-center mx-auto md:mx-0 my-1.5 px-5 py-1 w-fit rounded-full text-white bg-primary-500 hover:bg-primary-400 transition-colors"
      @click="$pwa?.install()">
      <NuxtIcon name="cloud-arrow" class="text-[20px]" />
      <span class="pb-1">Install</span>
    </button> -->
    <button class="pt-2.5 pb-1 px-2 rounded-t-full bg-primary-500 hover:bg-primary-400 transition-colors"
      @click="$pwa?.install()">
      <NuxtIcon name="logo" class="text-[28px] text-dark-400" />
    </button>
  </div>
</template>