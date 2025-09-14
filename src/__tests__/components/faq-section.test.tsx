import React from 'react'
import { render, screen, fireEvent, waitFor } from '../utils/test-utils'
import FAQSection from '../../components/faq-section'

// Mock BadgeSubtitle component
jest.mock('../../components/badge-subtitle', () => {
  return function MockBadgeSubtitle({ children }: { children: React.ReactNode }) {
    return <span data-testid="badge-subtitle">{children}</span>
  }
})

describe('FAQ Section', () => {
  describe('Initial Rendering', () => {
    it('should render FAQ section with correct title', () => {
      render(<FAQSection />)
      
      expect(screen.getByText('Frequently Ask Question')).toBeInTheDocument()
      expect(screen.getByText('Ask')).toBeInTheDocument()
      expect(screen.getByText('Us Anything,')).toBeInTheDocument()
      expect(screen.getByText("We've")).toBeInTheDocument()
      expect(screen.getByText('Got')).toBeInTheDocument()
      expect(screen.getByText('the Answers')).toBeInTheDocument()
    })

    it('should render chat interface elements', () => {
      render(<FAQSection />)
      
      expect(screen.getByText('Our Client ❤️')).toBeInTheDocument()
      expect(screen.getByText('Online Now')).toBeInTheDocument()
    })

    it('should render chat images with correct attributes', () => {
      render(<FAQSection />)
      
      const chatImage = screen.getByAltText('Chat')
      const peopleImage = screen.getByAltText('People')
      
      expect(chatImage).toHaveAttribute('src', '/images/chat.svg')
      expect(peopleImage).toHaveAttribute('src', '/images/people.svg')
    })
  })

  describe('FAQ Interactions', () => {
    it('should render FAQ questions', () => {
      render(<FAQSection />)
      
      // Check for FAQ question buttons
      const questionButtons = screen.getAllByRole('button')
      const faqButtons = questionButtons.filter(button => 
        button.textContent?.includes('?') && 
        (button.textContent?.includes('What') || 
         button.textContent?.includes('How') || 
         button.textContent?.includes('Can') ||
         button.textContent?.includes('Do'))
      )
      
      expect(faqButtons.length).toBeGreaterThan(0)
    })

    it('should handle FAQ button clicks', () => {
      render(<FAQSection />)
      
      const questionButtons = screen.getAllByRole('button')
      const faqButtons = questionButtons.filter(button => 
        button.textContent?.includes('?') && 
        (button.textContent?.includes('What') || 
         button.textContent?.includes('How') || 
         button.textContent?.includes('Can') ||
         button.textContent?.includes('Do'))
      )
      
      if (faqButtons.length > 0) {
        const firstFaqButton = faqButtons[0]
        fireEvent.click(firstFaqButton)
        // The button should be clickable (no error thrown)
        expect(firstFaqButton).toBeInTheDocument()
      }
    })
  })

  describe('Chat Interface Interactions', () => {
    it('should render chat interface with proper elements', () => {
      render(<FAQSection />)
      
      // Check for chat interface elements that are always visible
      expect(screen.getByText('Our Client ❤️')).toBeInTheDocument()
      expect(screen.getByText('Online Now')).toBeInTheDocument()
    })

    it('should render chat interface buttons', () => {
      render(<FAQSection />)
      
      // Check for chat interface buttons (back button, etc.)
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      render(<FAQSection />)
      
      const section = document.querySelector('#faq')
      expect(section).toBeInTheDocument()
      expect(section).toHaveAttribute('id', 'faq')
    })

    it('should have proper heading hierarchy', () => {
      render(<FAQSection />)
      
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    })

    it('should have accessible buttons', () => {
      render(<FAQSection />)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should have proper alt text for images', () => {
      render(<FAQSection />)
      
      const chatImage = screen.getByAltText('Chat')
      const peopleImage = screen.getByAltText('People')
      
      expect(chatImage).toBeInTheDocument()
      expect(peopleImage).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive grid layout', () => {
      render(<FAQSection />)
      
      const gridContainer = document.querySelector('.grid')
      expect(gridContainer).toHaveClass('lg:grid-cols-2')
    })

    it('should have responsive text sizing', () => {
      render(<FAQSection />)
      
      const title = screen.getByRole('heading', { level: 2 })
      expect(title).toHaveClass('text-2xl', 'sm:text-3xl', 'md:text-4xl', 'lg:text-5xl')
    })

    it('should have responsive padding', () => {
      render(<FAQSection />)
      
      const section = document.querySelector('#faq')
      expect(section).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
    })
  })

  describe('Animation and Visual Effects', () => {
    it('should render gradient text elements', () => {
      render(<FAQSection />)
      
      const gradientTexts = document.querySelectorAll('.bg-gradient-to-r')
      expect(gradientTexts.length).toBeGreaterThan(0)
    })

    it('should render chat interface with proper styling', () => {
      render(<FAQSection />)
      
      const chatInterface = document.querySelector('.bg-white.rounded-2xl.shadow-lg')
      expect(chatInterface).toBeInTheDocument()
    })

    it('should render gradient background in chat', () => {
      render(<FAQSection />)
      
      const gradientBackground = document.querySelector('.bg-gradient-to-br')
      expect(gradientBackground).toBeInTheDocument()
    })
  })
})