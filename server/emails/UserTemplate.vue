<script setup lang="ts">
import { Html, Tailwind, Head, Container, Link, Img, Preview, Body, Section, Column, Font } from '@vue-email/components'

defineProps<{ firstName: string; lastName: string }>()

const tailwindConfig = {
  theme: {
    extend: {},
  },
}
</script>

<template>
  <Preview>Your Mail Successfully Reached</Preview>
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
        <title>Your Mail Successfully Reached</title>
      </Head>

      <Body class="font-body">
        <Container class="mb-6">
          <Img
            src="https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Timelapse"
            width="640"
            height="360" />
        </Container>
        <Container>
          Hi {{ firstName }},<br /><br />
          Thank you for getting in touch with me! I appreciate you taking the time to contact.<br /><br />
          I have received your message. You can expect to hear back from me within couple hours. In the meantime, feel free to check out my
          <Link href="https://github.com/shba007"> Github </Link> for more information.<br /><br />
          If you have any additional details or questions, please don't hesitate to reply to this email. Thank you for your patience and understanding.<br />
        </Container>
        <Container>
          <Section class="mx-auto">
            <Column>
              <Link href="https://github.com/shba007" target="_blank">
                <Img src="/images/github.png" alt="GitHub" width="24" height="24" class="opacity-60" />
              </Link>
            </Column>
            <Column>
              <Link href="https://devpost.com/shba007" target="_blank">
                <Img src="/images/devpost.png" alt="DevPost" width="24" height="24" class="opacity-60" />
              </Link>
            </Column>
            <Column>
              <Link href="https://leetcode.com/u/shba007/" target="_blank">
                <Img src="/images/leetcode.png" alt="GitHub" width="24" height="24" class="opacity-60" />
              </Link>
            </Column>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
</template>
