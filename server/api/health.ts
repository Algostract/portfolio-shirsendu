export default defineEventHandler<{ status: string }>(() => {
  const config = useRuntimeConfig().app
  // console.log({ config })

  return { status: 'OK', ...config }
})
