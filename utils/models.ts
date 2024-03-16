export type Technologies = 'angular' | 'react' | 'nextjs' | 'vue' | 'nuxt' | 'astro' | 'tailwindcss' | 'tensorflowjs' | 'typescript' | 'python' | 'fastapi' | 'tensorflow'

export interface Project {
  name: string;
  repo: string;
  description: string;
  version: string;
  stars: number;
  forks: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  technologies: Technologies[];
  repoURL: string | null;
  appURL: string | null;
  videoURL: string | null;
}

