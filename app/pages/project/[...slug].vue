<script setup lang="ts">
definePageMeta({
  layout: false,
})

const route = useRoute()
const slug = route.params.slug!.toString()
const { data: projects } = await useAPI('/api/project', { default: () => [] })

const activeProjectSlug = computed<string>(() => slugify(slug))
const activeProject = computed(() => projects.value.find(({ id }) => id === activeProjectSlug.value))
const aspectRatio = 16 / 9

if (!activeProject.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = `${activeProject.value.title}`
const description = `${activeProject.value.description}`
const {
  public: { siteUrl },
} = useRuntimeConfig()
const imageUrl = `https://ucarecdn.com/${activeProject.value.images[0].id}/-/format/auto/-/scale_crop/${Math.round(720 * aspectRatio)}x720/center`

useSeoMeta({
  title: title,
  ogTitle: title,
  twitterTitle: title,
  description: description,
  ogDescription: description,
  twitterDescription: description,
  ogImage: imageUrl,
  twitterImage: imageUrl,
  ogUrl: `${siteUrl}/project/${activeProjectSlug.value}`,
})

useSchemaOrg([
  defineImage({
    url: `${siteUrl}/project/${activeProjectSlug.value}`,
    contentUrl: imageUrl,
    caption: description,
    width: 720,
    height: Math.round(720 * aspectRatio),
  }),
])
</script>

<template>
  <main v-if="activeProject" class="relative mx-auto flex h-screen w-screen max-w-[90rem] flex-col items-center justify-center overflow-hidden p-4 md:p-8">
    <!-- App Header -->
    <header class="absolute left-0 right-0 top-4 mx-auto max-w-[90rem] fill-black px-4 text-black dark:fill-white dark:text-white md:px-16">
      <nav class="relative z-20 grid grid-cols-3 items-center">
        <NuxtLink to="/" class="size-fit" aria-label="home">
          <NuxtIcon name="local:logo" filled class="text-[32px] md:text-[48px]" />
        </NuxtLink>
        <div class="col-start-3 justify-self-end">
          <LazyButtonColorMode hydrate-on-visible />
        </div>
      </nav>
    </header>
    <!-- App Header -->
    <NuxtImg
      :src="activeProject.images[0].id"
      :alt="activeProject.description"
      :width="Math.round(720 * aspectRatio)"
      :height="720"
      fit="fill"
      loading="eager"
      :placeholder="[Math.round(180 * aspectRatio), 180, 'lightest', 25]"
      class="w-full rounded-sm bg-light-600 object-cover dark:bg-dark-500 md:h-full md:w-auto" />
    <!-- <h1 class="text-center my-8">{{ activeImage.title }}</h1> -->
  </main>
</template>

<style scoped>
img {
  view-transition-name: selected-project;
}
</style>
