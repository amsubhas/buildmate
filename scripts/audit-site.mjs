import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'src')
const IMG = path.join(ROOT, 'public', 'images')
const IMAGE_EXT = /\.(?:png|jpe?g|webp|gif|svg)$/i
let errors = 0
let scanned = 0

const files = []
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(full)
    else files.push(full)
  }
}
walk(SRC)

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  scanned++
  for (const match of text.matchAll(/['"`]\/(images\/[^'"`?$]+)['"`]/g)) {
    const rel = match[1]
    const target = path.join(ROOT, 'public', rel)
    if (rel.includes('${')) continue
    if (!fs.existsSync(target)) {
      console.error(`Missing asset: ${rel} (${path.relative(ROOT, file)})`)
      errors++
    }
  }
  if (/images\.unsplash\.com/.test(text)) {
    console.error(`External Unsplash reference remains: ${path.relative(ROOT, file)}`)
    errors++
  }
}

for (const name of fs.readdirSync(IMG)) {
  const full = path.join(IMG, name)
  if (!IMAGE_EXT.test(name)) continue
  const head = fs.readFileSync(full, { encoding: 'utf8' }).slice(0, 40)
  if (/^<svg\b/.test(head) && /\.(?:png|jpe?g)$/i.test(name)) {
    console.error(`Raster extension contains SVG markup: ${name}`)
    errors++
  }
}

console.log(`Asset audit: ${scanned} source files scanned.`)
if (errors) process.exit(1)
console.log('Asset audit passed.')
