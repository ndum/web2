/**
 * Runs every JavaScript example and solution of the JS workshop in Node and compares what it
 * prints with the recorded output in examples/js/<unit>/expected.json, so the code on the pages
 * always prints what the text says. HTML examples run in happy-dom with their console captured.
 *
 *   node scripts/run_examples.mjs            check, exit 1 on any difference or error
 *   node scripts/run_examples.mjs --update   record the current outputs
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const JS = join(ROOT, 'examples', 'js');
const LANGUAGES = ['de', 'en'];

// Learners run the examples in Switzerland, dates are printed in that time zone
const ENV = { ...process.env, TZ: 'Europe/Zurich', LANG: 'en_US.UTF-8', LC_ALL: 'en_US.UTF-8', NODE_NO_WARNINGS: '1' };

/** Runs one module and returns what it printed, or the error */
export function runModule(path) {
  const result = spawnSync(process.execPath, [path], { cwd: dirname(path), env: ENV, encoding: 'utf8', timeout: 10_000 });
  const stdout = (result.stdout ?? '').replace(/\r\n/g, '\n');
  const problem = result.error?.message ?? (result.status !== 0 ? `exit code ${result.status}: ${result.stderr.trim()}` : result.stderr.trim());
  return { output: stdout, problem: problem || null };
}

/** Runs one HTML page in happy-dom and returns what its scripts logged, or the error */
export async function runPage(path) {
  const { Window } = await import('happy-dom');
  const window = new Window({
    url: 'http://localhost/',
    settings: { enableJavaScriptEvaluation: true, suppressInsecureJavaScriptEnvironmentWarning: true },
  });
  const lines = [];
  const errors = [];
  window.console.log = (...values) => lines.push(values.join(' '));
  window.console.error = (...values) => errors.push(values.join(' '));
  window.document.write(readFileSync(path, 'utf8'));
  await window.happyDOM.waitUntilComplete();
  await window.happyDOM.close();
  return { output: lines.map((line) => `${line}\n`).join(''), problem: errors.length > 0 ? errors.join(' | ') : null };
}

function examples(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => /\.(mjs|html)$/.test(name) && statSync(join(dir, name)).isFile())
    .sort();
}

async function main() {
  const update = process.argv.includes('--update');
  const problems = [];
  let count = 0;
  for (const unit of readdirSync(JS).sort()) {
    const unitDir = join(JS, unit);
    if (!statSync(unitDir).isDirectory()) continue;
    const expectedPath = join(unitDir, 'expected.json');
    const expected = existsSync(expectedPath) ? JSON.parse(readFileSync(expectedPath, 'utf8')) : {};
    const recorded = {};
    for (const lang of LANGUAGES) {
      recorded[lang] = {};
      for (const name of examples(join(unitDir, lang))) {
        const path = join(unitDir, lang, name);
        const shown = relative(ROOT, path).replace(/\\/g, '/');
        const { output, problem } = name.endsWith('.html') ? await runPage(path) : runModule(path);
        count += 1;
        recorded[lang][name] = output;
        if (problem) problems.push(`${shown} failed, ${problem}`);
        else if (!update && expected[lang]?.[name] !== output) problems.push(`${shown} prints something else than recorded`);
      }
    }
    if (update) writeFileSync(expectedPath, `${JSON.stringify(recorded, null, 2)}\n`);
  }
  for (const problem of problems) console.error(problem);
  console.log(`${count} examples run, ${problems.length} problems${update ? ', outputs recorded' : ''}`);
  process.exit(problems.length > 0 ? 1 : 0);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
