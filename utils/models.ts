export interface Project {
  name: string;
  repo: string;
  description: string;
  version: string;
  stars: number;
  forks: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  appURL: string | null;
  videoURL: string | null;
}