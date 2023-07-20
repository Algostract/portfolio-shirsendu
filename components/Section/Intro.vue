<script setup lang="ts">
import photoDark from "~~/assets/images/photo-dark.png";
import photoLight from "~~/assets/images/photo-light.png";

const dob = new Date(2001, 0, 29)
const age = useTimeAgo(dob ?? "", {
  messages: {
    invalid: "Invalid Date",
    past: (n: any) => n.match(/\d/) ? `${n}` : n,
    justNow: "Born Today",
    future: "To be Born",
    year: (n: number) => n.toString(),
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

const colorMode = useColorMode()
const photo = computed(() => {
  if (colorMode.preference === "system")
    return (colorMode.value === "light") ? photoLight : photoDark
  else
    return (colorMode.preference === "light") ? photoLight : photoDark
})
</script>

<template>
  <section id="intro"
    class="flex flex-col md:flex-row md:justify-between gap-10 md:gap-4 md:mt-6 mb-28 lg:mt-112 lg:mb-24">
    <div class="flex flex-col gap-4 md:my-8">
      <h1 class="text-2xl text-center md:text-left md:text-4xl lg:text-5xl">
        Hi, I am a <br />Web Developer and <br />an AI Enthusiast
      </h1>
      <h2 class="mx-auto md:mx-0 w-fit opacity-60 md:text-lg">My name is Shirsendu Bairagi, Age {{ age }}</h2>
      <h3
        class="mx-auto md:mx-0 my-2 rounded-lg rounded-tl-3xl rounded-br-3xl  px-5 py-3 w-fit bg-primary-400 text-lg text-white">
        {{ experience }} +XP
      </h3>
    </div>
    <div class="grid grid-rows-[1fr_2fr_1fr] lg:grid-rows-2 lg:gap-x-20 lg:gap-y-36 grid-cols-3 justify-items-stretch">
      <SkillHex :quadrant="1" />
      <SkillHex :quadrant="2" />
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
              <use xlink:href="#clip-image" transform="matrix(0.00123181 0 0 0.000925926 -0.00134755 0)" />
            </pattern>
            <!-- <ClientOnly> -->
            <image id="clip-image" :href="photo" alt="photo" />
            <!-- </ClientOnly> -->
          </defs>
        </svg>
      </div>
      <SkillHex :quadrant="3" />
      <SkillHex :quadrant="4" />
    </div>
  </section>
</template>