import { describe, expect, it } from 'vitest'

import config from '../vite.config.js'

describe('[%Vite für die Entwicklung und die Veröffentlichung|Vite for development and publishing%]', () => {
  it('[%leitet /items an den kleinen Server weiter|forwards /items to the small server%]', () => {
    expect(config.server.proxy['/items']).toBe('http://localhost:3000')
  })

  it('[%baut die App mit relativen Pfaden, damit sie in jedem Ordner läuft|builds the app with relative paths, so it runs in any folder%]', () => {
    expect(config.base).toBe('./')
  })
})
