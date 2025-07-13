// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    ignores: ['**/src-tauri/**'],
  },
  {
    rules: {
      'vue/html-self-closing': 'off',
    },
  },
])
