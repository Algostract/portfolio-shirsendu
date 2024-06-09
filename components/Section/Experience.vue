<script setup lang="ts">
const { data } = await useFetch('/api/experience')

const experiences = computed(() => data.value?.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
</script>

<template>
  <section id="experience" class="relative -left-4 flex w-screen flex-col gap-8 overflow-hidden md:left-0 md:w-full">
    <h3 class="mx-auto w-max text-lg">Work Experiences</h3>
    <div
      class="relative mb-8 grid grid-flow-row grid-cols-2 justify-center before:absolute before:left-1/2 before:top-1/2 before:h-[calc(100%-108px)] before:w-[4.5px] before:-translate-y-1/2 before:bg-light-500 before:content-[''] before:dark:bg-dark-600">
      <TimelineBranch
        v-for="({ company, date }, index) in experiences"
        :key="company"
        :side="index % 2 ? 'left' : 'right'"
        :style="{ gridRowStart: index + 1 }"
        :class="index % 2 ? 'col-start-1 translate-x-[8px] justify-self-end' : 'col-start-2 -translate-x-[4px] justify-self-start'"
        :company="company"
        :date="date" />
    </div>
  </section>
</template>
