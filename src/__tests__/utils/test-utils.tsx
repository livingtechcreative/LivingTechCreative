import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterContext.Provider value={
      {
        push: jest.fn(),
        replace: jest.fn(),
        forward: jest.fn(),
        back: jest.fn(),
        prefetch: jest.fn(),
        refresh: jest.fn(),
      } as any
    }>
      {children}
    </AppRouterContext.Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

export const mockWindowLocation = (hash: string = '', href: string = 'http://localhost:3000/') => {
  delete (window as any).location
  window.location = {
    hash,
    href,
  } as any
}

export const mockScrollIntoView = () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
}

// Simple test to ensure the file is recognized as a test suite
describe('Test Utils', () => {
  it('should export render function', () => {
    expect(typeof render).toBe('function')
  })

  it('should export mockWindowLocation function', () => {
    expect(typeof mockWindowLocation).toBe('function')
  })

  it('should export mockScrollIntoView function', () => {
    expect(typeof mockScrollIntoView).toBe('function')
  })
})
