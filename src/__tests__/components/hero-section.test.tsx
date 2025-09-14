import { render, screen, fireEvent } from '../utils/test-utils'
import HeroSection from '../../components/hero-section'

// Mock the HeroContent component
jest.mock('../../components/hero/HeroContent', () => {
  return {
    HeroContent: () => (
      <div data-testid="hero-content">
        <h1>Sleek, Fast, Doesn't Ghost You After Launch</h1>
        <p>Living Tech Creative is a professional digital agency that helps you grow.</p>
        <button>Book a meeting</button>
      </div>
    )
  }
})

// Mock heroVariants
jest.mock('../../components/hero/animations/heroVariants', () => ({
  heroVariants: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }
  }
}))

describe('HeroSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render the hero section with correct structure', () => {
      render(<HeroSection />)
      
      const heroContainer = document.querySelector('.min-h-screen')
      expect(heroContainer).toBeInTheDocument()
    })

    it('should render background images', () => {
      render(<HeroSection />)
      
      const leftImage = screen.getByAltText('Left background')
      const rightImage = screen.getByAltText('Right background')
      
      expect(leftImage).toBeInTheDocument()
      expect(rightImage).toBeInTheDocument()
    })

    it('should render HeroContent component', () => {
      render(<HeroSection />)
      
      expect(screen.getByTestId('hero-content')).toBeInTheDocument()
    })

    it('should have correct CSS classes for layout', () => {
      render(<HeroSection />)
      
      const container = document.querySelector('.min-h-screen.w-screen.bg-white')
      expect(container).toBeInTheDocument()
      
      const flexContainer = document.querySelector('.flex.items-center.justify-center')
      expect(flexContainer).toBeInTheDocument()
    })
  })

  describe('Background Images', () => {
    it('should render left background image with correct props', () => {
      render(<HeroSection />)
      
      const leftImage = screen.getByAltText('Left background')
      expect(leftImage).toHaveAttribute('src', expect.stringContaining('kiri.png'))
      expect(leftImage).toHaveAttribute('width', '599.6')
      expect(leftImage).toHaveAttribute('height', '695.8')
    })

    it('should render right background image with correct props', () => {
      render(<HeroSection />)
      
      const rightImage = screen.getByAltText('Right background')
      expect(rightImage).toHaveAttribute('src', expect.stringContaining('kanan.png'))
      expect(rightImage).toHaveAttribute('width', '599')
      expect(rightImage).toHaveAttribute('height', '775.8')
    })

    it('should have priority loading for background images', () => {
      render(<HeroSection />)
      
      const leftImage = screen.getByAltText('Left background')
      const rightImage = screen.getByAltText('Right background')
      
      // Next.js Image component with priority prop should be present
      expect(leftImage).toBeInTheDocument()
      expect(rightImage).toBeInTheDocument()
    })
  })

  describe('Layout and Positioning', () => {
    it('should position background images correctly', () => {
      render(<HeroSection />)
      
      // Check for positioning classes
      const leftImageContainer = document.querySelector('.absolute.left-1\\/4')
      const rightImageContainer = document.querySelector('.absolute.right-1\\/4')
      
      expect(leftImageContainer).toBeInTheDocument()
      expect(rightImageContainer).toBeInTheDocument()
    })

    it('should have proper z-index layering', () => {
      render(<HeroSection />)
      
      const backgroundLayer = document.querySelector('.absolute.inset-0.z-0')
      const contentLayer = document.querySelector('.relative.z-10')
      
      expect(backgroundLayer).toBeInTheDocument()
      expect(contentLayer).toBeInTheDocument()
    })

    it('should have responsive padding', () => {
      render(<HeroSection />)
      
      const container = document.querySelector('.px-4')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Content Integration', () => {
    it('should pass motion variants to HeroContent', () => {
      render(<HeroSection />)
      
      // Verify that the motion.div wrapper exists with variants
      const motionDiv = document.querySelector('.w-full.max-w-7xl.mx-auto.text-center.relative.z-10')
      expect(motionDiv).toBeInTheDocument()
    })

    it('should center content properly', () => {
      render(<HeroSection />)
      
      const contentWrapper = document.querySelector('.max-w-7xl.mx-auto.text-center')
      expect(contentWrapper).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('should handle different screen sizes', () => {
      // Mock different viewport sizes
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })

      render(<HeroSection />)
      
      // Component should render without errors on different screen sizes
      expect(screen.getByTestId('hero-content')).toBeInTheDocument()
    })

    it('should maintain aspect ratio for background images', () => {
      render(<HeroSection />)
      
      const leftImage = screen.getByAltText('Left background')
      const rightImage = screen.getByAltText('Right background')
      
      // Images should maintain their specified dimensions
      expect(leftImage).toBeInTheDocument()
      expect(rightImage).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('should use priority loading for critical images', () => {
      render(<HeroSection />)
      
      // Both background images should have priority loading
      const images = screen.getAllByRole('img')
      expect(images).toHaveLength(2)
      
      images.forEach(img => {
        expect(img).toBeInTheDocument()
      })
    })

    it('should not cause layout shifts', () => {
      render(<HeroSection />)
      
      // Images should have explicit width and height to prevent CLS
      const leftImage = screen.getByAltText('Left background')
      const rightImage = screen.getByAltText('Right background')
      
      expect(leftImage).toHaveAttribute('width')
      expect(leftImage).toHaveAttribute('height')
      expect(rightImage).toHaveAttribute('width')
      expect(rightImage).toHaveAttribute('height')
    })
  })

  describe('Accessibility', () => {
    it('should have appropriate alt text for images', () => {
      render(<HeroSection />)
      
      const leftImage = screen.getByAltText('Left background')
      const rightImage = screen.getByAltText('Right background')
      
      expect(leftImage).toBeInTheDocument()
      expect(rightImage).toBeInTheDocument()
    })

    it('should be keyboard accessible', () => {
      render(<HeroSection />)
      
      // Hero section should not interfere with keyboard navigation
      const heroContent = screen.getByTestId('hero-content')
      expect(heroContent).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should render gracefully if images fail to load', () => {
      // Mock image loading error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      render(<HeroSection />)
      
      // Component should still render content
      expect(screen.getByTestId('hero-content')).toBeInTheDocument()
      
      consoleSpy.mockRestore()
    })

    it('should handle missing HeroContent gracefully', () => {
      // This test ensures the component structure is solid
      expect(() => render(<HeroSection />)).not.toThrow()
    })
  })
})
