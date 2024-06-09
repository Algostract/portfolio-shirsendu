export type Technologies = 'angular' | 'react' | 'nextjs' | 'vue' | 'nuxt' | 'astro' | 'tailwindcss' | 'tensorflowjs' | 'typescript' | 'python' | 'fastapi' | 'tensorflow'

export interface BaseProject {
  name: string
  repo: string
  technologies: {
    languages: string[]
    frameworks: string[]
  }
  createdAt: string
  appURL: string | null
  videoURL: string | null
}

export interface Project extends Omit<BaseProject, 'technologies'> {
  description: string
  version: string
  stars: number
  forks: number
  technologies: Technologies[]
  updatedAt: string
  repoURL: string | null
}
