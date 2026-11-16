// Validates content/articles/*.mdx frontmatter and content/syllabus.json.
// Run: npm run check:content   (CI runs it on every pull request)
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const root = process.cwd()
const articlesDir = path.join(root, 'content/articles')
const errors = []
const err = (file, msg) => errors.push(`${file}: ${msg}`)

// --- syllabus
const syllabus = JSON.parse(fs.readFileSync(path.join(root, 'content/syllabus.json'), 'utf8'))
const seen = new Set()
for (const t of syllabus.topics) {
  if (!/^[a-z0-9-]+$/.test(t.id)) err('syllabus.json', `bad id "${t.id}"`)
  if (seen.has(t.id)) err('syllabus.json', `duplicate id "${t.id}"`)
  for (const p of t.prerequisites || []) {
    if (!seen.has(p)) err('syllabus.json', `"${t.id}" needs "${p}", which must appear earlier`)
  }
  seen.add(t.id)
}

// --- articles
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'))
const posts = files.map(f => {
  const { data, content } = matter(fs.readFileSync(path.join(articlesDir, f), 'utf8'))
  return { file: f, slug: f.replace(/\.mdx$/, ''), data, content }
})
const slugs = new Set(posts.map(p => p.slug))
const syllabusIds = new Map()

for (const { file, slug, data, content } of posts) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) err(file, 'filename must be lowercase kebab-case')
  for (const k of ['title', 'date', 'excerpt']) if (!data[k]) err(file, `missing "${k}"`)
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))) err(file, 'date must be YYYY-MM-DD (quoted)')
  if (data.contentType && !['news', 'guide', 'debrief', 'exploration'].includes(data.contentType)) err(file, `unknown contentType "${data.contentType}"`)
  if (data.relatedSlug && !slugs.has(data.relatedSlug)) err(file, `relatedSlug "${data.relatedSlug}" does not exist`)

  if (data.contentType === 'guide' && data.syllabusId) {
    if (!seen.has(data.syllabusId)) err(file, `syllabusId "${data.syllabusId}" is not in syllabus.json`)
    if (syllabusIds.has(data.syllabusId)) err(file, `syllabusId "${data.syllabusId}" already used by ${syllabusIds.get(data.syllabusId)}`)
    syllabusIds.set(data.syllabusId, file)
  }
  if (data.contentType === 'debrief' && !data.draft) {
    if (!data.arxivId) err(file, 'debrief needs "arxivId"')
    if (!data.paperUrl) err(file, 'debrief needs "paperUrl"')
    if (!data.relatedSlug) err(file, 'debrief needs "relatedSlug" (its concept guide)')
  }
  if (data.coverImage) {
    if (!String(data.coverImage).startsWith('/images/')) err(file, 'coverImage must be a local /images/... path')
    else if (!fs.existsSync(path.join(root, 'public', data.coverImage))) err(file, `coverImage not found: public${data.coverImage}`)
    else if (fs.statSync(path.join(root, 'public', data.coverImage)).size > 600 * 1024) err(file, `coverImage over 600 KB`)
    if (!data.coverCredit) err(file, 'coverImage needs "coverCredit" (credit line + licence)')
  }
  // Figures: local file must exist; credit and licence are mandatory; no hotlinking
  for (const m of content.matchAll(/<Figure\b([\s\S]*?)\/>/g)) {
    const attrs = Object.fromEntries([...m[1].matchAll(/(\w+)="([^"]*)"/g)].map(a => [a[1], a[2]]))
    if (!attrs.src || !attrs.src.startsWith('/images/')) err(file, `Figure src must be a local /images/... path (got "${attrs.src}")`)
    else if (!fs.existsSync(path.join(root, 'public', attrs.src))) err(file, `Figure image not found: public${attrs.src}`)
    else if (fs.statSync(path.join(root, 'public', attrs.src)).size > 600 * 1024) err(file, `Figure image over 600 KB: ${attrs.src}`)
    for (const k of ['alt', 'credit', 'license']) if (!attrs[k]) err(file, `Figure missing "${k}" (${attrs.src})`)
  }
  if (/!\[[^\]]*\]\(https?:/.test(content)) err(file, 'remote Markdown images are not allowed; download the image and use <Figure>')

  if (data.aiDrafted && !data.draft) {
    // Reviewer notes and unresolved markers must never reach the live site
    if (/<!--\s*(REVIEW|NOTE|TODO)/i.test(content)) err(file, 'contains reviewer notes (<!-- REVIEW/NOTE/TODO -->)')
    if (/\[(VERIFY|CHECK|UNSURE)[:\]]/i.test(content)) err(file, 'contains unresolved [VERIFY]/[CHECK]/[UNSURE] markers')
  }
}

if (errors.length) {
  console.error(`✖ Content check failed (${errors.length}):\n` + errors.map(e => '  - ' + e).join('\n'))
  process.exit(1)
}
console.log(`✓ Content OK: ${posts.length} articles, ${syllabus.topics.length} syllabus topics`)
