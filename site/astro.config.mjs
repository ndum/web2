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
  // The site runs on its own domain, set as custom domain of GitHub Pages and in public/CNAME
  site: 'https://web2.ndum.ch',
  // Pull request previews are built under their own path
  base: process.env.SITE_BASE ?? '/',
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
        // The parts 0 to 8 come first and without a gap, the blocks without numbers follow them
        { label: 'Start', translations: { en: 'Getting started' }, collapsed: true, items: [{ autogenerate: { directory: 'start' } }] },
        { label: 'JavaScript für SPAs', translations: { en: 'JavaScript for SPAs' }, collapsed: true, items: [{ autogenerate: { directory: 'javascript' } }] },
        { label: 'SPA-Grundlagen', translations: { en: 'SPA basics' }, collapsed: true, items: [{ autogenerate: { directory: 'spa' } }] },
        { label: 'Einstieg in Vue', translations: { en: 'Getting started with Vue' }, collapsed: true, items: [{ autogenerate: { directory: 'vue' } }] },
        { label: 'Komponenten', translations: { en: 'Components' }, collapsed: true, items: [{ autogenerate: { directory: 'components' } }] },
        {
          label: 'Reaktivität und Composables',
          translations: { en: 'Reactivity and composables' },
          collapsed: true,
          items: [{ autogenerate: { directory: 'reactivity' } }],
        },
        { label: 'Routing', translations: { en: 'Routing' }, collapsed: true, items: [{ autogenerate: { directory: 'routing' } }] },
        { label: 'Zustand und Daten', translations: { en: 'State and data' }, collapsed: true, items: [{ autogenerate: { directory: 'state' } }] },
        {
          label: 'Architektur, Qualität und Betrieb',
          translations: { en: 'Architecture, quality and operations' },
          collapsed: true,
          items: [{ autogenerate: { directory: 'architecture' } }],
        },
        {
          label: 'Leistungsbeurteilung',
          translations: { en: 'Assessment' },
          collapsed: true,
          items: [
            { slug: 'assessment', label: 'Übersicht', translations: { en: 'Overview' } },
            { slug: 'exam' },
            { autogenerate: { directory: 'project' } },
          ],
        },
        {
          label: 'Nachschlagen',
          translations: { en: 'Reference' },
          collapsed: true,
          items: [
            { label: 'JS-Werkstatt', translations: { en: 'JS workshop' }, collapsed: true, items: [{ autogenerate: { directory: 'js' } }] },
            { label: 'Wahlthemen', translations: { en: 'Optional topics' }, collapsed: true, items: [{ autogenerate: { directory: 'optional' } }] },
            { slug: 'glossary' },
          ],
        },
      ],
      disable404Route: true,
      // Numbers of parts and chapters in the navigation
      routeMiddleware: './src/route-data.js',
      // Kalam is the handwriting font of the figures, served by the site itself
      customCss: ['@fontsource/kalam/400.css', '@fontsource/kalam/700.css', './src/styles/course.css'],
      components: {
        Head: './src/components/Head.astro',
        Pagination: './src/components/Pagination.astro',
        Footer: './src/components/Footer.astro',
      },
    }),
  ],
});
