---
title: Modules and packages
description: Splitting code across files with import and export, ES modules in Node and in the browser, npm, package.json, scripts, versions and the lock file.
sidebar:
  order: 1
---

:::assignment
Martina Hostettler sent the catalog. The volunteers exported the spreadsheet as JSON, 60 things in six categories. One of them also wrote a small script that prints an overview.

> As a volunteer at the counter, I want to get the overview with one command, so that I don't have to search the spreadsheet.

A note from the volunteer is attached. "Everything is in one file. For the app, the functions should probably be split up." The acceptance criteria are:

1. An npm command prints the overview.
2. The functions for amounts and the functions for the catalog each live in a module of their own.
3. The overview uses these modules and defines no function twice.
:::

:::goals
After this chapter you can

- split code across several files with `export` and `import`,
- explain how Node and the browser load ES modules,
- describe a project with `package.json`, install packages and run scripts,
- read version ranges and explain what the lock file is for.

For this you need the basics from the [entry test](../../start/entry-test/), especially functions and objects.
:::

## One file for everything

The volunteer's script reads the export and prints two lines. Read it and think about which parts the app will need later as well.

::code{file="exercises/01-javascript/modules/{lang}/src/overview.js"}

The script works. But the functions `formatDeposit`, `countAvailable` and `findById` sit in a file that prints something as soon as it starts. The app can't use them without copying the file, and a copy means fixing every bug in two places. The answer is modules. A module is a file that decides what other files may use from it.

## Export and import

With `export`, a module makes a function, a constant or a class available. Everything else stays inside the module. In the example, `format.mjs` exports the function `formatDeposit`, while the formatter `chf` stays internal.

::code{file="examples/01-javascript/modules/{lang}/format.mjs" run="false"}

::code{file="examples/01-javascript/modules/{lang}/catalog.mjs" run="false"}

With `import`, another module gets these names. The curly braces hold the names it needs, and `from` is followed by the path to the file. A path that starts with `./` or `../` is relative to the file that contains the import.

::code{file="examples/01-javascript/modules/{lang}/main.mjs" run="false"}

The examples import each other, so they don't run with the "Run" button but with Node. In the course repo you start them in the folder `examples/01-javascript/modules/en`.

```bash
node main.mjs
```

The output is `3 of 4 things are in.` and `Projector, deposit CHF 80.00`. A module has a scope of its own. No other module sees the variables it doesn't export, and two modules may use the same names internally without getting in each other's way.

## Names when importing

You can rename a name when you import it, for example when two modules both offer a function called `format`. `import { nextId as reservationId } from './ids.mjs'` gets `nextId` under the name `reservationId`. `import * as catalog` gets all exports of a module as one object.

::code{file="examples/01-javascript/modules/{lang}/namespace.mjs" run="false"}

`node namespace.mjs` prints `[ 'countAvailable', 'findById' ]` and then the name of the raclette oven. Besides named exports there is the default export, `export default function formatDeposit(...)`, which is imported without curly braces, `import formatDeposit from './format.mjs'`. The course uses named exports, because then the name is the same everywhere and the editor finds it when you rename it. You will see a default export with Vue components. The compiler turns every `.vue` file into one, which is why you import `ItemCard` without curly braces.

## A module runs once

When several files import the same module, JavaScript runs its code only the first time. After that, all of them get the same module with the same variables.

::code{file="examples/01-javascript/modules/{lang}/ids.mjs" run="false"}

::code{file="examples/01-javascript/modules/{lang}/shared.mjs" run="false"}

`node shared.mjs` prints `1 2 3`. Both imports point to the same function and thus to the same variable `next`. That way a module can hold state for a whole app. In part 7 the course uses this to share data.

## Modules in Node and in the browser

Node treats a file ending in `.mjs` as an ES module. A file ending in `.js` counts as an ES module when the nearest `package.json` contains `"type": "module"`. Without that entry, current versions of Node detect `import` and `export` on their own, but older versions and some tools then expect CommonJS, the older module system with `require` and `module.exports`. With the entry the case is clear for everyone, which is why every project of the course has it. You will find CommonJS in older code and in many answers from AI assistants.

In the browser, `<script type="module" src="main.js"></script>` loads a module. It runs only once the page has been read, and strict mode always applies. Without `type="module"`, the browser reports the error `Cannot use import statement outside a module` at the first `import`. The browser loads modules over HTTP, and if you open a page directly as a file, most browsers block its modules. An import such as `import { ref } from 'vue'` doesn't work in the browser without help either, because the browser doesn't know where the package `vue` lives. In part 2, Vite takes care of both, a tool that runs as a server during development and bundles all modules for publishing.

## npm and package.json

npm installs packages, that is, code written by others, and runs scripts. What a project needs is listed in the file `package.json`. This is what it looks like in the exercise project of this chapter.

::code{file="exercises/01-javascript/modules/{lang}/package.json"}

`type` sets the module system, as described above. `scripts` holds named commands. `npm run test` runs the command `vitest run`, and for `test` and `start` you may leave out the `run`. `devDependencies` lists packages that are only needed during development, here Vitest for the tests. Whatever the app itself needs to run, such as Vue, goes into `dependencies`. `private: true` keeps anyone from accidentally publishing the project to the public npm registry.

`npm install` reads the file and downloads all packages into the folder `node_modules`, including the packages these packages need themselves. You add a new package with `npm install -D vitest`, where `-D` puts it under `devDependencies`. You run tools from `node_modules` with `npx`, for example `npx vitest`.

## Versions and the lock file

Package versions have three numbers, such as `5.0.5`. The first one goes up with changes that can break existing code, the second with new features and the third with bug fixes. This scheme is called semantic versioning. `package.json` often contains a range instead of a version.

| Entry | Allows |
|---|---|
| `5.0.5` | exactly this version |
| `~5.0.5` | bug fixes, that is `5.0.x` from `5.0.5` |
| `^5.0.5` | everything up to but not including `6.0.0` |

The course writes exact versions so that everyone works with the same packages. Even then, the packages themselves have dependencies with ranges. That's why `npm install` writes the file `package-lock.json`, which records the exact version of every installed package. The lock file belongs in the repo, `node_modules` never does. `npm ci` installs exactly what the lock file says, which suits servers that run tests.

## In code

Work with the examples in the folder `examples/01-javascript/modules/en`. Each time, predict what will happen before you run a command.

1. What does `node shared.mjs` print when you change the line `let next = 1` in `ids.mjs` to `let next = 100`?
2. Remove the word `export` in front of `countAvailable` in `catalog.mjs` and run `node main.mjs`. Which message appears, and does it appear before or after the first line of output?
3. In `main.mjs`, leave out the extension `.mjs` when importing `catalog.mjs`. What does Node report now?
4. Restore everything and additionally import the formatter `chf` from `format.mjs` in `main.mjs`. Why does that fail?

The messages from steps 2 and 3 appear before the first line runs. JavaScript resolves all imports before it runs the code of a module.

## Exercises

The exercises build on the volunteer's script. You find it in the course repo in the folder `exercises/01-javascript/modules/en`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

`node src/overview.js` shows the overview. At the start almost all tests fail, and that's intended.

::::exercise[Getting started]
Create the file `src/format.js`. It exports the function `formatDeposit`, which formats an amount like `CHF 20.00`. Remove the function from `src/overview.js` and import it there from the new module. The tests in `level-1.test.js` check both.

:::solution[Solution]
::code{file="exercises/01-javascript/modules/solution/{lang}/src/format.js"}

The function disappears from `src/overview.js`, and the top of the file gets `import { formatDeposit } from './format.js'`. The formatter `chf` moves into the module too. It stays there without `export`, because nobody but `formatDeposit` needs it.
:::
::::

::::exercise[Going further]
Move `countAvailable` and `findById` into a module `src/catalog.js` and import them in the overview. Then add a script `overview` to `package.json` that runs `node src/overview.js`, and start the overview with `npm run overview`.

:::solution[Solution]
::code{file="exercises/01-javascript/modules/solution/{lang}/src/catalog.js"}

Under `scripts` in `package.json` you add the line `"overview": "node src/overview.js"`. npm runs the command in the folder of the project, so the path is right no matter where you start the script from. The last test runs the overview and checks that it still prints the same after the refactoring.
:::
::::

::::exercise[Challenge]
Later, the app should be able to import all functions from one single place. Create `src/index.js`, which passes on all functions from `catalog.js` and `format.js` without copying them. Change the overview so that it imports from `./index.js` only.

:::solution[Solution]
::code{file="exercises/01-javascript/modules/solution/{lang}/src/index.js"}

::code{file="exercises/01-javascript/modules/solution/{lang}/src/overview.js"}

`export { ... } from` passes on names of another module without importing them itself. The functions stay in their modules and `index.js` only points to them, which is why `findById` from `index.js` is the same function as the one from `catalog.js`. With `export * from './catalog.js'`, the module would pass on everything `catalog.js` exports. The explicit list, on the other hand, shows at a glance what the module offers.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| The browser reports `Cannot use import statement outside a module`. | The `<script>` tag lacks `type="module"`. |
| An import without an extension such as `from './catalog'`, and Node reports `ERR_MODULE_NOT_FOUND`. | Write the extension in Node and in the browser. Only tools such as Vite add it themselves. |
| Node reports `does not provide an export named`. | Compare the name in the `export` and in the `import`, including upper and lower case. |
| `node_modules` ends up in the repo. | Add `node_modules/` to the file `.gitignore`. `npm install` creates the folder again at any time. |
| A test compares `formatDeposit(20)` with `'CHF 20.00'` and fails, even though the output looks the same. | `Intl` puts a non-breaking space after `CHF`. Normalize the spaces in the test first, as `level-1.test.js` does. |
| An AI assistant writes `require(...)` and `module.exports`. | That is CommonJS, the older module system of Node. The course uses `import` and `export`. |
| An AI assistant installs a package for a small task, such as formatting amounts. | Check first whether JavaScript can do it itself, here with `Intl.NumberFormat`. Every package is code that someone has to maintain. |

## Self-check

::::selfcheck
1. What is the difference between a named export and a default export?
2. Two files import the same module. How often does its code run, and what does that mean for its variables?
3. What is `package-lock.json` for, and does it belong in the repo?
4. What does the entry `^5.0.5` in `package.json` allow?

:::solution[Answers]
1. A named export has a fixed name and is imported with curly braces. A module has at most one default export, which an import without braces gets under any name.
2. Only once. All files that import the module share its variables.
3. It records the exact version of every installed package, including the packages other packages need, so everyone installs the same. The file belongs in the repo.
4. Every version from `5.0.5` up to but not including `6.0.0`, that is new features and bug fixes, but no changes that break existing code.
:::
::::

:::assignment
Martina Hostettler thanks you for the overview. A volunteer used it right away to add two new tents, and since then something is wrong. When someone borrows one of the new tents, the other one is gone too. The next chapter is about this bug.
:::
