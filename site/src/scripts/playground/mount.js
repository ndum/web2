/**
 * Mounts @vue/repl into an element, loaded on demand by vue-playground.js.
 *
 * The SFC compiler and the CodeMirror editor are bundled with the site. The import map of the
 * preview points to the site's own copy of the Vue runtime, and the es-module-shims polyfill is
 * replaced by an empty script, because every browser the course supports has native import maps.
 * So the playground never contacts another host.
 */
import { Repl, useStore, useVueImportMap } from '@vue/repl';
import CodeMirror from '@vue/repl/codemirror-editor';
import runtimeDevUrl from 'vue/dist/vue.runtime.esm-browser.js?url';
import runtimeProdUrl from 'vue/dist/vue.runtime.esm-browser.prod.js?url';
import { createApp, h, ref } from 'vue';

import noServerRendererUrl from './no-ssr.js?url';

const absolute = (url) => new URL(url, document.baseURI).href;
const siteTheme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

/**
 * @param {HTMLElement} host
 * @param {Record<string, string>} files file name to source, App.vue is the entry
 */
export async function mountPlayground(host, files) {
  const { importMap, vueVersion } = useVueImportMap({
    runtimeDev: absolute(runtimeDevUrl),
    runtimeProd: absolute(runtimeProdUrl),
    serverRenderer: absolute(noServerRendererUrl),
  });
  const store = useStore({
    builtinImportMap: importMap,
    vueVersion,
    resourceLinks: { esModuleShims: 'data:text/javascript,' },
  });
  const sources = Object.fromEntries(Object.entries(files).map(([name, code]) => [`src/${name}`, code]));
  await store.setFiles(sources, 'src/App.vue');

  // Follow the site's light and dark theme while the playground is open
  const theme = ref(siteTheme());
  const observer = new MutationObserver(() => (theme.value = siteTheme()));
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  const layout = host.clientWidth < 760 ? 'vertical' : 'horizontal';
  host.dataset.layout = layout;
  const app = createApp({
    render: () =>
      h(Repl, {
        store,
        editor: CodeMirror,
        theme: theme.value,
        previewTheme: true,
        layout,
        showCompileOutput: false,
        showImportMap: false,
        showTsConfig: false,
        clearConsole: false,
      }),
  });
  app.onUnmount(() => observer.disconnect());
  app.mount(host);
  return app;
}
