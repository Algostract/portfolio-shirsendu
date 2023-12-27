<script setup lang="ts">
const { data, pending, error } = await useFetch("/api/project")

// const projects = computed(() => data.value.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
const projects = computed(() => data.value.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
</script>

<template>
  <section id="project" class="relative flex flex-col gap-8 min-h-screen">
    <h4 class="mx-auto w-fit text-lg">All Projects</h4>
    <div
      class="relative -left-4 md:-left-8 lg:-left-10 xl:-left-12 flex flex-wrap gap-8 py-4 px-4 md:px-8 lg:px-10 xl:px-12 w-screen max-w-[85rem] overflow-hidden">
      <ProjectCard
        v-for="{ name, description, version, stars, forks, createdAt, updatedAt, repoURL, appURL, videoURL } in projects"
        :key="name" :name="name" :description="description" :version="version" :stars="stars" :forks="forks"
        :createdAt="createdAt" :updatedAt="updatedAt" :repoURL="repoURL" :appURL="appURL" :videoURL="videoURL" />
    </div>
  </section>
</template>