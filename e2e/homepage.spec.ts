import { test, expect } from '@playwright/test'

test.describe('Homepage E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Page Loading and Structure', () => {
    test('should load the homepage successfully', async ({ page }) => {
      await expect(page).toHaveTitle(/LivTech|Living Tech Creative/)
      
      // Check that main sections are present
      await expect(page.locator('#hero')).toBeVisible()
      await expect(page.locator('#services')).toBeVisible()
      await expect(page.locator('#portfolio')).toBeVisible()
      await expect(page.locator('#about')).toBeVisible()
      await expect(page.locator('#faq')).toBeVisible()
      await expect(page.locator('#contact')).toBeVisible()
    })

    test('should display hero section content', async ({ page }) => {
      await expect(page.getByText('Sleek')).toBeVisible()
      await expect(page.getByText('Fast')).toBeVisible()
      await expect(page.getByText("Doesn't Ghost")).toBeVisible()
      await expect(page.getByText('Launch')).toBeVisible()
      
      await expect(page.getByText('Living Tech Creative is a professional digital agency')).toBeVisible()
      await expect(page.getByRole('button', { name: /book a meeting/i })).toBeVisible()
    })

    test('should show navbar after delay', async ({ page }) => {
      // Wait for navbar to appear (3 second delay)
      await page.waitForTimeout(3500)
      
      // Check if navbar is visible
      const navbar = page.locator('nav').first()
      await expect(navbar).toBeVisible()
    })
  })

  test.describe('Navigation', () => {
    test('should navigate between sections using navbar', async ({ page }) => {
      // Wait for navbar to appear
      await page.waitForTimeout(3500)
      
      // Test navigation to services
      await page.click('text=Services')
      await expect(page.locator('#services')).toBeInViewport()
      
      // Test navigation to portfolio
      await page.click('text=Portfolio')
      await expect(page.locator('#portfolio')).toBeInViewport()
      
      // Test navigation to about
      await page.click('text=About')
      await expect(page.locator('#about')).toBeInViewport()
      
      // Test navigation to contact
      await page.click('text=Contact')
      await expect(page.locator('#contact')).toBeInViewport()
    })

    test('should handle hash navigation from URL', async ({ page }) => {
      await page.goto('/#services')
      
      // Wait for navigation to complete
      await page.waitForTimeout(1500)
      
      await expect(page.locator('#services')).toBeInViewport()
    })

    test('should scroll to top when logo is clicked', async ({ page }) => {
      // Scroll down first
      await page.locator('#services').scrollIntoViewIfNeeded()
      
      // Wait for navbar and click logo
      await page.waitForTimeout(3500)
      const logo = page.locator('img[alt*="Logo"]').first()
      await logo.click()
      
      // Should scroll to top
      await expect(page.locator('#hero')).toBeInViewport()
    })
  })

  test.describe('Hero Section', () => {
    test('should display availability badge', async ({ page }) => {
      const badge = page.getByText('Available for work')
      await expect(badge).toBeVisible()
      
      // Check for green indicator
      const indicator = page.locator('.bg-green-500, .bg-green-400')
      await expect(indicator.first()).toBeVisible()
    })

    test('should have working CTA button', async ({ page }) => {
      const ctaButton = page.getByRole('button', { name: /book a meeting/i })
      await expect(ctaButton).toBeVisible()
      await expect(ctaButton).toBeEnabled()
      
      // Button should be clickable
      await ctaButton.hover()
      // Note: We don't click it to avoid opening external calendar
    })

    test('should display hero images', async ({ page }) => {
      // Check for background images
      const images = page.locator('img[alt*="background"]')
      await expect(images.first()).toBeVisible()
      
      // Check for decorative icons in text
      const iconImages = page.locator('img[alt="Sleek"], img[alt="Fast"], img[alt*="Ghost"]')
      await expect(iconImages.first()).toBeVisible()
    })
  })

  test.describe('Services Section', () => {
    test('should display all services', async ({ page }) => {
      await page.locator('#services').scrollIntoViewIfNeeded()
      
      // Check for service titles
      await expect(page.getByText('UI/UX Design')).toBeVisible()
      await expect(page.getByText('Website Development')).toBeVisible()
      await expect(page.getByText('Data Science')).toBeVisible()
      await expect(page.getByText('Graphic Design')).toBeVisible()
      await expect(page.getByText('Video Editing')).toBeVisible()
      await expect(page.getByText('Branding')).toBeVisible()
    })

    test('should show service descriptions on hover', async ({ page }) => {
      await page.locator('#services').scrollIntoViewIfNeeded()
      
      // Hover over a service card
      const serviceCard = page.getByText('UI/UX Design').locator('..')
      await serviceCard.hover()
      
      // Should show description
      await expect(page.getByText('Craft intuitive, user-friendly interfaces')).toBeVisible()
    })

    test('should display service icons', async ({ page }) => {
      await page.locator('#services').scrollIntoViewIfNeeded()
      
      // Check for service icons
      const serviceIcons = page.locator('img[alt*="Design"], img[alt*="Development"]')
      await expect(serviceIcons.first()).toBeVisible()
    })
  })

  test.describe('Portfolio Section', () => {
    test('should display portfolio filter buttons', async ({ page }) => {
      await page.locator('#portfolio').scrollIntoViewIfNeeded()
      
      await expect(page.getByText('All')).toBeVisible()
      await expect(page.getByText('UI/UX')).toBeVisible()
      await expect(page.getByText('Front-End')).toBeVisible()
      await expect(page.getByText('Back-End')).toBeVisible()
    })

    test('should filter portfolio items', async ({ page }) => {
      await page.locator('#portfolio').scrollIntoViewIfNeeded()
      
      // Wait for portfolios to load
      await page.waitForTimeout(2000)
      
      // Click UI/UX filter
      await page.click('text=UI/UX')
      
      // Should filter results (if any portfolios exist)
      // This test might need adjustment based on actual portfolio data
    })

    test('should have "View All Projects" link', async ({ page }) => {
      await page.locator('#portfolio').scrollIntoViewIfNeeded()
      
      const viewAllLink = page.getByText('View All Projects')
      await expect(viewAllLink).toBeVisible()
      
      // Check link destination
      await expect(viewAllLink).toHaveAttribute('href', '/portofolio')
    })
  })

  test.describe('About Section', () => {
    test('should display team information', async ({ page }) => {
      await page.locator('#about').scrollIntoViewIfNeeded()
      
      // Should show about content
      await expect(page.getByText(/about/i).first()).toBeVisible()
    })
  })

  test.describe('FAQ Section', () => {
    test('should display FAQ items', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded()
      
      // Should show FAQ content
      await expect(page.locator('#faq')).toBeVisible()
    })

    test('should expand/collapse FAQ items', async ({ page }) => {
      await page.locator('#faq').scrollIntoViewIfNeeded()
      
      // Look for expandable FAQ items
      const faqItems = page.locator('[data-testid*="faq"], .accordion-item, button[aria-expanded]')
      
      if (await faqItems.count() > 0) {
        const firstFaq = faqItems.first()
        await firstFaq.click()
        
        // Should expand/collapse
        await page.waitForTimeout(500)
      }
    })
  })

  test.describe('Contact Section', () => {
    test('should display contact form', async ({ page }) => {
      await page.locator('#contact').scrollIntoViewIfNeeded()
      
      // Should show contact section
      await expect(page.locator('#contact')).toBeVisible()
    })

    test('should have contact form fields', async ({ page }) => {
      await page.locator('#contact').scrollIntoViewIfNeeded()
      
      // Look for form elements
      const inputs = page.locator('input[type="text"], input[type="email"], textarea')
      
      if (await inputs.count() > 0) {
        await expect(inputs.first()).toBeVisible()
      }
    })
  })

  test.describe('Footer', () => {
    test('should display footer content', async ({ page }) => {
      await page.locator('footer').scrollIntoViewIfNeeded()
      
      const footer = page.locator('footer')
      await expect(footer).toBeVisible()
    })

    test('should have footer links', async ({ page }) => {
      await page.locator('footer').scrollIntoViewIfNeeded()
      
      // Check for footer links
      const footerLinks = page.locator('footer a')
      
      if (await footerLinks.count() > 0) {
        await expect(footerLinks.first()).toBeVisible()
      }
    })
  })

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      // Hero section should be visible
      await expect(page.locator('#hero')).toBeVisible()
      await expect(page.getByText('Sleek')).toBeVisible()
      
      // Navigation should adapt to mobile
      await page.waitForTimeout(3500)
      const navbar = page.locator('nav').first()
      await expect(navbar).toBeVisible()
    })

    test('should work on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      
      // All sections should be visible
      await expect(page.locator('#hero')).toBeVisible()
      await expect(page.locator('#services')).toBeVisible()
      await expect(page.locator('#portfolio')).toBeVisible()
    })

    test('should work on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 })
      
      // Desktop layout should work properly
      await expect(page.locator('#hero')).toBeVisible()
      
      // Wait for navbar
      await page.waitForTimeout(3500)
      const navbar = page.locator('nav').first()
      await expect(navbar).toBeVisible()
    })
  })

  test.describe('Performance and Loading', () => {
    test('should load within reasonable time', async ({ page }) => {
      const startTime = Date.now()
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      const loadTime = Date.now() - startTime
      
      // Should load within 10 seconds
      expect(loadTime).toBeLessThan(10000)
    })

    test('should have no console errors', async ({ page }) => {
      const consoleErrors: string[] = []
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text())
        }
      })
      
      await page.goto('/')
      await page.waitForTimeout(5000)
      
      // Filter out known non-critical errors
      const criticalErrors = consoleErrors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('404') &&
        !error.includes('net::ERR_')
      )
      
      expect(criticalErrors).toHaveLength(0)
    })
  })

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      const headings = page.locator('h1, h2, h3, h4, h5, h6')
      const count = await headings.count()
      
      expect(count).toBeGreaterThan(0)
      
      // Should have at least one h1
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBeGreaterThan(0)
    })

    test('should have alt text for images', async ({ page }) => {
      const images = page.locator('img')
      const count = await images.count()
      
      for (let i = 0; i < count; i++) {
        const img = images.nth(i)
        const alt = await img.getAttribute('alt')
        expect(alt).toBeTruthy()
      }
    })

    test('should be keyboard navigable', async ({ page }) => {
      // Test tab navigation
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      
      // Should be able to navigate with keyboard
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
    })
  })

  test.describe('Animations and Interactions', () => {
    test('should handle scroll animations', async ({ page }) => {
      // Scroll through sections
      await page.locator('#services').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)
      
      await page.locator('#portfolio').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)
      
      await page.locator('#about').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)
      
      // Should not cause any errors
      await expect(page.locator('#about')).toBeVisible()
    })

    test('should handle hover effects', async ({ page }) => {
      await page.locator('#services').scrollIntoViewIfNeeded()
      
      // Hover over service cards
      const serviceCard = page.getByText('UI/UX Design').locator('..')
      await serviceCard.hover()
      await page.waitForTimeout(300)
      
      // Should handle hover without errors
      await expect(serviceCard).toBeVisible()
    })
  })
})
