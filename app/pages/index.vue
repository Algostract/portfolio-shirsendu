<script setup lang="ts">
const title = `Fullstack Developer in Kolkata`
const description = `Shirsendu Bairagi is Fullstack Developer with more then 3 years of experience.
He had done more then a dozens production grade cutting edge projects in web, app, iot and ml.`

const {
  public: { siteUrl },
} = useRuntimeConfig()
const imageUrl = `${siteUrl}/previews/landing.webp`

useSeoMeta({
  title: title,
  ogTitle: title,
  twitterTitle: title,
  description: description,
  ogDescription: description,
  twitterDescription: description,
  ogImage: imageUrl,
  twitterImage: imageUrl,
  ogUrl: siteUrl,
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: 'Home', item: '/' }],
  }),
])

const { proxy: gaProxy } = useScriptGoogleAnalytics()

const isModalContactOpen = ref<boolean>(false)

function onContact(action: boolean) {
  if (action) {
    isModalContactOpen.value = true
    gaProxy.gtag('event', 'contact_open')
  } else {
    isModalContactOpen.value = false
    gaProxy.gtag('event', 'contact_close')
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
