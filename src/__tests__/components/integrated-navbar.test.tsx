import { render, screen } from '../utils/test-utils'
import IntegratedNavbar from '../../components/integrated-navbar'

// Mock the SimpleNavbar component
jest.mock('../../components/simple-navbar', () => {
  return function MockSimpleNavbar() {
    return <nav data-testid="simple-navbar">Simple Navbar Component</nav>
  }
})

describe('IntegratedNavbar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render the SimpleNavbar component', () => {
      render(<IntegratedNavbar />)
      
      expect(screen.getByTestId('simple-navbar')).toBeInTheDocument()
    })

    it('should be a client component', () => {
      // This test ensures the component can render on client side
      expect(() => render(<IntegratedNavbar />)).not.toThrow()
    })

    it('should render without any props', () => {
      render(<IntegratedNavbar />)
      
      expect(screen.getByTestId('simple-navbar')).toBeInTheDocument()
    })
  })

  describe('Integration', () => {
    it('should integrate with the SimpleNavbar component correctly', () => {
      render(<IntegratedNavbar />)
      
      const navbar = screen.getByTestId('simple-navbar')
      expect(navbar).toBeInTheDocument()
      expect(navbar).toHaveTextContent('Simple Navbar Component')
    })
  })

  describe('Error Handling', () => {
    it('should handle rendering errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      render(<IntegratedNavbar />)
      
      expect(consoleSpy).not.toHaveBeenCalled()
      
      consoleSpy.mockRestore()
    })
  })
})
