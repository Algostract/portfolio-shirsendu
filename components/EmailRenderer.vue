<script setup lang="ts">
// import { resolveComponent } from 'vue'
import { useRender } from 'vue-email'
import emailTemplate from "@/emails/UserTemplate";

// const emailTemplate = resolveComponent('../emails/UserTemplate') as Component

const html = await useRender('UserTemplate.vue', undefined, {
  pretty: true,
})
</script>

<template>
  <iframe :srcdoc="html.html" class="h-[1000px] w-full" frameborder="0" width="100%" />
</template>