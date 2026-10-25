import { isReadonly } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'

import items from '../data/items.json'
import { add, remove, requests } from '../src/requests.js'

beforeEach(() => {
  for (const request of [...requests.value]) remove(request.id)
})

describe('Knobelei, Anfragen, die man nur lesen kann', () => {
  it('gibt die Anfragen nur zum Lesen heraus', () => {
    expect(isReadonly(requests)).toBe(true)
  })

  it('führt jedes Ding höchstens einmal', () => {
    add(items[5])
    add(items[5])
    expect(requests.value).toHaveLength(1)
  })
})
