<script setup lang="ts">
import { type Options, Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import type { Technologies } from '~/utils/models';
// import { Project } from 'utils/models';

interface Project {
  name: string;
  description: string;
  version: string;
  forks: number;
  stars: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  technologies: Technologies[];
  repoURL: string;
  appURL: string | null;
  videoURL: string | null;
}

const props = defineProps<Project>()
const emit = defineEmits<{ (event: 'watch'): void }>()

const modifiedIn = useTimeAgo(() => props.updatedAt, {
  messages: {
    invalid: 'Invalid Date',
    past: (n: any) => n.match(/\d/) ? `Updated ${n} ago` : n,
    justNow: 'Recharge',
    future: (n: any) => n.match(/\d/) ? `Update in ${n}` : n,
    year: (n: number) => `${n} year${n > 1 ? 's' : ''}`,
    month: (n: number) => `${n} month${n > 1 ? 's' : ''}`,
    week: (n: number) => `${n} week${n > 1 ? 's' : ''}`,
    day: (n: number) => `${n} day${n > 1 ? 's' : ''}`,
    hour: (n: number) => `${n} hour${n > 1 ? 's' : ''}`,
    minute: (n: number) => `${n} min`,
    second: (n: number) => `${n} sec`,
  }
})
const createdAtFormatted = useDateFormat(props.createdAt, 'MMM D, YYYY')

const splideOption: Options = {
  type: 'loop',
  arrows: true,
  autoplay: true,
  cover: true,
  heightRatio: 0.56,
};
const splide = ref();
const currentPage = ref(0)
function onPaginationUpdate(_slide: any, list: { items: string | any[]; }, _prev: any, curr: { page: number; }) {
  if (curr?.page !== undefined)
    currentPage.value = curr.page
}

function onWatch() {
  useTrackEvent('watch', {
    app: props.name
  })
  emit('watch')
}

function onTry() {
  useTrackEvent('try', {
    app: props.name
  })
}
</script>

<template>
  <div class="card grow relative mx-auto w-full min-w-[328px] max-w-[400px] transition-transform">
    <Ribbon :title="modifiedIn" class="absolute top-4 -left-[5px] z-10" />
    <div class="relative">
      <div class="absolute top-0 left-0 w-full h-full">
        <div
          class="gradient-border gradient-border-dark rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] overflow-hidden" />
      </div>
      <div
        class="content relative flex flex-col gap-[10px] rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] p-[10px] w-full bg-light-500 dark:bg-dark-600 aspect-[1.215/1] overflow-hidden">
        <div class="relative rounded-[20px] w-full bg-light-600 dark:bg-dark-400 aspect-video overflow-hidden">
          <ul class="absolute top-0 right-[0.875rem] flex gap-1 z-20">
            <li v-for="track in [1, 2, 3]" :key="track" class="cursor-pointer" @click="splide.go(track - 1)">
              <NuxtIcon name="pagination-track" class="text-light-500 dark:text-dark-600 text-[28px] transition-colors"
                :class="{ '!text-primary-400': currentPage === track - 1 }" />
            </li>
          </ul>
          <Splide ref="splide" :options="splideOption" tag="div" :has-track="false"
            @splide:pagination:updated="onPaginationUpdate" class="w-full h-full">
            <SplideTrack>
              <SplideSlide v-for="image in [1, 2, 3]" :key="image">
                <img :src="`/projects/${name}/${image}.webp`" :alt="`${name}-${image}`" loading="lazy"
                  class="w-full h-full" />
              </SplideSlide>
            </SplideTrack>
            <div
              class="splide__arrows absolute flex justify-between items-center top-0 px-2 h-full w-full z-10 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity">
              <button aria-label="left" class="splide__arrow splide__arrow--prev w-1/3">
                <NuxtIcon name="chevron-bold" />
              </button>
              <button aria-label="right" class="splide__arrow splide__arrow--next rotate-180 w-1/3">
                <NuxtIcon name="chevron-bold" />
              </button>
            </div>
          </Splide>
          <NuxtLink :to="repoURL" target="_blank"
            class="absolute bottom-2 left-2 flex items-center gap-1 rounded-full hover:outline outline-primary-400 pl-1.5 pr-2 py-1 bg-light-500 hover:bg-light-400 dark:bg-dark-600 dark:hover:bg-dark-500 z-20 transition-colors duration-150 ease-in">
            <NuxtIcon name="github" class="text-[16px]" />
            <span class="text-xs">{{ stars }} Stars</span>
          </NuxtLink>
          <NuxtLink v-if="videoURL !== null" :to="videoURL" target="_blank"
            class="absolute bottom-1 right-2 flex items-center gap-1 text-white z-20 drop-shadow hover:drop-shadow-md"
            @click="onWatch">
            <span class="text-xs">Watch</span>
            <NuxtIcon name="youtube" class="text-[30px]" />
          </NuxtLink>
        </div>
        <div class="flex-grow grid grid-rows-[min-content_auto] grid-cols-[repeat(2,auto)] gap-y-1 px-1 md:px-2">
          <span class="flex gap-1 lg:gap-2 items-end">
            <h5 class="text-lg whitespace-nowrap font-semi-bold">{{ name }}</h5>
            <span
              class="rounded-full px-[8px] pt-[3px] pb-1 w-fit h-fit text-xs text-center text-black/75 dark:text-white/75 bg-light-600 dark:bg-dark-400">
              {{ version }}
            </span>
          </span>
          <time :dateTime="createdAt"
            class="self-end justify-self-end row-start-1 col-start-2 py-1 text-xs whitespace-nowrap">
            <ClientOnly>
              {{ createdAtFormatted }}
            </ClientOnly>
          </time>
          <p class="row-start-2 col-start-1 col-span-2 text-xs md:text-base opacity-60 line-clamp-2">
            {{ description }}
          </p>
          <div class="col-span-full flex gap-2 mt-1 p-0.5 w-4/5 overflow-x-scroll scrollbar-hidden">
            <TechBadge v-for="tech in technologies" :tech="tech" />
          </div>
          <NuxtLink v-if="appURL !== null" :to="appURL" target="_blank"
            class="absolute bottom-0 right-0 rounded-tl-[1.25rem] px-6 py-2 bg-primary-500 hover:bg-primary-400 transition-colors text-xs text-white cursor-pointer"
            @click="onTry">
            Try Now
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.gradient-border {
  background-size: 600% 600%;
  transform: translate(-2px, -2px);
  @apply absolute top-0 left-0 h-[calc(100%+4px)] w-[calc(100%+4px)] opacity-0 -z-10;
}

.card:hover .gradient-border {
  @apply transition-all duration-300 ease-linear opacity-100 animate-gradient-rotate;
}

.gradient-border-dark {
  /* 6860fa */
  background: linear-gradient(1turn, hsla(213, 94%, 68%, .1), hsla(213, 94%, 68%, 0.6), hsla(213, 94%, 68%, 1), hsla(213, 94%, 68%, 0.4));
  background: linear-gradient(var(--gradient-angle), hsla(213, 94%, 68%, .1), hsla(213, 94%, 68%, 0.6), hsla(213, 94%, 68%, 1), hsla(213, 94%, 68%, 0.4));
}
</style>