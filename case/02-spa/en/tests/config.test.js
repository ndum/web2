import { describe, expect, it } from 'vitest'

import config from '../vite.config.js'

describe('Vite for development and publishing', () => {
  it('forwards /items to the small server', () => {
    expect(config.server.proxy['/items']).toBe('http://localhost:3000')
  })

  it('builds the app with relative paths, so it runs in any folder', () => {
    expect(config.base).toBe('./')
  })
})
