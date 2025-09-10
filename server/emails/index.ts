import prospectTemplate from './ProspectTemplate.vue'
import contactTemplate from './ContactTemplate.vue'

export interface EmailMetaData {
  fromCompanyName: string
  fromCompanyLogo: string
  fromCompanyLink: string
  fromCompanyPhone: string
  fromEmail: string
}

export interface ProspectEmail {
  fromFeaturedProjects: { id: string; name: string; description: string; url: string }[]
  toCompanyName: string
  toEmail: string
}

export interface ContactEmail {
  toPersonName: string
  toCompanyName: string
  toEmail: string
  toProjectDescription: string
  toMeetingTime: string
  toMeetingLink: string
}

export type EmailTemplateData = {
  prospect: ProspectEmail
  contact: ContactEmail
}

const emailTemplate = {
  prospect: {
    template: prospectTemplate,
    data: {
      emailSubject: 'Application for Full‑Stack Developer – Shirsendu Bairagi',
    },
  },
  contact: {
    template: contactTemplate,
    data: {
      emailSubject: 'Your Meeting has been Scheduled with Shirsendu Bairagi',
    },
  },
}

export default emailTemplate
