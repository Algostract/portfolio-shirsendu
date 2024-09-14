<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  type: 'name' | 'phone' | 'email' | 'pincode'
  name: string
  icon?: string
  placeholder: string
  value?: string | number
  isDisabled?: boolean
}>()

const { value: fieldValue, errors } = useField(props.name, validateFn)

onMounted(() => {
  if (props.value) fieldValue.value = String(props.value)
})

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

  if (!value) return `${props.placeholder} is required`

  if (value.indexOf(' ') === -1) return 'Enter your First Name and Last Name'

  return true
}

// Phone Validate
function validatePhone(value: string) {
  value = value?.trim()

  if (!value) return `${props.placeholder} is required`

  if (!value.match(/^\d{10}$/g)) return 'Enter a valid Phone Number'

  return true
}

// Email validate
function validateEmail(value: string) {
  value = value?.trim()

  if (!value) return true

  if (!value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    return 'Enter a valid Email Address'

  return true
}

// Pincode validate
function validatePincode(value: string) {
  value = value?.trim()

  if (!value) return `${props.placeholder} is required`

  if (!value.match(/^[1-9][0-9]{5}$/g)) return 'Enter a valid Pincode'

  return true
}
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <div class="flex h-11 w-full gap-2 rounded-xl bg-light-400 p-2 text-sm outline-2 outline-primary-500 focus-within:outline dark:bg-dark-600">
      <input v-model="fieldValue" type="text" :name="name" :placeholder="placeholder" :disabled="isDisabled" class="w-full bg-transparent px-2 outline-none" v-bind="$attrs" />
    </div>
    <span v-show="errors.length" class="text-xs font-semi-bold text-alert-500">{{ errors[0] }}</span>
  </div>
</template>
