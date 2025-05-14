<script setup lang="ts">
import { Html, Tailwind, Head, Preview, Body, Container, Link, Img, Section, Column, Font } from '@vue-email/components'

defineProps<{ firstName: string; lastName: string }>()

const tailwindConfig = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Exo 2"', 'Verdana', 'sans-serif'],
      },
    },
  },
}
</script>

<template>
  <!-- Preheader for inbox preview -->
  <Preview>Your message has arrived 🚀</Preview>
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

      <!-- Body with light gray background and centered content -->
      <Body class="bg-gray-100 text-gray-900 font-sans p-6">
        <!-- Header accent gradient bar -->
        <Container class="mx-auto mb-8 max-w-lg">
          <div class="from-purple-600 to-indigo-600 rounded-xl bg-gradient-to-r py-4 text-center text-white">
            <h1 class="text-2xl font-bold">Hello, {{ firstName }}!</h1>
          </div>
        </Container>

        <!-- Main content card -->
        <Container class="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-lg">
          <Section class="space-y-4">
            <Column>
              <p class="text-gray-700 leading-relaxed">Thank you for reaching out. I’ve received your message and will respond within a few hours.</p>
            </Column>
            <Column>
              <Link
                href="https://github.com/shba007"
                class="from-purple-600 to-indigo-600 inline-block rounded-full bg-gradient-to-r px-4 py-2 text-center text-sm uppercase tracking-wide text-white"
                target="_blank">
                View My GitHub
              </Link>
            </Column>
          </Section>
        </Container>

        <!-- Image banner -->
        <Container class="mx-auto mb-8 mt-8 max-w-lg">
          <Img src="https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=640&auto=format&fit=crop" alt="Timelapse" class="w-full rounded-xl" />
        </Container>

        <!-- Footer social links -->
        <Container class="mx-auto max-w-lg">
          <Section class="flex justify-center space-x-6">
            <Column>
              <Link href="https://github.com/shba007" target="_blank">
                <Img src="/images/github.png" alt="GitHub" width="24" height="24" class="opacity-50 transition hover:opacity-100" />
              </Link>
            </Column>
            <Column>
              <Link href="https://devpost.com/shba007" target="_blank">
                <Img src="/images/devpost.png" alt="DevPost" width="24" height="24" class="opacity-50 transition hover:opacity-100" />
              </Link>
            </Column>
            <Column>
              <Link href="https://leetcode.com/u/shba007/" target="_blank">
                <Img src="/images/leetcode.png" alt="LeetCode" width="24" height="24" class="opacity-50 transition hover:opacity-100" />
              </Link>
            </Column>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
</template>
