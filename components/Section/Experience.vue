<script setup lang="ts">
const { data, pending, error } = await useFetch("/api/experience")

const experiences = computed(() => data.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
</script>

<template>
  <section id="experience" class="relative flex flex-col gap-8">
    <h4 class="mx-auto w-max text-lg">Work Experiences</h4>
    <div
      class="relative grid grid-cols-2 grid-flow-row justify-center before:content-[''] before:w-[4.5px] before:h-[calc(100%-108px)] before:absolute before:bg-dark-600 before:left-1/2 before:top-1/2 before:-translate-y-1/2">
      <TimelineBranch v-for="{ company, date }, index in experiences" :key="company" :side="index % 2 ? 'left' : 'right'"
        :style="{ gridRowStart: index + 1 }"
        :class="index % 2 ? 'col-start-1 justify-self-end translate-x-[18px]' : 'col-start-2 justify-self-start -translate-x-[14px]'"
        :company="company" :date="date" />
    </div>
  </section>
</template>