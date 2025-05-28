export default function (
  title: (
    | {
        plain_text: string
      }
    | {
        text: {
          content: string
        }
      }
  )[]
) {
  return title.map((value) => ('plain_text' in value ? value.plain_text : value.text.content) ?? '').join('') as string
}
