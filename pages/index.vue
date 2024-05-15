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
  <AppHeader />
  <main class="relative flex flex-col gap-8 mx-auto p-4 md:p-8 !pb-0 max-w-[85rem]">
    <SectionHero @contact="onContact(true)" />
    <SectionProject />
    <SectionHackathon />
    <SectionExperience />
    <SectionCertificate />
    <ModelContact :is-open="isModelContactOpen" @close="onContact(false)" />
  </main>
  <AppFooter @contact="onContact" />
</template>