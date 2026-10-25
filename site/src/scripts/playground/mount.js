/**
 * Mounts @vue/repl into an element, loaded on demand by vue-playground.js.
 *
 * The SFC compiler and the CodeMirror editor are bundled with the site. The import map of the
 * preview points to the site's own copies of the Vue runtime and of Vue Router, and the
 * es-module-shims polyfill is replaced by an empty script, because every browser the course
 * supports has native import maps. So the playground never contacts another host.
 *
 * An example with a main.js starts itself, like an app created with create-vue, so that it can
 * install a router. Otherwise the playground mounts App.vue.
 */
import { Repl, useStore, useVueImportMap } from '@vue/repl';
import CodeMirror from '@vue/repl/codemirror-editor';
import runtimeDevUrl from 'vue/dist/vue.runtime.esm-browser.js?url';
import runtimeProdUrl from 'vue/dist/vue.runtime.esm-browser.prod.js?url';
import nosticsSource from 'nostics?raw';
import { computed, createApp, h, ref } from 'vue';
import routerSource from 'vue-router/dist/vue-router.esm-browser.js?raw';

import noDevtoolsUrl from './no-devtools.js?url';
import noServerRendererUrl from './no-ssr.js?url';

const absolute = (url) => new URL(url, document.baseURI).href;
// The development server of Vite rewrites the imports of files it serves, the router would then get a
// copy of Vue of its own. As text in a blob, its import of vue goes through the import map of the preview.
const moduleUrl = (source) => URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
// Vue Router imports nostics for its warnings and the devtools, which the preview does not have
const routerModule = moduleUrl(routerSource);
const nosticsModule = moduleUrl(nosticsSource);
const siteTheme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

/**
 * @param {HTMLElement} host
 * @param {Record<string, string>} files file name to source, main.js or App.vue is the entry
 */
export async function mountPlayground(host, files) {
  const { importMap, vueVersion } = useVueImportMap({
    runtimeDev: absolute(runtimeDevUrl),
    runtimeProd: absolute(runtimeProdUrl),
    serverRenderer: absolute(noServerRendererUrl),
  });
  const builtinImportMap = computed(() => ({
    imports: {
      ...importMap.value.imports,
      'vue-router': routerModule,
      nostics: nosticsModule,
      '@vue/devtools-api': absolute(noDevtoolsUrl),
    },
  }));
  const store = useStore({
    builtinImportMap,
    vueVersion,
    resourceLinks: { esModuleShims: 'data:text/javascript,' },
  });
  const sources = Object.fromEntries(Object.entries(files).map(([name, code]) => [`src/${name}`, code]));
  await store.setFiles(sources, 'main.js' in files ? 'src/main.js' : 'src/App.vue');

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
