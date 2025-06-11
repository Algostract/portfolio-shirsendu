export default function (headerValue: string | undefined) {
  if (typeof headerValue !== 'string') return null
  const parts = headerValue.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null
  return parts[1]
}
