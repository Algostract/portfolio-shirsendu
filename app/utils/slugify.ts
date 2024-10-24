export default function (value: string): string {
  return value
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both sides
    .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with a hyphen
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
}
