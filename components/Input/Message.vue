<script setup lang="ts">
import { useField } from "vee-validate";

const { value, errors } = useField('message', validateFn);

function validateFn(value: string) {
  value = value?.trim()

  if (!value)
    return `Message is required`;

  return true
}
</script>

<template>
  <div>
    <textarea name="message" placeholder="Your Message" v-model="value"
      class="outline-2 outline-primary-400 focus-within:outline rounded-xl rounded-tl-[2rem] rounded-br-[2rem] p-4 w-full min-h-[12rem] bg-light-400 dark:bg-dark-600" />
    <span v-show="errors.length" class="text-alert-500 text-xs font-semi-bold">{{ errors[0] }}</span>
  </div>
</template>