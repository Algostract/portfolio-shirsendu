interface ImportMetaEnv {
  readonly NODE_ENV: 'development' | 'production'
  readonly BROWSER_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
