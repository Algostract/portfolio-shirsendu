<script setup lang="ts">
import { useForm } from "vee-validate";

interface TransactionalEmail {
  name: string;
  email: string;
  message: string;
}

const props = defineProps<{
  isOpen: boolean,
}>()
const emit = defineEmits<{
  (event: 'close'): void,
}>()

const { handleSubmit } = useForm<TransactionalEmail>()

const onSend = handleSubmit(async (values) => {
  console.log(values);
  useTrackEvent('send_email', {
    email: values.email
  })

  await useFetch('/api/contact', {
    method: 'POST',
    body: values
  })

  emit('close')
})
</script>

<template>
  <ModelBase :is-open="isOpen" @close="emit('close')"
    innerClass="rounded-tl-[2rem] rounded-br-[2rem] p-8 pt-10 !max-w-[24.5rem]">
    <form class="flex flex-col gap-6" @submit.prevent="onSend">
      <InputText type="name" name="name" placeholder="Your Name" />
      <InputText type="email" name="email" placeholder="Your Email" />
      <InputMessage />
      <button type="submit"
        class="absolute top-[338px] right-2 outline-primary-500 outline-2 focus-within:outline border-[6px] border-white dark:border-dark-400 rounded-full p-[0.625rem] w-fit bg-primary-500 hover:bg-primary-400">
        <NuxtIcon name="feather" class="text-white text-[28px]" />
      </button>
    </form>
  </ModelBase>
</template>