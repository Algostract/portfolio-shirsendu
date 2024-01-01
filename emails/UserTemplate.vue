<script setup lang="ts">
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
          Hi, I am Eluna, Shirsendu's AI Assistant,<br /><br />
          I am informing you that your mail has reached to him,<br />
          I will notify him as soon as soon as he become online.<br /><br />
          Thank you for being patient,<br />Have a good day
        </EContainer>
        <EContainer>
          <ESection class="flex gap-8">
            <EColumn>
              <ELink href="https://leetcode.com/shba007" target="_blank">
                <EImg src="leetcode.png" alt="LeetCode" width="24" height="24" class="opacity-60" />
              </ELink>
            </EColumn>
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