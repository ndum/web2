import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { vi } from 'vitest'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

export const readSource = (file) => readFileSync(join(ROOT, 'src', file), 'utf8')

// The loans of the team, as public/loans.json delivers them
export const loans = JSON.parse(readFileSync(join(ROOT, 'public', 'loans.json'), 'utf8'))

export function stubLoans() {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(loans))))
}
