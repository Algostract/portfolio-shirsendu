import type { Component } from 'vue'
import { parseYAML } from 'confbox'
import contactTemplate from './ContactTemplate.vue'

export interface ContactEmail {
  fromCompanyName: string
  fromPersonName: string
  fromEmail: string
  fromCompanyLogo: string
  fromCompanyLink: string
  fromCompanyPhone: string
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
  contact: createEmailModule<Pick<ContactEmail, 'toPersonName' | 'toCompanyName' | 'toEmail'>, Omit<ContactEmail, 'toPersonName' | 'toCompanyName' | 'toEmail'>>('content', contactTemplate),
}

export default emailTemplate
