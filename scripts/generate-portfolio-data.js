const fs = require('fs')
const path = require('path')
require('dotenv').config()

async function generatePortfolioData() {
  // Write into src/data so it can be imported via alias '@/data/...'
  const dataDir = path.join(process.cwd(), 'src', 'data')
  const slugsPath = path.join(dataDir, 'portfolio-slugs.json')
  const itemsPath = path.join(dataDir, 'portfolio-items.json')
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dashboard.livingtechcreative.com/api'
    // Try multiple likely endpoints
    const endpoints = ['portofolios', 'portfolios', 'portfolio']
    let items = []

    for (const endpoint of endpoints) {
      try {
        const baseUrl = base.endsWith('/') ? base : base + '/'
        const url = new URL(endpoint, baseUrl).toString()
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Request failed ${res.status}`)
        const json = await res.json()
        items = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : []
        if (items.length) break
      } catch (e) {
        // try next endpoint
        continue
      }
    }

    let active = items.filter(p => p && p.is_active)
    if (active.length === 0) {
      // Provide mock items so static export can proceed
      active = [
        {
          id: 1,
          title: 'E-commerce Platform',
          slug: 'ecommerce-platform',
          background: 'A modern e-commerce solution built with cutting-edge technologies',
          client: 'Tech Startup',
          category: 'Web Development',
          start_date: '2024-01-01',
          end_date: '2024-03-01',
          duration_days: 60,
          problem: 'Client needed a scalable e-commerce platform',
          goal: 'Build a modern, responsive online store',
          conclution: 'Successfully delivered a high-performance platform',
          cover_image: '/placeholder.svg',
          project_url: 'https://example.com',
          display_order: 1,
          is_active: true,
          is_featured: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 2,
          title: 'Mobile Banking App',
          slug: 'mobile-banking-app',
          background: 'Intuitive mobile banking experience with secure features',
          client: 'Financial Services',
          category: 'UI/UX Design',
          start_date: '2024-02-01',
          end_date: '2024-04-01',
          duration_days: 60,
          problem: 'Needed intuitive design for complex financial features',
          goal: 'Create user-friendly mobile experience',
          conclution: 'Delivered award-winning design system',
          cover_image: '/placeholder.svg',
          project_url: 'https://example.com',
          display_order: 2,
          is_active: true,
          is_featured: true,
          created_at: '2024-02-01T00:00:00Z',
          updated_at: '2024-02-01T00:00:00Z'
        }
      ]
    }
    const slugs = active
      .filter(p => typeof p.slug === 'string')
      .map(p => p.slug)

    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
    fs.writeFileSync(slugsPath, JSON.stringify(slugs, null, 2), 'utf-8')
    fs.writeFileSync(itemsPath, JSON.stringify(active, null, 2), 'utf-8')
    console.log(`✅ Generated ${slugs.length} portfolio slugs and ${active.length} items at src/data/`)
  } catch (error) {
    console.error('❌ Failed to generate portfolio data:', error)
    // Fallback: ensure files exist with empty arrays so imports work
    try {
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
      if (!fs.existsSync(slugsPath)) fs.writeFileSync(slugsPath, JSON.stringify([], null, 2), 'utf-8')
      if (!fs.existsSync(itemsPath)) fs.writeFileSync(itemsPath, JSON.stringify([], null, 2), 'utf-8')
    } catch (e) {
      console.error('Could not ensure fallback src/data portfolio files', e)
    }
  }
}

generatePortfolioData()
