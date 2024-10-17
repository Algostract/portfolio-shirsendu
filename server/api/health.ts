export default defineEventHandler(() => {
  const config = useRuntimeConfig().app

  return { status: 'OK', ...config }
})
