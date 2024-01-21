<script setup lang="ts">
const { data, pending, error } = await useFetch("/api/hackathon")

const hackathons = computed(() => data.value?.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()))
</script>

<template>
  <section id="hackathon" class="relative flex flex-col gap-8">
    <h4 class="mx-auto mb-8 w-fit text-lg">All Hackathons</h4>
    <div class="relative flex flex-wrap justify-center gap-5 py-4 overflow-hidden">
      <HackathonCard v-for="{ name, url, project, title, startedAt } in hackathons" :key="name" :name="name" :url="url"
        :project="project" :title="title" :startedAt="startedAt" />
    </div>
  </section>
</template>