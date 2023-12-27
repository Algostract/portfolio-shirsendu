<script setup lang="ts">
import { useField } from 'vee-validate';

const props = withDefaults(defineProps<{
  type: "name" | "phone" | "email" | "pincode",
  name: string,
  icon?: string,
  placeholder: string,
  value?: string | number,
  isDisabled?: boolean,
}>(), { isDisabled: false })

const { value, errors } = useField(props.name, validateFn);

if (props.value)
  value.value = String(props.value)

function validateFn(value: string) {
  switch (props.type) {
    case 'name':
      return validateName(value)
    case 'phone':
      return validatePhone(value)
    case 'email':
      return validateEmail(value)
    case 'pincode':
      return validatePincode(value)
    default:
      return true
  }
}

// Name validate
function validateName(value: string) {
  value = value?.trim()

  if (!value)
    return `${props.placeholder} is required`;

  if (value.indexOf(" ") === -1)
    return "Enter your First Name and Last Name"

  return true;
}

// Phone Validate
function validatePhone(value: string) {
  value = value?.trim()

  if (!value)
    return `${props.placeholder} is required`;

  if (!value.match(/^\d{10}$/g))
    return "Enter a valid Phone Number"

  return true;
}

// Email validate
function validateEmail(value: string) {
  value = value?.trim()

  if (!value)
    return true;

  if (!value.toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    return "Enter a valid Email Address"

  return true;
}

// Pincode validate
function validatePincode(value: string) {
  value = value?.trim()

  if (!value)
    return `${props.placeholder} is required`;

  if (!value.match(/^[1-9][0-9]{5}$/g))
    return "Enter a valid Pincode"

  return true;
}
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <div
      class="flex gap-2 outline-2 outline-primary-400 focus-within:outline rounded-xl p-2 w-full h-11 bg-light-400 dark:bg-dark-600 text-sm">
      <!-- <NuxtIcon v-if="!!icon" :name="icon" class="text-[28px] text-light-500" /> -->
      <input type="text" :name="name" :placeholder="placeholder" v-model="value" :disabled="isDisabled"
        class="px-2 w-full bg-transparent outline-none" v-bind="$attrs">
    </div>
    <span v-show="errors.length" class="text-alert-500 text-xs font-semi-bold">{{ errors[0] }}</span>
  </div>
</template>
