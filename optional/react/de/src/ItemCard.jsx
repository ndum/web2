// The props arrive as one object, a function prop takes the place of an emitted event
export default function ItemCard({ item, favorite, onToggleFavorite }) {
  return (
    <article className="card">
      <h2>{item.name}</h2>
      <p>
        {item.category}, CHF {item.deposit} Pfand
      </p>
      <button type="button" aria-pressed={favorite} onClick={() => onToggleFavorite(item.id)}>
        {favorite ? 'Favorit entfernen' : 'Als Favorit merken'}
      </button>
    </article>
  )
}
