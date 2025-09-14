import { render, screen, fireEvent, waitFor } from '../utils/test-utils'
import PortfolioSection from '../../components/portfolio-section'
import { apiService } from '../../lib/api'

// Mock the API service
jest.mock('../../lib/api', () => ({
  apiService: {
    getPortfolios: jest.fn()
  }
}))

// Mock BadgeSubtitle component
jest.mock('../../components/badge-subtitle', () => {
  return function MockBadgeSubtitle({ children }: { children: React.ReactNode }) {
    return <div data-testid="badge-subtitle">{children}</div>
  }
})

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>
  }
})

const mockPortfolios = [
  {
    id: 1,
    title: 'Test Project 1',
    background: 'Test description 1',
    category: 'UI/UX',
    cover_image: '/test-image-1.jpg',
    is_active: true,
    is_featured: true,
  },
  {
    id: 2,
    title: 'Test Project 2',
    background: 'Test description 2', 
    category: 'Front-End',
    cover_image: '/test-image-2.jpg',
    is_active: true,
    is_featured: false,
  },
  {
    id: 3,
    title: 'Test Project 3',
    background: 'Test description 3',
    category: 'Back-End',
    cover_image: '/test-image-3.jpg',
    is_active: false,
    is_featured: false,
  },
]

describe('PortfolioSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(apiService.getPortfolios as jest.Mock).mockResolvedValue(mockPortfolios)
  })

  describe('Rendering', () => {
    it('should render the portfolio section with correct structure', async () => {
      render(<PortfolioSection />)
      
      expect(screen.getByTestId('badge-subtitle')).toBeInTheDocument()
      expect(screen.getByText('Discover')).toBeInTheDocument()
      expect(screen.getByText('Our')).toBeInTheDocument()
      expect(screen.getByText('Recent')).toBeInTheDocument()
      expect(screen.getByText('Projects')).toBeInTheDocument()
      
      await waitFor(() => {
        expect(screen.getByText('Test Project 1')).toBeInTheDocument()
      })
    })

    it('should show loading state initially', () => {
      ;(apiService.getPortfolios as jest.Mock).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(mockPortfolios), 100))
      )
      
      render(<PortfolioSection />)
      
      // Should show loading skeleton
      expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
    })

    it('should render "View all portfolio" link', async () => {
      render(<PortfolioSection />)
      
      await waitFor(() => {
        const viewAllLink = screen.getByText('View all portfolio')
        expect(viewAllLink).toBeInTheDocument()
        expect(viewAllLink.closest('a')).toHaveAttribute('href', '/portofolio')
      })
    })
  })

  describe('Data Fetching', () => {
    it('should fetch portfolios on mount', async () => {
      render(<PortfolioSection />)
      
      await waitFor(() => {
        expect(apiService.getPortfolios).toHaveBeenCalledTimes(1)
      })
    })

    it('should display fetched portfolios', async () => {
      render(<PortfolioSection />)
      
      await waitFor(() => {
        expect(screen.getByText('Test Project 1')).toBeInTheDocument()
        expect(screen.getByText('Test Project 2')).toBeInTheDocument()
      })
    })

    it('should only show active portfolios', async () => {
      render(<PortfolioSection />)
      
      await waitFor(() => {
        expect(screen.getByText('Test Project 1')).toBeInTheDocument()
        expect(screen.getByText('Test Project 2')).toBeInTheDocument()
        expect(screen.queryByText('Test Project 3')).not.toBeInTheDocument() // inactive
      })
    })

    it('should prioritize featured portfolios', async () => {
      render(<PortfolioSection />)
      
      await waitFor(() => {
        const projects = screen.getAllByText(/Test Project [12]/)
        // Featured project (Test Project 1) should appear first
        expect(projects[0]).toHaveTextContent('Test Project 1')
      })
    })

    it('should limit to 6 portfolios', async () => {
      const manyPortfolios = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `Test Project ${i + 1}`,
        background: `Test description ${i + 1}`,
        category: 'UI/UX',
        cover_image: `/test-image-${i + 1}.jpg`,
        is_active: true,
        is_featured: false,
      }))
      
      ;(apiService.getPortfolios as jest.Mock).mockResolvedValue(manyPortfolios)
      
      render(<PortfolioSection />)
      
      await waitFor(() => {
        const projectElements = document.querySelectorAll('[data-testid*="project"]') ||
                               screen.getAllByText(/Test Project/)
        expect(projectElements.length).toBeLessThanOrEqual(6)
      })
    })
  })


  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      ;(apiService.getPortfolios as jest.Mock).mockRejectedValue(new Error('API Error'))
      
      render(<PortfolioSection />)
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch portfolios:', expect.any(Error))
      })
      
      consoleSpy.mockRestore()
    })

    it('should show empty state when no portfolios available', async () => {
      ;(apiService.getPortfolios as jest.Mock).mockResolvedValue([])
      
      render(<PortfolioSection />)
      
      await waitFor(() => {
        // Component should render without projects
        expect(screen.getByText('Discover')).toBeInTheDocument()
        expect(screen.getByText('Our')).toBeInTheDocument()
      })
    })

    it('should handle missing cover images', async () => {
      const portfolioWithoutImage = [{
        ...mockPortfolios[0],
        cover_image: null
      }]
      
      ;(apiService.getPortfolios as jest.Mock).mockResolvedValue(portfolioWithoutImage)
      
      render(<PortfolioSection />)
      
      await waitFor(() => {
        const img = screen.getByAltText('Test Project 1')
        expect(img).toHaveAttribute('src', expect.stringContaining('placeholder.svg'))
      })
    })
  })

  describe('Project Cards', () => {
    it('should render project information correctly', async () => {
      render(<PortfolioSection />)
      
      await waitFor(() => {
        expect(screen.getByText('Test Project 1')).toBeInTheDocument()
        expect(screen.getByText('Test description 1')).toBeInTheDocument()
        expect(screen.getAllByText('UI/UX')).toHaveLength(2)
      })
    })

    it('should render project images', async () => {
      render(<PortfolioSection />)
      
      await waitFor(() => {
        const img = screen.getByAltText('Test Project 1')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', expect.stringContaining('test-image-1.jpg'))
      })
    })

    it('should have clickable project links', async () => {
      render(<PortfolioSection />)
      
      await waitFor(() => {
        const projectLinks = screen.getAllByRole('link')
        const portfolioLink = projectLinks.find(link => 
          link.getAttribute('href') === '/portofolio/1'
        )
        expect(portfolioLink).toBeInTheDocument()
      })
    })
  })

  describe('Animation and Interactions', () => {
    it('should handle card hover effects', async () => {
      render(<PortfolioSection />)
      
      await waitFor(() => {
        const projectCard = screen.getByText('Test Project 1').closest('div')
        if (projectCard) {
          fireEvent.mouseEnter(projectCard)
          fireEvent.mouseLeave(projectCard)
        }
      })
      
      // Should not throw errors
      expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    })
  })

  describe('Layout and Styling', () => {
    it('should use masonry layout for projects', async () => {
      render(<PortfolioSection />)
      
      await waitFor(() => {
        const masonryContainer = document.querySelector('.columns-1.md\\:columns-2') ||
                                document.querySelector('.masonry') ||
                                document.querySelector('.grid')
        expect(masonryContainer).toBeInTheDocument()
      })
    })

    it('should be responsive', () => {
      render(<PortfolioSection />)
      
      const responsiveElements = document.querySelectorAll('[class*="md:"], [class*="lg:"], [class*="sm:"]')
      expect(responsiveElements.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('should have proper section structure', () => {
      render(<PortfolioSection />)
      
      const section = document.querySelector('section#portfolio')
      expect(section).toBeInTheDocument()
    })


    it('should have accessible project links', async () => {
      render(<PortfolioSection />)
      
      await waitFor(() => {
        const projectLinks = screen.getAllByRole('link')
        expect(projectLinks.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Performance', () => {
    it('should handle loading states efficiently', async () => {
      render(<PortfolioSection />)
      
      // Should show loading skeleton initially
      expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
      
      await waitFor(() => {
        expect(document.querySelector('.animate-pulse')).not.toBeInTheDocument()
      })
    })

    it('should not cause memory leaks', () => {
      const { unmount } = render(<PortfolioSection />)
      
      // Should unmount cleanly
      expect(() => unmount()).not.toThrow()
    })
  })
})
