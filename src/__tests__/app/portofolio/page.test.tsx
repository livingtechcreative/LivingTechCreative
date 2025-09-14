import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import PortfolioPage from '../../../app/portofolio/page'
import { apiService } from '../../../lib/api'

// Mock the API service
jest.mock('../../../lib/api', () => ({
  apiService: {
    getPortfolios: jest.fn()
  }
}))

// Mock Next.js components
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock components
jest.mock('../../../components/integrated-navbar', () => {
  return function MockIntegratedNavbar() {
    return <nav data-testid="integrated-navbar">Integrated Navbar</nav>
  }
})

jest.mock('../../../components/footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>
  }
})

jest.mock('../../../components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  )
}))

jest.mock('../../../components/ui/card', () => ({
  Card: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  CardContent: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  )
}))

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>
  }
}))

// Mock Next.js Image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  }
})

const mockPortfolios = [
  {
    id: 1,
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    category: 'Web Development',
    background: 'A modern e-commerce platform built with React and Node.js',
    cover_image: '/images/portfolio1.jpg',
    is_active: true
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    slug: 'mobile-banking-app',
    category: 'Mobile Development',
    background: 'A secure mobile banking application with advanced features',
    cover_image: '/images/portfolio2.jpg',
    is_active: true
  },
  {
    id: 3,
    title: 'AI Dashboard',
    slug: 'ai-dashboard',
    category: 'AI/ML',
    background: 'An intelligent dashboard for data visualization and analytics',
    cover_image: '/images/portfolio3.jpg',
    is_active: true
  }
]

describe('Portfolio Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Loading State', () => {
    it('should show loading skeleton when data is being fetched', () => {
      ;(apiService.getPortfolios as jest.Mock).mockImplementation(
        () => new Promise(() => {}) // Never resolves
      )

      render(<PortfolioPage />)

      expect(screen.getByTestId('integrated-navbar')).toBeInTheDocument()
      expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
      expect(screen.queryByText('Discover')).not.toBeInTheDocument()
    })

    it('should display loading skeleton with correct structure', () => {
      ;(apiService.getPortfolios as jest.Mock).mockImplementation(
        () => new Promise(() => {})
      )

      render(<PortfolioPage />)

      // Check for loading skeleton elements
      const skeletonElements = document.querySelectorAll('.animate-pulse')
      expect(skeletonElements.length).toBeGreaterThan(0)
      
      // Check for skeleton grid
      const skeletonGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-8')
      expect(skeletonGrid).toBeInTheDocument()
    })
  })

  describe('Data Loading', () => {
    it('should fetch portfolios on component mount', async () => {
      ;(apiService.getPortfolios as jest.Mock).mockResolvedValue(mockPortfolios)

      render(<PortfolioPage />)

      await waitFor(() => {
        expect(apiService.getPortfolios).toHaveBeenCalledTimes(1)
      })
    })

    it('should filter only active portfolios', async () => {
      const portfoliosWithInactive = [
        ...mockPortfolios,
        {
          id: 4,
          title: 'Inactive Project',
          slug: 'inactive-project',
          category: 'Web Development',
          background: 'This project is inactive',
          cover_image: '/images/inactive.jpg',
          is_active: false
        }
      ]

      ;(apiService.getPortfolios as jest.Mock).mockResolvedValue(portfoliosWithInactive)

      render(<PortfolioPage />)

      await waitFor(() => {
        expect(screen.getByText('E-commerce Platform')).toBeInTheDocument()
        expect(screen.getByText('Mobile Banking App')).toBeInTheDocument()
        expect(screen.getByText('AI Dashboard')).toBeInTheDocument()
        expect(screen.queryByText('Inactive Project')).not.toBeInTheDocument()
      })
    })

    it('should handle API errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      ;(apiService.getPortfolios as jest.Mock).mockRejectedValue(new Error('API Error'))

      render(<PortfolioPage />)

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch portfolios:', expect.any(Error))
        expect(screen.getByText('Discover')).toBeInTheDocument()
      })

      consoleSpy.mockRestore()
    })
  })

  describe('Rendering', () => {
    beforeEach(async () => {
      ;(apiService.getPortfolios as jest.Mock).mockResolvedValue(mockPortfolios)
    })

    it('should render the main page structure', async () => {
      render(<PortfolioPage />)

      await waitFor(() => {
        expect(screen.getByTestId('integrated-navbar')).toBeInTheDocument()
        expect(screen.getByTestId('footer')).toBeInTheDocument()
        expect(document.querySelector('.min-h-screen.bg-white')).toBeInTheDocument()
      })
    })

    it('should render the main title section', async () => {
      render(<PortfolioPage />)

      await waitFor(() => {
        expect(screen.getByText('Discover')).toBeInTheDocument()
        expect(screen.getByText('Our')).toBeInTheDocument()
        expect(screen.getByText('Recent')).toBeInTheDocument()
        expect(screen.getByText('Projects')).toBeInTheDocument()
      })
    })

    it('should render portfolio items with correct information', async () => {
      render(<PortfolioPage />)

      await waitFor(() => {
        // Check portfolio titles
        expect(screen.getByText('E-commerce Platform')).toBeInTheDocument()
        expect(screen.getByText('Mobile Banking App')).toBeInTheDocument()
        expect(screen.getByText('AI Dashboard')).toBeInTheDocument()

        // Check categories (appears in both badge and tag)
        expect(screen.getAllByText('Web Development')).toHaveLength(2)
        expect(screen.getAllByText('Mobile Development')).toHaveLength(2)
        expect(screen.getAllByText('AI/ML')).toHaveLength(2)

        // Check descriptions
        expect(screen.getByText('A modern e-commerce platform built with React and Node.js')).toBeInTheDocument()
        expect(screen.getByText('A secure mobile banking application with advanced features')).toBeInTheDocument()
        expect(screen.getByText('An intelligent dashboard for data visualization and analytics')).toBeInTheDocument()
      })
    })

    it('should render portfolio images with correct attributes', async () => {
      render(<PortfolioPage />)

      await waitFor(() => {
        const images = screen.getAllByRole('img')
        const portfolioImages = images.filter(img => 
          img.getAttribute('alt')?.includes('Platform') || 
          img.getAttribute('alt')?.includes('Banking') || 
          img.getAttribute('alt')?.includes('Dashboard')
        )

        expect(portfolioImages).toHaveLength(3)
        expect(portfolioImages[0]).toHaveAttribute('src', '/images/portfolio1.jpg')
        expect(portfolioImages[1]).toHaveAttribute('src', '/images/portfolio2.jpg')
        expect(portfolioImages[2]).toHaveAttribute('src', '/images/portfolio3.jpg')
      })
    })

    it('should render portfolio links with correct hrefs', async () => {
      render(<PortfolioPage />)

      await waitFor(() => {
        const links = screen.getAllByRole('link')
        const portfolioLinks = links.filter(link => 
          link.getAttribute('href')?.includes('/portofolio/')
        )

        expect(portfolioLinks).toHaveLength(3)
        expect(portfolioLinks[0]).toHaveAttribute('href', '/portofolio/ecommerce-platform')
        expect(portfolioLinks[1]).toHaveAttribute('href', '/portofolio/mobile-banking-app')
        expect(portfolioLinks[2]).toHaveAttribute('href', '/portofolio/ai-dashboard')
      })
    })

    it('should render call to action banner', async () => {
      render(<PortfolioPage />)

      await waitFor(() => {
        // Check for banner text using more flexible queries
        expect(screen.getByText(/Time to Stop Scrolling/)).toBeInTheDocument()
        expect(screen.getByText(/Let's/)).toBeInTheDocument()
        expect(screen.getAllByText('Book a meeting')).toHaveLength(2) // Appears twice
        expect(screen.getByText(/and discuss it/)).toBeInTheDocument()
        expect(screen.getByText(/We're here to listen/)).toBeInTheDocument()
      })
    })

    it('should render action buttons in banner', async () => {
      render(<PortfolioPage />)

      await waitFor(() => {
        expect(screen.getAllByText('Book a meeting')).toHaveLength(2) // Appears twice
        expect(screen.getByText('Contact via WhatsApp →')).toBeInTheDocument()
      })
    })
  })

  describe('Empty State', () => {
    it('should handle empty portfolio list', async () => {
      ;(apiService.getPortfolios as jest.Mock).mockResolvedValue([])

      render(<PortfolioPage />)

      await waitFor(() => {
        expect(screen.getByText('Discover')).toBeInTheDocument()
        expect(screen.getByText('Our')).toBeInTheDocument()
        expect(screen.getByText('Recent')).toBeInTheDocument()
        expect(screen.getByText('Projects')).toBeInTheDocument()
        // Should not have any portfolio items
        expect(screen.queryByText('E-commerce Platform')).not.toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    beforeEach(async () => {
      ;(apiService.getPortfolios as jest.Mock).mockResolvedValue(mockPortfolios)
    })

    it('should have proper semantic structure', async () => {
      render(<PortfolioPage />)

      await waitFor(() => {
        expect(document.querySelector('main')).toBeInTheDocument()
        expect(document.querySelector('nav')).toBeInTheDocument()
        expect(document.querySelector('footer')).toBeInTheDocument()
      })
    })

    it('should have proper heading hierarchy', async () => {
      render(<PortfolioPage />)

      await waitFor(() => {
        const headings = screen.getAllByRole('heading')
        expect(headings.length).toBeGreaterThan(0)
        
        // Main title should be h2
        const mainHeading = screen.getByText('Discover').closest('h2')
        expect(mainHeading).toBeInTheDocument()
      })
    })

    it('should have proper alt text for images', async () => {
      render(<PortfolioPage />)

      await waitFor(() => {
        const images = screen.getAllByRole('img')
        images.forEach(img => {
          expect(img).toHaveAttribute('alt')
          expect(img.getAttribute('alt')).not.toBe('')
        })
      })
    })
  })

  describe('Responsive Design', () => {
    beforeEach(async () => {
      ;(apiService.getPortfolios as jest.Mock).mockResolvedValue(mockPortfolios)
    })

    it('should have responsive grid layout', async () => {
      render(<PortfolioPage />)

      await waitFor(() => {
        const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-6')
        expect(grid).toBeInTheDocument()
      })
    })

    it('should have responsive text sizing', async () => {
      render(<PortfolioPage />)

      await waitFor(() => {
        const titleElement = screen.getByText('Discover').closest('h2')
        expect(titleElement).toHaveClass('text-2xl', 'sm:text-3xl', 'md:text-4xl', 'lg:text-5xl')
      })
    })
  })
})
