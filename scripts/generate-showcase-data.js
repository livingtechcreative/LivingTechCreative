// scripts/generate-showcase-data.js
const fs = require('fs')
const path = require('path')
require('dotenv').config()

async function generateShowcaseData() {
  const dataDir = path.join(process.cwd(), 'src', 'data')
  const itemsPath = path.join(dataDir, 'showcase-items.json')
  
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dashboard.livingtechcreative.com/api'
    const endpoints = ['showcases', 'showcase/items', 'showcase/all']
    let items = []
    let lastError = null

    for (const endpoint of endpoints) {
      try {
        const baseUrl = base.endsWith('/') ? base : base + '/'
        const url = new URL(endpoint, baseUrl).toString()
        console.log(`Fetching showcase data from: ${url}`)
        
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Request failed ${res.status}`)
        
        const json = await res.json()
        items = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : []
        if (items.length) break
      } catch (e) {
        lastError = e
        continue
      }
    }

    if (!items.length && lastError) {
      console.warn(`All showcase endpoints returned empty or failed. Last error: ${lastError}`)
    }

    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
    fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2), 'utf-8')
    console.log(`✅ Generated ${items.length} showcase items at src/data/`)
  } catch (error) {
    console.error('❌ Failed to generate showcase data:', error)
    process.exit(1)
  }
}

generateShowcaseData()