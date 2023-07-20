export default defineEventHandler(async (event) => {
  try {
  } catch (error: any) {
    console.error("API newsletter POST", error)

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})
