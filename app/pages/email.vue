<script setup lang="ts">
import { render } from '@vue-email/render'
import emailTemplate from '~~/shared/emails'

const emailHtml = ref()

const data = {
  agency: '[ABC]',
  fromName: 'Aratirk Nandy',
  companyLink: 'https://redcatpictures.com',
  companyName: 'RED CAT PICTURES',
  companyPhone: '+91 89104 89578',
  companyLogo: 'https://redcatpictures.com/logo-dark.png',
  featuredPhotos: [
    'https://ucarecdn.com/4e76ccc5-8381-4b21-be22-636808e7b7c8/-/smart_resize/960x1440/',
    'https://ucarecdn.com/dab0b0e7-f57a-450f-ba15-741410eaa282/-/smart_resize/960x1440/',
    'https://ucarecdn.com/26efbcc4-cc86-40ec-b240-fbf995d464f7/-/smart_resize/960x1440/',
    'https://ucarecdn.com/44f24665-0806-44e1-a8d3-b08dd486cc3c/-/smart_resize/960x1440/',
  ],
}

onMounted(async () => {
  emailHtml.value = await render(emailTemplate.outreach, data)
})
</script>

<template>
  <div class="border p-4" v-html="emailHtml" />
</template>
