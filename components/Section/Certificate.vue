<script setup lang="ts">
const { data, pending, error } = await useFetch("/api/certificate")

const certificates = computed(() => {
  const sortedData = data.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  sortedData.unshift(sortedData[sortedData.length - 1])
  sortedData.push(sortedData[1])
  return sortedData
})


const activeIndex = ref(1)

function onHandleSlide(dir: 'left' | 'right') {
  activeIndex.value += dir === 'left' ? -1 : 1
  if (activeIndex.value < 2)
    activeIndex.value = certificates.value.length - 2
  else if (activeIndex.value > certificates.value.length - 2)
    activeIndex.value = 1
}
</script>

<template>
  <section id="certificate" class="relative -left-4 md:left-0 flex flex-col gap-8 w-screen md:w-auto">
    <h4 class="mx-auto mb-8 w-fit text-lg">All Certificates</h4>
    <div class="relative flex justify-center py-4 overflow-hidden">
      <ClientOnly>
        <template v-for="({ name, link, date }, index) in certificates" :key="name">
          <CertificateCard v-if="index >= activeIndex - 1 && index <= activeIndex + 1" :name="name" :link="link"
            :date="date" :active="index === activeIndex" @slide="onHandleSlide"
            :class="{ 'md:translate-x-16': index === activeIndex - 1, 'md:-translate-x-16': index === activeIndex + 1 }" />
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped>
/* .slide-enter-active,
.slide-leave-active {
  @apply transition-transform duration-[3s]
}

.slide-enter-from {
  @apply translate-x-16
}

.slide-leave-to {
  @apply translate-x-0
} */
</style>