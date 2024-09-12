<script setup lang="ts">
const { proxy: gaProxy } = useScriptGoogleAnalytics()

function onNavigate(section: string) {
  gaProxy.gtag('event', 'navigate', { section })
}
</script>

<template>
  <header class="relative mx-auto p-4 !pb-0 md:p-8">
    <nav class="flex items-center justify-between">
      <ul class="hidden gap-7 md:flex">
        <li>
          <NuxtLink to="#project" @click="onNavigate('project')"> Projects </NuxtLink>
        </li>
        <li>
          <NuxtLink to="#hackathon" @click="onNavigate('hackathon')"> Hackathons </NuxtLink>
        </li>
        <li>
          <NuxtLink to="#experience" @click="onNavigate('experience')"> Experiences </NuxtLink>
        </li>
        <li>
          <NuxtLink to="#certificate" @click="onNavigate('certificate')"> Certificates </NuxtLink>
        </li>
        <li>
          <NuxtLink to="#about" @click="onNavigate('about')"> About Me </NuxtLink>
        </li>
      </ul>
      <div class="ml-auto flex items-center gap-2">
        <ButtonColorMode />
      </div>
    </nav>
  </header>
</template>
