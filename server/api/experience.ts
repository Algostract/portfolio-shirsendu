export interface Experience {
  company: string
  date: string
}

export default defineEventHandler<Experience[]>(() => {
  const config = useRuntimeConfig()

  return [{
    company: 'nextdoor-kitchens',
    date: '2022',
  }, {
    company: 'xatalyst-labs',
    date: '2023',
  }]
})