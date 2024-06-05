<script setup lang="ts">
const props = defineProps<{ firstName: string, lastName: string }>()

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
      <EHead>
        <EFont font-family="Exo 2" fallback-font-family="Verdana" :web-font="{
    url: 'https://fonts.gstatic.com/s/exo2/v21/7cHmv4okm5zmbtYsK-4E4Q.woff2',
    format: 'woff2',
  }" :font-weight="400" font-style="normal" />
      </EHead>
      <EPreview>Your Mail Successfully Reached</EPreview>
      <EBody class="font-body">
        <EContainer>
          Hi {{ firstName }},<br />
          Thank you for getting in touch with me! I appreciate you taking the time to contact.<br />
          I have received your message. You can expect to hear back from me within 1 day. In the meantime, feel free to
          check out my
          <ELink href="https://github.com/shba007">Github </ELink>
          for more information.<br />
          If you have any additional details or questions, please don't hesitate to reply to this email.<br />
          Thank you for your patience and understanding.<br />
        </EContainer>
        <EContainer>
          <ESection class="flex gap-8 justify-around">
            <EColumn>
              <ELink href="https://devpost.com/shba007" target="_blank">
                <EImg src="devpost.png" alt="DevPost" width="24" height="24" class="opacity-60" />
              </ELink>
            </EColumn>
            <EColumn>
              <ELink href="https://github.com/shba007" target="_blank">
                <EImg src="github.png" alt="GitHub" width="24" height="24" class="opacity-60" />
              </ELink>
            </EColumn>
          </ESection>

        </EContainer>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
