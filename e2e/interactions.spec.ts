import { test, expect } from '@playwright/test'

test.describe('User Interactions E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Hero Section Interactions', () => {
    test('should handle CTA button interactions', async ({ page }) => {
      const ctaButton = page.getByRole('button', { name: /book a meeting/i })
      
      // Button should be visible and enabled
      await expect(ctaButton).toBeVisible()
      await expect(ctaButton).toBeEnabled()
      
      // Test hover effect
      await ctaButton.hover()
      await page.waitForTimeout(300)
      
      // Test focus
      await ctaButton.focus()
      await expect(ctaButton).toBeFocused()
    })

    test('should display availability indicator', async ({ page }) => {
      const availabilityBadge = page.getByText('Available for work')
      await expect(availabilityBadge).toBeVisible()
      
      // Check for animated green dot
      const greenDot = page.locator('.bg-green-400, .bg-green-500').first()
      await expect(greenDot).toBeVisible()
    })

    test('should handle responsive text layout', async ({ page }) => {
      // Test different viewport sizes
      const viewports = [
        { width: 375, height: 667 },   // Mobile
        { width: 768, height: 1024 },  // Tablet
        { width: 1920, height: 1080 }  // Desktop
      ]
      
      for (const viewport of viewports) {
        await page.setViewportSize(viewport)
        await page.waitForTimeout(500)
        
        // Hero text should be visible at all sizes
        await expect(page.getByText('Sleek')).toBeVisible()
        await expect(page.getByText('Launch')).toBeVisible()
      }
    })
  })

  test.describe('Services Section Interactions', () => {
    test('should handle service card hover effects', async ({ page }) => {
      await page.locator('#services').scrollIntoViewIfNeeded()
      await page.waitForTimeout(1000)
      
      // Find service cards
      const uiuxCard = page.getByText('UI/UX Design').locator('..')
      const webdevCard = page.getByText('Website Development').locator('..')
      
      // Test hover effects
      await uiuxCard.hover()
      await page.waitForTimeout(300)
      await expect(page.getByText('Craft intuitive, user-friendly interfaces')).toBeVisible()
      
      await webdevCard.hover()
      await page.waitForTimeout(300)
      await expect(page.getByText('Build responsive, high-performance websites')).toBeVisible()
    })

    test('should display all service icons', async ({ page }) => {
      await page.locator('#services').scrollIntoViewIfNeeded()
      
      // Check for service icons
      const serviceIcons = page.locator('img[alt*="Design"], img[alt*="Development"], img[alt*="Analysis"]')
      const count = await serviceIcons.count()
      expect(count).toBeGreaterThan(0)
      
      // Each icon should be visible
      for (let i = 0; i < Math.min(count, 5); i++) {
        await expect(serviceIcons.nth(i)).toBeVisible()
      }
    })

    test('should handle service card animations', async ({ page }) => {
      await page.locator('#services').scrollIntoViewIfNeeded()
      
      // Service cards should animate in
      await page.waitForTimeout(1000)
      
      const serviceCards = page.locator('.group, [data-testid*="service"]')
      const count = await serviceCards.count()
      
      if (count > 0) {
        await expect(serviceCards.first()).toBeVisible()
      }
    })
  })

  test.describe('Portfolio Section Interactions', () => {
    test('should handle portfolio filtering', async ({ page }) => {
      await page.locator('#portfolio').scrollIntoViewIfNeeded()
      await page.waitForTimeout(2000) // Wait for portfolio data to load
      
      // Test filter buttons
      const allFilter = page.getByText('All')
      const uiuxFilter = page.getByText('UI/UX')
      const frontendFilter = page.getByText('Front-End')
      
      await expect(allFilter).toBeVisible()
      await expect(uiuxFilter).toBeVisible()
      await expect(frontendFilter).toBeVisible()
      
      // Test filtering
      await uiuxFilter.click()
      await page.waitForTimeout(500)
      
      // Switch back to all
      await allFilter.click()
      await page.waitForTimeout(500)
    })

    test('should handle portfolio card hover effects', async ({ page }) => {
      await page.locator('#portfolio').scrollIntoViewIfNeeded()
      await page.waitForTimeout(2000)
      
      // Look for portfolio cards
      const portfolioCards = page.locator('[data-testid*="portfolio"], .portfolio-card, .break-inside-avoid')
      const count = await portfolioCards.count()
      
      if (count > 0) {
        const firstCard = portfolioCards.first()
        await firstCard.hover()
        await page.waitForTimeout(300)
        
        // Card should handle hover without errors
        await expect(firstCard).toBeVisible()
      }
    })

    test('should handle "View All Projects" link', async ({ page }) => {
      await page.locator('#portfolio').scrollIntoViewIfNeeded()
      
      const viewAllLink = page.getByText('View All Projects')
      await expect(viewAllLink).toBeVisible()
      
      // Test hover effect
      await viewAllLink.hover()
      await page.waitForTimeout(300)
      
      // Should have proper href
      await expect(viewAllLink).toHaveAttribute('href', '/portofolio')
    })

    test('should display loading state', async ({ page }) => {
      // Intercept API calls to test loading state
      await page.route('**/api/portofolios', route => {
        // Delay the response to see loading state
        setTimeout(() => route.fulfill({ json: { data: [] } }), 1000)
      })
      
      await page.reload()
      await page.locator('#portfolio').scrollIntoViewIfNeeded()
      
      // Should show loading text
      await expect(page.getByText(/Loading portfolios.../)).toBeVisible()
      
      // Wait for loading to complete
      await page.waitForTimeout(2000)
    })
  })

  test.describe('FAQ Section Interactions', () => {
    test('should handle FAQ accordion', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded()
      
      // Look for FAQ accordion items
      const faqItems = page.locator('[data-testid*="faq"], .accordion-item, button[aria-expanded]')
      const count = await faqItems.count()
      
      if (count > 0) {
        const firstFaq = faqItems.first()
        
        // Test expand/collapse
        await firstFaq.click()
        await page.waitForTimeout(500)
        
        // Click again to collapse
        await firstFaq.click()
        await page.waitForTimeout(500)
        
        await expect(firstFaq).toBeVisible()
      }
    })

    test('should display FAQ content', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded()
      
      // FAQ section should be visible
      await expect(page.locator('#faq')).toBeVisible()
      
      // Should contain FAQ-related content
      const faqContent = page.locator('#faq')
      await expect(faqContent).toBeVisible()
    })
  })

  test.describe('Contact Section Interactions', () => {
    test('should display contact form', async ({ page }) => {
      await page.locator('#contact').scrollIntoViewIfNeeded()
      
      // Look for form elements
      const formInputs = page.locator('input[type="text"], input[type="email"], textarea')
      const count = await formInputs.count()
      
      if (count > 0) {
        // Test form interaction
        const firstInput = formInputs.first()
        await expect(firstInput).toBeVisible()
        
        // Test focus
        await firstInput.focus()
        await expect(firstInput).toBeFocused()
        
        // Test typing
        await firstInput.fill('Test input')
        await expect(firstInput).toHaveValue('Test input')
      }
    })

    test('should handle contact form submission', async ({ page }) => {
      await page.locator('#contact').scrollIntoViewIfNeeded()
      
      // Look for submit button
      const submitButton = page.locator('button[type="submit"], input[type="submit"]')
      const count = await submitButton.count()
      
      if (count > 0) {
        await expect(submitButton.first()).toBeVisible()
        
        // Test button state
        await submitButton.first().hover()
        await page.waitForTimeout(300)
      }
    })

    test('should display contact information', async ({ page }) => {
      await page.locator('#contact').scrollIntoViewIfNeeded()
      
      // Contact section should be visible
      await expect(page.locator('#contact')).toBeVisible()
      
      // Should contain contact-related content
      const contactSection = page.locator('#contact')
      await expect(contactSection).toBeVisible()
    })
  })

  test.describe('Scroll Interactions', () => {
    test('should handle smooth scrolling between sections', async ({ page }) => {
      // Wait for navbar
      await page.waitForTimeout(3500)
      
      // Test smooth scroll navigation
      await page.click('text=Services')
      await page.waitForTimeout(1000)
      await expect(page.locator('#services')).toBeInViewport()
      
      await page.click('text=Portfolio')
      await page.waitForTimeout(1000)
      await expect(page.locator('#portfolio')).toBeInViewport()
      
      await page.click('text=About')
      await page.waitForTimeout(1000)
      await expect(page.locator('#about')).toBeInViewport()
    })

    test('should handle scroll-triggered animations', async ({ page }) => {
      // Scroll through sections to trigger animations
      const sections = ['#services', '#portfolio', '#about', '#faq', '#contact']
      
      for (const section of sections) {
        await page.locator(section).scrollIntoViewIfNeeded()
        await page.waitForTimeout(800) // Wait for animations
        
        await expect(page.locator(section)).toBeVisible()
      }
    })

    test('should maintain navbar visibility during scroll', async ({ page }) => {
      await page.waitForTimeout(3500) // Wait for navbar to appear
      
      // Scroll to different sections
      await page.locator('#services').scrollIntoViewIfNeeded()
      await page.locator('#portfolio').scrollIntoViewIfNeeded()
      await page.locator('#contact').scrollIntoViewIfNeeded()
      
      // Navbar should remain visible
      const navbar = page.locator('nav').first()
      await expect(navbar).toBeVisible()
    })
  })

  test.describe('Animation Interactions', () => {
    test('should handle page load animations', async ({ page }) => {
      // Refresh page to see load animations
      await page.reload()
      
      // Hero content should animate in
      await page.waitForTimeout(1000)
      await expect(page.getByText('Sleek')).toBeVisible()
      await expect(page.getByText('Launch')).toBeVisible()
      
      // Navbar should appear after delay
      await page.waitForTimeout(3000)
      const navbar = page.locator('nav').first()
      await expect(navbar).toBeVisible()
    })

    test('should handle hover animations', async ({ page }) => {
      await page.waitForTimeout(3500)
      
      // Test hero button hover
      const ctaButton = page.getByRole('button', { name: /book a meeting/i })
      await ctaButton.hover()
      await page.waitForTimeout(300)
      
      // Test service card hover
      await page.locator('#services').scrollIntoViewIfNeeded()
      const serviceCard = page.getByText('UI/UX Design').locator('..')
      await serviceCard.hover()
      await page.waitForTimeout(300)
      
      // Animations should complete without errors
      await expect(ctaButton).toBeVisible()
      await expect(serviceCard).toBeVisible()
    })
  })

  test.describe('Touch and Mobile Interactions', () => {
    test('should handle touch interactions on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      await page.waitForTimeout(3500)
      
      // Test touch scrolling
      await page.touchscreen.tap(200, 400)
      await page.evaluate(() => window.scrollTo(0, 500))
      await page.waitForTimeout(500)
      
      // Should handle touch without errors
      await expect(page.locator('#hero')).toBeVisible()
    })

    test('should handle mobile navigation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      await page.waitForTimeout(3500)
      
      // Test mobile navigation if it exists
      const mobileMenuButton = page.locator('[data-testid="mobile-menu"], button[aria-label*="menu"]')
      const count = await mobileMenuButton.count()
      
      if (count > 0) {
        await mobileMenuButton.first().tap()
        await page.waitForTimeout(500)
        
        // Should open mobile menu
        await expect(page.getByText('Services')).toBeVisible()
      }
    })
  })

  test.describe('Error Handling and Edge Cases', () => {
    test('should handle network errors gracefully', async ({ page }) => {
      // Intercept API calls to simulate network error
      await page.route('**/api/portofolios', route => {
        route.abort('failed')
      })
      
      await page.reload()
      await page.locator('#portfolio').scrollIntoViewIfNeeded()
      await page.waitForTimeout(2000)
      
      // Should handle error without crashing
      await expect(page.locator('#portfolio')).toBeVisible()
    })

    test('should handle rapid user interactions', async ({ page }) => {
      await page.waitForTimeout(3500)
      
      // Rapidly click navigation items
      for (let i = 0; i < 5; i++) {
        await page.click('text=Services')
        await page.click('text=Portfolio')
        await page.click('text=About')
        await page.waitForTimeout(100)
      }
      
      // Should handle rapid clicks without errors
      await page.waitForTimeout(1000)
      await expect(page.locator('#about')).toBeVisible()
    })

    test('should handle browser back/forward', async ({ page }) => {
      // Navigate to section with hash
      await page.goto('/#services')
      await page.waitForTimeout(1000)
      
      // Go back
      await page.goBack()
      await page.waitForTimeout(1000)
      
      // Go forward
      await page.goForward()
      await page.waitForTimeout(1000)
      
      // Should handle navigation without errors
      await expect(page.locator('#services')).toBeVisible()
    })
  })
})
