<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://shirsendu-bairagi.dev',
    },
  ],
})

useSeoMeta({
  ogType: "profile",
  title: "Shirsendu's Portfolio",
  ogTitle: "Shirsendu's Portfolio",
  description: "I am a Web Developer and an AI Enthusiast, this is my developer's portfolio showcasing my skills, projects, and expertise in a visually appealing manner",
  ogDescription: "I am a Web Developer and an AI Enthusiast, this is my developer's portfolio showcasing my skills, projects, and expertise in a visually appealing manner",
  ogImage: "https://shirsendu-bairagi.dev/previews/landing.jpg",
  ogImageWidth: 1280,
  ogImageHeight: 640,
  ogUrl: 'https://shirsendu-bairagi.dev',
  fbAppId: 966242223397117,
  twitterCard: "summary_large_image",
})

useSchemaOrg([
  definePerson({
    name: "Shirsendu Bairagi",
    description: "I am a Web Developer and an AI Enthusiast",
    image: "https://shirsendu-bairagi.dev/logo.png",
    sameAs: [
      "https://github.com/shba007",
      "https://www.linkedin.com/in/shirsendu-bairagi-28b4b1213",
      "https://www.youtube.com/@shirsendu_bairagi",
      "https://twitter.com/shirsendu_2001",
      "https://www.instagram.com/shirsendu_bairagi",
      "https://www.facebook.com/shirsendu.bairagi.1"
    ],
  }),
  defineWebSite({
    name: "Shirsendu's Portfolio",
    description: `I am a Web Developer and an AI Enthusiast, this is my 
    developer's portfolio showcasing my skills, projects,
    and expertise in a visually appealing manner`,
  }),
  defineWebPage({
    datePublished: new Date(2023, 5, 14).toISOString(),
    dateModified: new Date(2023, 5, 20).toISOString(),
    author: "Shirsendu Bairagi",
  }),
])

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
    <!-- <SectionTool /> -->
    <footer
      class="relative left-1/2 -translate-x-1/2 flex flex-col gap-4 md:gap-8 p-4 pt-6 rounded-t-[2.25rem] w-screen bg-primary-400 text-white">
      <h6 class="text-center md:text-lg">Want to get latest updates of My Projects<br />Join the weekly Newsletter</h6>
      <NewsletterBox @subscribe="onSubscribe" />
    </footer>
    <ModelContact :is-open="selectedModel === 'contact'" @close="onContact(false)" />
  </main>
</template>
