<script setup lang="ts">
defineProps<{
  name: string
  email: string
  message: string
}>()

const tailwindConfig = {
  theme: {
    extend: {
    },
  },
}
</script>

<template>
  <ETailwind :config="tailwindConfig">
    <EHtml lang="en">
      <EHead />
      <EPreview>Email Preview Text</EPreview>
      <EBody>
        <EContainer>
          From {{ name }} ({{ email }})<br><br>
          Message {{ message }}, <br><br>
        </EContainer>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
