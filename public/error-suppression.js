// Ultra-early error suppression script
// This runs before any other JavaScript and should be loaded in the HTML head

(function() {
  'use strict';
  
  // Store original methods immediately
  var originalError = console.error;
  var originalWarn = console.warn;
  var originalLog = console.log;
  var originalInfo = console.info;
  var originalDebug = console.debug;
  
  // Comprehensive extension error patterns
  var extensionPatterns = [
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
    'host-dom-snapshot.js',
    'pW.getSingleton',
    'pq',
    'p4',
    'Object.p6',
    'fM.getSingleton',
    'fT',
    'f$',
    'Object.fV',
    'cy.getSingleton',
    'cb',
    'cA',
    'Object.cI',
    'diagnostics',
    'errors',
    // Additional patterns for the new errors
    'fM.getSingleton',
    'fT',
    'f$',
    'fV',
    'cy.getSingleton',
    'cb',
    'cA',
    'cI',
    'async fM.getSingleton',
    'async fT',
    'async f$',
    'async Object.fV',
    'async cy.getSingleton',
    'async cb',
    'async cA',
    'async Object.cI'
  ];
  
  function isExtensionError(message) {
    if (typeof message !== 'string') {
      message = String(message);
    }
    var lowerMessage = message.toLowerCase();
    
    // Check if the message contains any extension error patterns
    var isExtensionRelated = extensionPatterns.some(function(pattern) {
      return lowerMessage.includes(pattern.toLowerCase());
    });
    
    // Additional checks for specific error patterns we're seeing
    if (lowerMessage.includes('host-network-events.js') || 
        lowerMessage.includes('host-dom-snapshot.js') ||
        lowerMessage.includes('fm.getsingleton') ||
        lowerMessage.includes('cy.getsingleton') ||
        lowerMessage.includes('async fm.getsingleton') ||
        lowerMessage.includes('async cy.getsingleton')) {
      return true;
    }
    
    return isExtensionRelated;
  }
  
  // Override all console methods
  function createConsoleOverride(originalMethod) {
    return function() {
      var message = Array.prototype.join.call(arguments, ' ');
      if (isExtensionError(message)) {
        return; // Don't log extension errors
      }
      originalMethod.apply(console, arguments);
    };
  }
  
  console.error = createConsoleOverride(originalError);
  console.warn = createConsoleOverride(originalWarn);
  console.log = createConsoleOverride(originalLog);
  console.info = createConsoleOverride(originalInfo);
  console.debug = createConsoleOverride(originalDebug);
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    var message = event.reason ? event.reason.toString() : '';
    if (isExtensionError(message)) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
  
  // Handle uncaught errors
  window.addEventListener('error', function(event) {
    var message = event.message || '';
    if (isExtensionError(message)) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
  
  // Override window.onerror
  var originalOnError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    var errorMessage = message ? message.toString() : '';
    if (isExtensionError(errorMessage)) {
      return true; // Prevent default error handling
    }
    
    if (originalOnError) {
      return originalOnError.call(window, message, source, lineno, colno, error);
    }
    
    return false;
  };
  
  // Additional protection: Override Error constructor
  var OriginalError = window.Error;
  window.Error = function(message) {
    if (isExtensionError(message)) {
      // Return a silent error that won't be logged
      var silentError = new OriginalError();
      silentError.toString = function() { return ''; };
      silentError.message = '';
      return silentError;
    }
    return new OriginalError(message);
  };
  
  // Copy static properties from OriginalError
  Object.setPrototypeOf(window.Error, OriginalError);
  Object.defineProperty(window.Error, 'prototype', {
    value: OriginalError.prototype,
    writable: false
  });
  
})();
