import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'adr')

// The ADR with this number, with its file name, title and sections, or null when there is none
export function readAdr(number) {
  const prefix = `${String(number).padStart(4, '0')}-`
  const name = readdirSync(DIR).find((file) => file.startsWith(prefix) && file.endsWith('.md'))
  if (name === undefined) return null
  const text = readFileSync(join(DIR, name), 'utf8')
  const sections = {}
  for (const part of text.split(/^## /m).slice(1)) {
    const [heading, ...body] = part.split('\n')
    sections[heading.trim()] = body.join('\n').trim()
  }
  return { name, title: text.match(/^# (.+)$/m)?.[1] ?? '', sections }
}

// The table of all decisions in docs/adr/README.md
export const readIndex = () => readFileSync(join(DIR, 'README.md'), 'utf8')

// The row of the table that links to the ADR with this file name
export const indexRow = (name) => readIndex().split('\n').find((line) => line.includes(`(${name})`)) ?? ''
