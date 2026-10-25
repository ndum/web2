# WEB2

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ndum/web2)

The course is complete and published at https://web2.ndum.ch/.

Single page applications with Vue, a course for computer science students at Swiss higher vocational schools (HF) in the specialization application development. In German the course is called *WEB2: Single Page Applications mit Vue*. It is written in German and English and made for self-study, with short inputs in class.

The course assumes HTML, CSS and JavaScript basics. It refreshes the JavaScript that single page applications rely on and then works with Vue 3, the Composition API and `<script setup>`.

## Contents

0. Getting started
1. JavaScript for single page applications
2. Single page application basics
3. Getting started with Vue
4. Components
5. Reactivity and composables
6. Routing
7. State and data
8. Architecture, quality and operations

A practical exam follows part 7. Part 8 accompanies the final project, in which students build their own single page application with a framework of their choice. Besides the parts, the course has a JS workshop with the basics of JavaScript, eleven optional topics for the project and a glossary.

## The running case

The chapters follow one app. Lorraine Commons, a fictional association in the Lorraine quarter of Bern, runs a library of things where members borrow drills, tents or raclette ovens. Each part adds what the association needs next, such as a catalog with search, reservations, a login or data from an API.

## Repository

| Folder | Content |
|---|---|
| `site/` | the course site, built with Astro and Starlight, German at the root and English under `/en/` |
| `exercises/` | the exercise projects of the chapters with their tests, the solutions in the folders `solution` |
| `case/` | the case app after every part |
| `api/` | the course API that the case app uses from part 7 on |
| `examples/` | the examples of the pages and of the playground |
| `optional/` | the runnable examples of the optional topics |
| `figures/` | the scripts that draw the figures and the favicon |
| `scripts/` | the checks and tools of the course |

Projects in German and English are written once in a folder `_source`, and `node scripts/localize.mjs` writes their variants in `de` and `en`. Changes go into `_source`, never into the variants.

## Working with the repo

Students clone the repo and work in one exercise folder at a time with npm. The chapter [Setup](https://web2.ndum.ch/en/start/setup/) explains the tools and how to work in GitHub Codespaces without installing anything.

```bash
git clone https://github.com/ndum/web2.git
cd web2/exercises/00-start/setup/en
npm install
npm test
```

The site and the checks need Node.js 26, pnpm 12 and Python 3. `corepack enable` provides the version of pnpm that `package.json` names.

```bash
pnpm install
pnpm --filter ./site run dev
pnpm --filter ./site run build
node scripts/build_demo.mjs
python scripts/check_style.py
python scripts/check_parity.py
```

## Feedback

Mistakes and suggestions are welcome as [issues](https://github.com/ndum/web2/issues).

## License

Text and figures are licensed under CC BY-SA 4.0, code under the MIT License and the course's own datasets under CC0 1.0. The license texts are in [LICENSES](LICENSES). The figures use the handwriting font Kalam by the Indian Type Foundry under the SIL Open Font License 1.1, which the site serves from the package `@fontsource/kalam`.
