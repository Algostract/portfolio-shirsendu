<script setup lang="ts">
import { type Option, Splide, SplideTrack, SplideSlide } from '@splidejs/vue-splide';
import { Grid } from '@splidejs/splide-extension-grid';

const { data, pending, error } = await useFetch("/api/project")

const projects = computed(() => data.value?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))

const options: Option = {
  pagination: false,
  arrows: false,
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
</script>

<template>
  <section id="project" class="relative flex flex-col gap-8 xl">
    <h4 class="mx-auto w-fit text-lg">All Projects</h4>
    <!-- <div class="relative left-1/2 -translate-x-1/2 flex flex-wrap gap-8 py-4 px-4 md:px-8 lg:px-10 xl:px-12 w-screen max-w-[85rem] overflow-hidden"> -->
    <Splide :has-track="false" :options="options" :extensions="{ Grid }">
      <SplideTrack class="py-2">
        <SplideSlide
          v-for="{ name, description, version, stars, forks, createdAt, updatedAt, technologies, repoURL, appURL, videoURL } in projects"
          :key="name">
          <!-- <template v-for="{ name, description, version, stars, forks, createdAt, updatedAt, technologies, repoURL, appURL, videoURL } in projects" :key="name"> -->
          <ProjectCard :name="name" :description="description" :version="version" :stars="stars" :forks="forks"
            :createdAt="createdAt" :updatedAt="updatedAt" :technologies="technologies" :repoURL="(repoURL as string)"
            :appURL="appURL" :videoURL="videoURL" />
          <!-- </template> -->
        </SplideSlide>
      </SplideTrack>
    </Splide>
    <!-- </div> -->
  </section>
</template>