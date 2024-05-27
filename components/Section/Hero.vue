<script setup lang="ts">
const emit = defineEmits<{ (event: 'contact'): void }>()
const dob = new Date(2001, 0, 29).toISOString()

const age = useTimeAgo(dob ?? "", {
  messages: {
    invalid: "Invalid Date",
    past: (n: any) => n.match(/\d/) ? `${n}` : n,
    justNow: "Born Today",
    future: "To be Born",
    year: (n: number) => (n - 1).toString(),
  }
})

const journeyStartDate = new Date(2021, 3, 21)
const now = useNow({ interval: 60 })
const experience = computed(() => {
  const startYear = journeyStartDate.getFullYear();
  const startMonth = journeyStartDate.getMonth();
  const endYear = now.value.getFullYear();
  const endMonth = now.value.getMonth();

  const yearDiff = endYear - startYear;
  const monthDiff = endMonth - startMonth;

  const yearString = `${yearDiff > 0 ? yearDiff : 0} Year`;
  const monthString = `${monthDiff > 0 ? monthDiff : 0} Month`

  return `${yearString} ${monthString}`;
})
</script>

<template>
  <section id="hero"
    class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:gap-4 mt-10 md:mt-6 lg:mt-12 lg:mb-12">
    <NuxtPicture src="/images/hero-gradient.svg"
      class="absolute -top-8 left-0 -right-8 lg:left-auto w-full aspect-[3/4] md:aspect-auto blur-md lg:blur-lg object-cover -z-50"
      alt="Hero Background">
      <source media="(min-width: 1024px)" srcset="/images/hero-gradient.svg" />
      <source media="(min-width: 768px)" srcset="/images/hero-gradient-tablet.svg" />
      <source media="(min-width: 100px)" srcset="/images/hero-gradient-mobile.svg" />
    </NuxtPicture>
    <div class="flex flex-col gap-8 md:my-auto md:w-1/2 h-fit">
      <span class="mx-auto md:mx-0 rounded-full border border-primary-500 px-4 py-2 w-fit text-sm">
        {{ experience }} +XP
      </span>
      <h1 class="text-2xl text-center md:text-left md:text-4xl lg:text-5xl">
        Crafting the Web,<br /> Making the UX better
      </h1>
      <h2
        class="mx-auto md:mx-0 w-fit max-w-[90%] sm:max-w-[80%] md:max-w-[90%] opacity-80 font-light text-lg text-center md:text-left !leading-relaxed">
        I'm Shirsendu Bairagi, a passionate {{ age }} years old web developer,
        and AI enthusiast dedicated to crafting cutting-edge digital experiences.
      </h2>
      <CTAButton @click="emit('contact')" />
    </div>
    <div class="grid grid-rows-[1fr_2fr_1fr] lg:grid-rows-2 lg:gap-x-20 lg:gap-y-36 grid-cols-3 justify-items-stretch">
      <SkillHex :quadrant="1" class="row-start-1 col-start-1 justify-self-start self-start" />
      <SkillHex :quadrant="2" class="row-start-1 col-start-3 justify-self-end self-start" />
      <div
        class="row-start-2 lg:row-start-1 lg:row-span-2 col-start-2 justify-self-center self-center relative scale-[1.867] lg:scale-[2.8005] max-w-[200px]">
        <div class="rotate-[30deg] -z-10">
          <NuxtIcon name="hexagon" class="text-[120px] text-light-500 dark:text-dark-600" />
        </div>
        <svg class="absolute -top-[3.375rem] scale-90 w-full" viewBox="0 0 202 310" fill="none"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <mask id="clip-mask" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="202" height="310">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M202 0H0.999998V152H1.05919C1.04626 152.317 1.03966 152.636 1.03946 152.955L0.986608 241.399C0.981532 249.893 5.51114 257.738 12.8692 261.98L89.4902 306.157C96.8483 310.399 105.917 310.394 113.28 306.142L189.954 261.875C197.317 257.624 201.856 249.773 201.861 241.279L201.914 152.835C201.914 152.556 201.909 152.278 201.9 152H202V0Z"
              fill="white" />
          </mask>
          <g mask="url(#clip-mask)">
            <rect x="-11" y="11" width="224" height="298" fill="url(#pattern0)" />
          </g>
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#clip-image-light" transform="matrix(0.00123181 0 0 0.000925926 -0.00134755 0)" />
              <use xlink:href="#clip-image-dark" transform="matrix(0.00123181 0 0 0.000925926 -0.00134755 0)" />
            </pattern>
            <image id="clip-image-light" href="@/assets/images/photo-light.webp" alt="photo-light"
              class="dark:hidden" />
            <image id="clip-image-dark" href="@/assets/images/photo-dark.webp" alt="photo-dark"
              class="hidden dark:block" />
          </defs>
        </svg>
      </div>
      <SkillHex :quadrant="3" class="row-start-3 lg:row-start-2 col-start-1 justify-self-start self-end" />
      <SkillHex :quadrant="4" class="row-start-3 lg:row-start-2 col-start-3 justify-self-end self-end" />
    </div>
  </section>
</template>

<style>
picture>img {
  @apply w-full h-full object-cover;
}
</style>