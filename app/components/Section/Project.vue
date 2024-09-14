<script setup lang="ts">
import { Grid } from '@splidejs/splide-extension-grid'

const splideOption = {
  pagination: false,
  arrows: true,
  gap: '1rem',
  padding: 0,
  grid: {
    rows: 2,
    cols: 1,
    gap: {
      row: '2rem',
      col: '2rem',
    },
  },
  mediaQuery: 'min',
  breakpoints: {
    768: {
      grid: {
        rows: 2,
        cols: 2,
        gap: {
          row: '2rem',
          col: '2rem',
        },
      },
    },
    1280: {
      grid: {
        rows: 2,
        cols: 3,
        gap: {
          row: '2rem',
          col: '2rem',
        },
      },
    },
  },
}

const { data } = useFetch('/api/project')

const projects = computed(() => data.value?.toSorted((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
</script>

<template>
  <section v-if="projects" id="project" class="relative flex flex-col gap-8">
    <h3 class="mx-auto w-fit text-lg">All Projects</h3>
    <Splide ref="splide" :options="splideOption" tag="div" :has-track="false" :extensions="{ Grid }">
      <SplideTrack class="py-2">
        <SplideSlide v-for="{ name, description, version, stars, forks, createdAt, updatedAt, technologies, repoURL, appURL, videoURL, images } in projects" :key="name">
          <!-- <div class="w-96 aspect-video bg-primary-400" /> -->
          <CardProject
            :name="name"
            :description="description"
            :version="version"
            :stars="stars"
            :forks="forks"
            :created-at="createdAt"
            :updated-at="updatedAt"
            :technologies="technologies"
            :repo-url="repoURL"
            :app-url="appURL"
            :video-url="videoURL"
            :images="images" />
        </SplideSlide>
      </SplideTrack>
      <div class="splide__arrows absolute -left-8 -right-8 top-1/2 flex -translate-y-1/2 justify-between text-black">
        <button class="splide__arrow splide__arrow--prev rounded-full bg-primary-500 px-3 py-2 pl-5 duration-300 ease-out hover:bg-primary-400 disabled:opacity-0 sm:pl-3">
          <NuxtIcon name="chevron-bold" class="text-[24px]" />
        </button>
        <button class="splide__arrow splide__arrow--next scale-[-1] rounded-full bg-primary-500 px-3 py-2 pl-5 duration-300 ease-out hover:bg-primary-400 disabled:opacity-0 sm:pl-3">
          <NuxtIcon name="chevron-bold" class="text-[24px]" />
        </button>
      </div>
    </Splide>
  </section>
</template>
