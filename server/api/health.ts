export default defineEventHandler(() => {
  const config = useRuntimeConfig().app
  // console.log({ config })

  return { status: 'OK', ...config }
})
