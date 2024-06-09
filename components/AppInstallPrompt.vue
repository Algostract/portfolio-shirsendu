<script setup lang="ts">
const { $pwa } = useNuxtApp()
</script>

<template>
  <div v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh" class="fixed -bottom-0.5 left-1/2 z-50 -translate-x-1/2" role="alert">
    <button class="rounded-t-full bg-primary-500 px-2 pb-1 pt-2.5 transition-colors hover:bg-primary-400" @click="$pwa?.install()">
      <NuxtIcon name="logo" class="text-[28px] text-dark-400" />
    </button>
  </div>
</template>
