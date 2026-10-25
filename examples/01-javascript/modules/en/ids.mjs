// The module runs once, every file that imports it shares this variable
let next = 1

export function nextId() {
  return next++
}
