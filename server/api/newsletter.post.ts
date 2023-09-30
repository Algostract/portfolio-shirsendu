import { createClient } from '@supabase/supabase-js'

interface Newsletter {
  email: string;
  subscribed: boolean;
}

const config = useRuntimeConfig()
const supabase = createClient(config.private.supabaseUrl, config.private.supabaseKey)

export default defineEventHandler(async (event) => {
  try {
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
