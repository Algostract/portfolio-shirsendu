<script setup lang="ts">
import iconLogo from '~/assets/icons/logo.svg'

const { $pwa } = useNuxtApp()
const { proxy: gaProxy } = useScriptGoogleAnalytics()

function onInstall() {
  gaProxy.gtag('event', 'install')
  $pwa?.install()
}
</script>

<template>
  <div v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh" class="fixed -bottom-0.5 left-1/2 z-50 -translate-x-1/2" role="alert">
    <button class="rounded-t-full bg-primary-500 px-2 pb-1 pt-2.5 transition-colors hover:bg-primary-400" @click="onInstall">
      <img :src="iconLogo" alt="logo" :width="28" :height="28" class="brightness-0" />
    </button>
  </div>
</template>
