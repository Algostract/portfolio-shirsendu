<script setup lang="ts">
const { proxy } = useScriptGoogleAnalytics()

const isModalContactOpen = ref<boolean>(false)

function onContact(action: boolean) {
  if (action) {
    isModalContactOpen.value = true
    proxy.gtag('event', 'contact_open')
  } else {
    isModalContactOpen.value = false
    proxy.gtag('event', 'contact_close')
  }
}
</script>

<template>
  <div>
    <AppHeader />
    <main class="relative mx-auto flex max-w-[85rem] flex-col gap-8 p-4 pb-0 md:p-8">
      <SectionHero @contact="onContact(true)" />
      <SectionProject />
      <SectionHackathon />
      <SectionExperience />
      <SectionCertificate />
      <LazyModalContact :is-open="isModalContactOpen" @close="onContact(false)" />
    </main>
    <AppFooter @contact="onContact" />
  </div>
</template>
