<script setup lang="ts">
// TODO: Refactor props type when supported
// import type { Project } from '~/utils/types'

interface Project {
  name: string
  description: string
  version: string
  forks: number
  stars: number
  createdAt: string
  updatedAt: string
  technologies: Technologies[]
  repo: string | null
  appUrl: string | null
  videoUrl: string | null
  images: Image[]
}

const props = defineProps<Project>()
const emit = defineEmits<{ watch: [] }>()

const { proxy: gaProxy } = useScriptGoogleAnalytics()

const modifiedIn = useTimeAgo(() => props.updatedAt, {
  messages: {
    invalid: 'Invalid Date',
    past: (n: number | string) => (typeof n === 'string' && n.match(/\d/) ? `Updated ${n} ago` : `${n}`),
    justNow: 'Recharge',
    future: (n: number | string) => (typeof n === 'string' && n.match(/\d/) ? `Update in ${n}` : `${n}`),
    year: (n: number) => `${n} year${n > 1 ? 's' : ''}`,
    month: (n: number) => `${n} month${n > 1 ? 's' : ''}`,
    week: (n: number) => `${n} week${n > 1 ? 's' : ''}`,
    day: (n: number) => `${n} day${n > 1 ? 's' : ''}`,
    hour: (n: number) => `${n} hour${n > 1 ? 's' : ''}`,
    minute: (n: number) => `${n} min`,
    second: (n: number) => `${n} sec`,
  },
})
const createdAtFormatted = useDateFormat(props.createdAt, 'MMM D, YYYY')

const splideOption = {
  type: 'loop',
  arrows: false,
  autoplay: true,
  cover: true,
  heightRatio: 0.56,
  lazyLoad: 'nearby',
}
const splide = useTemplateRef<HTMLDivElement>('splide')
const currentSlideIndex = ref(0)
function onSlideMove(_splide: never, newIndex: number, _prevIndex: number, _destIndex: number) {
  currentSlideIndex.value = newIndex
}

function onWatch() {
  gaProxy.gtag('event', 'watch', { app: props.name })
  emit('watch')
}

function onTry() {
  gaProxy.gtag('event', 'try', { app: props.name })
}
</script>

<template>
  <div class="card relative mx-auto w-full min-w-[328px] max-w-[400px] grow transition-transform">
    <AppRibbon :title="modifiedIn" class="absolute -left-[5px] top-4 z-10" />
    <div class="relative">
      <div class="absolute left-0 top-0 size-full">
        <div class="gradient-border gradient-border-dark overflow-hidden rounded-bl-[0.5rem] rounded-br-[2.25rem] rounded-tl-[2.25rem] rounded-tr-[0.5rem]" />
      </div>
      <div
        class="content relative flex aspect-[1.215/1] w-full flex-col gap-[10px] overflow-hidden rounded-bl-[0.5rem] rounded-br-[2.25rem] rounded-tl-[2.25rem] rounded-tr-[0.5rem] bg-light-500 p-[10px] dark:bg-dark-600">
        <div class="relative aspect-video w-full overflow-hidden rounded-[20px] bg-light-600 dark:bg-dark-400">
          <ul class="absolute right-[0.875rem] top-2 z-20 flex gap-1">
            <li
              v-for="track in range(images.length)"
              :key="track"
              class="h-[4px] w-[28px] cursor-pointer rounded-full rounded-bl-none rounded-tr-none duration-300"
              :class="currentSlideIndex === track ? 'bg-primary-400' : 'bg-light-500 dark:bg-dark-600'"
              @click="splide!.go(track)"></li>
          </ul>
          <Splide ref="splide" :options="splideOption" tag="div" :has-track="false" class="size-full" @splide:move="onSlideMove">
            <SplideTrack>
              <SplideSlide v-for="{ id, title } in images" :key="id">
                <!-- <NuxtImg provider="uploadcare" :src="id" :alt="title" :width="380" :height="270" loading="lazy" class="size-full" /> -->
                <img :data-splide-lazy="`https://ucarecdn.com/${id}/-/resize/480x270/`" :alt="title" :width="480" :height="270" class="size-full" />
              </SplideSlide>
            </SplideTrack>
            <!-- <div
              class="splide__arrows absolute flex justify-between items-center top-0 px-2 size-full z-10 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity">
              <button aria-label="left" class="splide__arrow splide__arrow--prev w-1/3">
                <NuxtIcon name="local:chevron-bold" />
              </button>
              <button aria-label="right" class="splide__arrow splide__arrow--next rotate-180 w-1/3">
                <NuxtIcon name="local:chevron-bold" />
              </button>
            </div> -->
          </Splide>
          <NuxtLink
            v-if="repo"
            :to="repo"
            :external="true"
            target="_blank"
            class="absolute bottom-2 left-2 z-20 flex items-center gap-1 rounded-full bg-light-500 py-1 pl-1.5 pr-2 outline-primary-400 transition-colors duration-150 ease-in hover:bg-light-400 hover:outline dark:bg-dark-600 dark:hover:bg-dark-500">
            <NuxtIcon name="local:github" class="size-[16px]" />
            <span class="text-xs">{{ stars }} Stars</span>
          </NuxtLink>
          <NuxtLink
            v-if="videoUrl !== null"
            :to="videoUrl"
            :external="true"
            target="_blank"
            class="absolute bottom-1 right-2 z-20 flex items-center gap-1 fill-white text-white drop-shadow hover:drop-shadow-md"
            @click="onWatch">
            <span class="text-xs">Watch</span>
            <NuxtIcon name="local:youtube" class="size-[30px]" />
          </NuxtLink>
        </div>
        <div class="grid flex-grow grid-cols-[repeat(2,auto)] grid-rows-[min-content_auto] gap-y-1 px-1 md:px-2">
          <span class="flex items-end gap-1 lg:gap-2">
            <span class="whitespace-nowrap text-lg font-semi-bold">{{ name }}</span>
            <span class="h-fit w-fit rounded-full bg-light-600 px-[8px] pb-1 pt-[3px] text-center text-xs text-black/75 dark:bg-dark-400 dark:text-white/75">
              {{ version }}
            </span>
          </span>
          <NuxtTime :datetime="createdAt" day="numeric" month="short" year="numeric" class="col-start-2 row-start-1 self-end justify-self-end whitespace-nowrap py-1 text-xs">
            {{ createdAtFormatted }}
          </NuxtTime>
          <p class="col-span-2 col-start-1 row-start-2 line-clamp-2 text-xs opacity-60 md:text-base">
            {{ description }}
          </p>
          <div class="scrollbar-hidden col-span-full mt-1 flex w-4/5 gap-2 overflow-x-scroll p-0.5">
            <TechBadge v-for="tech in technologies" :key="tech" :tech="tech" />
          </div>
        </div>
        <NuxtLink
          v-if="appUrl !== null"
          :to="appUrl"
          :external="true"
          target="_blank"
          class="absolute bottom-0 right-0 z-10 inline-block cursor-pointer rounded-tl-[1.25rem] bg-primary-500 px-6 py-2 text-xs text-white transition-colors hover:bg-primary-400"
          @click="onTry">
          Try Now
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.gradient-border {
  background-size: 600% 600%;
  transform: translate(-2px, -2px);
  @apply absolute left-0 top-0 -z-10 h-[calc(100%+4px)] w-[calc(100%+4px)] opacity-0;
}

.card:hover .gradient-border {
  @apply animate-gradient-rotate opacity-100 transition-all duration-300 ease-linear;
}

.gradient-border-dark {
  /* 6860fa */
  background: linear-gradient(1turn, hsla(213, 94%, 68%, 0.1), hsla(213, 94%, 68%, 0.6), hsla(213, 94%, 68%, 1), hsla(213, 94%, 68%, 0.4));
  background: linear-gradient(var(--gradient-angle), hsla(213, 94%, 68%, 0.1), hsla(213, 94%, 68%, 0.6), hsla(213, 94%, 68%, 1), hsla(213, 94%, 68%, 0.4));
}
</style>
