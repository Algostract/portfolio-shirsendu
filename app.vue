<script setup lang="ts">
import photoDark from '~~/assets/images/photo-dark.png';
import photoLight from '~~/assets/images/photo-light.png';

useHead({
  titleTemplate: "Shirsendu's Portfolio"
})

useSchemaOrg([
  definePerson({
    name: "Shirsendu Bairagi",
    description: "I am a Web Developer and an AI Enthusiast",
    image: "/previews/landing.png",
    sameAs: [
      "https://github.com/shba007",
      "https://twitter.com/shirsendu_2001",
      "https://www.linkedin.com/in/shirsendu-bairagi-28b4b1213",
    ],
  }),
  defineWebSite({
    name: "Shirsendu's Portfolio",
    description: `My developer's portfolio showcasing my skills, projects,
    and expertise in a visually appealing manner`
  }),
  defineWebPage({
    datePublished: new Date(14, 6, 2023).toISOString(),
    dateModified: new Date(14, 6, 2023).toISOString(),
    author: 'Shirsendu Bairagi',
  }),
])

const colorMode = useColorMode()
const photo = computed(() => {
  return (colorMode.preference == 'dark') ? photoDark : photoLight
})

const dob = ref(new Date(2001, 0, 29))
const age = useTimeAgo(() => dob.value ?? "", {
  messages: {
    invalid: 'Invalid Date',
    past: (n: any) => n.match(/\d/) ? `${n}` : n,
    justNow: 'Born Today',
    future: 'To be Born',
    year: (n: number) => n.toString(),
  }
})

const journeyStartDate = ref(new Date(2021, 3, 21))
const now = useNow({ interval: 3600 })
const experience = computed(() => {
  const startYear = journeyStartDate.value.getFullYear();
  const startMonth = journeyStartDate.value.getMonth();
  const endYear = now.value.getFullYear();
  const endMonth = now.value.getMonth();

  const yearDiff = endYear - startYear;
  const monthDiff = endMonth - startMonth;

  const yearString = `${yearDiff > 0 ? yearDiff : 0} Year`;
  const monthString = `${monthDiff > 0 ? monthDiff : 0} Month`

  return `${yearString} ${monthString}`;
})

const { data: projects, pending, error } = await useFetch('/api/project')
</script>

<template>
  <main class="mx-auto p-4 md:p-8 pb-0 max-w-[85rem] h-screen">
    <header>
      <Navbar />
    </header>
    <section id="intro" class="flex flex-col md:flex-row md:justify-between gap-10 md:gap-4 my-10 lg:my-16">
      <div class="flex flex-col gap-4 md:my-8">
        <h1 class="text-2xl text-center md:text-left md:text-4xl lg:text-5xl">
          Hi, I am a <br />Web Developer and <br />an AI Enthusiast
        </h1>
        <h2 class="mx-auto md:mx-0 w-fit opacity-60 md:text-lg">My name is Shirsendu Bairagi, Age {{ age }}</h2>
        <div
          class="mx-auto md:mx-0 my-2 rounded-tl-3xl rounded-br-3xl rounded-bl-lg rounded-tr-lg px-5 py-3 w-fit bg-primary-400 text-lg text-white">
          {{ experience }} +XP
        </div>
      </div>
      <div class="grid grid-rows-[1fr_2fr_1fr] lg:grid-rows-2 lg:gap-x-20 lg:gap-y-36 grid-cols-3 justify-items-stretch">
        <SkillHex :quadrant="1" />
        <SkillHex :quadrant="2" />
        <div
          class="row-start-2 lg:row-start-1 lg:row-span-2 col-start-2 justify-self-center self-center relative scale-[1.867] lg:scale-[2.8005] max-w-[200px]">
          <div class="rotate-[30deg] -z-10">
            <NuxtIcon name="hexagon" class="text-[120px] text-light-500 dark:text-dark-600" />
          </div>
          <svg class="absolute -top-[3.375rem] scale-90 w-full" viewBox="0 0 202 310" fill="none"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <mask id="clip-mask" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="202" height="310">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M202 0H0.999998V152H1.05919C1.04626 152.317 1.03966 152.636 1.03946 152.955L0.986608 241.399C0.981532 249.893 5.51114 257.738 12.8692 261.98L89.4902 306.157C96.8483 310.399 105.917 310.394 113.28 306.142L189.954 261.875C197.317 257.624 201.856 249.773 201.861 241.279L201.914 152.835C201.914 152.556 201.909 152.278 201.9 152H202V0Z"
                fill="white" />
            </mask>
            <g mask="url(#clip-mask)">
              <rect x="-11" y="11" width="224" height="298" fill="url(#pattern0)" />
            </g>
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#clip-image" transform="matrix(0.00123181 0 0 0.000925926 -0.00134755 0)" />
              </pattern>
              <image id="clip-image" :href="photo" alt="photo" />
            </defs>
          </svg>
        </div>
        <SkillHex :quadrant="3" />
        <SkillHex :quadrant="4" />
      </div>
    </section>
    <section id="project" class="relative left-1/2 -translate-x-1/2 w-screen">
      <h2 class="mx-auto w-fit text-lg lg:text-xl">All Projects</h2>
      <div class="flex flex-wrap gap-8 my-8 px-4 py-4 max-h-[1120px] overflow-x-hidden overflow-y-scroll">
        <ProjectCard
          v-for="{ name, description, version, stars, forks, createdAt, updatedAt, appURL, videoURL } in projects"
          :name="name" :description="description" :version="version" :stars="stars" :forks="forks" :createdAt="createdAt"
          :updatedAt="updatedAt" :appURL="appURL" :videoURL="videoURL" />
      </div>
    </section>
    <section id="hackathon">
      <h2 class="mx-auto w-fit text-lg lg:text-xl">All Hackathons</h2>
      <div class="flex flex-col gap-4 my-8">
      </div>
    </section>
    <footer
      class="relative left-1/2 -translate-x-1/2 flex flex-col gap-4 md:gap-8 p-4 pt-6 rounded-t-[2.25rem] w-screen bg-primary-400 text-white">
      <p class="text-center md:text-lg">Want to get latest updates of My Projects<br />Join the weekly Newsletter</p>
      <NewsletterBox />
    </footer>
  </main>
</template>

<style>
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  scrollbar-width: 6px
}

*::-webkit-scrollbar {
  @apply block w-[6px] bg-light-400 dark:bg-dark-400;
}

*::-webkit-scrollbar-thumb {
  @apply rounded-md bg-light-600 dark:bg-dark-600;
}

body {
  @apply font-body text-black dark:text-white bg-light-400 dark:bg-dark-400 overflow-x-hidden;
}

.nuxt-icon>svg {
  @apply !m-0;
}

.scrollbar-hidden {
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}
</style>