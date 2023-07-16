<script setup lang="ts">
const { data: projects, pending, error } = await useFetch("/api/project")
</script>

<template>
  <section id="project" class="relative left-1/2 -translate-x-1/2 w-screen h-screen">
    <h4 class="mx-auto w-fit text-lg lg:text-xl">All Projects</h4>
    <div class="flex flex-wrap gap-8 my-8 px-4 py-4 max-h-[1120px] overflow-x-hidden overflow-y-scroll">
      <ProjectCard
        v-for="{ name, description, version, stars, forks, createdAt, updatedAt, appURL, videoURL } in projects"
        :name="name" :description="description" :version="version" :stars="stars" :forks="forks" :createdAt="createdAt"
        :updatedAt="updatedAt" :appURL="appURL" :videoURL="videoURL" />
    </div>
  </section>
</template>