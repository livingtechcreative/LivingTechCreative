import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileInView, whileHover, whileTap, initial, animate, transition, variants, viewport, ...props }) => <div {...props}>{children}</div>,
    nav: ({ children, whileInView, whileHover, whileTap, initial, animate, transition, variants, viewport, ...props }) => <nav {...props}>{children}</nav>,
    section: ({ children, whileInView, whileHover, whileTap, initial, animate, transition, variants, viewport, ...props }) => <section {...props}>{children}</section>,
    h1: ({ children, whileInView, whileHover, whileTap, initial, animate, transition, variants, viewport, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, whileInView, whileHover, whileTap, initial, animate, transition, variants, viewport, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, whileInView, whileHover, whileTap, initial, animate, transition, variants, viewport, ...props }) => <h3 {...props}>{children}</h3>,
    p: ({ children, whileInView, whileHover, whileTap, initial, animate, transition, variants, viewport, ...props }) => <p {...props}>{children}</p>,
    button: ({ children, whileInView, whileHover, whileTap, initial, animate, transition, variants, viewport, ...props }) => <button {...props}>{children}</button>,
    span: ({ children, whileInView, whileHover, whileTap, initial, animate, transition, variants, viewport, ...props }) => <span {...props}>{children}</span>,
    img: ({ children, whileInView, whileHover, whileTap, initial, animate, transition, variants, viewport, ...props }) => <img {...props}>{children}</img>,
    svg: ({ children, whileInView, whileHover, whileTap, initial, animate, transition, variants, viewport, ...props }) => <svg {...props}>{children}</svg>,
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
  useInView: () => true,
}))

// Mock react-scroll
jest.mock('react-scroll', () => ({
  Link: ({ children, to, ...props }) => (
    <a href={`#${to}`} {...props}>
      {children}
    </a>
  ),
  Element: ({ children, name, ...props }) => (
    <div id={name} {...props}>
      {children}
    </div>
  ),
  scroller: {
    scrollTo: jest.fn(),
  },
}))

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
})

// Mock setTimeout and clearTimeout - removed problematic mock

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}

// Suppress console errors during tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
