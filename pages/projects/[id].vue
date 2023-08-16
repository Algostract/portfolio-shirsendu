<script setup lang="ts">
const route = useRoute()

const id = ref(route.params.id)
</script>

<template>
  <main>
    Project Name {{ id }}
  </main>
</template>