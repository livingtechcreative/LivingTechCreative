const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dashboard.livingtechcreative.com/api/%7Bpanel%7D'
 
 // Default to the live API base URL if env is not provided
  // The docs URL is not an API endpoint; keep it only for documentation reference
 // Example override in .env.local: NEXT_PUBLIC_API_BASE_URL=https://dashboard.livingtechcreative.com/api/%7Bpanel%7D
 const __API_DEFAULT_CHECK__ = 'https://dashboard.livingtechcreative.com/api/%7Bpanel%7D'
 
  export interface ShowcaseItem {
    id: number
    title: string
    image: string
    url: string
    display_order: number
    is_active: boolean
    created_at: string
    updated_at: string
  }
  
  export interface Portfolio {
    id: number
    title: string
    slug: string
    background: string
    client: string
    category: string
    start_date: string
    end_date: string
    duration_days: number
    problem: string
    goal: string
    conclution: string
    cover_image: string
    project_url: string
    display_order: number
    is_active: boolean
    is_featured: boolean
    created_at: string
    updated_at: string
  }
  
  export interface BlogPost {
    id: number
    title: string
    excerpt: string
    content: string
    introduction: string | null
    conclution: string | null
    slug: string
    cover_image: string
    author: string
    read_duration: number | null
    published_at: string
    display_order: number
    is_active: boolean
    created_at: string | null
    updated_at: string | null
    category?: string | null
  }
  
  export interface BlogPostCategory {
    id: number
    blog_post_id: number
    category_id: number
    created_at: string | null
    updated_at: string | null
  }
  
  export interface PortfolioTag {
    id: number
    portofolio_id: number
    tag_id: number
    created_at: string
    updated_at: string
  }
 
  export interface PortfolioSolution {
    id: number
    portofolio_id: number
    title: string
    description: string
    image: string
    created_at: string | null
    updated_at: string | null
  }
  
  export interface ContactFormData {
    name: string
    email: string
    phone: string
    message: string
    information_source: string
  }
  
  export interface ContactFormResponse {
    id: number
    name: string
    email: string
    phone: string
    message: string
    information_source: string
    created_at: string
    updated_at: string
  }
  
  export interface ApiResponse<T> {
    data: T
  }
 
  class ApiService {
   private async fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      const response = await fetch(url, {
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.ok) {
        console.error(`API request failed: ${response.status} ${response.statusText} for ${url}`)
        throw new Error(`API request failed: ${response.status}`)
      }
      const data = await response.json() as ApiResponse<T>
      return data
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error)
      throw error
    }
  }
 
  // Mock data for development/fallback
  private getMockPortfolios(): Portfolio[] {
    return [
      {
        id: 1,
        title: "E-commerce Platform",
        slug: "ecommerce-platform",
        background: "A modern e-commerce solution built with cutting-edge technologies",
        client: "Tech Startup",
        category: "Web Development",
        start_date: "2024-01-01",
        end_date: "2024-03-01",
        duration_days: 60,
        problem: "Client needed a scalable e-commerce platform",
        goal: "Build a modern, responsive online store",
        conclution: "Successfully delivered a high-performance platform",
        cover_image: "/placeholder.svg",
        project_url: "https://example.com",
        display_order: 1,
        is_active: true,
        is_featured: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        id: 2,
        title: "Mobile App Design",
        slug: "mobile-app-design",
        background: "UI/UX design for a fintech mobile application",
        client: "Financial Services",
        category: "UI/UX Design",
        start_date: "2024-02-01",
        end_date: "2024-04-01",
        duration_days: 60,
        problem: "Needed intuitive design for complex financial features",
        goal: "Create user-friendly mobile experience",
        conclution: "Delivered award-winning design system",
        cover_image: "/placeholder.svg",
        project_url: "https://example.com",
        display_order: 2,
        is_active: true,
        is_featured: true,
        created_at: "2024-02-01T00:00:00Z",
        updated_at: "2024-02-01T00:00:00Z"
      }
    ]
  }

  async getPortfolios(): Promise<Portfolio[]> {
    try {
      // Try multiple possible endpoints
      const endpoints = ['/portofolios', '/portfolios', '/portfolio']
      
      for (const endpoint of endpoints) {
        try {
          const response = await this.fetchApi<Portfolio[]>(endpoint)
          return response.data
        } catch (error) {
          console.warn(`Endpoint ${endpoint} failed, trying next...`)
          continue
        }
      }
      
      // If all endpoints fail, return mock data for development
      console.warn('All portfolio endpoints failed, using mock data')
      return this.getMockPortfolios()
      
    } catch (error) {
      console.error('Failed to fetch portfolios:', error)
      // Return mock data as fallback
      return this.getMockPortfolios()
    }
  }

  async getPortfolio(id: number): Promise<Portfolio | null> {
    try {
      const endpoints = [`/portofolios/${id}`, `/portfolios/${id}`, `/portfolio/${id}`]
      
      for (const endpoint of endpoints) {
        try {
          const response = await this.fetchApi<Portfolio>(endpoint)
          return response.data
        } catch (error) {
          continue
        }
      }
      
      // Fallback: Get all portfolios and find by ID
      const portfolios = await this.getPortfolios()
      return portfolios.find(p => p.id === id) || null
      
    } catch (error) {
      console.error(`Failed to fetch portfolio ${id}:`, error)
      return null
    }
  }

  async getPortfolioBySlug(slug: string): Promise<Portfolio | null> {
    try {
      // Fetch all portfolios and find by slug (more reliable approach)
      const portfolios = await this.getPortfolios()
      const portfolio = portfolios.find(p => p.slug === slug && p.is_active)
      
      if (!portfolio) {
        console.warn(`Portfolio with slug "${slug}" not found or not active`)
        return null
      }
      
      return portfolio
    } catch (error) {
      console.error(`Failed to fetch portfolio with slug ${slug}:`, error)
      return null
    }
  }

  async getPortfolioTags(portfolioId: number): Promise<PortfolioTag[]> {
    try {
      const endpoints = [`/portofolio-tags/${portfolioId}`, `/portfolio-tags/${portfolioId}`]
      
      for (const endpoint of endpoints) {
        try {
          const response = await this.fetchApi<PortfolioTag[]>(endpoint)
          return response.data
        } catch (error) {
          continue
        }
      }
      
      return []
    } catch (error) {
      console.error(`Failed to fetch portfolio tags for ${portfolioId}:`, error)
      return []
    }
  }

  async getFeaturedPortfolios(): Promise<Portfolio[]> {
    try {
      const portfolios = await this.getPortfolios()
      return portfolios.filter(portfolio => portfolio.is_featured && portfolio.is_active)
    } catch (error) {
      console.error('Failed to fetch featured portfolios:', error)
      return []
    }
  }

  async getPortfolioSolutions(portfolioId: number): Promise<PortfolioSolution[]> {
    try {
      // Tambahkan berbagai kemungkinan endpoint
      const endpoints = [
        `/portofolio-solutions/${portfolioId}`, 
        `/portfolio-solutions/${portfolioId}`,
        `/portofolio-solutions?portofolio_id=${portfolioId}`,
        `/portfolio-solutions?portfolio_id=${portfolioId}`,
        `/portofolios/${portfolioId}/solutions`,
        `/portfolios/${portfolioId}/solutions`
      ]
      
        
      for (const endpoint of endpoints) {
        try {
          // Menggunakan fetch langsung untuk menghindari throw error
          const url = `${API_BASE_URL}${endpoint}`
            
          const response = await fetch(url, {
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' }
          })
          
            
          if (!response.ok) {
              continue
          }
          
          const responseData = await response.json()
          
          // Cek berbagai kemungkinan struktur response
          let solutions: PortfolioSolution[] = []
          
          if (Array.isArray(responseData)) {
            // Jika response langsung array
            solutions = responseData
          } else if (Array.isArray(responseData.data)) {
            // Jika response punya property data yang berisi array
            solutions = responseData.data
          } else if (responseData.solutions && Array.isArray(responseData.solutions)) {
            // Jika response punya property solutions
            solutions = responseData.solutions
          }
          
            return solutions
          
        } catch (error) {
            continue
        }
      }
      
        return []
      
    } catch (error) {
          return []
    }
  }

  async getShowcaseItems(): Promise<ShowcaseItem[]> {
    try {
      // Try to fetch from showcases endpoint (note the plural)
      try {
        const response = await this.fetchApi<ShowcaseItem[]>('/showcases')
        return response.data
      } catch (showcaseError) {
        console.warn('Showcases endpoint not available, using portfolio data as fallback')
        
        // Fallback: Use portfolio data as showcase items
        const portfolios = await this.getPortfolios()
        const activePortfolios = portfolios.filter(p => p.is_active && p.project_url)
        
        // Convert portfolio data to showcase format
        return activePortfolios.map((portfolio, index) => ({
          id: portfolio.id,
          title: portfolio.title,
          image: portfolio.cover_image || '/placeholder.svg',
          url: portfolio.project_url,
          display_order: index + 1,
          is_active: true,
          created_at: portfolio.created_at,
          updated_at: portfolio.updated_at
        }))
      }
    } catch (error) {
      console.error('Failed to fetch showcase items:', error)
      return []
    }
  }

  async getShowcaseItem(id: number): Promise<ShowcaseItem | null> {
    try {
      // Try to fetch from showcases endpoint first (note the plural)
      try {
        const response = await this.fetchApi<ShowcaseItem>(`/showcases/${id}`)
        return response.data
      } catch (showcaseError) {
        console.warn(`Showcases item endpoint not available, using portfolio data as fallback for ID: ${id}`)
        
        // Fallback: Get all showcase items and find by ID
        const showcaseItems = await this.getShowcaseItems()
        return showcaseItems.find(item => item.id === id) || null
      }
    } catch (error) {
      console.error(`Failed to fetch showcase item ${id}:`, error)
      return null
    }
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await this.fetchApi<BlogPost[]>('/blog-posts')
      return response.data
    } catch (error) {
      console.error('Failed to fetch blog posts:', error)
      return []
    }
  }

  async getBlogPost(id: number): Promise<BlogPost | null> {
    try {
      const response = await this.fetchApi<BlogPost>(`/blog-posts/${id}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch blog post ${id}:`, error)
      return null
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      // Fetch all blog posts and find by slug
      const blogPosts = await this.getBlogPosts()
      const blogPost = blogPosts.find(p => p.slug === slug && p.is_active)
      if (!blogPost) {
        console.warn(`Blog post with slug "${slug}" not found or not active`)
        return null
      }
      return blogPost
    } catch (error) {
      console.error(`Failed to fetch blog post with slug ${slug}:`, error)
      return null
    }
  }

  async getActiveBlogPosts(): Promise<BlogPost[]> {
    try {
      const blogPosts = await this.getBlogPosts()
      return blogPosts
        .filter(post => post.is_active)
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    } catch (error) {
      console.error('Failed to fetch active blog posts:', error)
      return []
    }
  }

  async submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/contact-forms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`Contact form submission failed: ${response.status}`)
      }

      const result = await response.json()
      return result.data
    } catch (error) {
      console.error('Failed to submit contact form:', error)
      throw error
    }
  }
}

export const apiService = new ApiService()
