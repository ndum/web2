// Draws the icons of the app without packages, a white ring on the green of Lorraine Commons.
// The ring stays inside the inner 80 percent, so a round or rounded mask of the system keeps it whole.
// node scripts/icons.mjs writes public/icon.svg, public/icon-192.png and public/icon-512.png.
import { writeFileSync } from 'node:fs'
import { crc32, deflateSync } from 'node:zlib'

const GREEN = [0x1f, 0x6b, 0x4f]
const WHITE = [0xff, 0xff, 0xff]

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const sum = Buffer.alloc(4)
  sum.writeUInt32BE(crc32(body))
  return Buffer.concat([length, body, sum])
}

function png(size) {
  const rows = []
  const center = size / 2
  for (let y = 0; y < size; y += 1) {
    // Every row starts with the filter type 0, then red, green, blue and alpha per pixel
    const row = Buffer.alloc(1 + size * 4)
    for (let x = 0; x < size; x += 1) {
      const distance = Math.hypot(x + 0.5 - center, y + 0.5 - center) / size
      const color = distance > 0.18 && distance < 0.3 ? WHITE : GREEN
      row.set([...color, 0xff], 1 + x * 4)
    }
    rows.push(row)
  }
  const header = Buffer.alloc(13)
  header.writeUInt32BE(size, 0)
  header.writeUInt32BE(size, 4)
  header.set([8, 6, 0, 0, 0], 8)
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  return Buffer.concat([signature, chunk('IHDR', header), chunk('IDAT', deflateSync(Buffer.concat(rows))), chunk('IEND', Buffer.alloc(0))])
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#1f6b4f"/>
  <circle cx="50" cy="50" r="24" fill="none" stroke="#fff" stroke-width="12"/>
</svg>
`

const folder = new URL('../public/', import.meta.url)
writeFileSync(new URL('icon.svg', folder), svg)
for (const size of [192, 512]) writeFileSync(new URL(`icon-${size}.png`, folder), png(size))
console.log('[%Die Icons liegen in public.|The icons are in public.%]')
