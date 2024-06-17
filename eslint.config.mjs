// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
// import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt({
  rules: {
    'vue/html-self-closing': 'off',
  },
  // plugins: {
  //   'eslint-config-prettier': eslintConfigPrettier,
  // },
})
