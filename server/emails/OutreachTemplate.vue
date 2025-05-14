<script setup lang="ts">
import { Html, Head, Preview, Body, Container, Section, Img, Text, Tailwind, Link, Font } from '@vue-email/components'

defineProps<{
  fromCompanyName: string
  fromPersonName: string
  fromEmail: string
  fromCompanyLogo: string
  fromCompanyPhone: string
  fromCompanyLink: string
  fromFeaturedPhotos: string[]
  emailSubject: string
  toCompanyName: string
  toPersonName: string
  toEmail: string
}>()

const referTag = '?ref=outreach-mail'

const tailwindConfig = {
  darkMode: 'class',
  theme: {
    fontSize: {
      '3xs': ['0.5rem', '0.5625rem'],
      '2xs': ['0.625rem', '0.75rem'],
      xs: ['0.75rem', '0.875rem'],
      sm: ['0.875rem', '1.0625rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.25rem', '1.5625rem'],
      xl: ['1.5rem', '1.875rem'],
      '2xl': ['2rem', '2.5rem'],
      '3xl': ['2.5rem', '3.125rem'],
      '4xl': ['3rem', '3.625rem'],
      '5xl': ['3.5rem', '4.1875rem'],
    },
    fontFamily: {
      main: ['Oxanium', 'sans-serif'],
      sub: ['Oxanium', 'sans-serif'],
    },
    fontWeight: {
      light: 300,
      regular: 400,
      'semi-bold': 500,
      bold: 600,
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      light: {
        400: '#F8FAFC',
        500: '#F1F5F9',
        600: '#CBD5E1',
      },
      black: '#000000',
      dark: {
        400: '#171717',
        500: '#262626',
        600: '#404040',
      },
      primary: {
        400: '#FB3737',
        500: '#CD2D2D',
        600: '#813232',
      },
      success: {
        400: '#89E774',
        500: '#4AD42B',
        600: '#66BE52',
      },
      warning: {
        400: '#F0CD42',
        500: '#ECC113',
        600: '#D7B942',
      },
      alert: {
        400: '#F24067',
        500: '#E11D48',
        600: '#C02650',
      },
    },
    extend: {},
  },
}
</script>

<template>
  <Tailwind :config="tailwindConfig">
    <Html lang="en">
      <Head>
        <Font
          font-family="Oxanium"
          fallback-font-family="Verdana"
          :web-font="{
            url: 'https://fonts.gstatic.com/s/oxanium/v19/RrQQboN_4yJ0JmiMe2zE0YBB.woff2',
            format: 'woff2',
          }"
          :font-weight="400"
          font-style="normal" />
        <Font
          font-family="Oxanium"
          fallback-font-family="Verdana"
          :web-font="{
            url: 'https://fonts.gstatic.com/s/oxanium/v19/RrQQboN_4yJ0JmiMe2LE0Q.woff2',
            format: 'woff2',
          }"
          :font-weight="400"
          font-style="normal" />
        <title>{{ emailSubject }}</title>
      </Head>
      <Preview>{{ emailSubject }}</Preview>

      <Body class="bg-white font-body text-black">
        <Container class="px-6 py-8">
          <!-- Heading -->
          <Section>
            <Text class="mb-6 text-left font-head text-2xl leading-tight">
              {{ emailSubject }}
            </Text>
          </Section>
          <!-- Logo -->
          <Section class="mb-2 flex justify-center">
            <Img :src="fromCompanyLogo" alt="Red Cat Pictures" class="h-auto w-24" />
          </Section>
          <!-- Intro copy -->
          <Section class="mb-2 space-y-4">
            <Text class="text-base leading-relaxed"> Hello {{ toCompanyName }} Team, </Text>
            <Text class="text-base leading-relaxed">
              I’m {{ fromPersonName }} from
              <Link :href="fromCompanyLink + referTag" :title="fromCompanyName" class="inline-block text-primary-400 underline" target="_blank">{{ fromCompanyName }}</Link
              >. We specialize in product videography and photography—delivering crisp, high‑resolution
              <Link :href="fromCompanyLink + '/#featured-photos' + referTag" class="inline-block text-primary-400 underline" target="_blank">photos</Link>
              and short‑form
              <Link :href="fromCompanyLink + '/#featured-videos' + referTag" class="inline-block text-primary-400 underline" target="_blank">videos</Link>
              <br />
              for e‑commerce, social media, and advertising. Whether on‑location or in‑studio, our full production and post‑production services ensure top‑quality assets, on time and within budget.
              Here are some of our work
            </Text>
            <!-- Product images row -->
            <Section class="mb-4 flex space-x-4">
              <Img v-for="(src, i) in fromFeaturedPhotos" :key="i" :src="src" alt="Product shot" class="inline h-full w-1/4 object-cover" />
            </Section>
            <Section class="mb-4 text-center">
              <!-- ← add text-center here -->
              <Link :href="fromCompanyLink + '/photo' + referTag" + class="inline-block rounded-full bg-primary-500 px-4 py-1 text-white" target="_blank"> Show More </Link>
            </Section>
            <Text class="text-base leading-relaxed"
              >I would appreciate a brief call to discuss strategies for enhancing your clients' visual marketing campaigns. Please advise on your availability.</Text
            >
          </Section>
          <!-- Sign‑off -->
          <Section class="mb-2 space-y-4">
            <Text class="text-base leading-relaxed">Thank you for your consideration.</Text>
            <Text class="text-base leading-relaxed">
              Best regards,<br />
              {{ fromPersonName }} (Lead Photographer)<br />
              Website:
              <Link :href="fromCompanyLink + referTag" :title="fromCompanyName" class="inline-block underline" target="_blank">{{ fromCompanyLink }}</Link
              ><br />
              Phone: {{ fromCompanyPhone }}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
</template>
