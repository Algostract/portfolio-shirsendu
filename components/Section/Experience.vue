<script setup lang="ts">
const experiences = ref([{
  year: 2022,
  company: 'a',
  image: 'b'
}, {
  year: 2022,
  company: 'b',
  image: 'b'
}, {
  year: 2022,
  company: 'c',
  image: 'b'
}])
</script>

<template>
  <section id="experience" class="relative flex flex-col gap-8">
    <h4 class="mx-auto w-max text-lg">Work Experience</h4>
    <div
      class="relative grid grid-cols-2 grid-flow-row justify-center before:content-[''] before:w-[4.5px] before:h-[calc(100%-108px)] before:absolute before:bg-dark-600 before:left-1/2 before:top-1/2 before:-translate-y-1/2">
      <TimelineBranch v-for="{ year, company, image }, index in experiences" :key="company"
        :side="index % 2 ? 'left' : 'right'" :year="year" :style="{ gridRowStart: index + 1 }"
        :class="index % 2 ? 'col-start-1 justify-self-end translate-x-6' : 'col-start-2 justify-self-start -translate-x-6'"
        :company="company" :image="image" />
    </div>
  </section>
</template>