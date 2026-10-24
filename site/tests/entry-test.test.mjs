import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

// quiz.js defines a custom element when it loads, Node only needs stand-ins for that
globalThis.HTMLElement = class {};
globalThis.customElements = { get: () => undefined, define: () => {} };
const { matches } = await import('../src/scripts/quiz.js');

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DOCS = join(ROOT, 'site', 'src', 'content', 'docs');
const EXPECTED = JSON.parse(readFileSync(join(ROOT, 'examples', 'js', 'entry-test', 'expected.json'), 'utf8'));
const PAGES = { de: join(DOCS, 'start', 'entry-test.md'), en: join(DOCS, 'en', 'start', 'entry-test.md') };

/** Every ::::question of a page with its attributes, its embedded file and its own text. */
function questions(path) {
  return readFileSync(path, 'utf8')
    .split(/^::::question/m)
    .slice(1)
    .map((block) => {
      const header = block.slice(0, block.indexOf('\n'));
      const attributes = Object.fromEntries([...header.matchAll(/(\w+)=(?:"([^"]*)"|'([^']*)')/g)].map((m) => [m[1], m[2] ?? m[3]]));
      const code = /^::code\{file="examples\/js\/entry-test\/\{lang\}\/([^"]+)"([^}]*)\}/m.exec(block);
      return { ...attributes, file: code?.[1], codeOptions: code?.[2] ?? '', text: block };
    });
}

for (const [lang, page] of Object.entries(PAGES)) {
  test(`every answer of the ${lang} entry test matches the recorded output`, () => {
    const list = questions(page);
    assert.deepEqual(list.map((q) => q.file).sort(), Object.keys(EXPECTED[lang]).sort(), 'each example is asked once');
    for (const question of list) {
      const output = EXPECTED[lang][question.file];
      assert.ok(matches(output, question.answer), `${question.file} prints ${JSON.stringify(output)}, the page accepts "${question.answer}"`);
    }
  });

  test(`every question of the ${lang} entry test hides the run button and links an existing unit`, () => {
    for (const question of questions(page)) {
      assert.match(question.codeOptions, /run="false"/, `${question.file} must not offer a run button`);
      const unit = join(DOCS, ...(lang === 'en' ? ['en'] : []), 'js', `${question.unit}.md`);
      assert.ok(existsSync(unit), `${question.file} names the unit ${question.unit}, which has no page`);
      assert.ok(question.text.includes(`](../../js/${question.unit}/)`), `${question.file} needs a link to its unit`);
    }
  });
}
