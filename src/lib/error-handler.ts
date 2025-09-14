// Global error handler to filter out browser extension errors
export class ErrorHandler {
  private static isBrowserExtensionError(error: Error): boolean {
    const extensionErrorPatterns = [
      'tx_attempts_exceeded',
      'tx_ack_timeout',
      'Failed to initialize messaging',
      'host-console-events',
      'host-network-events',
      'host-dom-snapshot',
      'chrome-extension://',
      'moz-extension://',
      'safari-extension://',
      'browser-extension',
      'extension context invalidated',
      'message port closed',
      'receiving end does not exist'
    ]

    const errorMessage = error.message.toLowerCase()
    const errorStack = error.stack?.toLowerCase() || ''

    return extensionErrorPatterns.some(pattern => 
      errorMessage.includes(pattern.toLowerCase()) || 
      errorStack.includes(pattern.toLowerCase())
    )
  }

  private static isNetworkError(error: Error): boolean {
    const networkErrorPatterns = [
      'network error',
      'fetch failed',
      'net::err_',
      'connection refused',
      'timeout',
      'cors'
    ]

    const errorMessage = error.message.toLowerCase()
    return networkErrorPatterns.some(pattern => 
      errorMessage.includes(pattern)
    )
  }

  public static handleError(error: Error, context?: string): void {
    // Don't log browser extension errors
    if (this.isBrowserExtensionError(error)) {
      return
    }

    // Log network errors with context
    if (this.isNetworkError(error)) {
      console.warn(`Network error${context ? ` in ${context}` : ''}:`, error.message)
      return
    }

    // Log other errors normally
    console.error(`Error${context ? ` in ${context}` : ''}:`, error)
  }

  public static setupGlobalErrorHandlers(): void {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason))
      
      if (this.isBrowserExtensionError(error)) {
        event.preventDefault() // Prevent the error from showing in console
        return
      }

      this.handleError(error, 'Unhandled Promise Rejection')
    })

    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      const error = event.error || new Error(event.message)
      
      if (this.isBrowserExtensionError(error)) {
        event.preventDefault() // Prevent the error from showing in console
        return
      }

      this.handleError(error, 'Uncaught Error')
    })

    // Override console methods to filter extension errors
    const originalConsoleError = console.error
    const originalConsoleWarn = console.warn
    
    console.error = (...args: any[]) => {
      const errorMessage = args.join(' ')
      
      // Check if this is a browser extension error
      if (this.isBrowserExtensionError(new Error(errorMessage))) {
        return // Don't log extension errors
      }

      // Log other errors normally
      originalConsoleError.apply(console, args)
    }

    console.warn = (...args: any[]) => {
      const errorMessage = args.join(' ')
      
      // Check if this is a browser extension error
      if (this.isBrowserExtensionError(new Error(errorMessage))) {
        return // Don't log extension errors
      }

      // Log other warnings normally
      originalConsoleWarn.apply(console, args)
    }

    // Override console.log to filter extension errors
    const originalConsoleLog = console.log
    console.log = (...args: any[]) => {
      const errorMessage = args.join(' ')
      
      // Check if this is a browser extension error
      if (this.isBrowserExtensionError(new Error(errorMessage))) {
        return // Don't log extension errors
      }

      // Log other messages normally
      originalConsoleLog.apply(console, args)
    }

    // Additional protection: Override the global error handler
    const originalOnError = window.onerror
    window.onerror = (message, source, lineno, colno, error) => {
      if (error && this.isBrowserExtensionError(error)) {
        return true // Prevent default error handling
      }
      
      if (originalOnError) {
        return originalOnError.call(window, message, source, lineno, colno, error)
      }
      
      return false
    }
  }
}

// Initialize global error handlers
if (typeof window !== 'undefined') {
  ErrorHandler.setupGlobalErrorHandlers()
}
