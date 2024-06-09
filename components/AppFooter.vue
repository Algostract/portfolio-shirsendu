<script setup lang="ts">
import line from '@/assets/images/line.svg?raw'

const emit = defineEmits<{
  (event: 'contact', action: boolean): void
}>()

async function onSubscribe(email: string) {
  useTrackEvent('subscribe')

  await useFetch('/api/newsletter', {
    method: 'POST',
    body: { email, subscribed: true },
  })
}
</script>

<template>
  <footer
    class="relative left-1/2 mt-28 grid w-screen -translate-x-1/2 grid-cols-2 grid-rows-[min-content_1fr_min-content_min-content] items-center justify-items-center gap-4 rounded-t-[2.25rem] p-4 md:grid-cols-[min-content_1fr_min-content] md:grid-rows-[min-content_1fr_min-content] md:gap-8 md:p-8">
    <CTAButton :primary="false" class="absolute -top-20" @click="emit('contact', true)" />
    <div class="relative col-span-2 col-start-1 row-start-1 w-full md:col-span-3">
      <div class="absolute -left-8 -right-8 top-0 -translate-y-1/2 text-light-500 dark:text-dark-500" v-html="line" />
      <NuxtIcon name="logo" class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-[32px] md:text-[48px]" filled />
    </div>
    <h4 class="col-span-2 col-start-1 row-start-2 mt-4 text-center md:col-span-1 md:col-start-2 md:text-lg">
      Want to get latest updates of My Projects<br />
      Join the weekly Newsletter
    </h4>
    <NewsletterBox class="col-span-2 col-start-1 row-start-3 md:col-span-1 md:col-start-2" @subscribe="onSubscribe" />
    <ul class="col-start-1 row-start-4 flex gap-5 justify-self-start md:row-start-3 md:gap-8">
      <li>
        <NuxtLink aria-label="leetcode" to="https://leetcode.com/shba007" target="_blank">
          <NuxtIcon name="leetcode" class="text-[32px] opacity-60 transition-opacity hover:opacity-100 md:text-[42px]" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink aria-label="devpost" to="https://devpost.com/shba007" target="_blank">
          <NuxtIcon name="devpost" class="text-[32px] opacity-60 transition-opacity hover:opacity-100 md:text-[42px]" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink aria-label="github" to="https://github.com/shba007" target="_blank">
          <NuxtIcon name="github" class="text-[32px] opacity-60 transition-opacity hover:opacity-100 md:text-[42px]" />
        </NuxtLink>
      </li>
    </ul>
    <ul class="col-start-2 row-start-4 flex gap-5 justify-self-end md:col-start-3 md:row-start-3 md:gap-8">
      <li>
        <NuxtLink aria-label="X" to="https://x.com/shirsendu_baira" target="_blank">
          <NuxtIcon name="X" class="text-[32px] opacity-60 transition-opacity hover:opacity-100 md:text-[42px]" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink aria-label="linkedin" to="https://www.linkedin.com/in/shirsendu-bairagi" target="_blank">
          <NuxtIcon name="linkedin" class="text-[32px] opacity-60 transition-opacity hover:opacity-100 md:text-[42px]" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink aria-label="youtube" to="https://www.youtube.com/@shirsendu_bairagi/videos" target="_blank">
          <NuxtIcon name="youtube" class="text-[32px] opacity-60 transition-opacity hover:opacity-100 md:text-[42px]" />
        </NuxtLink>
      </li>
    </ul>
  </footer>
</template>
