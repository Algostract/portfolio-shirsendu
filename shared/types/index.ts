export type Technologies = 'angular' | 'react' | 'nextjs' | 'vue' | 'nuxt' | 'astro' | 'tailwindcss' | 'tensorflowjs' | 'typescript' | 'python' | 'fastapi' | 'tensorflow'
export type ProjectType = 'Web App' | 'Web App Template' | 'Cron Job' | 'Game' | 'Library' | 'API' | 'Bot' | 'ML Model'
export type ProjectStage = 'Planning' | 'Development' | 'Stable' | 'Maintenance' | 'Archived'

export interface Image {
  id: string
  title: string
}

export interface BaseProject {
  id: string
  name: string
  repo: string
  stage: ProjectStage
  type: ProjectType[]
  technologies: Technologies[]
  createdAt: string
  appURL: string | null
  videoURL: string | null
  images: Image[]
  url: string
}

export interface Project extends Omit<BaseProject, 'technologies' | 'stage' | 'type'> {
  description: string
  version: string
  stars: number
  forks: number
  technologies: Technologies[]
  updatedAt: string
}

export interface GithubDetailsResponse {
  id: number
  name: string
  repo: string
  description: string
  createdAt: string
  updatedAt: string
  pushedAt: string
  stars: number
  watchers: number
  forks: number
  defaultBranch: 'main'
}

export interface GithubReleaseResponse {
  id: number
  tag: string
  author: string
  name: string
  draft: boolean
  prerelease: boolean
  createdAt: string
  publishedAt: string
  markdown: string
  html: string
}

export interface Hackathon {
  name: string
  url: string
  project: string
  position: string
  startedAt: string
  image: {
    id: string
    title: string
  }
}

export interface Experience {
  company: string
  date: {
    start: string
    end: string
  }
  position: string
  image: {
    id: string
    title: string
  }
}

export interface Certificate {
  name: string
  link: string
  date: string
  image: {
    id: string
    title: string
  }
}

/* Server Only */
export const resourceTypes = ['project', 'asset', 'newsletter', 'company'] as const

export type ResourceType = (typeof resourceTypes)[number]

export type NotionDB = { [K in ResourceType]: string }

export interface ResourceRecordMap {
  project: NotionProject
  asset: NotionProjectAsset
  newsletter: NotionNewsletter
  company: NotionCompany
}

type NotionImage =
  | {
      type: 'file'
      file: {
        url: string
        expiry_time: string
      }
    }
  | {
      type: 'external'
      external: {
        url: string
      }
    }
  | null

export interface NotionProject {
  id: string
  cover: NotionImage
  icon: NotionImage
  properties: {
    Name: {
      type: string
      title: {
        type: string
        text: {
          content: string
          link: null
        }
        plain_text: string
        href: null
      }[]
    }
    Stage: {
      type: string
      status: {
        name: string
        color: string
      }
    }
    Type: {
      type: 'multi_select'
      multi_select: { name: ProjectType; color: string }[]
    }
    Stack: {
      type: 'multi_select'
      multi_select: { name: Technologies; color: string }[]
    }
    Priority: {
      type: string
      select: {
        name: string
        color: string
      }
    }
    Completion: {
      type: string
      rollup: {
        type: string
        number: null
        function: string
      }
    }
    Period: {
      type: string
      date: {
        start: string
        end: null
      }
    }
    Postman: {
      url: string
    }
    Github: {
      url: string
    }
    App: {
      url: string
    }
    'Better Stack': {
      url: string
    }
    Asset: { type: 'relation'; relation: { id: string }[]; has_more: boolean }
    Video: {
      url: string
    }
  }
}

export interface NotionProjectAsset {
  id: string
  cover: NotionImage
  icon: NotionImage
  properties: {
    Project: {
      type: string
      relation: { id: string }[]
      has_more: boolean
    }
    Name: {
      type: string
      title: {
        type: string
        text: {
          content: string
          link: null
        }
        plain_text: string
        href: null
      }[]
    }
    Description: {
      id: string
      type: string
      rich_text: { plain_text: string }[]
    }
    Status: {
      type: string
      status: {
        name: string
        color: string
      }
    }
    'Aspect ratio': {
      id: string
      type: string
      select: {
        name: string
        color: string
      }[]
    }
    Gallery: {
      id: string
      type: string
      number: number
    }
    Resolution: {
      id: string
      type: string
      select: {
        name: string
        color: string
      }[]
    }
  }
}

export interface NotionNewsletter {
  id: string
  cover: NotionImage
  icon: NotionImage
  // properties: {}
}

export interface NotionCompany {
  id: string
  cover: NotionImage
  icon: NotionImage
  properties: {
    Index: { type: 'unique_id'; unique_id: [object] }
    Name: {
      type: string
      title: {
        type: string
        text: {
          content: string
          link: null
        }
        plain_text: string
        href: null
      }[]
    }
    Status: {
      type: string
      status: {
        name: string
        color: string
      }
    }
    Platform: {
      type: 'multi_select'
      multi_select: { name: string; color: string }[]
    }
    Role: {
      type: 'multi_select'
      multi_select: { name: string; color: string }[]
    }
    Type: { select: string[] }
    Phone: { phone_number: null }
    Website: { type: 'url'; url: string }
    LinkedIn: { type: 'url'; url: string }
    Email: { type: 'email'; email: string }
    'Working Period': { type: 'date'; date: [object] }
    Salary: { type: 'number'; number: number }
  }
}
