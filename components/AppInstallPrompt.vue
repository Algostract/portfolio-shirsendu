<template>
  <div v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
    class="fixed -bottom-0.5 left-1/2 -translate-x-1/2 z-50" role="alert">
    <button class="pt-2.5 pb-1 px-2 rounded-t-full bg-primary-500 hover:bg-primary-400 transition-colors"
      @click="$pwa?.install()">
      <NuxtIcon name="logo" class="text-[28px] text-dark-400" />
    </button>
  </div>
</template>