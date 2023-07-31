import { serverSupabaseClient } from '#supabase/server'

interface Newsletter {
  email: string;
  subscribed: boolean;
}

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Newsletter>(event)
    const body = await readBody<Newsletter>(event)

    const { data, error } = await supabase
      .from('subscriptions')
      .insert([body]);

    if (error)
      throw createError({ statusMessage: error.message })

    return data
  } catch (error: any) {
    console.error("API newsletter POST", error)

    if (error.statusMessage)
      throw error

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})
