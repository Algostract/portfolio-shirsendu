<script setup lang="ts">
import { type Options, Splide, SplideTrack, SplideSlide } from '@splidejs/vue-splide';
import { Grid } from '@splidejs/splide-extension-grid';

const splideOption: Options = {
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
    }
  }
}

const { data, pending, error } = await useFetch("/api/project")

const projects = computed(() => data.value?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
</script>

<template>
  <section id="project" class="relative flex flex-col gap-8">
    <h4 class="mx-auto w-fit text-lg">All Projects</h4>
    <Splide ref="splide" :options="splideOption" tag="div" :has-track="false" :extensions="{ Grid }">
      <SplideTrack class="py-2">
        <SplideSlide
          v-for="{ name, description, version, stars, forks, createdAt, updatedAt, technologies, repoURL, appURL, videoURL } in projects"
          :key="name">
          <!-- <div class="w-96 aspect-video bg-primary-400" /> -->
          <ProjectCard :name="name" :description="description" :version="version" :stars="stars" :forks="forks"
            :createdAt="createdAt" :updatedAt="updatedAt" :technologies="technologies" :repoURL="(repoURL as string)"
            :appURL="appURL" :videoURL="videoURL" />
        </SplideSlide>
      </SplideTrack>
      <div class="splide__arrows absolute top-1/2 -left-8 -right-8 -translate-y-1/2 flex justify-between text-black">
        <button
          class="splide__arrow splide__arrow--prev rounded-full px-3 pl-5 sm:pl-3 py-2 bg-primary-500 hover:bg-primary-400 disabled:opacity-0 duration-300 ease-out">
          <NuxtIcon name="chevron-bold" class="text-[24px]" />
        </button>
        <button
          class="splide__arrow splide__arrow--next scale-[-1] rounded-full px-3 pl-5 sm:pl-3 py-2 bg-primary-500 hover:bg-primary-400 disabled:opacity-0 duration-300 ease-out">
          <NuxtIcon name="chevron-bold" class="text-[24px]" />
        </button>
      </div>
    </Splide>
  </section>
</template>