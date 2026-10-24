import { describe, expect, it } from 'vitest'

import config from '../vite.config.js'

// A rule of the proxy is either the address of the target or an object with the field target
const target = (rule) => (typeof rule === 'string' ? rule : rule?.target)

describe('[%Einstieg, der Katalog über den Proxy|Getting started, the catalog through the proxy%]', () => {
  it('[%leitet /items an den kleinen Server weiter|forwards /items to the small server%]', () => {
    expect(target(config.server?.proxy?.['/items']), '[%Ergänze in vite.config.js unter server.proxy eine Regel für /items|Add a rule for /items under server.proxy in vite.config.js%]').toBe(
      'http://localhost:3000',
    )
  })

  it('[%leitet sonst keine Adressen weiter|forwards no other addresses%]', () => {
    expect(Object.keys(config.server?.proxy ?? {})).toEqual(['/items'])
  })
})
