<script setup lang="ts">
const { data: hackathons } = await useAPI('/api/hackathon')
</script>

<template>
  <section v-if="hackathons" id="hackathon" class="relative flex flex-col gap-8">
    <h3 class="mx-auto w-fit text-lg">All Hackathons</h3>
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
