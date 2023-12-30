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
        <ESection class="flex gap-5 md:gap-8">
          <EColumn>
            <ELink href="https://leetcode.com/shba007" target="_blank">
              <EImg src="leetcode.png" alt="LeetCode" width="32" height="32"
                class="opacity-60 hover:opacity-100 transition-opacity" />
            </ELink>
          </EColumn>
          <EColumn>
            <ELink href="https://devpost.com/shba007" target="_blank">
              <EImg src="devpost.png" alt="DevPost" width="32" height="32"
                class="opacity-60 hover:opacity-100 transition-opacity" />
            </ELink>
          </EColumn>
          <EColumn>
            <ELink href="https://github.com/shba007" target="_blank">
              <EImg src="github.png" alt="GitHub" width="32" height="32"
                class="opacity-60 hover:opacity-100 transition-opacity" />
            </ELink>
          </EColumn>
        </ESection>
      </EBody>
    </EHtml>
  </ETailwind>
</template>