// Immediate console error filtering - runs before any other scripts
(function() {
  'use strict';
  
  // Store original console methods
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;
  
  // Extension error patterns
  const extensionPatterns = [
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
    'receiving end does not exist',
    'getSingleton',
    'connect',
    'host-console-events.js',
    'host-network-events.js',
    'host-dom-snapshot.js'
  ];
  
  function isExtensionError(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    return extensionPatterns.some(pattern => 
      lowerMessage.includes(pattern.toLowerCase())
    );
  }
  
  // Override console.error
  console.error = function(...args: any[]) {
    const message = args.join(' ');
    if (isExtensionError(message)) {
      return; // Don't log extension errors
    }
    originalError.apply(console, args);
  };
  
  // Override console.warn
  console.warn = function(...args: any[]) {
    const message = args.join(' ');
    if (isExtensionError(message)) {
      return; // Don't log extension errors
    }
    originalWarn.apply(console, args);
  };
  
  // Override console.log
  console.log = function(...args: any[]) {
    const message = args.join(' ');
    if (isExtensionError(message)) {
      return; // Don't log extension errors
    }
    originalLog.apply(console, args);
  };
  
  // Only add window event listeners if we're in the browser
  if (typeof window !== 'undefined') {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
      const message = event.reason?.toString() || '';
      if (isExtensionError(message)) {
        event.preventDefault();
        return;
      }
    });
    
    // Handle uncaught errors
    window.addEventListener('error', function(event) {
      const message = event.message || '';
      if (isExtensionError(message)) {
        event.preventDefault();
        return;
      }
    });
    
    // Override window.onerror
    const originalOnError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
      const errorMessage = message?.toString() || '';
      if (isExtensionError(errorMessage)) {
        return true; // Prevent default error handling
      }
      
      if (originalOnError) {
        return originalOnError.call(window, message, source, lineno, colno, error);
      }
      
      return false;
    };
  }
  
})();
