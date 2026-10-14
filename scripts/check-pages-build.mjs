import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const base = '/pretty-avatar-2/'
const canonical = 'https://kimookpong.github.io/pretty-avatar-2/'
const html = readFileSync(resolve('dist/index.html'), 'utf8')
if (!html.includes(`rel="canonical" href="${canonical}"`)) {
  throw new Error('The production canonical URL does not match the GitHub Pages URL.')
}
const references = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match => match[1])
for (const reference of references) {
  if (/^(?:https?:|data:|#)/.test(reference)) continue
  if (!reference.startsWith(base)) {
    throw new Error(`Production asset is outside the GitHub Pages base: ${reference}`)
  }
  const localPath = resolve('dist', reference.slice(base.length))
  if (!existsSync(localPath)) throw new Error(`Missing production asset: ${reference}`)
}
console.log(`Verified GitHub Pages URL and ${references.length} HTML asset references.`)

const structured = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
if (!structured) throw new Error('Missing structured data.')
const graph = JSON.parse(structured[1])['@graph']
if (!graph.some(item => item['@type'] === 'WebApplication' && item.url === canonical)) {
  throw new Error('Structured data does not describe the production application.')
}
for (const name of ['og:image', 'twitter:image']) {
  const tag = html.match(new RegExp(`<meta (?:property|name)="${name}" content="([^"]+)"`))
  if (tag?.[1] !== `${canonical}og-image.png`) throw new Error(`Invalid ${name} URL.`)
}
const socialImage = readFileSync(resolve('dist/og-image.png'))
if (socialImage.readUInt32BE(16) !== 1200 || socialImage.readUInt32BE(20) !== 630) {
  throw new Error('The social image must be a 1200 × 630 PNG.')
}
const sitemap = readFileSync(resolve('dist/sitemap.xml'), 'utf8')
if (!sitemap.includes(`<loc>${canonical}</loc>`) || sitemap.includes('#')) {
  throw new Error('The sitemap must include the canonical homepage without hash routes.')
}
if (!existsSync(resolve('dist/robots.txt'))) throw new Error('Missing robots.txt template.')
console.log('Verified social image, structured data and sitemap.')
