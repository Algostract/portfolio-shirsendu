export default defineEventHandler<{ status: string }>((event) => {
  const config = useRuntimeConfig()
  console.log({ config });

  return { status: 'OK' }
})
