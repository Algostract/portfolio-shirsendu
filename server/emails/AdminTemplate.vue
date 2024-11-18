<script setup lang="ts">
import { Body, Container, Font, Head, Html, Preview, Tailwind } from '@vue-email/components'

defineProps<{
  name: string
  email: string
  message: string
}>()

const tailwindConfig = {
  theme: {
    extend: {},
  },
}
</script>

<template>
  <Preview>Email Preview Text</Preview>
  <Tailwind :config="tailwindConfig">
    <Html lang="en">
      <Head>
        <Font
          font-family="Exo 2"
          fallback-font-family="Verdana"
          :web-font="{
            url: 'https://fonts.gstatic.com/s/exo2/v21/7cHmv4okm5zmbtYsK-4E4Q.woff2',
            format: 'woff2',
          }"
          :font-weight="400"
          font-style="normal" />
      </Head>

      <Body>
        <Container>
          From {{ name }} ({{ email }})<br /><br />
          Message {{ message }}, <br /><br />
        </Container>
      </Body>
    </Html>
  </Tailwind>
</template>
