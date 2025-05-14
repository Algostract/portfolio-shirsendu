import contactTemplate from './ContactTemplate.vue'
import outreachTemplate from './OutreachTemplate.vue'

export interface ContactEmail {
  fromPersonName: string
  fromEmail: string
  emailSubject: string
  toPersonName: string
  toEmail: string
}

export interface OutreachEmail {
  fromCompanyName: string
  fromPersonName: string
  fromEmail: string
  fromCompanyLogo: string
  fromCompanyLink: string
  fromCompanyPhone: string
  fromFeaturedPhotos: string[]
  emailSubject: string
  toCompanyName: string
  toPersonName: string
  toEmail: string
}

const cachedReadYamlFile = defineCachedFunction(readYamlFile)

export default {
  contact: {
    template: contactTemplate,
    data: async (data: Pick<ContactEmail, 'toPersonName' | 'toEmail'>): Promise<ContactEmail> => {
      const contactData = ((await cachedReadYamlFile<{ contact: string }>('emails.yml')) as unknown as { contact: string }).contact as unknown as Omit<ContactEmail, 'toPersonName' | 'toEmail'>
      return { ...contactData, ...data }
    },
  },
  outreach: {
    template: outreachTemplate,
    data: async (data: Pick<OutreachEmail, 'toCompanyName' | 'toPersonName' | 'toEmail'>): Promise<OutreachEmail> => {
      const outreachData = ((await cachedReadYamlFile<{ outreach: string }>('emails.yml')) as unknown as { outreach: string }).outreach as unknown as Omit<
        OutreachEmail,
        'toCompanyName' | 'toPersonName' | 'toEmail'
      >
      return { ...outreachData, ...data }
    },
  },
}
