import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { compileScript, compileTemplate, parse } from 'vue/compiler-sfc';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const EXAMPLES = join(ROOT, 'examples');

/** Every .vue file of the generated German and English example folders */
function exampleFiles(dir = EXAMPLES) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (name === '_source' || name === 'node_modules') continue;
    if (statSync(path).isDirectory()) files.push(...exampleFiles(path));
    else if (name.endsWith('.vue') && /[\\/](de|en)[\\/]/.test(path)) files.push(path);
  }
  return files;
}

describe('playground examples', () => {
  const files = exampleFiles();

  it('exist in both languages', () => {
    const de = files.filter((path) => /[\\/]de[\\/]/.test(path)).length;
    const en = files.filter((path) => /[\\/]en[\\/]/.test(path)).length;
    assert.ok(de > 0);
    assert.equal(de, en);
  });

  for (const path of files) {
    it(`compile without errors: ${relative(ROOT, path).replace(/\\/g, '/')}`, () => {
      const source = readFileSync(path, 'utf8');
      const { descriptor, errors } = parse(source, { filename: path });
      assert.deepEqual(errors, []);
      const id = 'example';
      const script = descriptor.scriptSetup || descriptor.script ? compileScript(descriptor, { id }) : null;
      if (descriptor.template) {
        const result = compileTemplate({
          source: descriptor.template.content,
          filename: path,
          id,
          compilerOptions: { bindingMetadata: script?.bindings },
        });
        assert.deepEqual(result.errors, []);
      }
    });
  }
});
