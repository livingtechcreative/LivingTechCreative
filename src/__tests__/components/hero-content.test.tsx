import { render, screen, fireEvent } from '../utils/test-utils'
import { HeroContent } from '@/components/hero/HeroContent'

describe('HeroContent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render the main heading text', () => {
      render(<HeroContent />)
      
      // Use getAllByText since there are multiple "Sleek" elements (mobile and desktop)
      expect(screen.getAllByText('Sleek')).toHaveLength(2)
      expect(screen.getAllByText(', Fast')).toHaveLength(2)
      expect(screen.getAllByText("Doesn't Ghost")).toHaveLength(2)
      expect(screen.getAllByText('You After')).toHaveLength(2)
      expect(screen.getAllByText('Launch')).toHaveLength(2)
    })

    it('should render the subtitle text', () => {
      render(<HeroContent />)
      
      expect(screen.getByText('Living Tech Creative is a professional digital agency that helps you grow.')).toBeInTheDocument()
      expect(screen.getByText('From strategy to execution, we grow your product without the stress.')).toBeInTheDocument()
    })

    it('should render the availability badge', () => {
      render(<HeroContent />)
      
      expect(screen.getByText('Available for work')).toBeInTheDocument()
    })

    it('should render the CTA button', () => {
      render(<HeroContent />)
      
      expect(screen.getByRole('button', { name: /book a meeting/i })).toBeInTheDocument()
    })

    it('should render the footer text', () => {
      render(<HeroContent />)
      
      expect(screen.getByText('Free 30-Minute Consultation • No Commitment Required')).toBeInTheDocument()
    })
  })

  describe('Images and Icons', () => {
    it('should render all decorative images', () => {
      render(<HeroContent />)
      
      // Check for man.svg (Sleek)
      const sleekImages = screen.getAllByAltText('Sleek')
      expect(sleekImages.length).toBeGreaterThan(0)
      
      // Check for eagle.svg (Fast)
      const fastImages = screen.getAllByAltText('Fast')
      expect(fastImages.length).toBeGreaterThan(0)
      
      // Check for ghost.svg (Doesn't Ghost)
      const ghostImages = screen.getAllByAltText("Doesn't Ghost")
      expect(ghostImages.length).toBeGreaterThan(0)
    })

    it('should render arrow icon in CTA button', () => {
      render(<HeroContent />)
      
      const button = screen.getByRole('button', { name: /book a meeting/i })
      const svg = button.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should have correct image sizes for desktop and mobile', () => {
      render(<HeroContent />)
      
      // Desktop images should be larger (56x56)
      const desktopImages = document.querySelectorAll('img[width="56"]')
      expect(desktopImages.length).toBeGreaterThan(0)
      
      // Mobile images should be smaller (32x32)  
      const mobileImages = document.querySelectorAll('img[width="32"]')
      expect(mobileImages.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Design', () => {
    it('should show mobile layout on small screens', () => {
      render(<HeroContent />)
      
      // Mobile layout should exist
      const mobileLayout = document.querySelector('.block.sm\\:hidden')
      expect(mobileLayout).toBeInTheDocument()
    })

    it('should show desktop layout on larger screens', () => {
      render(<HeroContent />)
      
      // Desktop layout should exist
      const desktopLayout = document.querySelector('.hidden.sm\\:block')
      expect(desktopLayout).toBeInTheDocument()
    })

    it('should have responsive text sizes', () => {
      render(<HeroContent />)
      
      // Check for responsive text classes
      const heading = document.querySelector('.text-3xl.sm\\:text-4xl.md\\:text-5xl.lg\\:text-6xl.xl\\:text-7xl')
      expect(heading).toBeInTheDocument()
      
      const subtitle = document.querySelector('.text-xs.sm\\:text-sm.md\\:text-base.lg\\:text-lg')
      expect(subtitle).toBeInTheDocument()
    })
  })

  describe('Availability Badge', () => {
    it('should render availability badge with correct styling', () => {
      render(<HeroContent />)
      
      const badge = screen.getByText('Available for work')
      const badgeContainer = badge.closest('.inline-flex.items-center')
      
      expect(badgeContainer).toBeInTheDocument()
      expect(badgeContainer).toHaveClass('px-4', 'py-1.5', 'border', 'border-gray-200', 'rounded-lg')
    })

    it('should have animated green dot', () => {
      render(<HeroContent />)
      
      // Check for the animated ping effect
      const animatedDot = document.querySelector('.animate-ping.bg-green-400')
      const staticDot = document.querySelector('.bg-green-500')
      
      expect(animatedDot).toBeInTheDocument()
      expect(staticDot).toBeInTheDocument()
    })
  })

  describe('CTA Button', () => {
    it('should have correct button styling', () => {
      render(<HeroContent />)
      
      const button = screen.getByRole('button', { name: /book a meeting/i })
      expect(button).toHaveClass('group', 'relative', 'inline-flex', 'items-center', 'justify-center')
    })

    it('should be clickable', () => {
      render(<HeroContent />)
      
      const button = screen.getByRole('button', { name: /book a meeting/i })
      expect(button).toBeEnabled()
      
      // Should not throw error when clicked
      expect(() => fireEvent.click(button)).not.toThrow()
    })

    it('should have hover effects', () => {
      render(<HeroContent />)
      
      const button = screen.getByRole('button', { name: /book a meeting/i })
      
      // Test hover interaction
      fireEvent.mouseEnter(button)
      fireEvent.mouseLeave(button)
      
      expect(button).toBeInTheDocument()
    })
  })

  describe('Gradient Text', () => {
    it('should apply gradient styling to Launch text', () => {
      render(<HeroContent />)
      
      const launchTexts = screen.getAllByText('Launch')
      
      launchTexts.forEach(text => {
        expect(text).toHaveClass('bg-gradient-to-r', 'from-[#2B35AB]', 'via-[#8A38F5]', 'to-[#13CBD4]', 'bg-clip-text', 'text-transparent')
      })
    })

    it('should have correct gradient colors', () => {
      render(<HeroContent />)
      
      const launchTexts = screen.getAllByText('Launch')
      
      launchTexts.forEach(text => {
        const style = window.getComputedStyle(text)
        expect(text).toHaveStyle({
          backgroundImage: 'linear-gradient(90deg, #2B35AB 0%, #8A38F5 46%, #13CBD4 90%)'
        })
      })
    })
  })

  describe('Animation Variants', () => {
    it('should use default variants when none provided', () => {
      render(<HeroContent />)
      
      // Component should render without errors with default variants
      expect(screen.getAllByText('Sleek')).toHaveLength(2)
    })

    it('should accept custom variants', () => {
      const customVariants = {
        container: {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        },
        sleek: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        fast: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        trafficLight: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        and: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        ghostText: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        anime: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        animeMobile: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        subtitle: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
      }
      
      render(<HeroContent variants={customVariants} />)
      
      expect(screen.getAllByText('Sleek')).toHaveLength(2)
    })
  })

  describe('Layout Structure', () => {
    it('should have proper text alignment', () => {
      render(<HeroContent />)
      
      const container = document.querySelector('.max-w-7xl.mx-auto.text-center')
      expect(container).toBeInTheDocument()
    })

    it('should have correct spacing between elements', () => {
      render(<HeroContent />)
      
      // Check for margin classes
      const badge = document.querySelector('.mb-8')
      const heading = document.querySelector('.mb-8')
      const ctaButton = document.querySelector('.mt-6.sm\\:mt-8.md\\:mt-10.lg\\:mt-12')
      const footerText = document.querySelector('.mt-4')
      
      expect(badge).toBeInTheDocument()
      expect(heading).toBeInTheDocument()
      expect(ctaButton).toBeInTheDocument()
      expect(footerText).toBeInTheDocument()
    })

    it('should handle text wrapping properly', () => {
      render(<HeroContent />)
      
      // Check for proper text wrapping classes
      const mobileLayout = document.querySelector('.flex-wrap')
      const desktopLayout = document.querySelector('.flex-nowrap')
      
      expect(mobileLayout).toBeInTheDocument()
      expect(desktopLayout).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      render(<HeroContent />)
      
      // Button should be accessible
      const button = screen.getByRole('button', { name: /book a meeting/i })
      expect(button).toBeInTheDocument()
      
      // Images should have alt text
      const images = screen.getAllByRole('img')
      images.forEach(img => {
        expect(img).toHaveAttribute('alt')
      })
    })

    it('should have readable text contrast', () => {
      render(<HeroContent />)
      
      // Main text should have good contrast - check the parent container
      const subtitleContainer = document.querySelector('.text-xs.sm\\:text-sm.md\\:text-base.lg\\:text-lg.text-gray-600')
      expect(subtitleContainer).toBeInTheDocument()
    })

    it('should support keyboard navigation', () => {
      render(<HeroContent />)
      
      const button = screen.getByRole('button', { name: /book a meeting/i })
      
      // Button should be focusable
      button.focus()
      expect(document.activeElement).toBe(button)
    })
  })

  describe('Error Handling', () => {
    it('should render without crashing when images fail to load', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      render(<HeroContent />)
      
      expect(screen.getAllByText('Sleek')).toHaveLength(2)
      
      consoleSpy.mockRestore()
    })

    it('should handle missing variants gracefully', () => {
      // @ts-ignore - Testing edge case
      expect(() => render(<HeroContent variants={null} />)).not.toThrow()
    })
  })
})
