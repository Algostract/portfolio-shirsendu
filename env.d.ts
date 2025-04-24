interface ImportMetaEnv {
  readonly NODE_ENV: 'development' | 'production'
  readonly PUPPETEER_EXECUTABLE_PATH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
