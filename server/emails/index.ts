import type { Component } from 'vue'
import { parseYAML } from 'confbox'
import contactTemplate from './ContactTemplate.vue'

export interface ContactEmail {
  fromCompanyName: string
  fromPersonName: string
  fromEmail: string
  fromCompanyLogo: string
  fromCompanyPhone: string
  fromCompanyLink: string
  fromFeaturedProjects: { id: string; name: string; description: string; url: string }[]
  emailSubject: string
  toCompanyName: string
  toPersonName: string
  toEmail: string
}

/**
 * Generic function to read and parse YAML by key
 */
async function loadYamlSection<T>(filename: string, section: string): Promise<T> {
  const storage = useStorage('fs')
  const fileContents = await storage.getItem(`data/${filename}`)
  if (!fileContents) {
    throw new Error(`Missing YAML file: ${filename}`)
  }
  const parsed = parseYAML<{ [key: string]: unknown }>(fileContents.toString())
  if (!(section in parsed)) {
    throw new Error(`Section ${section} not found in ${filename}`)
  }
  return parsed[section] as T
}
/**
 * Factory to create email modules with DRY logic
 */
function createEmailModule<TData extends Record<string, unknown>, TMeta extends Record<string, unknown>, TEMeta = TMeta>(
  section: string,
  template: Component,
  enrich?: (meta: TMeta) => Promise<Partial<TEMeta>>
) {
  return {
    template,
    data: async (data: TData, metaData?: Omit<TMeta, keyof TData>): Promise<TEMeta & TData> => {
      const baseMeta = (metaData as TMeta) ?? (await loadYamlSection<{ [K in keyof TMeta]: TMeta[K] }>('emails.yml', section))
      const extra = enrich ? await enrich(baseMeta) : {}
      return { ...(baseMeta as object), ...extra, ...data } as TEMeta & TData
    },
  }
}

export type EmailTemplateData = {
  contact: Pick<ContactEmail, 'toPersonName' | 'toCompanyName' | 'toEmail'>
}

const emailTemplate = {
  contact: createEmailModule<
    Pick<ContactEmail, 'toCompanyName' | 'toPersonName' | 'toEmail'>,
    Omit<ContactEmail, 'toCompanyName' | 'toPersonName' | 'toEmail' | 'fromFeaturedProjects'> & { fromFeaturedProjects: string[] },
    Omit<ContactEmail, 'toCompanyName' | 'toPersonName' | 'toEmail'>
  >('contact', contactTemplate, async (meta) => {
    const fromFeaturedProjects = await Promise.all(
      meta.fromFeaturedProjects.map(async (key) => {
        try {
          const data = await $fetch(`/api/project/${(key as unknown as string).toLowerCase()}`, {
            baseURL: meta.fromCompanyLink,
          })
          if (Array.isArray(data)) throw new Error('Unexpected array response')
          return { id: data.images[0].id, name: data.name, description: data.description, url: data.url }
        } catch {
          return null
        }
      })
    ).then((photos) => photos.filter((photo) => photo !== null))

    return {
      fromFeaturedProjects,
    }
  }),
}

export default emailTemplate
