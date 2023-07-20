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

const { handleSubmit } = useForm()

const onSend = handleSubmit(async (values: TransactionalEmail) => {
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
    class="relative rounded-xl rounded-tl-[2rem] rounded-br-[2rem] p-8 pt-10 w-full !max-w-[24.5rem] h-[30rem] ">
    <form class="flex flex-col gap-6" @submit.prevent="onSend">
      <InputText type="name" name="name" placeholder="Your Name" />
      <InputText type="email" name="email" placeholder="Your Email" />
      <InputMessage />
      <button type="submit"
        class="absolute top-[338px] right-2 outline-primary-400 outline-2 focus-within:outline border-[6px] border-dark-400 rounded-full p-[0.625rem] w-fit bg-primary-400 hover:bg-primary-300">
        <NuxtIcon name="feather" class="text-white text-[28px]" />
      </button>
    </form>
  </ModelBase>
</template>