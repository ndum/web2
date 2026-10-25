import { useState } from 'react'

import items from '../data/items.json'
import { search } from './catalog.js'
import ItemCard from './ItemCard.jsx'

export default function App() {
  // useState returns the current value and a function that sets a new one and draws again
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState([])

  // A derived value is simply computed while drawing, where Vue uses computed
  const hits = search(items, query)

  // The state lives here, the card only reports the click through its callback prop
  function toggleFavorite(id) {
    setFavorites((current) => (current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id]))
  }

  return (
    <main>
      <h1>Catalog</h1>
      <label htmlFor="search">Search</label>
      <input id="search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} />
      <p role="status">
        {hits.length} things found, {favorites.length} favorites
      </p>
      <ul className="grid">
        {hits.map((item) => (
          <li key={item.id}>
            <ItemCard item={item} favorite={favorites.includes(item.id)} onToggleFavorite={toggleFavorite} />
          </li>
        ))}
      </ul>
    </main>
  )
}
