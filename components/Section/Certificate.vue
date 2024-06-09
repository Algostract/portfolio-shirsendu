<script setup lang="ts">
const { data } = await useFetch('/api/certificate')

const certificates = computed(() => {
  const sortedData = data.value!.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  sortedData.unshift(sortedData[sortedData.length - 1])
  sortedData.push(sortedData[1])
  return sortedData
})

const activeIndex = ref(1)

function onHandleSlide(dir: 'left' | 'right') {
  activeIndex.value += dir === 'left' ? -1 : 1
  if (activeIndex.value < 2) activeIndex.value = certificates.value.length - 2
  else if (activeIndex.value > certificates.value.length - 2) activeIndex.value = 1
}
</script>

<template>
  <section id="certificate" class="relative left-1/2 flex w-screen -translate-x-1/2 flex-col gap-8 overflow-x-hidden">
    <h3 class="mx-auto mb-8 w-fit text-lg">All Certificates</h3>
    <div class="relative flex justify-center py-4">
      <template v-for="({ name, link, date }, index) in certificates" :key="name">
        <CertificateCard
          v-if="index >= activeIndex - 1 && index <= activeIndex + 1"
          :name="name"
          :link="link"
          :date="date"
          :active="index === activeIndex"
          :class="{
            'md:translate-x-16': index === activeIndex - 1,
            'md:-translate-x-16': index === activeIndex + 1,
          }"
          @slide="onHandleSlide" />
      </template>
    </div>
  </section>
</template>
