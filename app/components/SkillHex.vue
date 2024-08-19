<script setup lang="ts">
const props = defineProps<{
  quadrant: 1 | 2 | 3 | 4
}>()

const imageClass = ref('')
const image = ref<string | null>(null)
const skill = ref<'Web' | 'Mobile' | 'AI' | 'IoT' | null>(null)

function onQuadrant() {
  switch (props.quadrant) {
    case 1:
      imageClass.value = 'top-0 left-0 -right-2 bottom-2 scale-90'
      image.value = '/images/globe.webp'
      skill.value = 'Web'
      break
    case 2:
      imageClass.value = '-top-4 left-0 -right-2 -bottom-2'
      image.value = 'images/mobile.webp'
      skill.value = 'Mobile'
      break
    case 3:
      imageClass.value = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-90'
      image.value = '/images/robot.webp'
      skill.value = 'AI'
      break
    case 4:
      imageClass.value = 'top-2 -left-2 -right-2 -bottom-2'
      image.value = '/images/drone.webp'
      skill.value = 'IoT'
      break
    default:
      imageClass.value = ''
      image.value = null
      skill.value = null
      break
  }
}

onMounted(() => onQuadrant())
</script>

<template>
  <span class="relative drop-shadow-md transition-transform hover:scale-105">
    <NuxtIcon name="hexagon" class="text-[120px] text-light-500 shadow-md dark:text-dark-600 lg:text-[180px]" />
    <NuxtImg v-if="image && skill" :src="image" :alt="skill" :width="256" :height="256" loading="lazy" class="absolute drop-shadow-sm" :class="imageClass" />
    <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-60 lg:-bottom-8 lg:text-xl">{{ skill }}</span>
  </span>
</template>
