<script setup lang="ts">
import { useForm } from 'vee-validate'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { $api } = useNuxtApp()
const { proxy: gaProxy } = useScriptGoogleAnalytics()

const { handleSubmit } = useForm<TransactionalEmail>()

const onSend = handleSubmit((values) => {
  gaProxy.gtag('event', 'conversion')

  $api('/api/contact', {
    method: 'POST',
    body: values,
  })

  emit('close')
})
</script>

<template>
  <ModalBase :is-open="isOpen" inner-class="rounded-tl-[2rem] rounded-br-[2rem] p-8 pt-10 !max-w-[24.5rem]" @close="emit('close')">
    <form class="flex flex-col gap-6" @submit.prevent="onSend">
      <InputText type="name" name="name" placeholder="Your Name" />
      <InputText type="email" name="email" placeholder="Your Email" />
      <InputMessage />
      <button
        type="submit"
        aria-label="submit"
        class="absolute right-2 top-[338px] w-fit rounded-full border-[6px] border-white bg-primary-500 p-[0.625rem] outline-2 outline-primary-500 focus-within:outline hover:bg-primary-400 dark:border-dark-400">
        <NuxtIcon name="local:feather" class="size-[28px] fill-white" />
      </button>
    </form>
  </ModalBase>
</template>
