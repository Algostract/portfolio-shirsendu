<script setup lang="ts">
// import type { CVData } from '~~/server/api/cv.get'
const contact = {
  email: 'shirsendu2001@gmail.com',
  phone: '9330504883',
  website: 'https://shirsendu-bairagi.dev/',
  github: 'https://github.com/shba007',
  linkedin: 'https://www.linkedin.com/in/shirsendu-bairagi/',
}
const projects: Project[] = await $fetch('/api/project')
const hackathons = await $fetch('/api/hackathon')
const experiences = await $fetch('/api/experience')
// const certificates = await $fetch('/api/certificate')
const skills = [...new Set(projects.flatMap((p) => p.technologies))]
</script>

<template>
  <main class="text-gray-900 mx-auto max-w-4xl bg-white p-8 text-black">
    <div class="mb-8">
      <h1 class="text-4xl font-bold">{{ contact.name }}</h1>
      <p class="text-gray-700 text-xl">Web Developer</p>
      <div class="mt-2 flex flex-wrap gap-x-2">
        <span>{{ contact.phone }}</span>
        <span>{{ contact.email }}</span>
      </div>
      <p class="mt-1">{{ contact.website }}</p>
      <div class="mt-1 flex flex-wrap gap-x-2">
        <a :href="contact.github" class="underline">{{ contact.github.replace('https://github.com/', '@') }}</a>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-x-8">
      <div class="space-y-8">
        <!-- Skills -->
        <section>
          <h2 class="font-semibold mb-4 border-b pb-1 text-2xl">Skills</h2>
          <ul class="mt-2 grid list-none grid-cols-3 gap-y-1 text-center">
            <li v-for="skill in skills" :key="skill" class="capitalize">{{ skill }}</li>
          </ul>
        </section>
        <!-- Work Experience -->
        <section>
          <h2 class="font-semibold mb-4 border-b pb-1 text-2xl">Work Experience</h2>
          <div>
            <div v-for="{ company, position, date } in experiences" :key="company + position" class="mb-6">
              <div>
                <div class="flex items-baseline">
                  <span class="text-gray-600 mr-4 text-sm">{{ date.start.split('-')[0] }}</span>
                  <h3 class="font-semibold">{{ company }}</h3>
                </div>
                <p class="text-gray-700 ml-12 text-sm">· {{ position }}</p>
              </div>
            </div>
          </div>
        </section>
        <!-- Hackathons -->
        <section v-if="hackathons.length">
          <h2 class="font-semibold mb-4 border-b pb-1 text-2xl">Hackathons</h2>
          <ul class="mt-2 list-none">
            <li v-for="{ name, project, position, startedAt } in hackathons" :key="name" class="mb-4">
              <div>
                <div class="flex items-baseline">
                  <span class="text-gray-600 mr-4 text-sm">{{ new Date(startedAt).getFullYear() }}</span>
                  <span class="font-semibold">{{ name }}</span>
                </div>
                <p class="ml-12 text-sm">{{ project }} · {{ position }}</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
      <div class="space-y-8">
        <!-- Projects -->
        <section>
          <h2 class="font-semibold mb-4 border-b pb-1 text-2xl">Projects</h2>
          <div>
            <div v-for="{ name, description, technologies, createdAt, appURL, repoURL } in projects" :key="name" class="mb-6">
              <div>
                <div class="flex items-baseline justify-between">
                  <h3 class="text-xl font-bold">{{ name }}</h3>
                  <span class="text-gray-600 text-sm">
                    {{
                      new Date(createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    }}
                  </span>
                </div>
                <p class="mt-1 text-sm">{{ description }}</p>
                <p class="mt-1 text-sm">
                  <span v-for="(tech, index) in technologies" :key="tech" class="inline-block capitalize"> {{ tech }}<span v-if="index < technologies.length - 1" class="mx-1">·</span> </span>
                </p>
                <p class="mt-1">
                  <a v-if="appURL" :href="appURL" class="break-all">{{ appURL.includes('github.com/') ? appURL.split('github.com/')[1] : appURL }}</a>
                  <a v-else-if="repoURL" :href="repoURL" class="break-all">{{ repoURL.includes('github.com/') ? repoURL.split('github.com/')[1] : repoURL }}</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
