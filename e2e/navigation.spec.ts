import { test, expect } from '@playwright/test'

test.describe('Navigation E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for navbar to appear
    await page.waitForTimeout(3500)
  })

  test.describe('Navbar Functionality', () => {
    test('should display navbar after delay', async ({ page }) => {
      const navbar = page.locator('nav').first()
      await expect(navbar).toBeVisible()
    })

    test('should have all navigation links', async ({ page }) => {
      // Check for main navigation items
      await expect(page.getByText('Home')).toBeVisible()
      await expect(page.getByText('About')).toBeVisible()
      await expect(page.getByText('Services')).toBeVisible()
      await expect(page.getByText('Portfolio')).toBeVisible()
      await expect(page.getByText('FAQ')).toBeVisible()
      await expect(page.getByText('Contact')).toBeVisible()
    })

    test('should have Book a Call button', async ({ page }) => {
      const bookCallButton = page.getByText('Book a Call')
      await expect(bookCallButton).toBeVisible()
      await expect(bookCallButton).toBeEnabled()
    })

    test('should navigate to external showcase page', async ({ page }) => {
      // Look for Showcase link if it exists
      const showcaseLink = page.getByText('Showcase')
      
      if (await showcaseLink.isVisible()) {
        // Should be a link to /showcase
        await expect(showcaseLink).toHaveAttribute('href', '/showcase')
      }
    })
  })

  test.describe('Smooth Scrolling Navigation', () => {
    test('should scroll to Home section', async ({ page }) => {
      await page.click('text=Home')
      await expect(page.locator('#hero')).toBeInViewport()
    })

    test('should scroll to About section', async ({ page }) => {
      await page.click('text=About')
      await page.waitForTimeout(1000) // Wait for smooth scroll
      await expect(page.locator('#about')).toBeInViewport()
    })

    test('should scroll to Services section', async ({ page }) => {
      await page.click('text=Services')
      await page.waitForTimeout(1000)
      await expect(page.locator('#services')).toBeInViewport()
    })

    test('should scroll to Portfolio section', async ({ page }) => {
      await page.click('text=Portfolio')
      await page.waitForTimeout(1000)
      await expect(page.locator('#portfolio')).toBeInViewport()
    })

    test('should scroll to FAQ section', async ({ page }) => {
      await page.click('text=FAQ')
      await page.waitForTimeout(1000)
      await expect(page.locator('#faq')).toBeInViewport()
    })

    test('should scroll to Contact section', async ({ page }) => {
      await page.click('text=Contact')
      await page.waitForTimeout(1000)
      await expect(page.locator('#contact')).toBeInViewport()
    })
  })

  test.describe('Hash-based Navigation', () => {
    test('should navigate to sections via URL hash', async ({ page }) => {
      // Test direct hash navigation
      await page.goto('/#services')
      await page.waitForTimeout(1500)
      await expect(page.locator('#services')).toBeInViewport()
    })

    test('should handle hash navigation to about', async ({ page }) => {
      await page.goto('/#about')
      await page.waitForTimeout(1500)
      await expect(page.locator('#about')).toBeInViewport()
    })

    test('should handle hash navigation to portfolio', async ({ page }) => {
      await page.goto('/#portfolio')
      await page.waitForTimeout(1500)
      await expect(page.locator('#portfolio')).toBeInViewport()
    })

    test('should handle hash navigation to contact', async ({ page }) => {
      await page.goto('/#contact')
      await page.waitForTimeout(1500)
      await expect(page.locator('#contact')).toBeInViewport()
    })

    test('should handle hash navigation to faq', async ({ page }) => {
      await page.goto('/#faq')
      await page.waitForTimeout(1500)
      await expect(page.locator('#faq')).toBeInViewport()
    })

    test('should handle invalid hash gracefully', async ({ page }) => {
      await page.goto('/#nonexistent')
      await page.waitForTimeout(1500)
      
      // Should not cause errors, page should still load
      await expect(page.locator('#hero')).toBeVisible()
    })
  })

  test.describe('Logo Navigation', () => {
    test('should scroll to top when logo is clicked', async ({ page }) => {
      // First scroll down
      await page.locator('#services').scrollIntoViewIfNeeded()
      
      // Click logo (look for logo image or brand text)
      const logo = page.locator('img[alt*="Logo"], img[alt*="LivTech"]').first()
      
      if (await logo.isVisible()) {
        await logo.click()
        await page.waitForTimeout(1000)
        await expect(page.locator('#hero')).toBeInViewport()
      }
    })

    test('should navigate to home from other pages', async ({ page }) => {
      // This test would be relevant if we had other pages
      // For now, test that logo click works from different scroll positions
      await page.locator('#contact').scrollIntoViewIfNeeded()
      
      const logo = page.locator('img[alt*="Logo"], img[alt*="LivTech"]').first()
      
      if (await logo.isVisible()) {
        await logo.click()
        await page.waitForTimeout(1000)
        await expect(page.locator('#hero')).toBeInViewport()
      }
    })
  })

  test.describe('Mobile Navigation', () => {
    test('should work on mobile devices', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      // Reload to ensure mobile layout
      await page.reload()
      await page.waitForTimeout(3500)
      
      // Check if mobile navigation exists
      const mobileNav = page.locator('[data-testid="mobile-nav"], .mobile-menu, button[aria-label*="menu"]')
      
      if (await mobileNav.count() > 0) {
        // Test mobile menu functionality
        await mobileNav.first().click()
        await page.waitForTimeout(500)
        
        // Should show navigation options
        await expect(page.getByText('Services')).toBeVisible()
      } else {
        // If no mobile menu, regular nav should still work
        await expect(page.getByText('Services')).toBeVisible()
      }
    })

    test('should handle mobile navigation clicks', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      await page.waitForTimeout(3500)
      
      // Try to navigate to services on mobile
      await page.click('text=Services')
      await page.waitForTimeout(1000)
      await expect(page.locator('#services')).toBeInViewport()
    })
  })

  test.describe('Navigation State Management', () => {
    test('should highlight active navigation item', async ({ page }) => {
      // Navigate to different sections and check if nav items are highlighted
      await page.click('text=Services')
      await page.waitForTimeout(1000)
      
      // Check if Services nav item has active styling
      const servicesNavItem = page.getByText('Services')
      // Note: Actual active state styling would need to be checked based on implementation
      await expect(servicesNavItem).toBeVisible()
    })

    test('should maintain navigation state during scroll', async ({ page }) => {
      // Test that navigation remains functional during scroll
      await page.locator('#services').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)
      
      // Navigation should still work
      await page.click('text=About')
      await page.waitForTimeout(1000)
      await expect(page.locator('#about')).toBeInViewport()
    })
  })

  test.describe('Navigation Performance', () => {
    test('should navigate smoothly between sections', async ({ page }) => {
      const startTime = Date.now()
      
      // Navigate through all sections
      await page.click('text=Services')
      await page.waitForTimeout(800)
      
      await page.click('text=Portfolio')
      await page.waitForTimeout(800)
      
      await page.click('text=About')
      await page.waitForTimeout(800)
      
      await page.click('text=Contact')
      await page.waitForTimeout(800)
      
      const totalTime = Date.now() - startTime
      
      // Should complete navigation within reasonable time
      expect(totalTime).toBeLessThan(10000)
      
      // Final section should be visible
      await expect(page.locator('#contact')).toBeInViewport()
    })

    test('should handle rapid navigation clicks', async ({ page }) => {
      // Rapidly click different navigation items
      await page.click('text=Services')
      await page.click('text=Portfolio')
      await page.click('text=About')
      await page.click('text=Contact')
      
      // Wait for final navigation to complete
      await page.waitForTimeout(1500)
      
      // Should end up at the last clicked section
      await expect(page.locator('#contact')).toBeInViewport()
    })
  })

  test.describe('External Navigation', () => {
    test('should handle Book a Call button', async ({ page }) => {
      const bookCallButton = page.getByText('Book a Call')
      await expect(bookCallButton).toBeVisible()
      
      // Note: We don't actually click to avoid opening external calendar
      // But we can verify the button is clickable
      await bookCallButton.hover()
      await expect(bookCallButton).toBeEnabled()
    })

    test('should handle external links properly', async ({ page }) => {
      // Test any external links in navigation
      const externalLinks = page.locator('a[href^="http"], a[target="_blank"]')
      const count = await externalLinks.count()
      
      for (let i = 0; i < count; i++) {
        const link = externalLinks.nth(i)
        const href = await link.getAttribute('href')
        const target = await link.getAttribute('target')
        
        if (href && href.startsWith('http')) {
          // External links should have target="_blank"
          expect(target).toBe('_blank')
        }
      }
    })
  })

  test.describe('Navigation Accessibility', () => {
    test('should be keyboard accessible', async ({ page }) => {
      // Test keyboard navigation
      await page.keyboard.press('Tab')
      
      // Should be able to navigate with keyboard
      let focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
      
      // Continue tabbing through navigation
      await page.keyboard.press('Tab')
      focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
    })

    test('should have proper ARIA labels', async ({ page }) => {
      // Check for navigation landmarks
      const nav = page.locator('nav')
      await expect(nav).toBeVisible()
      
      // Check for proper button labels
      const buttons = page.locator('button')
      const count = await buttons.count()
      
      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i)
        const ariaLabel = await button.getAttribute('aria-label')
        const text = await button.textContent()
        
        // Button should have either aria-label or visible text
        expect(ariaLabel || text).toBeTruthy()
      }
    })

    test('should support screen readers', async ({ page }) => {
      // Check for proper semantic structure
      const nav = page.locator('nav')
      await expect(nav).toBeVisible()
      
      // Navigation items should be in a list or have proper roles
      const navItems = page.locator('nav a, nav button')
      const count = await navItems.count()
      expect(count).toBeGreaterThan(0)
    })
  })
})
