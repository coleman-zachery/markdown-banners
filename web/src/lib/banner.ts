const raw = String.raw

const GLYPHS: Record<string, string[]> = {
  A: [raw`  /██████ `, raw` /██__  ██`, raw`| ██  \ ██`, raw`| ████████`, raw`| ██__  ██`, raw`| ██  | ██`, raw`| ██  | ██`, raw`|__/  |__/`, raw`          `],
  B: [raw` /███████ `, raw`| ██__  ██`, raw`| ██  \ ██`, raw`| ███████ `, raw`| ██__  ██`, raw`| ██  \ ██`, raw`| ███████/`, raw`|_______/ `, raw`          `],
  C: [raw`  /██████ `, raw` /██__  ██`, raw`| ██  \__/`, raw`| ██      `, raw`| ██      `, raw`| ██    ██`, raw`|  ██████/`, raw` \______/ `, raw`          `],
  D: [raw` /███████ `, raw`| ██__  ██`, raw`| ██  \ ██`, raw`| ██  | ██`, raw`| ██  | ██`, raw`| ██  | ██`, raw`| ███████/`, raw`|_______/ `, raw`          `],
  E: [raw` /████████`, raw`| ██_____/`, raw`| ██      `, raw`| █████   `, raw`| ██__/   `, raw`| ██      `, raw`| ████████`, raw`|________/`, raw`          `],
  F: [raw` /████████`, raw`| ██_____/`, raw`| ██      `, raw`| █████   `, raw`| ██__/   `, raw`| ██      `, raw`| ██      `, raw`|__/      `, raw`          `],
  G: [raw`  /██████ `, raw` /██__  ██`, raw`| ██  \__/`, raw`| ██ /████`, raw`| ██|_  ██`, raw`| ██  \ ██`, raw`|  ██████/`, raw` \______/ `, raw`          `],
  H: [raw` /██   /██`, raw`| ██  | ██`, raw`| ██  | ██`, raw`| ████████`, raw`| ██__  ██`, raw`| ██  | ██`, raw`| ██  | ██`, raw`|__/  |__/`, raw`          `],
  I: [raw` /██████`, raw`|_  ██_/`, raw`  | ██  `, raw`  | ██  `, raw`  | ██  `, raw`  | ██  `, raw` /██████`, raw`|______/`, raw`        `],
  J: [raw`    /█████`, raw`   |__  ██`, raw`      | ██`, raw`      | ██`, raw` /██  | ██`, raw`| ██  | ██`, raw`|  ██████/`, raw` \______/ `, raw`          `],
  K: [raw` /██   /██`, raw`| ██  /██/`, raw`| ██ /██/ `, raw`| █████/  `, raw`| ██  ██  `, raw`| ██\  ██ `, raw`| ██ \  ██`, raw`|__/  \__/`, raw`          `],
  L: [raw` /██      `, raw`| ██      `, raw`| ██      `, raw`| ██      `, raw`| ██      `, raw`| ██      `, raw`| ████████`, raw`|________/`, raw`          `],
  M: [raw` /██      /██`, raw`| ███    /███`, raw`| ████  /████`, raw`| ██ ██/██ ██`, raw`| ██  ███| ██`, raw`| ██\  █ | ██`, raw`| ██ \/  | ██`, raw`|__/     |__/`, raw`             `],
  N: [raw` /██   /██`, raw`| ███ | ██`, raw`| ████| ██`, raw`| ██ ██ ██`, raw`| ██  ████`, raw`| ██\  ███`, raw`| ██ \  ██`, raw`|__/  \__/`, raw`          `],
  O: [raw`  /██████ `, raw` /██__  ██`, raw`| ██  \ ██`, raw`| ██  | ██`, raw`| ██  | ██`, raw`| ██  | ██`, raw`|  ██████/`, raw` \______/ `, raw`          `],
  P: [raw` /███████ `, raw`| ██__  ██`, raw`| ██  \ ██`, raw`| ███████/`, raw`| ██____/ `, raw`| ██      `, raw`| ██      `, raw`|__/      `, raw`          `],
  Q: [raw`  /██████ `, raw` /██__  ██`, raw`| ██  \ ██`, raw`| ██  | ██`, raw`| ██  | ██`, raw`| ██/██ ██`, raw`|  ██████/`, raw` \____ ███`, raw`      \__/`],
  R: [raw` /███████ `, raw`| ██__  ██`, raw`| ██  \ ██`, raw`| ███████/`, raw`| ██__  ██`, raw`| ██  \ ██`, raw`| ██  | ██`, raw`|__/  |__/`, raw`          `],
  S: [raw`  /██████ `, raw` /██__  ██`, raw`| ██  \__/`, raw`|  ██████ `, raw` \____  ██`, raw` /██  \ ██`, raw`|  ██████/`, raw` \______/ `, raw`          `],
  T: [raw` /████████`, raw`|__  ██__/`, raw`   | ██   `, raw`   | ██   `, raw`   | ██   `, raw`   | ██   `, raw`   | ██   `, raw`   |__/   `, raw`          `],
  U: [raw` /██   /██`, raw`| ██  | ██`, raw`| ██  | ██`, raw`| ██  | ██`, raw`| ██  | ██`, raw`| ██  | ██`, raw`|  ██████/`, raw` \______/ `, raw`          `],
  V: [raw` /██    /██`, raw`| ██   | ██`, raw`| ██   | ██`, raw`|  ██ / ██/`, raw` \  ██ ██/ `, raw`  \  ███/  `, raw`   \  █/   `, raw`    \_/    `, raw`           `],
  W: [raw` /██      /██`, raw`| ██  /█ | ██`, raw`| ██ /███| ██`, raw`| ██/██ ██ ██`, raw`| ████_  ████`, raw`| ███/ \  ███`, raw`| ██/   \  ██`, raw`|__/     \__/`, raw`             `],
  X: [raw` /██   /██`, raw`| ██  / ██`, raw`|  ██/ ██/`, raw` \  ████/ `, raw`  >██  ██ `, raw` /██/\  ██`, raw`| ██  \ ██`, raw`|__/  |__/`, raw`          `],
  Y: [raw` /██     /██`, raw`|  ██   /██/`, raw` \  ██ /██/ `, raw`  \  ████/  `, raw`   \  ██/   `, raw`    | ██    `, raw`    | ██    `, raw`    |__/    `, raw`            `],
  Z: [raw` /████████`, raw`|_____ ██ `, raw`     /██/ `, raw`    /██/  `, raw`   /██/   `, raw`  /██/    `, raw` /████████`, raw`|________/`, raw`          `],
}

const LETTER_HEIGHT = 9
const SPACING = 1
const SPACE_SIZE = 8

export type BannerPayload = {
  art: string
  markdown: string
  width: number
  lineCount: number
}

export type SanitizedBannerInput = {
  value: string
  changed: boolean
}

export function sanitizeBannerInput(input: string, maxLength: number): SanitizedBannerInput {
  const characters: string[] = []
  let changed = false

  for (const character of input) {
    const normalizedCharacter = /\s/.test(character) ? ' ' : character

    if (normalizedCharacter !== character) {
      changed = true
    }

    const isSupported = normalizedCharacter === ' ' || Boolean(GLYPHS[normalizedCharacter.toUpperCase()])
    if (!isSupported) {
      changed = true
      continue
    }

    if (characters.length >= maxLength) {
      changed = true
      break
    }

    characters.push(normalizedCharacter)
  }

  return {
    value: characters.join(''),
    changed,
  }
}

export function createBanner(input: string): BannerPayload {
  const message = input.toUpperCase()

  if (!message.trim()) {
    return {
      art: '',
      markdown: '',
      width: 0,
      lineCount: 0,
    }
  }

  for (const character of message) {
    if (character !== ' ' && !GLYPHS[character]) {
      throw new Error('Only letters A-Z and spaces are supported.')
    }
  }

  const rows: string[] = []

  for (let rowIndex = 0; rowIndex < LETTER_HEIGHT; rowIndex += 1) {
    const parts: string[] = []

    for (const character of message) {
      if (character === ' ') {
        parts.push(' '.repeat(SPACE_SIZE))
        continue
      }

      parts.push(GLYPHS[character][rowIndex])
    }

    rows.push(parts.join(' '.repeat(SPACING)))
  }

  const wordLength = rows[0]?.length ?? 0
  const header = `╔══${'═'.repeat(wordLength)}══╗`
  const gap = `║  ${' '.repeat(wordLength)}  ║`
  const body = rows.map(row => `║  ${row}  ║`)
  const footer = `╚══${'═'.repeat(wordLength)}══╝`
  const art = [header, gap, ...body, footer].join('\n')

  return {
    art,
    markdown: `\`\`\`text\n${art}\n\`\`\``,
    width: header.length,
    lineCount: body.length + 3,
  }
}
