import { render, screen, waitFor, act } from '../utils/test-utils'
import { mockWindowLocation, mockScrollIntoView } from '../utils/test-utils'
import Home from '../../app/page'

// Mock timers globally
beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

// Mock all the section components
jest.mock('../../components/integrated-navbar', () => {
  return function MockIntegratedNavbar() {
    return <nav data-testid="integrated-navbar">Integrated Navbar</nav>
  }
})

jest.mock('../../components/hero-section', () => {
  return function MockHeroSection() {
    return <section data-testid="hero-section">Hero Section</section>
  }
})

jest.mock('../../components/hero-marquee-section', () => {
  return function MockHeroMarqueeSection() {
    return <section data-testid="hero-marquee-section">Hero Marquee Section</section>
  }
})

jest.mock('../../components/about-us-section', () => {
  return function MockAboutUsSection() {
    return <section data-testid="about-us-section">About Us Section</section>
  }
})

jest.mock('../../components/comparison-section', () => {
  return function MockComparisonSection() {
    return <section data-testid="comparison-section">Comparison Section</section>
  }
})

jest.mock('../../components/services-section', () => {
  return function MockServicesSection() {
    return <section data-testid="services-section">Services Section</section>
  }
})

jest.mock('../../components/stack-marquee-section', () => {
  return function MockStackMarqueeSection() {
    return <section data-testid="stack-marquee-section">Stack Marquee Section</section>
  }
})

jest.mock('../../components/banner-section', () => {
  return function MockBannerSection() {
    return <section data-testid="banner-section">Banner Section</section>
  }
})

jest.mock('../../components/portfolio-section', () => {
  return function MockPortfolioSection() {
    return <section data-testid="portfolio-section">Portfolio Section</section>
  }
})

jest.mock('../../components/faq-section', () => {
  return function MockFaqSection() {
    return <section data-testid="faq-section">FAQ Section</section>
  }
})

jest.mock('../../components/contact-section', () => {
  return function MockContactSection() {
    return <section data-testid="contact-section">Contact Section</section>
  }
})

jest.mock('../../components/footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>
  }
})

describe('Home Page', () => {
  describe('Initial Rendering', () => {
    it('should render the main page container with correct styling', () => {
      render(<Home />)
      
      const mainContainer = document.querySelector('.min-h-screen')
      expect(mainContainer).toBeInTheDocument()
      expect(mainContainer).toHaveClass('min-h-screen', 'bg-white')
    })

    it('should render all main sections', () => {
      render(<Home />)
      
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('services-section')).toBeInTheDocument()
      expect(screen.getByTestId('portfolio-section')).toBeInTheDocument()
      expect(screen.getByTestId('faq-section')).toBeInTheDocument()
      expect(screen.getByTestId('contact-section')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    it('should render sections with correct IDs for navigation', () => {
      render(<Home />)
      
      expect(document.getElementById('hero')).toBeInTheDocument()
      expect(document.getElementById('services')).toBeInTheDocument()
      expect(document.getElementById('portfolio')).toBeInTheDocument()
      expect(document.getElementById('faq')).toBeInTheDocument()
      expect(document.getElementById('contact')).toBeInTheDocument()
    })
  })

  describe('Navbar Visibility', () => {
    it('should not show navbar initially', () => {
      render(<Home />)
      
      expect(screen.queryByTestId('integrated-navbar')).not.toBeInTheDocument()
    })

    it('should show navbar after 3 seconds delay', async () => {
      render(<Home />)
      
      // Initially navbar should not be visible
      expect(screen.queryByTestId('integrated-navbar')).not.toBeInTheDocument()
      
      // Advance timers by 3 seconds
      act(() => {
        jest.advanceTimersByTime(3000)
      })
      
      // Now navbar should be visible
      await waitFor(() => {
        expect(screen.getByTestId('integrated-navbar')).toBeInTheDocument()
      })
    })

    it('should clear timeout on component unmount', () => {
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
      
      const { unmount } = render(<Home />)
      
      unmount()
      
      expect(clearTimeoutSpy).toHaveBeenCalled()
    })
  })

  describe('Hash Navigation', () => {
    it('should not attempt to scroll if no hash is present', () => {
      const getElementByIdSpy = jest.spyOn(document, 'getElementById')
      
      render(<Home />)
      
      expect(getElementByIdSpy).not.toHaveBeenCalled()
    })
  })

  describe('Component State Management', () => {
    it('should initialize with showNavbar as false', () => {
      render(<Home />)
      
      // Navbar should not be visible initially due to fake timers
      expect(screen.queryByTestId('integrated-navbar')).not.toBeInTheDocument()
    })
  })

  describe('Performance and Accessibility', () => {
    it('should have proper semantic structure', () => {
      render(<Home />)
      
      // Check for main container
      const mainContainer = document.querySelector('.min-h-screen')
      expect(mainContainer).toBeInTheDocument()
      
      // Check for proper section structure
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('services-section')).toBeInTheDocument()
      expect(screen.getByTestId('portfolio-section')).toBeInTheDocument()
      expect(screen.getByTestId('faq-section')).toBeInTheDocument()
      expect(screen.getByTestId('contact-section')).toBeInTheDocument()
    })

    it('should render without errors when all props are provided', () => {
      expect(() => render(<Home />)).not.toThrow()
    })
  })

  describe('Integration with Next.js', () => {
    it('should be a client component', () => {
      render(<Home />)
      
      // Check if component renders (client components work in test environment)
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    })

    it('should handle client-side navigation properly', () => {
      mockWindowLocation('https://example.com#services')
      
      render(<Home />)
      
      // Should render without errors
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    })
  })
})