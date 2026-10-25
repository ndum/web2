import { Component, computed, signal } from '@angular/core'

import items from '../../data/items.json'
import type { Item } from './item'
import { ItemCard } from './item-card'

// Signals hold the state, computed derives the hits as computed does in Vue
@Component({
  selector: 'app-catalog',
  imports: [ItemCard],
  template: `
    <main>
      <h1>Katalog</h1>
      <label for="search">Suchen</label>
      <input #search id="search" type="search" [value]="query()" (input)="query.set(search.value)" />
      <p role="status">{{ hits().length }} Dinge gefunden, {{ favorites().length }} Favoriten</p>
      <ul class="grid">
        @for (item of hits(); track item.id) {
          <li>
            <app-item-card [item]="item" [favorite]="favorites().includes(item.id)" (toggleFavorite)="toggleFavorite($event)" />
          </li>
        } @empty {
          <li>Nichts gefunden.</li>
        }
      </ul>
    </main>
  `,
})
export class Catalog {
  protected readonly query = signal('')
  protected readonly favorites = signal<number[]>([])
  protected readonly hits = computed(() => {
    const text = this.query().trim().toLowerCase()
    return (items as Item[]).filter((item) => item.name.toLowerCase().includes(text))
  })

  protected toggleFavorite(id: number) {
    this.favorites.update((current) => (current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id]))
  }
}
