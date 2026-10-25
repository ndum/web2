// @ts-check
import { fileURLToPath } from 'node:url';

import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';

import remarkContentLint from './src/plugins/remark-content-lint.mjs';
import remarkInlineFigures from './src/plugins/remark-inline-figures.mjs';
import remarkLearnBlocks from './src/plugins/remark-learn-blocks.mjs';

/** The repository root, so pages can embed tested files from examples/, exercises/ and case/. */
const repoRoot = fileURLToPath(new URL('..', import.meta.url));

export default defineConfig({
  site: 'https://ndum.github.io',
  // Pull request previews are built under their own path
  base: process.env.SITE_BASE ?? '/web2/',
  trailingSlash: 'always',

  markdown: {
    processor: unified({
      gfm: true,
      // Smartypants would turn quotes into English curly quotes, wrong for Swiss German
      smartypants: false,
      remarkPlugins: [remarkDirective, remarkContentLint, [remarkLearnBlocks, { root: repoRoot }], remarkInlineFigures],
    }),
  },

  integrations: [
    starlight({
      title: 'WEB2',
      description: 'Single Page Applications mit Vue, ein zweisprachiger Kurs für die höhere Fachschule.',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Deutsch', lang: 'de-CH' },
        en: { label: 'English', lang: 'en' },
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ndum/web2' }],
      sidebar: [
        { label: 'Start', translations: { en: 'Getting started' }, items: [{ autogenerate: { directory: 'start' } }] },
        { label: 'JavaScript für SPAs', translations: { en: 'JavaScript for SPAs' }, items: [{ autogenerate: { directory: 'javascript' } }] },
        { label: 'SPA-Grundlagen', translations: { en: 'SPA basics' }, items: [{ autogenerate: { directory: 'spa' } }] },
        { label: 'Einstieg in Vue', translations: { en: 'Getting started with Vue' }, items: [{ autogenerate: { directory: 'vue' } }] },
        { label: 'Komponenten', translations: { en: 'Components' }, items: [{ autogenerate: { directory: 'components' } }] },
        {
          label: 'Reaktivität und Composables',
          translations: { en: 'Reactivity and composables' },
          items: [{ autogenerate: { directory: 'reactivity' } }],
        },
        { label: 'Routing', translations: { en: 'Routing' }, items: [{ autogenerate: { directory: 'routing' } }] },
        { label: 'Zustand und Daten', translations: { en: 'State and data' }, items: [{ autogenerate: { directory: 'state' } }] },
        { label: 'Projekt', translations: { en: 'Project' }, items: [{ autogenerate: { directory: 'project' } }] },
        { label: 'JS-Werkstatt', translations: { en: 'JS workshop' }, items: [{ autogenerate: { directory: 'js' } }] },
      ],
      disable404Route: true,
      customCss: ['./src/styles/course.css'],
      components: {
        Head: './src/components/Head.astro',
        Pagination: './src/components/Pagination.astro',
      },
    }),
  ],
});
