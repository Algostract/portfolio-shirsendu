import { createRegExp, charIn, oneOrMore, global, charNotIn } from 'magic-regexp'

export default function (value: string): string {
  const dash = oneOrMore(charIn('-'))
  const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789_/'

  return value
    .toLowerCase()
    .trim()
    .replace(createRegExp(oneOrMore(charNotIn(allowedChars)), [global]), '-')
    .replace(createRegExp(dash.at.lineStart().or(dash.at.lineEnd()), [global]), '')
}
