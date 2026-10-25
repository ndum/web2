// @vitest-environment node
// The configuration builds the alias from import.meta.url, which is a file URL only in Node
import { describe, expect, it } from 'vitest'

import config from '../vite.config.js'

describe('Vite für die Entwicklung und die Veröffentlichung', () => {
  it('leitet /items an den kleinen Server weiter', () => {
    expect(config.server.proxy['/items']).toBe('http://localhost:3000')
  })

  it('baut die App mit relativen Pfaden, damit sie in jedem Ordner läuft', () => {
    expect(config.base).toBe('./')
  })
})
