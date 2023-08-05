<script setup lang="ts">
const { data: projects, pending, error } = await useFetch("/api/project")
</script>

<template>
  <section id="project" class="relative flex flex-col gap-8 max-h-screen">
    <h4 class="mx-auto w-fit text-lg lg:text-xl">All Projects</h4>
    <div class="relative -left-12 flex flex-wrap gap-8 py-4 px-10 w-screen overflow-hidden overflow-y-scroll">
      <ProjectCard
        v-for="{ name, description, version, stars, forks, createdAt, updatedAt, appURL, videoURL } in projects"
        :key="name" :name="name" :description="description" :version="version" :stars="stars" :forks="forks"
        :createdAt="createdAt" :updatedAt="updatedAt" :appURL="appURL" :videoURL="videoURL" />
    </div>
  </section>
</template>