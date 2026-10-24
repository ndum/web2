import { describe, expect, it } from 'vitest'

import config from '../vite.config.js'

// A rule of the proxy is either the address of the target or an object with the field target
const target = (rule) => (typeof rule === 'string' ? rule : rule?.target)

describe('Einstieg, der Katalog über den Proxy', () => {
  it('leitet /items an den kleinen Server weiter', () => {
    expect(target(config.server?.proxy?.['/items']), 'Ergänze in vite.config.js unter server.proxy eine Regel für /items').toBe(
      'http://localhost:3000',
    )
  })

  it('leitet sonst keine Adressen weiter', () => {
    expect(Object.keys(config.server?.proxy ?? {})).toEqual(['/items'])
  })
})
