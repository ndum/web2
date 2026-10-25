import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.jsx'
import { search } from '../src/catalog.js'

// React checks that every update in a test runs inside act(), the async form waits for all of them
globalThis.IS_REACT_ACT_ENVIRONMENT = true

let container
let root

beforeEach(async () => {
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
  await act(async () => {
    root.render(<App />)
  })
})

afterEach(async () => {
  await act(async () => {
    root.unmount()
  })
  container.remove()
})

describe('[%der Katalog in React|the catalog in React%]', () => {
  it('[%zeigt alle Dinge mit ihrer Zahl|shows all things with their number%]', () => {
    expect(container.querySelectorAll('.card')).toHaveLength(60)
    expect(container.querySelector('[role="status"]').textContent).toContain('60 [%Dinge gefunden|things found%]')
  })

  it('[%merkt sich einen Favoriten in der Elternkomponente|keeps a favorite in the parent component%]', async () => {
    const button = container.querySelector('.card button')
    await act(async () => {
      button.click()
    })
    expect(button.textContent).toBe('[%Favorit entfernen|Remove favorite%]')
    expect(button.getAttribute('aria-pressed')).toBe('true')
    expect(container.querySelector('[role="status"]').textContent).toContain('1 [%Favoriten|favorites%]')
  })

  it('[%sucht im Namen ohne Rücksicht auf Gross- und Kleinschreibung|searches the names regardless of case%]', () => {
    expect(search(items, ' [%SÄGE|SAW%] ').map((item) => item.name)).toEqual(['[%Stichsäge|Jigsaw%]', '[%Kreissäge|Circular saw%]'])
  })
})
