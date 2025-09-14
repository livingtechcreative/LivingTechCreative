const API_BASE_URL = 'https://livingtechcreative.com/api'

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
  private async fetchApi<T>(endpoint: string): Promise<T> {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      console.log(`Making API request to: ${url}`)
      
      const response = await fetch(url)
      if (!response.ok) {
        console.error(`API request failed: ${response.status} ${response.statusText} for ${url}`)
        throw new Error(`API request failed: ${response.status}`)
      }
      
      const data = await response.json()
      console.log(`API response received for ${endpoint}:`, data)
      return data
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error)
      throw error
    }
  }

  async getPortfolios(): Promise<Portfolio[]> {
    try {
      const response = await this.fetchApi<ApiResponse<Portfolio[]>>('/portofolios')
      return response.data
    } catch (error) {
      console.error('Failed to fetch portfolios:', error)
      return []
    }
  }

  async getPortfolio(id: number): Promise<Portfolio | null> {
    try {
      const response = await this.fetchApi<ApiResponse<Portfolio>>(`/portofolios/${id}`)
      return response.data
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
      const response = await this.fetchApi<ApiResponse<PortfolioTag[]>>(`/portofolio-tags/${portfolioId}`)
      return response.data
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

  async getShowcaseItems(): Promise<ShowcaseItem[]> {
    try {
      // Try to fetch from showcases endpoint (note the plural)
      try {
        const response = await this.fetchApi<ApiResponse<ShowcaseItem[]>>('/showcases')
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
        const response = await this.fetchApi<ApiResponse<ShowcaseItem>>(`/showcases/${id}`)
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
      const response = await this.fetchApi<ApiResponse<BlogPost[]>>('/blog-posts')
      return response.data
    } catch (error) {
      console.error('Failed to fetch blog posts:', error)
      return []
    }
  }

  async getBlogPost(id: number): Promise<BlogPost | null> {
    try {
      const response = await this.fetchApi<ApiResponse<BlogPost>>(`/blog-posts/${id}`)
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

  async getBlogPostCategories(blogPostId: number): Promise<BlogPostCategory[]> {
    try {
      const response = await this.fetchApi<ApiResponse<BlogPostCategory[]>>(`/blog-post-categories/${blogPostId}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch blog post categories for ${blogPostId}:`, error)
      return []
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
