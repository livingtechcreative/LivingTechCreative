import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ShowcasePage from '../../../app/showcase/page'
import { apiService } from '../../../lib/api'

// Mock the API service
jest.mock('../../../lib/api', () => ({
  apiService: {
    getShowcaseItems: jest.fn()
  }
}))

// Mock Next.js components
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  })
}))

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

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    main: ({ children, ...props }: any) => <main {...props}>{children}</main>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>
  }
}))

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  ArrowUpRight: () => <svg data-testid="arrow-up-right-icon" />,
  ExternalLink: () => <svg data-testid="external-link-icon" />
}))

// Mock window.open
const mockOpen = jest.fn()
Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true
})

const mockShowcaseItems = [
  {
    id: 1,
    title: 'E-commerce Website',
    image: '/images/showcase1.jpg',
    url: 'https://example.com/ecommerce',
    is_active: true,
    display_order: 1
  },
  {
    id: 2,
    title: 'Mobile App Design',
    image: '/images/showcase2.jpg',
    url: 'https://example.com/mobile-app',
    is_active: true,
    display_order: 2
  },
  {
    id: 3,
    title: 'Brand Identity',
    image: '/images/showcase3.jpg',
    url: 'https://example.com/brand',
    is_active: true,
    display_order: 3
  },
  {
    id: 4,
    title: 'Inactive Project',
    image: '/images/inactive.jpg',
    url: 'https://example.com/inactive',
    is_active: false,
    display_order: 4
  }
]

describe('Showcase Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockOpen.mockClear()
  })

  describe('Loading State', () => {
    it('should show loading spinner when data is being fetched', () => {
      ;(apiService.getShowcaseItems as jest.Mock).mockImplementation(
        () => new Promise(() => {}) // Never resolves
      )

      render(<ShowcasePage />)

      expect(screen.getByTestId('integrated-navbar')).toBeInTheDocument()
      expect(screen.getByText('Loading showcase...')).toBeInTheDocument()
      expect(document.querySelector('.animate-spin')).toBeInTheDocument()
      expect(screen.queryByText('Our Showcase')).not.toBeInTheDocument()
    })

    it('should display loading spinner with correct structure', () => {
      ;(apiService.getShowcaseItems as jest.Mock).mockImplementation(
        () => new Promise(() => {})
      )

      render(<ShowcasePage />)

      const spinner = document.querySelector('.animate-spin.rounded-full.h-12.w-12.border-b-2.border-gray-900')
      expect(spinner).toBeInTheDocument()
      expect(screen.getByText('Loading showcase...')).toBeInTheDocument()
    })
  })

  describe('Data Loading', () => {
    it('should fetch showcase items on component mount', async () => {
      ;(apiService.getShowcaseItems as jest.Mock).mockResolvedValue(mockShowcaseItems)

      render(<ShowcasePage />)

      await waitFor(() => {
        expect(apiService.getShowcaseItems).toHaveBeenCalledTimes(1)
      })
    })

    it('should filter only active items and sort by display_order', async () => {
      ;(apiService.getShowcaseItems as jest.Mock).mockResolvedValue(mockShowcaseItems)

      render(<ShowcasePage />)

      await waitFor(() => {
        expect(screen.getByText('E-commerce Website')).toBeInTheDocument()
        expect(screen.getByText('Mobile App Design')).toBeInTheDocument()
        expect(screen.getByText('Brand Identity')).toBeInTheDocument()
        expect(screen.queryByText('Inactive Project')).not.toBeInTheDocument()
      })
    })

    it('should handle API errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      ;(apiService.getShowcaseItems as jest.Mock).mockRejectedValue(new Error('API Error'))

      render(<ShowcasePage />)

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error fetching showcase data:', expect.any(Error))
        expect(screen.getByText('Our')).toBeInTheDocument()
        expect(screen.getByText('Showcase')).toBeInTheDocument()
      })

      consoleSpy.mockRestore()
    })

    it('should handle empty API response', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      ;(apiService.getShowcaseItems as jest.Mock).mockResolvedValue([])

      render(<ShowcasePage />)

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('No showcase data received from API')
        expect(screen.getByText('No showcase items found')).toBeInTheDocument()
      })

      consoleSpy.mockRestore()
    })

    it('should handle null API response', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      ;(apiService.getShowcaseItems as jest.Mock).mockResolvedValue(null)

      render(<ShowcasePage />)

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('No showcase data received from API')
        expect(screen.getByText('No showcase items found')).toBeInTheDocument()
      })

      consoleSpy.mockRestore()
    })
  })

  describe('Rendering', () => {
    beforeEach(async () => {
      ;(apiService.getShowcaseItems as jest.Mock).mockResolvedValue(mockShowcaseItems)
    })

    it('should render the main page structure', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        expect(screen.getByTestId('integrated-navbar')).toBeInTheDocument()
        expect(screen.getByTestId('footer')).toBeInTheDocument()
        expect(document.querySelector('.min-h-screen.bg-white')).toBeInTheDocument()
      })
    })

    it('should render the main title and description', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        expect(screen.getByText('Our')).toBeInTheDocument()
        expect(screen.getByText('Showcase')).toBeInTheDocument()
        expect(screen.getByText('Explore our latest projects and creative work. Each piece represents our commitment to excellence and innovation.')).toBeInTheDocument()
      })
    })

    it('should render showcase items with correct information', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        // Check showcase titles
        expect(screen.getByText('E-commerce Website')).toBeInTheDocument()
        expect(screen.getByText('Mobile App Design')).toBeInTheDocument()
        expect(screen.getByText('Brand Identity')).toBeInTheDocument()
      })
    })

    it('should render showcase images with correct attributes', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        const images = screen.getAllByRole('img')
        const showcaseImages = images.filter(img => 
          img.getAttribute('alt')?.includes('Website') || 
          img.getAttribute('alt')?.includes('Design') || 
          img.getAttribute('alt')?.includes('Identity')
        )

        expect(showcaseImages).toHaveLength(3)
        expect(showcaseImages[0]).toHaveAttribute('src', '/images/showcase1.jpg')
        expect(showcaseImages[1]).toHaveAttribute('src', '/images/showcase2.jpg')
        expect(showcaseImages[2]).toHaveAttribute('src', '/images/showcase3.jpg')
      })
    })

    it('should render action buttons for each item', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        const buttons = screen.getAllByText('Go to Link')
        expect(buttons).toHaveLength(3)
        
        buttons.forEach(button => {
          expect(button).toBeInTheDocument()
          expect(button.closest('button')).toBeInTheDocument()
        })
      })
    })

    it('should render external link icons', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        const externalLinkIcons = screen.getAllByTestId('external-link-icon')
        expect(externalLinkIcons).toHaveLength(3)
      })
    })
  })

  describe('User Interactions', () => {
    beforeEach(async () => {
      ;(apiService.getShowcaseItems as jest.Mock).mockResolvedValue(mockShowcaseItems)
    })

    it('should open external link when button is clicked', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        const buttons = screen.getAllByText('Go to Link')
        fireEvent.click(buttons[0])
        
        expect(mockOpen).toHaveBeenCalledWith('https://example.com/ecommerce', '_blank', 'noopener,noreferrer')
      })
    })

    it('should open correct link for each item', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        const buttons = screen.getAllByText('Go to Link')
        
        fireEvent.click(buttons[0])
        expect(mockOpen).toHaveBeenCalledWith('https://example.com/ecommerce', '_blank', 'noopener,noreferrer')
        
        fireEvent.click(buttons[1])
        expect(mockOpen).toHaveBeenCalledWith('https://example.com/mobile-app', '_blank', 'noopener,noreferrer')
        
        fireEvent.click(buttons[2])
        expect(mockOpen).toHaveBeenCalledWith('https://example.com/brand', '_blank', 'noopener,noreferrer')
      })
    })
  })

  describe('Empty State', () => {
    it('should show empty state when no items are available', async () => {
      ;(apiService.getShowcaseItems as jest.Mock).mockResolvedValue([])

      render(<ShowcasePage />)

      await waitFor(() => {
        expect(screen.getByText('No showcase items found')).toBeInTheDocument()
        expect(screen.getByText('Check back later for our latest projects.')).toBeInTheDocument()
        expect(screen.queryByText('E-commerce Website')).not.toBeInTheDocument()
      })
    })

    it('should show empty state icon', async () => {
      ;(apiService.getShowcaseItems as jest.Mock).mockResolvedValue([])

      render(<ShowcasePage />)

      await waitFor(() => {
        const emptyStateIcon = document.querySelector('svg')
        expect(emptyStateIcon).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    beforeEach(async () => {
      ;(apiService.getShowcaseItems as jest.Mock).mockResolvedValue(mockShowcaseItems)
    })

    it('should have proper semantic structure', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        expect(document.querySelector('main')).toBeInTheDocument()
        expect(document.querySelector('nav')).toBeInTheDocument()
        expect(document.querySelector('footer')).toBeInTheDocument()
      })
    })

    it('should have proper heading hierarchy', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        const headings = screen.getAllByRole('heading')
        expect(headings.length).toBeGreaterThan(0)
        
        // Main title should be h1
        const mainHeading = screen.getByText('Our').closest('h1')
        expect(mainHeading).toBeInTheDocument()
      })
    })

    it('should have proper alt text for images', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        const images = screen.getAllByRole('img')
        const showcaseImages = images.filter(img => 
          img.getAttribute('alt')?.includes('Website') || 
          img.getAttribute('alt')?.includes('Design') || 
          img.getAttribute('alt')?.includes('Identity')
        )

        showcaseImages.forEach(img => {
          expect(img).toHaveAttribute('alt')
          expect(img.getAttribute('alt')).not.toBe('')
        })
      })
    })

    it('should have accessible buttons', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        const buttons = screen.getAllByText('Go to Link')
        buttons.forEach(button => {
          expect(button.closest('button')).toBeInTheDocument()
        })
      })
    })
  })

  describe('Responsive Design', () => {
    beforeEach(async () => {
      ;(apiService.getShowcaseItems as jest.Mock).mockResolvedValue(mockShowcaseItems)
    })

    it('should have responsive grid layout', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        const grid = document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3.gap-8')
        expect(grid).toBeInTheDocument()
      })
    })

    it('should have responsive text sizing', async () => {
      render(<ShowcasePage />)

      await waitFor(() => {
        const titleElement = screen.getByText('Our').closest('h1')
        expect(titleElement).toHaveClass('text-3xl', 'sm:text-4xl', 'md:text-5xl', 'lg:text-6xl')
      })
    })
  })
})
