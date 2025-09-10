<script setup lang="ts">
import type z from 'zod'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { $api } = useNuxtApp()
const { proxy: gaProxy } = useScriptGoogleAnalytics()

type EmailFormSchema = z.infer<typeof emailFormSchema>

const { r$ } = useRegleSchema({ name: undefined, company: undefined, email: undefined, projectDescription: undefined, meetingTime: undefined }, emailFormSchema)

function showError(field: keyof EmailFormSchema) {
  return r$[field]?.$dirty && r$[field].$error
}

async function onSend() {
  const { valid, data } = await r$.$validate()
  if (!valid) return
  gaProxy.gtag('event', 'conversion')
  // await execute()

  // if (status.value === 'success') {
  //   await navigateTo('/model/dashboard')
  // }

  $api('/api/contact', {
    method: 'POST',
    body: data,
  })

  emit('close')
}
</script>

<template>
  <ModalBase :is-open="isOpen" inner-class="rounded-tl-[2rem] rounded-br-[2rem] p-8 pt-10 !max-w-[24.5rem]" @close="emit('close')">
    <form class="flex flex-col gap-6" @submit.prevent="onSend">
      <!-- Name -->
      <div class="flex w-full flex-col gap-2">
        <div class="flex h-11 w-full gap-2 rounded-xl bg-light-400 p-2 text-sm outline-2 outline-primary-500 focus-within:outline dark:bg-dark-600">
          <input v-model="r$.$value.name" type="text" name="name" placeholder="Your Name" class="w-full bg-transparent px-2 outline-none" />
        </div>
        <span v-if="showError('name')" class="text-xs font-semi-bold text-alert-500">
          {{ r$.name.$errors[0] }}
        </span>
      </div>

      <!-- Company -->
      <div class="flex w-full flex-col gap-2">
        <div class="flex h-11 w-full gap-2 rounded-xl bg-light-400 p-2 text-sm outline-2 outline-primary-500 focus-within:outline dark:bg-dark-600">
          <input v-model="r$.$value.company" type="text" name="company" placeholder="Your Company" class="w-full bg-transparent px-2 outline-none" />
        </div>
        <span v-if="showError('company')" class="text-xs font-semi-bold text-alert-500">
          {{ r$.company.$errors[0] }}
        </span>
      </div>

      <!-- Email -->
      <div class="flex w-full flex-col gap-2">
        <div class="flex h-11 w-full gap-2 rounded-xl bg-light-400 p-2 text-sm outline-2 outline-primary-500 focus-within:outline dark:bg-dark-600">
          <input v-model="r$.$value.email" type="email" name="email" placeholder="Your Email" class="w-full bg-transparent px-2 outline-none" />
        </div>
        <span v-if="showError('email')" class="text-xs font-semi-bold text-alert-500">
          {{ r$.email.$errors[0] }}
        </span>
      </div>

      <!-- Project Description -->
      <div>
        <textarea
          v-model="r$.$value.projectDescription"
          name="projectDescription"
          placeholder="Project Description"
          class="h-32 w-full resize-none rounded-xl rounded-br-[2rem] rounded-tl-[2rem] bg-light-400 p-4 outline-2 outline-primary-500 focus-within:outline dark:bg-dark-600" />
        <span v-if="showError('projectDescription')" class="text-xs font-semi-bold text-alert-500">
          {{ r$.projectDescription.$errors[0] }}
        </span>
      </div>

      <!-- Meeting Time -->
      <div class="flex w-full flex-col gap-2">
        <div class="flex h-11 w-full gap-2 rounded-xl bg-light-400 p-2 text-sm outline-2 outline-primary-500 focus-within:outline dark:bg-dark-600">
          <input v-model="r$.$value.meetingTime" type="datetime-local" name="meetingTime" placeholder="Preferred Meeting Time" class="w-full bg-transparent px-2 outline-none" />
        </div>
        <span v-if="showError('meetingTime')" class="text-xs font-semi-bold text-alert-500">
          {{ r$.meetingTime.$errors[0] }}
        </span>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        aria-label="submit"
        class="absolute -bottom-2 -right-2 size-fit rounded-full border-[6px] border-white bg-primary-500 p-[0.625rem] outline-2 outline-primary-500 focus-within:outline hover:bg-primary-400 dark:border-dark-400">
        <NuxtIcon name="local:feather" class="size-[28px] fill-white" />
      </button>
    </form>
  </ModalBase>
</template>
