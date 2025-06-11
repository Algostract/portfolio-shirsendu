export type Technologies = 'angular' | 'react' | 'nextjs' | 'vue' | 'nuxt' | 'astro' | 'tailwindcss' | 'tensorflowjs' | 'typescript' | 'python' | 'fastapi' | 'tensorflow'
export type ProjectType = 'Web App' | 'Web App Template' | 'Cron Job' | 'Game' | 'Library' | 'API' | 'Bot' | 'ML Model'
export type ProjectStage = 'Planning' | 'Development' | 'Stable' | 'Maintenance' | 'Archived'

export interface Image {
  id: string
  title: string
}

export interface BaseProject {
  name: string
  repo: string
  type: ProjectType[]
  technologies: {
    languages: string[]
    frameworks: string[]
  }
  createdAt: string
  appURL: string | null
  videoURL: string | null
  images: Image[]
  stage: ProjectStage
}

export interface Project extends Omit<BaseProject, 'technologies'> {
  description: string
  version: string
  stars: number
  forks: number
  technologies: Technologies[]
  updatedAt: Date
  repoURL: string | null
}

export interface GithubDetailsResponse {
  id: number
  name: string
  repo: string
  description: string
  createdAt: Date
  updatedAt: Date
  pushedAt: Date
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

export interface TransactionalEmail {
  name: string
  email: string
  message: string
}

// Server only
export const resourceTypes = ['project', 'asset', 'newsletter'] as const

export type ResourceType = (typeof resourceTypes)[number]

export type NotionDB = { [K in ResourceType]: string }
