<script setup lang="ts">
import { useField } from 'vee-validate'

const { value, errors } = useField('message', validateFn)

function validateFn(value: string) {
  value = value?.trim()

  if (!value) return `Message is required`

  return true
}
</script>

<template>
  <div>
    <textarea
      v-model="value"
      name="message"
      placeholder="Your Message"
      class="min-h-[12rem] w-full rounded-xl rounded-br-[2rem] rounded-tl-[2rem] bg-light-400 p-4 outline-2 outline-primary-500 focus-within:outline dark:bg-dark-600" />
    <span v-show="errors.length" class="text-xs font-semi-bold text-alert-500">{{ errors[0] }}</span>
  </div>
</template>
