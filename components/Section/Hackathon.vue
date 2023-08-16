<script setup lang="ts">
const hackathons = ref([
  { name: "Bay Area Hacks 1", project: "Compeer", rank: 5 },
  { name: "GNEC Hackathon 2023", project: "Biosense", rank: 1 },
])
</script>

<template>
  <section id="hackathon" class="relative flex flex-col gap-8 min-h-screen">
    <h4 class="mx-auto mb-8 w-fit text-lg">All Hackathons</h4>
    <div class="relative -left-12 grid grid-cols-7 gap-4 py-4 px-12 w-screen overflow-hidden overflow-y-scroll">
      <HackathonCard :class="`col-start-${((index) * 2) % 7 + 1}`" v-for="{ name, project, rank }, index in hackathons"
        :key="name" :name="name" :project="project" :rank="rank" />
    </div>
  </section>
</template>

<style scoped>
:root {
  @apply col-start-1 col-start-2 col-start-3 col-start-4 col-start-5 col-start-6 col-start-7 col-start-8;
}
</style>