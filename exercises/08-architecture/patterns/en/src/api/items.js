// The lending software delivers its things as things.json, in a format of its own
export async function fetchItems() {
  const response = await fetch(`${import.meta.env.BASE_URL}things.json`)
  if (!response.ok) throw new Error(`The lending software answers with the status ${response.status}.`)
  return response.json()
}
