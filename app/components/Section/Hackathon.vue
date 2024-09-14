<script setup lang="ts">
const { data } = useFetch('/api/hackathon')

const hackathons = computed(() => data.value?.toSorted((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()))
</script>

<template>
  <section v-if="hackathons" id="hackathon" class="relative flex flex-col gap-8">
    <h3 class="mx-auto mb-8 w-fit text-lg">All Hackathons</h3>
    <div class="relative flex flex-wrap justify-center gap-5 overflow-hidden py-4">
      <CardHackathon
        v-for="{ name, url, project, position, startedAt, image } in hackathons"
        :key="name"
        :name="name"
        :url="url"
        :project="project"
        :position="position"
        :started-at="startedAt"
        :image="image" />
    </div>
  </section>
</template>
