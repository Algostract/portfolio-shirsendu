<script setup lang="ts">
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
  <ETailwind :config="tailwindConfig">
    <EHtml lang="en">
      <EHead>
        <EFont
          font-family="Exo 2"
          fallback-font-family="Verdana"
          :web-font="{
            url: 'https://fonts.gstatic.com/s/exo2/v21/7cHmv4okm5zmbtYsK-4E4Q.woff2',
            format: 'woff2',
          }"
          :font-weight="400"
          font-style="normal" />
      </EHead>
      <EPreview>Email Preview Text</EPreview>
      <EBody>
        <EContainer>
          From {{ name }} ({{ email }})<br /><br />
          Message {{ message }}, <br /><br />
        </EContainer>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
