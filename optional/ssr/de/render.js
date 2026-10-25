import { renderToString } from 'vue/server-renderer'

import { createApp } from './app.js'

// The whole page with the HTML of the app, the data for the browser and the script that takes over.
// \u003c keeps a name with </script> from ending the data block early.
export async function renderPage(things) {
  const html = await renderToString(createApp(things))
  const data = JSON.stringify(things).replaceAll('<', '\\u003c')
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Katalog</title>
    <script type="importmap">{ "imports": { "vue": "/vue.js" } }</script>
  </head>
  <body>
    <div id="app">${html}</div>
    <script type="application/json" id="things">${data}</script>
    <script type="module" src="/client.js"></script>
  </body>
</html>`
}
