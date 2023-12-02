<script setup lang="ts">
import line from "@/assets/images/line.svg?raw";

const selectedModel = ref<"contact" | null>(null)
function onContact(action: boolean) {
  if (action) {
    selectedModel.value = 'contact'
    useTrackEvent('contact_open')
  } else {
    selectedModel.value = null
    useTrackEvent('contact_close')
  }
}

async function onSubscribe(email: string) {
  useTrackEvent('subscribe')

  await useFetch('/api/newsletter', {
    method: 'POST',
    body: { email, subscribed: true }
  })

}
</script>

<template>
  <main class="relative flex flex-col gap-8 mx-auto p-4 md:p-8 !pb-0 max-w-[85rem]">
    <header>
      <Navbar @contact="onContact(true)" />
    </header>
    <SectionIntro />
    <SectionProject />
    <SectionHackathon />
    <SectionExperience />
    <!-- <SectionTool /> -->
    <footer
      class="relative left-1/2 -translate-x-1/2 grid grid-rows-[min-content_1fr_min-content_min-content] md:grid-rows-[min-content_1fr_min-content] grid-cols-2 md:grid-cols-[min-content_1fr_min-content] justify-items-center items-center gap-4 md:gap-8 mt-10 p-4 md:p-8 rounded-t-[2.25rem] w-screen">
      <div class="row-start-1 col-start-1 col-span-2 md:col-span-3 relative w-full">
        <div v-html="line" class="absolute left-0 right-0 top-0 -translate-y-1/2" />
        <NuxtIcon name="logo" class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-[32px] md:text-[48px]"
          filled />
      </div>
      <h6 class="row-start-2 col-start-1 col-span-2 md:col-start-2 md:col-span-1 text-center md:text-lg mt-4">
        Want to get latest updates of My Projects<br />
        Join the weekly Newsletter
      </h6>
      <NewsletterBox class="row-start-3 col-start-1 col-span-2 md:col-start-2 md:col-span-1" @subscribe="onSubscribe" />
      <ul class="row-start-4 md:row-start-3 col-start-1 justify-self-start flex gap-5 md:gap-8">
        <li>
          <NuxtLink href="https://leetcode.com" target="_blank">
            <NuxtIcon name="leetcode"
              class="text-[32px] md:text-[42px] opacity-60 hover:opacity-100 transition-opacity" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink href="https://devpost.com/shba007" target="_blank">
            <NuxtIcon name="devpost" class="text-[32px] md:text-[42px] opacity-60 hover:opacity-100 transition-opacity" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink href="https://github.com/shba007" target="_blank">
            <NuxtIcon name="github" class="text-[32px] md:text-[42px] opacity-60 hover:opacity-100 transition-opacity" />
          </NuxtLink>
        </li>
      </ul>
      <ul class="row-start-4 md:row-start-3 col-start-2 md:col-start-3 justify-self-end flex gap-5 md:gap-8">
        <li>
          <NuxtLink href="https://x.com/shirsendu_baira" target="_blank">
            <NuxtIcon name="X" class="text-[32px] md:text-[42px] opacity-60 hover:opacity-100 transition-opacity" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink href="https://www.linkedin.com/in/shirsendu-bairagi/" target="_blank">
            <NuxtIcon name="linkedin"
              class="text-[32px] md:text-[42px] opacity-60 hover:opacity-100 transition-opacity" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink href="https://www.youtube.com/@shirsendu_bairagi/videos" target="_blank">
            <NuxtIcon name="youtube" class="text-[32px] md:text-[42px] opacity-60 hover:opacity-100 transition-opacity" />
          </NuxtLink>
        </li>
      </ul>
    </footer>
    <ModelContact :is-open="selectedModel === 'contact'" @close="onContact(false)" />
  </main>
</template>
