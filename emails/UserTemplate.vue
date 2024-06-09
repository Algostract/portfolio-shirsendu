<script setup lang="ts">
defineProps<{ firstName: string; lastName: string }>()

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
      <EPreview>Your Mail Successfully Reached</EPreview>
      <EBody class="font-body">
        <EContainer class="mb-6">
          <EImg
            src="https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Timelapse"
            width="640"
            height="360" />
        </EContainer>
        <EContainer>
          Hi {{ firstName }},<br /><br />
          Thank you for getting in touch with me! I appreciate you taking the time to contact.<br /><br />
          I have received your message. You can expect to hear back from me within couple hours. In the meantime, feel free to check out my
          <ELink href="https://github.com/shba007"> Website </ELink> for more information.<br /><br />
          If you have any additional details or questions, please don't hesitate to reply to this email. Thank you for your patience and understanding.<br />
        </EContainer>
        <EContainer>
          <ESection class="mx-auto">
            <EColumn>
              <ELink href="https://github.com/shba007" target="_blank">
                <EImg src="/images/github.png" alt="GitHub" width="24" height="24" class="opacity-60" />
              </ELink>
            </EColumn>
            <EColumn>
              <ELink href="https://devpost.com/shba007" target="_blank">
                <EImg src="/images/devpost.png" alt="DevPost" width="24" height="24" class="opacity-60" />
              </ELink>
            </EColumn>
            <EColumn>
              <ELink href="https://leetcode.com/u/shba007/" target="_blank">
                <EImg src="/images/leetcode.png" alt="GitHub" width="24" height="24" class="opacity-60" />
              </ELink>
            </EColumn>
          </ESection>
        </EContainer>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
