import React from 'react'
import { render, screen, fireEvent } from '../utils/test-utils'
import ContactSection from '../../components/contact-section'

// Mock BadgeSubtitle component
jest.mock('../../components/badge-subtitle', () => {
  return function MockBadgeSubtitle({ children }: { children: React.ReactNode }) {
    return <span data-testid="badge-subtitle">{children}</span>
  }
})

describe('Contact Section', () => {
  describe('Initial Rendering', () => {
    it('should render contact section with correct title', () => {
      render(<ContactSection />)
      
      expect(screen.getByText('Contact Us')).toBeInTheDocument()
      expect(screen.getByText('Time to Stop Scrolling,')).toBeInTheDocument()
      expect(screen.getByText("Let's")).toBeInTheDocument()
      expect(screen.getByText('Discuss')).toBeInTheDocument()
      expect(screen.getByText('and Cook It Up!')).toBeInTheDocument()
    })

    it('should render meeting benefits section', () => {
      render(<ContactSection />)
      
      expect(screen.getByText('What Will You Get in Meeting')).toBeInTheDocument()
      expect(screen.getByText('Personalized Strategy Insights')).toBeInTheDocument()
    })

    it('should render contact form section', () => {
      render(<ContactSection />)
      
      expect(screen.getAllByText('Message')).toHaveLength(2)
      expect(screen.getByText('1 of 2 Steps')).toBeInTheDocument()
    })

    it('should render form inputs', () => {
      render(<ContactSection />)
      
      expect(screen.getByPlaceholderText('Vederico Van Basten')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('vederico@example.mail')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('81234567890')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Tell us about your project...')).toBeInTheDocument()
    })

    it('should render next step button', () => {
      render(<ContactSection />)
      
      const nextButton = screen.getByRole('button', { name: 'Next Step' })
      expect(nextButton).toBeInTheDocument()
    })
  })

  describe('Form Interaction', () => {
    it('should update input values when typing', () => {
      render(<ContactSection />)
      
      const nameInput = screen.getByPlaceholderText('Vederico Van Basten')
      const emailInput = screen.getByPlaceholderText('vederico@example.mail')
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
      
      expect(nameInput).toHaveValue('John Doe')
      expect(emailInput).toHaveValue('john@example.com')
    })

    it('should handle phone number input', () => {
      render(<ContactSection />)
      
      const phoneInput = screen.getByPlaceholderText('81234567890')
      fireEvent.change(phoneInput, { target: { value: '1234567890' } })
      
      expect(phoneInput).toHaveValue('1234567890')
    })
  })

  describe('Visual Elements', () => {
    it('should render hand image', () => {
      render(<ContactSection />)
      
      const handImage = screen.getByAltText('Hand')
      expect(handImage).toBeInTheDocument()
      expect(handImage).toHaveAttribute('src', '/images/hand.svg')
    })

    it('should render paper plane image', () => {
      render(<ContactSection />)
      
      const paperPlaneImage = screen.getByAltText('Paper plane')
      expect(paperPlaneImage).toBeInTheDocument()
      expect(paperPlaneImage).toHaveAttribute('src', '/images/paperplane.svg')
    })
  })

  describe('Accessibility', () => {
    it('should have proper section structure', () => {
      render(<ContactSection />)
      
      const section = document.querySelector('#contact')
      expect(section).toBeInTheDocument()
      expect(section).toHaveAttribute('id', 'contact')
    })

    it('should have proper heading hierarchy', () => {
      render(<ContactSection />)
      
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    })

    it('should have accessible form elements', () => {
      render(<ContactSection />)
      
      const inputs = screen.getAllByRole('textbox')
      expect(inputs.length).toBeGreaterThan(0)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive classes', () => {
      render(<ContactSection />)
      
      const section = document.querySelector('#contact')
      expect(section).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
    })

    it('should have proper grid layout', () => {
      render(<ContactSection />)
      
      const gridContainer = document.querySelector('.grid')
      expect(gridContainer).toHaveClass('grid-cols-1', 'lg:grid-cols-2')
    })
  })
})




