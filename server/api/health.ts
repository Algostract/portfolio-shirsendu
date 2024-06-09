export default defineEventHandler<{ status: string }>(() => {
  // const config = useRuntimeConfig()
  // console.log({ config })

  return { status: 'OK' }
})
