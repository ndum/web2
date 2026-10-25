// @vitest-environment node
// The configuration builds the alias from import.meta.url, which is a file URL only in Node
import { describe, expect, it } from 'vitest'

import config from '../vite.config.js'

describe('[%Vite für die Entwicklung und die Veröffentlichung|Vite for development and publishing%]', () => {
  it('[%leitet Adressen unter /api ohne das Präfix an den kleinen Server weiter|forwards addresses below /api to the small server without the prefix%]', () => {
    const api = config.server.proxy['/api']
    expect(api.target).toBe('http://localhost:3000')
    expect(api.rewrite('/api/items?delay=2000')).toBe('/items?delay=2000')
  })

  it('[%lässt Seiten wie /items/6 bei der App|leaves pages such as /items/6 with the app%]', () => {
    expect(Object.keys(config.server.proxy)).toEqual(['/api'])
  })

  it('[%baut die App mit dem absoluten Pfad, den der History-Modus braucht|builds the app with the absolute path that history mode needs%]', () => {
    expect(config.base).toBe('/')
  })
})
