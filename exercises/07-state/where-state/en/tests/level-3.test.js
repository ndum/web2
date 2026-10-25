import { isReadonly } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'

import items from '../data/items.json'
import { add, remove, requests } from '../src/requests.js'

beforeEach(() => {
  for (const request of [...requests.value]) remove(request.id)
})

describe('Challenge, requests that can only be read', () => {
  it('hands out the requests for reading only', () => {
    expect(isReadonly(requests)).toBe(true)
  })

  it('lists every thing at most once', () => {
    add(items[5])
    add(items[5])
    expect(requests.value).toHaveLength(1)
  })
})
