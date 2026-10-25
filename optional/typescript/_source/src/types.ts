// One thing of the catalog, as the course API delivers it
export interface Item {
  id: number
  name: string
  category: string
  deposit: number
  availableFrom: string | null
}
