import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
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

/** Every German and English folder of a playground example, recognized by its App.vue */
function exampleRoots(dir = EXAMPLES) {
  const roots = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (name === '_source' || name === 'node_modules' || !statSync(path).isDirectory()) continue;
    if ((name === 'de' || name === 'en') && existsSync(join(path, 'App.vue'))) roots.push(path);
    else roots.push(...exampleRoots(path));
  }
  return roots;
}

/** The .vue and .js files of one example with their paths relative to the example */
function filesOf(root, dir = root) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files.push(...filesOf(root, path));
    else if (/\.(vue|js)$/.test(name)) files.push(relative(root, path).replace(/\\/g, '/'));
  }
  return files;
}

const LOCAL_IMPORT = /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)['"](\.[^'"]*)['"]/g;

describe('local imports of the playground examples', () => {
  // The playground only treats imports that start with ./ as files of the example and resolves
  // them from the root of the example, so only files at the root import, and only with ./
  for (const root of exampleRoots()) {
    it(`resolve in Vite and in the playground alike: ${relative(ROOT, root).replace(/\\/g, '/')}`, () => {
      const files = filesOf(root);
      for (const file of files) {
        const source = readFileSync(join(root, file), 'utf8');
        for (const [, specifier] of source.matchAll(LOCAL_IMPORT)) {
          assert.ok(!file.includes('/'), `${file} imports ${specifier} from a subfolder`);
          assert.ok(specifier.startsWith('./'), `${file} imports ${specifier} without ./`);
          const target = specifier.slice(2);
          assert.ok([target, `${target}.js`].some((name) => files.includes(name)), `${file} imports the missing ${specifier}`);
        }
      }
    });
  }
});

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
