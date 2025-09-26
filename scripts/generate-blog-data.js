const fs = require('fs')
const path = require('path')
require('dotenv').config()

async function generateBlogData() {
  // Write into src/data so it can be imported via alias '@/data/...'
  const dataDir = path.join(process.cwd(), 'src', 'data')
  const slugsPath = path.join(dataDir, 'blog-slugs.json')
  const postsPath = path.join(dataDir, 'blog-posts.json')
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dashboard.livingtechcreative.com/api'
    const endpoints = ['blog-posts', 'blogs', 'blogposts', 'blog/posts']
    let posts = []
    let lastError = null
    for (const ep of endpoints) {
      try {
        const baseUrl = base.endsWith('/') ? base : base + '/'
        const url = new URL(ep, baseUrl).toString()
        console.log(`Fetching blog data from: ${url}`)
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Request failed ${res.status}`)
        const json = await res.json()
        posts = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : []
        if (posts.length) break
      } catch (e) {
        lastError = e
        continue
      }
    }
    if (!posts.length && lastError) {
      console.warn(`All blog endpoints returned empty or failed. Last error: ${lastError}`)
    }
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