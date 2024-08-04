<script setup lang="ts">
const isModelContactOpen = ref<boolean>(false)

function onContact(action: boolean) {
  if (action) {
    isModelContactOpen.value = true
    useTrackEvent('contact_open')
  } else {
    isModelContactOpen.value = false
    useTrackEvent('contact_close')
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
      <LazyModelContact :is-open="isModelContactOpen" @close="onContact(false)" />
    </main>
    <AppFooter @contact="onContact" />
  </div>
</template>
