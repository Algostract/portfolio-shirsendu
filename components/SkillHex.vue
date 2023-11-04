<script setup lang="ts">
import drone from '~~/assets/images/drone.png';
import robot from '~~/assets/images/robot.png';
import globe from '~~/assets/images/globe.png';

const props = defineProps<{
  quadrant: 1 | 2 | 3 | 4
}>()

const hexClass = ref('')
const imageClass = ref('')
const image = ref('')
const skill = ref<'IoT' | 'Web' | 'AI' | ''>('')

function onQuadrant() {
  switch (props.quadrant) {
    case 1:
      hexClass.value = 'row-start-1 col-start-1 justify-self-start self-start'
      imageClass.value = '-top-2 -left-2 -right-2 bottom-2'
      image.value = ''
      skill.value = ''
      break
    case 2:
      hexClass.value = 'row-start-1 col-start-3 justify-self-end self-start'
      imageClass.value = '-top-2 -left-2 -right-2 bottom-2'
      image.value = drone
      skill.value = 'IoT'
      break
    case 3:
      hexClass.value = 'row-start-3 lg:row-start-2 col-start-1 justify-self-start self-end'
      imageClass.value = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-90'
      image.value = globe
      skill.value = 'Web'
      break
    case 4:
      hexClass.value = 'row-start-3 lg:row-start-2 col-start-3 justify-self-end self-end'
      imageClass.value = 'top-2 -left-2 -right-2 -bottom-2'
      image.value = robot
      skill.value = 'AI'
      break
    default:
      hexClass.value = ''
      imageClass.value = ''
      image.value = ''
      skill.value = ''
      break
  }
}

watch(() => props.quadrant, onQuadrant)
onQuadrant()
</script>

<template>
  <span class="relative hover:scale-105 transition-transform drop-shadow-md" :class="hexClass">
    <NuxtIcon name="hexagon" class="text-[120px] lg:text-[180px] text-light-500 dark:text-dark-600 shadow-md" />
    <!-- TODO: Change img to NuxtImg when All Skill Image is available -->
    <img :src="image" :alt="skill" class="absolute drop-shadow-sm" :class="imageClass" />
    <span class="absolute left-1/2 -bottom-6 lg:-bottom-8 -translate-x-1/2 opacity-60 lg:text-xl">{{ skill }}</span>
  </span>
</template>