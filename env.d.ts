interface ImportMetaEnv {
  readonly NODE_ENV: 'development' | 'production'
  readonly NOTION_API_KEY?: string
  readonly BROWSER_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
