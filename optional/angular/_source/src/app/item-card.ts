import { Component, input, output } from '@angular/core'

import type { Item } from './item'

// Signal inputs take the place of props, an output the place of an emitted event
@Component({
  selector: 'app-item-card',
  template: `
    <article class="card">
      <h2>{{ item().name }}</h2>
      <p>{{ item().category }}, CHF {{ item().deposit }} [%Pfand|deposit%]</p>
      <button type="button" [attr.aria-pressed]="favorite()" (click)="toggleFavorite.emit(item().id)">
        {{ favorite() ? '[%Favorit entfernen|Remove favorite%]' : '[%Als Favorit merken|Save as favorite%]' }}
      </button>
    </article>
  `,
})
export class ItemCard {
  readonly item = input.required<Item>()
  readonly favorite = input(false)
  readonly toggleFavorite = output<number>()
}
