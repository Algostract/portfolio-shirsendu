<script setup lang="ts">
const { data } = await useAPI('/api/certificate')

const splideOption = {
  type: 'loop',
  pagination: false,
  arrows: true,
  perPage: 1,
  perMove: 1,
  focus: 'center',
  gap: 0,
  padding: 0,
  autoplay: true,
  lazyLoad: 'nearby',
  mediaQuery: 'min',
  breakpoints: {
    480: {
      perPage: 2,
    },
    768: {
      perPage: 3,
    },
  },
}

const certificates = computed(() => {
  return data.value?.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const currentSlide = ref('')

onMounted(() => {
  if (!certificates.value) return
  currentSlide.value = certificates.value[0]!.name
})

function onSlideMove(_splide: never, newIndex: number, _prevIndex: number, _destIndex: number) {
  if (!certificates.value) return
  currentSlide.value = certificates.value[newIndex]!.name
}
</script>

<template>
  <section v-if="certificates" id="certificate" class="relative left-1/2 flex w-screen -translate-x-1/2 flex-col gap-8 md:w-full">
    <h3 class="mx-auto w-fit text-lg">All Certificates</h3>
    <Splide ref="splide" :options="splideOption" tag="div" :has-track="false" class="relative" @splide:move="onSlideMove">
      <SplideTrack class="!px-6 !py-4 md:!px-0 md:!py-8">
        <SplideSlide v-for="{ name, link, date, image } in certificates" :key="name">
          <CardCertificate :name="name" :link="link" :date="date" :image="image" :active="name === currentSlide" />
        </SplideSlide>
      </SplideTrack>
      <div class="absolute left-1/2 top-1/2 flex w-screen -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div class="splide__arrows xs:w-[40%] z-10 flex w-full items-center justify-between md:w-[40%] md:max-w-[33rem]">
          <button
            aria-label="left"
            class="splide__arrow splide__arrow--prev size-fit rounded-2xl bg-light-600 px-3 py-2 transition-colors hover:bg-primary-500 hover:text-white dark:bg-dark-600 dark:hover:bg-primary-500">
            <NuxtIcon name="local:chevron-bold" class="size-[16px]" />
          </button>
          <button
            aria-label="right"
            class="splide__arrow splide__arrow--next size-fit rotate-180 rounded-2xl bg-light-600 px-3 py-2 transition-colors hover:bg-primary-500 hover:text-white dark:bg-dark-600 dark:hover:bg-primary-500">
            <NuxtIcon name="local:chevron-bold" class="size-[16px]" />
          </button>
        </div>
      </div>
    </Splide>
  </section>
</template>
