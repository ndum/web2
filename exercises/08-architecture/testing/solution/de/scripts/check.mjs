// Checks your tests. First they run against the code as it is, there they have to pass. Then the
// tests of each level run once against every mutant of that level, a copy of the code with a small
// mistake. A good test notices the mistake and fails.
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { MUTANTS } from '../mutants/list.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const VITEST = join(ROOT, 'node_modules', 'vitest', 'vitest.mjs')
const LEVELS = ['Einstieg', 'Vertiefung', 'Knobelei']

function vitest(file, mutant = '') {
  const result = spawnSync(process.execPath, [VITEST, 'run', file], {
    cwd: ROOT,
    env: { ...process.env, MUTANT: mutant },
    encoding: 'utf8',
  })
  const output = `${result.stdout}${result.stderr}`.replace(/\x1b\[[0-9;]*m/g, '')
  return { passed: result.status === 0, tests: Number(output.match(/Tests\s+(\d+) passed/)?.[1] ?? 0), output }
}

let allFound = true
for (const [index, level] of LEVELS.entries()) {
  const file = `tests/level-${index + 1}.test.js`
  const own = vitest(file)
  if (!own.passed || own.tests === 0) {
    allFound = false
    console.log(`${level}: Deine Tests laufen gegen den richtigen Code nicht durch, oder es gibt noch keine.`)
    if (!own.passed) console.log(own.output)
    continue
  }
  const mutants = MUTANTS.filter((mutant) => mutant.level === index + 1)
  const missed = mutants.filter((mutant) => vitest(file, mutant.id).passed)
  console.log(`${level}: ${mutants.length - missed.length} von ${mutants.length} Fehlern gefunden`)
  for (const mutant of missed) console.log(`  Unbemerkt: ${mutant.description}`)
  if (missed.length > 0) allFound = false
}
process.exit(allFound ? 0 : 1)
