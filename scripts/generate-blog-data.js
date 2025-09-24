const fs = require('fs')
const path = require('path')

async function generateBlogData() {
  // Write into src/data so it can be imported via alias '@/data/...'
  const dataDir = path.join(process.cwd(), 'src', 'data')
  const slugsPath = path.join(dataDir, 'blog-slugs.json')
  const postsPath = path.join(dataDir, 'blog-posts.json')
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.livingtechcreative.com/api'
    const endpoint = '/blog-posts'
    const url = new URL(endpoint, base).toString()

    const res = await fetch(url)
    if (!res.ok) throw new Error(`Request failed ${res.status}`)
    const json = await res.json()
    const posts = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : []
    const slugs = posts
      .filter(p => p && typeof p.slug === 'string' && (p.is_active === undefined || p.is_active === true))
      .map(p => p.slug)

    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
    fs.writeFileSync(slugsPath, JSON.stringify(slugs, null, 2), 'utf-8')
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8')
    console.log(`✅ Generated ${slugs.length} blog slugs and ${posts.length} posts at src/data/`)
  } catch (error) {
    console.error('❌ Failed to generate blog data:', error)
    // Fallback: ensure file exists with empty array so import works
    try {
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
      if (!fs.existsSync(slugsPath)) fs.writeFileSync(slugsPath, JSON.stringify([], null, 2), 'utf-8')
      if (!fs.existsSync(postsPath)) fs.writeFileSync(postsPath, JSON.stringify([], null, 2), 'utf-8')
    } catch (e) {
      console.error('Could not ensure fallback data/blog-slugs.json', e)
    }
  }
}

generateBlogData()