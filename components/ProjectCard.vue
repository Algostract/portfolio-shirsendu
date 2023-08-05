<script setup lang="ts">
import { Options, Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
// import { Project } from 'utils/models';

interface Project {
  name: string;
  description: string;
  version: string;
  stars: number;
  forks: number;
  createdAt: Date | string;
  updatedAt: Date | string;
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
const createdAtFormatted = useDateFormat(props.createdAt, 'DD-MM-YYYY')

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
  <div
    class="grow relative mx-auto w-full sm:w-2/5 md:w-[30%] min-w-[328px] max-w-[400px] hover:scale-105 transition-transform">
    <Ribbon :title="modifiedIn" class="absolute top-4 -left-[5px] z-10" />
    <div
      class="relative flex flex-col gap-[10px] rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] p-[10px] w-full bg-light-500 dark:bg-dark-600 aspect-[1.215/1] overflow-hidden">
      <div class="relative rounded-[20px] w-full bg-light-600 dark:bg-dark-400 aspect-video overflow-hidden">
        <ul class="absolute top-0 right-[0.875rem] flex gap-1 z-10">
          <li v-for="track in [1, 2, 3]" :key="track" class="cursor-pointer" @click="splide.go(track - 1)">
            <NuxtIcon name="pagination-track" class="text-light-500 dark:text-dark-600 text-[28px]"
              :class="{ 'text-primary-400': currentPage === track - 1 }" />
          </li>
        </ul>
        <Splide ref="splide" :options="splideOption" tag="div" :has-track="false"
          @splide:pagination:updated="onPaginationUpdate" class="w-full h-full">
          <SplideTrack>
            <SplideSlide v-for="image in [1, 2, 3]" :key="image">
              <!-- <div class="relative flex justify-center items-center w-full h-full"> -->
              <img :src="`/projects/${name}/${image}.webp`" :alt="`${name}-${image}`" class="w-full h-full">
              <!-- </div> -->
            </SplideSlide>
          </SplideTrack>
          <div
            class="splide__arrows absolute flex justify-between items-center top-0 px-2 h-full w-full z-10 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity">
            <button class="splide__arrow splide__arrow--prev w-1/3">
              <NuxtIcon name="chevron-bold" />
            </button>
            <button class="splide__arrow splide__arrow--next transform rotate-180 w-1/3">
              <NuxtIcon name="chevron-bold" />
            </button>
          </div>
        </Splide>
        <NuxtLink v-if="videoURL !== null" :href="videoURL" target="_blank"
          class="absolute bottom-1 right-2 flex gap-1 items-center text-white z-20" @click="onWatch">
          <span class="text-xs">Watch</span>
          <NuxtIcon name="youtube" class="text-[30px]" />
        </NuxtLink>
      </div>
      <div class="flex-grow grid grid-rows-[min-content_auto] grid-cols-[repeat(2,auto)] gap-y-1 px-1 md:px-2">
        <span class="flex gap-1 lg:gap-2 items-end">
          <h5 class="text-lg whitespace-nowrap font-semi-bold">{{ name }}</h5>
          <span
            class="rounded-full px-[8px] pt-[3px] pb-1 w-fit h-fit text-2xs text-center text-black/75 dark:text-white/75 bg-light-600 dark:bg-dark-400">
            {{ version }}
          </span>
        </span>
        <span class="self-end justify-self-end row-start-1 col-start-2 py-1 text-xs whitespace-nowrap">
          {{ createdAtFormatted }}
        </span>
        <p class="row-start-2 col-start-1 col-span-2 text-xs md:text-base opacity-60">{{ description }}</p>
        <NuxtLink v-if="appURL !== null" :href="appURL" target="_blank"
          class="absolute bottom-0 right-0 rounded-tl-[1.25rem] px-6 py-2 bg-primary-400 hover:bg-primary-300 transition-colors text-xs text-white cursor-pointer"
          @click="onTry">
          Try Now
        </NuxtLink>
      </div>
    </div>
  </div>
</template>